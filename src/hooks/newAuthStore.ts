import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "@/api/currentUser";
import { Thread } from "@/api/fetchallthread";
import { likeThread } from "@/api/likefunction";
import { followFunction } from "@/api/followfunction";
import { fetchFollowing } from "@/api/followingcheck";
import { getSuggested } from "@/api/suggesteduser";
interface MyState {
  user:User|null
  loggedIn : User |null
  token: string | null;
  threads : Thread[]
  register: (user: User) => void;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoggedin : (loggedIn:User) =>void
  updateUserData: (updatedUser: User) => void;
  setAllThread: (thread:Thread[]) => void
  
}
interface FollowState {
  followedUser: number[];
  suggestedUsers: User[];
  isLoading: boolean;
  error: string | null;
  fetchFollowed: (token:string) => Promise<void>;
  fetchSuggestedUsers: (token:string) => Promise<void>;
  toggleFollow: (token:string,userId: number) => Promise<void>;
  
}

export const useFollowStore = create<FollowState>((set, get) => ({
  followedUser: [],
  suggestedUsers : [],
  isLoading: false,
  error: null,
  fetchFollowed: async (token:string) => {
    try {
      set({ isLoading: true });
      const followedIds = await fetchFollowing(token);
      set({ followedUser: followedIds, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch followed users' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSuggestedUsers: async (token:string) => {
    try {
      set({ isLoading: true });
      const  users  = await getSuggested(token);
      set({ suggestedUsers: users, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch suggested users' });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFollow: async (token:string,userId: number) => {
    try {
      set({ isLoading: true });
      await followFunction(token, userId);
      set((state) => {
        const followedUsers = state.followedUser;
        const newFollowedUsers = followedUsers.includes(userId)
          ? followedUsers.filter(id => id !== userId)
          : [...followedUsers, userId];
          
        return {
          followedUser: newFollowedUsers,
          isLoading: false,
          error: null
        };
      });
    } catch (error) {
      set({ error: 'Failed to toggle follow' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
interface LikeState {
  likedThreads: Record<number, boolean>;
  likeCounts: Record<number, number>;
  loading: Record<number, boolean>;
  toggleLike: (threadId: number, token: string) => Promise<void>;
  initializeLikeState: (threadId: number, isLiked: boolean, count: number) => void;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedThreads: {},
  likeCounts: {},
  loading: {},
  
  initializeLikeState: (threadId, isLiked, count) => {
    set((state) => ({
      likedThreads: { ...state.likedThreads, [threadId]: isLiked },
      likeCounts: { ...state.likeCounts, [threadId]: count }
    }));
  },

  toggleLike: async (threadId: number, token: string) => {
    if (!token) return;

    set((state) => ({
      loading: { ...state.loading, [threadId]: true }
    }));

    try {
      const data = await likeThread(token, threadId);
      
      set((state) => {
        const isLiked = data.message === "Thread liked successfully";
        const currentCount = state.likeCounts[threadId] || 0;
        
        return {
          likedThreads: { ...state.likedThreads, [threadId]: isLiked },
          likeCounts: {
            ...state.likeCounts,
            [threadId]: isLiked ? currentCount + 1 : Math.max(currentCount - 1, 0)
          },
          loading: { ...state.loading, [threadId]: false }
        };
      });
    } catch (error) {
      console.error(error);
      set((state) => ({
        loading: { ...state.loading, [threadId]: false }
      }));
    }
  }
}));

const useAuthStore = create<MyState>((set) => ({
  user: null,
  loggedIn:null,
  token: localStorage.getItem("token") || null,
  threads:[],
  register: (user: User) => set({ user }),
  // ...loadState(),
  login: (token) => {
    
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user: User) => {
    set({ user });
  },
  setLoggedin: (loggedIn: User) => {
    set({ loggedIn });
  },
  logout: () => {
    
    localStorage.removeItem("token");
    set({ token: null });
  },  
  updateUserData: (updatedUser: User) => {
    set({ user: updatedUser }); 
  },
  setAllThread : (thread:Thread[])=>{
    set({threads:thread})
  },
 
    
}));

export default useAuthStore;

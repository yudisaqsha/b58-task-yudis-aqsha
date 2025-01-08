import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "@/features/currentUser";
import { Thread } from "@/features/fetchallthread";
import { likeThread } from "@/features/likefunction";
import { followFunction } from "@/features/followfunction";
import { fetchFollowing } from "@/features/fetchfollowing";
import { getSuggested } from "@/features/suggesteduser";
import { Comment } from "@/features/getcomment";
import { string } from "zod";
interface MyState {
  user:User|null
  loggedIn : User |null
  token: string | null;
  threads : Thread[]
  thread : Thread |null
  comments : Comment[]
  register: (user: User) => void;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoggedin : (loggedIn:User) =>void
  updateUserData: (updatedUser: User) => void;
  setAllThread: (thread:Thread[]) => void
  setThread:(thread:Thread) => void
  setComments:(comment:Comment[]) => void
}
interface FollowState {
  follows: { [key: number]: boolean }; // Track follow status by userId
  toggleFollow: (userId: number) => void;
  setFollowStatus: (userId: number, status: boolean) => void;
}

export const useFollowStore = create<FollowState>((set) => ({
  follows: {}, // Initially, no user is followed
  toggleFollow: (userId) =>
    set((state) => {
      const newFollows = { ...state.follows };
      newFollows[userId] = !newFollows[userId]; // Toggle follow status
      return { follows: newFollows };
    }),
  setFollowStatus: (userId, status) =>
    set((state) => ({
      follows: { ...state.follows, [userId]: status },
    })),
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
  thread:null,
  comments:[],
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
  setThread : (thread:Thread)=>{
    set({thread:thread})
  },
  setComments:(comment:Comment[])=>{
    set({comments:comment})
  }
 
}));

export default useAuthStore;

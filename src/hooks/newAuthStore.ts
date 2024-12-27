import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "@/api/currentUser";
import { Thread } from "@/api/fetchallthread";
interface User {
  id?: number;
  username?: string;
  email?: string;
  fullName?: string;
  bio?:string
  password?:string
  _count?: {
    followers: number;
    following: number;
  };
}

interface MyState {
  user:User|null
  loggedIn : CurrentUser |null
  token: string | null;
  thread : Thread[]| null
  register: (user: User) => void;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoggedin : (loggedIn:CurrentUser) =>void
  updateUserData: (updatedUser: User) => void;
  setAllThread: (thread:Thread[]) => void
  toggleLike: (id: number) => void;
  
}



const useAuthStore = create<MyState>((set) => ({
  user: null,
  loggedIn:null,
  token: localStorage.getItem("token") || null,
  thread:[],
  register: (user: User) => set({ user }),
  // ...loadState(),
  login: (token) => {
    
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user: User) => {
    set({ user });
  },
  setLoggedin: (loggedIn: CurrentUser) => {
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
    set({thread:thread})
  },
  toggleLike: (id) =>
    set((state) => {
      const updatedThreads = state.thread?.map((t) =>
        t.id === id ? { ...t, liked: !t.liked, _count: { ...t._count, likes: t.liked ? t._count.likes - 1 : t._count.likes + 1 } } : t
      );
      return { thread: updatedThreads };
    }),
}));

export default useAuthStore;

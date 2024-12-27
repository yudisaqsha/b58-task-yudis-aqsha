// useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of your store state
interface User{
  fullName: string;
  username: string;
  email: string;
  password: string;
  bio?:string;
}

interface Comment {
  comment_id:string;
  user: { username: string, fullName:string };
  text: string;
}

interface Post {
  id: string;
  status: string;
  image?: string;
  
  user: { username: string, fullName:string };
  likes: number;
  liked: boolean;
  comments: Comment[];
}
interface AuthState {
  users: User[];
  posts: Post[];
  isAuthenticated: boolean;
  currentUser: User | null;
  registerUser: (user: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (email: string, fullName: string, username: string, bio?:string) => void;
  likedPosts: Set<string>;
  addPost: (post: Post) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}




const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [
        { fullName: "Full Name", username: "notnewname", email: "notnewname@example.com", password: "password123" },
        { fullName: "New Name", username: "newname", email: "jenanewname@example.com", password: "securepass" },
      ], 
      posts: [
        {
          id: '1',
          status: 'Hello, this is my first post!',
          user: { username: 'newname', fullName: "New Name" },
          likes: 5,
          liked:false,
          comments: [
            { comment_id:'1', user: {username: 'notnewname',fullName: "Full Name" }, text: 'Nice post!' },
            { comment_id:'2', user: {username: 'notnewname',fullName: "Full Name" }, text: 'Thanks!' },
          ],
        },
        {
          id: '2',
          status: 'Ini Post',
          image: 'https://pbs.twimg.com/media/FmNDPrYXkAI0Q0G?format=png&name=360x360',
          user: { username: 'notnewname', fullName: "Full Name" },
          likes: 2,
          liked:false,
          comments: [
            { comment_id:'1',user: {username: 'newname', fullName:"New name" }, text: 'Great post!' },
          ],
        },
      ], 
      likedPosts: new Set(),
      currentUser: null,
      
      registerUser: (newUser: User) => {
        set((state) => ({
          users: [...state.users, newUser], 
          
        })); 
      },
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const foundUser = get().users.find(
          (user) => user.email === email && user.password === password
        );
        if (foundUser) {
          set({ currentUser: foundUser, isAuthenticated: true});
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null, isAuthenticated: false }),
      
      updateProfile: (email: string, fullName: string, username: string, bio?:string) => {
        set((state) => {
          
          if (state.currentUser) {
            const updatedUser = { ...state.currentUser, email, fullName, username, bio };
            const updatedUsers = state.users.map((user) =>
              user.email === state.currentUser?.email ? updatedUser : user
            );
            return { users: updatedUsers, currentUser: updatedUser };
          }
          return state;
        });
      },
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      likePost: (postId: string) => {
        set((state) => {
          const userId = state.currentUser?.username;
          if (!userId) return state;  // No user logged in
    
          const posts = state.posts.map((post) => {
            if (post.id === postId) {
              if (post.liked) {
                // Unlike the post
                post.liked = false;
                post.likes -= 1;
              } else {
                // Like the post
                post.liked = true;
                post.likes += 1;
              }
            }
            return post;
          });
    
          return { posts };
        });
      },
      addComment: (postId, comment) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          ),
        })),
    }),
    {
      name: 'auth-storage',  // Key used in localStorage
    
    }
  )
);

export default useAuthStore;

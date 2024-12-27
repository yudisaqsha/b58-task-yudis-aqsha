// useLikeStore.ts
import  {create} from 'zustand';
import { persist } from 'zustand/middleware';

// Define the store's state and actions types
interface LikeStore {
  likeCount: number; // Store the like count
  toggleLike: () => void; // Action to toggle like/unlike state
}

// Create the Zustand store with persistence using type casting
export const useLikeStore = create<LikeStore>()(
  persist(
    (set) => ({
      likeCount: 100, // Initial like count (set to 0)
      toggleLike: () => set((state: LikeStore) => ({
        likeCount: state.likeCount === 100 ? 101 : 100, 
      })),
    }),
    {
      name: 'like-toggle-storage', 
    }
  )
);

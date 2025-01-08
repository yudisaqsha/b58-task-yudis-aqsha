import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
export interface Author {
  id:number
  username: string;
  fullName: string;
  avatar:string
}

export interface Thread {
  id:number
  content: string;
  image:string
  author: Author;
  _count: {
    likes: number;
    comments: number;
  };
  userHasLiked: boolean;
}

export const fetchThreads = async (token: string): Promise<Thread[]> => {
  try {
    const response = await axios.get(apiURL+'thread', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.threads;
  } catch (error) {
    throw new Error('Failed to fetch threads');
  }
};

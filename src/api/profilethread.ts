import axios from 'axios';
// import { Thread } from './fetchallthread';
export interface Author {
  id:number
  username: string;
  fullName: string;
}

export interface Thread {
  id:number
  content: string;
  author: Author;
  _count: {
    likes: number;
    comments: number;
  };
  liked: boolean;
}

export const fetchProfileThreads = async (token: string, username:string): Promise<Thread[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/thread/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.threads;
  } catch (error) {
    throw new Error('Failed to fetch threads');
  }
};

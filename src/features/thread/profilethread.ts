import axios from 'axios';
import { Thread } from './fetchallthread';
import { apiURL } from '@/utils/baseurl';
// export interface Author {
//   id:number
//   username: string;
//   fullName: string;
//   avatar:string
// }

// export interface Thread {
//   id:number
//   content: string;
//   author: Author;
//   image:string
//   _count: {
//     likes: number;
//     comments: number;
//   };
//   liked: boolean;
// }

export const fetchProfileThreads = async (token: string, username:string): Promise<Thread[]> => {
  try {
    const response = await axios.get(apiURL+`thread/profile/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.threads;
  } catch (error) {
    throw new Error('Failed to fetch threads');
  }
};
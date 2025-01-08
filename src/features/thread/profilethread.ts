import axios from 'axios';
import { Thread } from '@/types/threads';
import { apiURL } from '@/utils/baseurl';


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

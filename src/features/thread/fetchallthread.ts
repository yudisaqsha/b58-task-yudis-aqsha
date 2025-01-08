import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
import { Thread } from '@/types/threads';
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

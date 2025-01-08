import axios from 'axios';
import { Thread } from '@/types/threads';
import { apiURL } from '@/utils/baseurl';
apiURL
export const fetchThreadsbyId = async (token: string, id:string): Promise<Thread> => {
    try {
      const response = await axios.get(apiURL+`thread/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.thread;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
  
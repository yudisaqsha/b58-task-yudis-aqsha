import axios from 'axios';
import { Thread } from './fetchallthread';

export const fetchThreadsbyId = async (token: string, id:string): Promise<Thread> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/thread/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.thread;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
  
import axios from 'axios';
import { Thread } from './fetchallthread';
import { apiURL } from '@/utils/baseurl';
export const createThread = async (token:string,formData: FormData): Promise<{ message: string, thread: Thread }> => {
    try {
      const response = await axios.post(apiURL+'thread/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data.thread; 
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error; 
    }
  };
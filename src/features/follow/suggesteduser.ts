import axios from 'axios';
import { User } from '../users/currentUser';
import { apiURL } from '@/utils/baseurl';

export const getSuggested = async (token:string): Promise<User[]> => {
    try {
      const response = await axios.get(apiURL+'users/suggested', { headers:{ Authorization: `Bearer ${token}`}}); 
      return response.data.users; 
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error; 
    }
  };
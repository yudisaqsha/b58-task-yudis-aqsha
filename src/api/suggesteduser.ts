import axios from 'axios';
import { User } from './currentUser';

export const getSuggested = async (token:string): Promise<User[]> => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/suggested', { headers:{ Authorization: `Bearer ${token}`}}); 
      return response.data.users; 
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error; 
    }
  };
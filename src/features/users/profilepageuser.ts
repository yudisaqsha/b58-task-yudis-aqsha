import axios from 'axios';
import { User } from './currentUser';
import { apiURL } from '@/utils/baseurl';
export const profilePage = async (token:string, username:string): Promise<User> => {
  try {
    const response = await axios.get(
      apiURL+`users/${username}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        },
      }
    );
    return response.data.user; 
  } catch (error) {
    throw new Error('Failed to fetch username');
  }
};

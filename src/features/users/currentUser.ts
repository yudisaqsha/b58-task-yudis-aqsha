import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
export interface User {
  id: number;
    username: string;
    fullName: string;
    bio: string;
    avatar: string;
    coverPic: string;
   
    _count: {
      followers: number;
      following: number;
    };
}

export const currentUser = async (token:string): Promise<User> => {
  try {
    const response = await axios.get(apiURL+'users/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.user;
  } catch (error) {
    throw new Error('Failed to fetch loggedin user');
  }
};

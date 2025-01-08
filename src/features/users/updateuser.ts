import { apiURL } from '@/utils/baseurl';
import { User } from './users/currentUser';  
import axios from 'axios';
apiURL
export const updateUser = async (token:string,formData: FormData): Promise<{ message: string, user: User }> => {
  try {
    const response = await axios.put(apiURL+'users/update', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};
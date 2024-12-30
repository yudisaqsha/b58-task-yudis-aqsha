import { User } from '../api/currentUser';  
import axios from 'axios';

export const updateUser = async (token:string,formData: FormData): Promise<{ message: string, user: User }> => {
  try {
    const response = await axios.put('http://localhost:5000/api/users/update', formData, {
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
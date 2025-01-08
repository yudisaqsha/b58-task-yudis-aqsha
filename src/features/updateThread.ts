import { Thread } from './fetchallthread';  
import axios from 'axios';

export const updateThread = async (token:string,formData: FormData,id:number): Promise<{ message: string, thread:Thread }> => {
  try {
    const response = await axios.put(`http://localhost:5000/api/thread/${id}/edit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data.thread; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};
import { apiURL } from '@/utils/baseurl';
import { Thread } from '@/types/threads'; 
import axios from 'axios';


export const updateThread = async (token:string,formData: FormData,id:number): Promise<{ message: string, thread:Thread }> => {
  try {
    const response = await axios.put(apiURL+`thread/${id}/edit`, formData, {
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
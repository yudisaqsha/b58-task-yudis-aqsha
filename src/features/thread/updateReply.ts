import { apiURL } from '@/utils/baseurl';
import { Comment } from '@/types/comments'; 
import axios from 'axios';


export const updateReply = async (token:string,formData: FormData,threadId:string,commentId:string): Promise<{ message: string, comment:Comment }> => {
  try {
    const response = await axios.put(apiURL+`thread/${threadId}/comment/${commentId}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data.comment; 
  } catch (error) {
    console.error("Error updating reply:", error);
    throw error; 
  }
};
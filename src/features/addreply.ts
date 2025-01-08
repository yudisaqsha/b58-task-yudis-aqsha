import axios from 'axios';
import { Comment } from './getcomment';

export const addReply = async (token:string,id:string,formData:FormData): Promise<{ message: string, comment: Comment }> => {
    try {
      const response = await axios.post(`http://localhost:5000/api/thread/${id}/addcomment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data.comment; 
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error; 
    }
  };
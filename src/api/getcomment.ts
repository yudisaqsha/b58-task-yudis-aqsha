import axios from "axios";
import { Author } from "./fetchallthread";
import { Thread } from "./fetchallthread";
export  interface Comment{
    id: number,
    content: string,
    image: string,
    author: Author
}

export const fetchComment = async (token: string,id:string): Promise<Comment[]> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/thread/${id}/comment`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.comment;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
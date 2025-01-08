import axios from "axios";
import { Author } from "./fetchallthread";
import { Thread } from "./fetchallthread";
import { Comment } from "./getcomment";
export const fetchCommentbyId = async (token: string,threadId:number,commentId:number): Promise<Comment> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/thread/${threadId}/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.comment;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
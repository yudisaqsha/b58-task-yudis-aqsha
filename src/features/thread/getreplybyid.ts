import axios from "axios";
import { Comment } from "@/types/comments";
import { apiURL } from "@/utils/baseurl";
export const fetchCommentbyId = async (token: string,threadId:number,commentId:number): Promise<Comment> => {
    try {
      const response = await axios.get(apiURL+`thread/${threadId}/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.comment;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
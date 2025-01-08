import axios from "axios";
;
import { apiURL } from "@/utils/baseurl";
import { Comment } from "@/types/comments";

export const fetchComment = async (token: string,id:string): Promise<Comment[]> => {
    try {
      const response = await axios.get(apiURL+`thread/${id}/comment`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data.comment;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
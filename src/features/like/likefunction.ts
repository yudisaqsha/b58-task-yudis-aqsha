import axios from "axios";
import { apiURL } from "@/utils/baseurl";
interface LikeThreadResponse {
  message: string;
}
export const likeThread = async (token: string, id: number):Promise<LikeThreadResponse> => {
    try {
      const response = await axios.post(apiURL+`thread/${id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to toggle like');
      } else if (error.request) {
        throw new Error('No response from server. Please try again later.');
      } else {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  };
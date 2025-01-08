import axios from "axios";
import { apiURL } from "@/utils/baseurl";
export const deleteThread = async (token: string, id: number) => {
    try {
      const response = await axios.delete(apiURL+`thread/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to Delete');
      } else if (error.request) {
        throw new Error('No response from server. Please try again later.');
      } else {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  };
import axios from "axios";
import { User } from "./currentUser";

export const searchBar = async (token: string, username:string) :Promise<User[]>=> {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/search`, {username:username}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.users; 
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
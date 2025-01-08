import axios from "axios";
import { User } from "./currentUser";
export const fetchFollower= async (token: string, id:number)=> {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/followers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        return response.data.followers
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
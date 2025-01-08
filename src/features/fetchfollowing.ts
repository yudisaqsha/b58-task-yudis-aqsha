import axios from "axios";
import { User } from "./currentUser";
export interface Follow {
  id: number;
 
  follower:  User ;
  following: User ;
}
export const fetchFollowing = async (token: string, id:number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/following/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        return response.data.following
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
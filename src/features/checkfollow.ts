import axios from 'axios';
import { Follow } from './fetchfollowing';


export interface FollowResponse {
    isFollowing: boolean;
  }
  
  export interface ToggleFollowResponse {
    message: string;
    follow?: any; 
  }
  
export const checkFollow = async (token:string, userId:number,id:number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${id}/checkfollow?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.isFollowing;
  } catch (error) {
    throw new Error('Failed to fetch loggedin user');
  }
};

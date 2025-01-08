import axios from "axios";

import { apiURL } from "@/utils/baseurl";
export const fetchFollower= async (token: string, id:number)=> {
    try {
      const response = await axios.get(apiURL+`users/followers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        return response.data.followers
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
import axios from "axios";

import { apiURL } from "@/utils/baseurl";

export const fetchFollowing = async (token: string, id:number) => {
    try {
      const response = await axios.get(apiURL+`users/following/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        return response.data.following
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
import axios from "axios";
export const fetchFollowing = async (token: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/following`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch threads');
    }
  };
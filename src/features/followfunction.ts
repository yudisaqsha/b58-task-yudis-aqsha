import axios from "axios";

export const followFunction = async (token: string, userId: number) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/toggle-follow`, {userId:userId}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data.message
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to toggle follow');
      } else if (error.request) {
        throw new Error('No response from server. Please try again later.');
      } else {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  };
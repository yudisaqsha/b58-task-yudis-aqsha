import axios from "axios";

export const deleteReply = async (token: string,threadId: number,commentId:number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/thread/${threadId}/comment/${commentId}`, {
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
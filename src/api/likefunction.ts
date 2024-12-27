import axios from "axios";
export const likeThread = async (token: string, id: number) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/thread/${id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (err) {
      console.error("Error liking the thread:", err);
      throw new Error("Error liking the thread");
    }
  };
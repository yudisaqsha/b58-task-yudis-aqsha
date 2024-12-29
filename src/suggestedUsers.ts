import axios from 'axios';

export interface SuggestedUser{
    id: number;
    username: string;
    fullName: string;
    bio: string;
    avatar: string;
    _count: {
      followers: number;
      following: number;
    };
}

export const getSuggested = async (token:string): Promise<SuggestedUser[]> => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/suggested', { headers:{ Authorization: `Bearer ${token}`}}); // Endpoint to fetch current user
      return response.data.users; 
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error; 
    }
  };
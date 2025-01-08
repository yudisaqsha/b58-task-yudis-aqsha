import { apiURL } from '@/utils/baseurl';
import axios from 'axios';



export const threadProfile = async (token:string, username:string) => {
  try {
    const response = await axios.get(
      apiURL+`thread/${username}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || 'Fetching current user failed' };
    } else {
      return { message: 'An error occurred while fetching data.' };
    }
  }
};

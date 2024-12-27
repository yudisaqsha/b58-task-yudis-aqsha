import axios from 'axios';

export interface ProfilePage {
  username?:string
  token?: string;
  message?: string;
  
}

export const threadProfile = async (token:string, username:string): Promise<ProfilePage> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/thread/${username}`,
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

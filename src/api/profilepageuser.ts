import axios from 'axios';

interface ProfileUser{
  id: number;
  username: string;
  email: string;
  fullName: string;
  bio:string
  password:string
  _count: {
    followers: number;
    following: number;
  };
}

export const profilePage = async (token:string, username:string): Promise<ProfileUser> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${username}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        },
      }
    );
    return response.data.user; 
  } catch (error) {
    throw new Error('Failed to fetch username');
  }
};

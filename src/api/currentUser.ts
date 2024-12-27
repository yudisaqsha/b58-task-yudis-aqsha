import axios from 'axios';

export interface CurrentUser {
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

export const currentUser = async (token:string): Promise<CurrentUser> => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
    return response.data.user;
  } catch (error) {
    throw new Error('Failed to fetch loggedin user');
  }
};

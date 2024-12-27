import axios from 'axios';

export interface UpdateUserResponse {
  message: string;
  user?: {
    fullName?: string;
    username?: string;
    bio?:string
    avatar?:string
  };
}

export const updateUser = async (token: string, username: string, fullName?:string,bio?:string, avatar?:string): Promise<UpdateUserResponse> => {
  try {
    const response = await axios.put(
      'http://localhost:5000/api/users/update', 
      { username, fullName,bio, avatar },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || 'Update failed' };
    } else {
      return { message: 'An error occurred while updating the user.' };
    }
  }
};

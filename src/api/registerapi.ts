import axios from 'axios';

interface RegisterResponse {
  user?: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password:string
  };
  message?: string;
}

export const registerUser = async (
  fullName: string,
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        fullName,
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Return the user data
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || 'Registration failed' };
    } else {
      return { message: 'An error occurred while registering.' };
    }
  }
};

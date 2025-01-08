import axios from "axios";
import { apiURL } from "@/utils/baseurl";
interface RegisterResponse {
  user?: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
  };
  message?: string;
}

export const registerUser = async (
  fullName: string,
  username: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(
      apiURL + "auth/register",
      {
        fullName,
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || "Registration failed" };
    } else {
      return { message: "An error occurred while registering." };
    }
  }
};

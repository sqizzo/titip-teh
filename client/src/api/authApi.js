// API
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

// Login
export const loginUser = async (data) => {
  const response = await axios.post(`${serverUrl}/auth/login`, data);
  return response;
};

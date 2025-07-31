// API
import axios from "axios";

// Auth API
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchMenus = async (token) => {
  const response = await axios.get(`${serverUrl}/menus`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

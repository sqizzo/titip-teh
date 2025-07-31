// API
import axios from "axios";

// Auth API
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchUsers = async (token) => {
  const response = await axios.get(`${serverUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const approveUser = async (token, id) => {
  const response = await axios.patch(
    `${serverUrl}/users/${id}/approve`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const rejectUser = async (token, id) => {
  const response = await axios.patch(
    `${serverUrl}/users/${id}/reject`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

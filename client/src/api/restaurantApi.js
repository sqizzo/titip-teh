import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

// Get all restaurants (GET /restaurants)
export const fetchRestaurants = async (token) => {
  const response = await axios.get(`${serverUrl}/restaurants`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Get restaurant menus (GET /restaurants/:id/menus)
export const fetchRestaurantMenus = async (token, id) => {
  const response = await axios.get(`${serverUrl}/restaurants/${id}/menus`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Add restaurant (POST /restaurants/add)
export const addRestaurant = async (token, data) => {
  const response = await axios.post(`${serverUrl}/restaurants/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Add menu to restaurant (POST /restaurants/:id/menus)
export const addRestaurantMenu = async (token, id, data) => {
  const response = await axios.post(
    `${serverUrl}/restaurants/${id}/menus`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

// Edit restaurant (PUT /restaurants/:id)
export const editRestaurant = async (token, id, data) => {
  const response = await axios.put(`${serverUrl}/restaurants/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Delete restaurant (DELETE /restaurants/:id)
export const deleteRestaurant = async (token, id) => {
  const response = await axios.delete(`${serverUrl}/restaurants/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

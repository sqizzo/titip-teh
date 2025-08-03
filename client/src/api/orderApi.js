import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

// Create new order
export const createOrder = async (token, orderData) => {
  const response = await axios.post(`${serverUrl}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Get user orders
export const fetchUserOrders = async (token) => {
  const response = await axios.get(`${serverUrl}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Get all orders (Admin only)
export const fetchAllOrders = async (token) => {
  const response = await axios.get(`${serverUrl}/orders/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Update order status (Admin only)
export const updateOrderStatus = async (token, orderId, status) => {
  const response = await axios.patch(
    `${serverUrl}/orders/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

// Get order by ID
export const fetchOrderById = async (token, orderId) => {
  const response = await axios.get(`${serverUrl}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Cancel order
export const cancelOrder = async (token, orderId) => {
  const response = await axios.patch(
    `${serverUrl}/orders/${orderId}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};
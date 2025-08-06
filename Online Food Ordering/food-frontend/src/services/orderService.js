import api from './api';

export const createOrderApi = (orderData) => {
  return api.post('/api/order', orderData);
};

export const getUserOrdersApi = () => {
  return api.get('/api/order/user');
};

export const getOrderByIdApi = (orderId) => {
  return api.get(`/api/order/${orderId}`);
};

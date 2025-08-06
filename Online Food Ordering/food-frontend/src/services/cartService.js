import api from './api';

export const getCartApi = () => {
  return api.get('/api/cart');
};

export const addToCartApi = (cartData) => {
  return api.put('/api/cart/add', cartData);
};

export const updateCartItemApi = (itemId, quantity) => {
  return api.put(`/api/cart-item/update`, { cartItemId: itemId, quantity });
};

export const removeCartItemApi = (itemId) => {
  return api.delete(`/api/cart-item/${itemId}/remove`);
};

export const clearCartApi = () => {
  return api.put('/api/cart/clear');
};

import api from './api';

export const getRestaurantsApi = () => {
  return api.get('/api/restaurants');
};

export const getRestaurantByIdApi = (id) => {
  return api.get(`/api/restaurants/${id}`);
};

export const searchRestaurantsApi = (keyword) => {
  return api.get(`/api/restaurants/search?keyword=${keyword}`);
};

export const getRestaurantsByCityApi = (city) => {
  return api.get(`/api/restaurants/city/${city}`);
};

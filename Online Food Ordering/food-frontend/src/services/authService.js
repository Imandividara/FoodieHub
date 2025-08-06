import api from './api';

export const loginApi = (userData) => {
  return api.post('/auth/signin', userData);
};

export const registerApi = (userData) => {
  return api.post('/auth/signup', userData);
};

export const getUserProfileApi = () => {
  return api.get('/api/users/profile');
};

export const updateUserProfileApi = (userData) => {
  return api.put('/api/users/profile', userData);
};

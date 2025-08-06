import api from './api';

export const getFoodsByRestaurantApi = (restaurantId) => {
  return api.get(`/api/food/restaurant/${restaurantId}`);
};

export const searchFoodsApi = (keyword) => {
  return api.get(`/api/food/search?name=${keyword}`);
};

export const getFoodsByCategoryApi = (restaurantId, category) => {
  return api.get(`/api/food/restaurant/${restaurantId}/category/${category}`);
};

export const getFoodByIdApi = (foodId) => {
  return api.get(`/api/food/${foodId}`);
};

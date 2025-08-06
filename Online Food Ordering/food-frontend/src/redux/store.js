import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import restaurantReducer from './restaurantSlice';
import foodReducer from './foodSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    food: foodReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

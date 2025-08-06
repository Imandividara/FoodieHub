import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRestaurantsApi, getRestaurantByIdApi, searchRestaurantsApi } from '../services/restaurantService';

// Async thunks
export const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRestaurantsApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRestaurantById = createAsyncThunk(
  'restaurant/getRestaurantById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRestaurantByIdApi(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchRestaurants = createAsyncThunk(
  'restaurant/searchRestaurants',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await searchRestaurantsApi(keyword);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  searchResults: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get restaurants
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get restaurant by ID
      .addCase(getRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRestaurant = action.payload;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentRestaurant, clearSearchResults } = restaurantSlice.actions;
export default restaurantSlice.reducer;

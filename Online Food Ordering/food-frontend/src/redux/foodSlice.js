import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFoodsByRestaurantApi, searchFoodsApi, getFoodsByCategoryApi } from '../services/foodService';

// Async thunks
export const getFoodsByRestaurant = createAsyncThunk(
  'food/getFoodsByRestaurant',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await getFoodsByRestaurantApi(restaurantId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchFoods = createAsyncThunk(
  'food/searchFoods',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await searchFoodsApi(keyword);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFoodsByCategory = createAsyncThunk(
  'food/getFoodsByCategory',
  async ({ restaurantId, category }, { rejectWithValue }) => {
    try {
      const response = await getFoodsByCategoryApi(restaurantId, category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  foods: [],
  categories: [],
  searchResults: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get foods by restaurant
      .addCase(getFoodsByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodsByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
        // Extract unique categories
        const categories = [...new Set(action.payload.map(food => food.foodCategory?.name).filter(Boolean))];
        state.categories = categories;
      })
      .addCase(getFoodsByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search foods
      .addCase(searchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get foods by category
      .addCase(getFoodsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(getFoodsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSearchResults, setSelectedCategory, clearSelectedCategory } = foodSlice.actions;
export default foodSlice.reducer;

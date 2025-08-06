import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Skeleton,
  IconButton,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Schedule,
  LocationOn,
  Star,
  Add,
  ArrowBack,
} from '@mui/icons-material';
import { getRestaurantById } from '../../redux/restaurantSlice';
import { getFoodsByRestaurant } from '../../redux/foodSlice';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentRestaurant, loading: restaurantLoading } = useSelector((state) => state.restaurant);
  const { foods, categories, loading: foodLoading } = useSelector((state) => state.food);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getRestaurantById(id));
      dispatch(getFoodsByRestaurant(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = async (food) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addToCart({
        foodId: food.id,
        quantity: 1,
        ingredients: []
      }));
      toast.success(`${food.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const filteredFoods = selectedCategory === 0 
    ? foods 
    : foods?.filter(food => food.foodCategory?.name === categories[selectedCategory - 1]);

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container maxWidth="lg">
          <Skeleton variant="rectangular" height={300} className="rounded-2xl mb-8" />
          <Skeleton variant="text" height={40} width="60%" className="mb-4" />
          <Skeleton variant="text" height={20} width="40%" />
        </Container>
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Typography variant="h5" className="text-gray-600">
          Restaurant not found
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <Box className="relative h-80 bg-gradient-to-r from-primary-500 to-orange-600">
        <Box className="absolute inset-0 bg-black/30"></Box>
        <Container maxWidth="lg" className="relative h-full">
          <Box className="flex items-center h-full text-white">
            <IconButton
              onClick={() => navigate(-1)}
              className="bg-white/20 backdrop-blur-sm mr-4"
              sx={{ color: 'white' }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h3" className="font-display font-bold mb-2">
                {currentRestaurant.name}
              </Typography>
              <Typography variant="h6" className="mb-3 text-gray-100">
                {currentRestaurant.description}
              </Typography>
              <Box className="flex items-center gap-4 mb-4">
                <Box className="flex items-center gap-1">
                  <Star className="text-yellow-400" />
                  <Typography variant="body1" className="font-semibold">
                    {currentRestaurant.rating || 4.5}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-1">
                  <Schedule />
                  <Typography variant="body1">
                    {currentRestaurant.openingHours || '30-45 min'}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-1">
                  <LocationOn />
                  <Typography variant="body1">
                    {currentRestaurant.address?.city || 'City Center'}
                  </Typography>
                </Box>
              </Box>
              <Box className="flex gap-2">
                <Chip
                  label={currentRestaurant.open ? "Open Now" : "Closed"}
                  className={currentRestaurant.open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                />
                <Chip label="Free Delivery" className="bg-blue-100 text-blue-800" />
                <Chip label={currentRestaurant.cuisineType || "Multi Cuisine"} className="bg-purple-100 text-purple-800" />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="py-8">
        {/* Category Tabs */}
        <Paper className="rounded-2xl shadow-custom mb-6">
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            className="px-4"
          >
            <Tab label="All Items" />
            {categories?.map((category, index) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Paper>

        {/* Food Items */}
        <Box>
          <Typography variant="h4" className="font-display font-bold mb-6 text-gray-800">
            {selectedCategory === 0 ? 'All Items' : categories[selectedCategory - 1]}
          </Typography>

          {foodLoading ? (
            <Grid container spacing={4}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className="rounded-2xl shadow-custom">
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={30} />
                      <Skeleton variant="text" height={20} width="60%" />
                      <Skeleton variant="text" height={20} width="80%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {filteredFoods?.map((food) => (
                <Grid item xs={12} sm={6} md={4} key={food.id}>
                  <Card className="hover-scale shadow-custom border-0 rounded-2xl overflow-hidden">
                    <CardMedia
                      component="img"
                      height="200"
                      image={food.images?.[0] || '/api/placeholder/300/200'}
                      alt={food.name}
                      className="object-cover"
                    />
                    <CardContent className="p-6">
                      <Box className="flex justify-between items-start mb-2">
                        <Typography variant="h6" className="font-display font-semibold text-gray-800">
                          {food.name}
                        </Typography>
                        {food.vegetarian && (
                          <Chip
                            label="Veg"
                            size="small"
                            className="bg-green-100 text-green-800"
                          />
                        )}
                      </Box>
                      
                      <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
                        {food.description}
                      </Typography>
                      
                      <Box className="flex items-center gap-2 mb-4">
                        <Rating value={4.5} precision={0.5} size="small" readOnly />
                        <Typography variant="body2" className="text-gray-600">
                          4.5 (89 reviews)
                        </Typography>
                      </Box>
                      
                      <Box className="flex items-center justify-between">
                        <Typography variant="h6" className="font-bold text-primary-600">
                          ₹{food.price}
                        </Typography>
                        <Button
                          onClick={() => handleAddToCart(food)}
                          variant="contained"
                          startIcon={<Add />}
                          className="bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold"
                        >
                          Add
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {!foodLoading && filteredFoods?.length === 0 && (
            <Box className="text-center py-16">
              <Typography variant="h5" className="text-gray-600 mb-4">
                No items found in this category
              </Typography>
              <Typography variant="body1" className="text-gray-500">
                Try selecting a different category
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default RestaurantDetails;

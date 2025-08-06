import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import {
  LocalOffer,
  Schedule,
  Star,
  TwoWheeler,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { getRestaurants } from '../../redux/restaurantSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const featuredRestaurants = restaurants?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box className="relative bg-secondary-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Container maxWidth="lg" className="relative z-10">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                className="font-display font-bold mb-6 text-white animate-fade-in"
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Delicious Food
                <br />
                <span className="text-yellow-300">Delivered Fast</span>
              </Typography>
              <Typography
                variant="h6"
                className="mb-20 text-gray-100 leading-relaxed animate-slide-up"
              >
                Discover amazing restaurants near you and get your favorite meals delivered 
                in under 30 minutes. Fresh, hot, and ready to enjoy!
              </Typography>
              <Box className="flex flex-col sm:flex-row gap-4 animate-slide-up mt-5">
                <Button
                  component={Link}
                  to="/restaurants"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#facc15', // Tailwind yellow-400
                    color: '#111827',            // Tailwind gray-900
                    '&:hover': { backgroundColor: '#eab308' }, // Tailwind yellow-500
                  }}
                  className="rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all"
                >
                  Order Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-primary-600 rounded-full px-8 py-3 font-semibold transition-all"
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="relative animate-bounce-slow">
                <img
                  src="/assets/food.jpg"
                  alt="Food delivery"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{ maxWidth: '400px', height: 'auto' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className="py-16">
        <Typography
          variant="h3"
          className="font-display font-bold text-center mb-12 text-gray-800"
        >
          Why Choose <span className="text-secondary-400">FoodieHub</span>?
        </Typography>
        
        <Grid container spacing={4}>
          {[
            {
              icon: <TwoWheeler className="text-primary-500" fontSize="large" />,
              title: 'Fast Delivery',
              description: 'Get your food delivered in under 30 minutes with our express delivery service.',
            },
            {
              icon: <RestaurantIcon className="text-primary-500" fontSize="large" />,
              title: 'Best Restaurants',
              description: 'Partnered with the finest restaurants in your city to bring you quality meals.',
            },
            {
              icon: <LocalOffer className="text-primary-500" fontSize="large" />,
              title: 'Great Deals',
              description: 'Enjoy amazing discounts and offers on your favorite restaurants.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="h-full hover-scale shadow-custom border-0 rounded-2xl p-6">
                <CardContent className="text-center">
                  <Box className="mb-4 flex justify-center">
                    <Box className="p-4 bg-primary-50 rounded-full">
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography variant="h5" className="font-display font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Restaurants Section */}
      <Box className="bg-gray-50 py-16">
        <Container maxWidth="lg">
          <Box className="flex justify-between items-center mb-8">
            <Typography
              variant="h3"
              className="font-display font-bold text-gray-800"
            >
              Featured <span className="text-gradient">Restaurants</span>
            </Typography>
            <Button
              component={Link}
              to="/restaurants"
              variant="outlined"
              className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg px-6"
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={4}>
            {loading
              ? Array.from(new Array(6)).map((_, index) => (
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
                ))
              : featuredRestaurants.map((restaurant) => (
                  <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                    <Card className="hover-scale shadow-custom border-0 rounded-2xl overflow-hidden">
                      <CardMedia
                        component="img"
                        height="200"
                        image={restaurant.images?.[0] || '/api/placeholder/300/200'}
                        alt={restaurant.name}
                        className="object-cover"
                      />
                      <CardContent className="p-6">
                        <Typography variant="h6" className="font-display font-semibold mb-2 text-gray-800">
                          {restaurant.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mb-3">
                          {restaurant.description}
                        </Typography>
                        
                        <Box className="flex items-center gap-2 mb-3">
                          <Rating value={4.5} precision={0.5} size="small" readOnly />
                          <Typography variant="body2" className="text-gray-600">
                            4.5 (120+ reviews)
                          </Typography>
                        </Box>
                        
                        <Box className="flex items-center justify-between mb-4">
                          <Box className="flex items-center gap-1 text-gray-600">
                            <Schedule fontSize="small" />
                            <Typography variant="body2">
                              {restaurant.openingHours || '30-45 min'}
                            </Typography>
                          </Box>
                          <Chip
                            label="Free Delivery"
                            size="small"
                            className="bg-green-100 text-green-800"
                          />
                        </Box>
                        
                        <Button
                          component={Link}
                          to={`/restaurant/${restaurant.id}`}
                          variant="contained"
                          fullWidth
                          className="bg-primary-500 hover:bg-primary-600 rounded-lg py-2 font-semibold"
                        >
                          View Menu
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" className="py-16">
        <Box className="bg-gradient-to-r from-primary-500 to-orange-600 rounded-3xl p-12 text-center text-white">
          <Typography
            variant="h3"
            className="font-display font-bold mb-4"
          >
            Ready to Order?
          </Typography>
          <Typography variant="h6" className="mb-8 text-gray-100">
            Join thousands of satisfied customers and enjoy delicious meals delivered to your door.
          </Typography>
          <Button
            component={Link}
            to="/restaurants"
            variant="contained"
            size="large"
            className="bg-white text-primary-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all"
          >
            Start Ordering
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Skeleton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Schedule,
  LocationOn,
  Star,
  FilterList,
} from '@mui/icons-material';
import { getRestaurants, searchRestaurants } from '../../redux/restaurantSlice';

const Restaurants = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { restaurants, searchResults, loading } = useSelector((state) => state.restaurant);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const searchFromParams = searchParams.get('search');

  useEffect(() => {
    if (searchFromParams) {
      dispatch(searchRestaurants(searchFromParams));
      setSearchQuery(searchFromParams);
    } else {
      dispatch(getRestaurants());
    }
  }, [dispatch, searchFromParams]);

  const displayRestaurants = searchFromParams ? searchResults : restaurants;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      dispatch(searchRestaurants(searchQuery));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    dispatch(getRestaurants());
  };

  const filteredAndSortedRestaurants = displayRestaurants
    ?.filter((restaurant) => {
      if (filterBy === 'all') return true;
      if (filterBy === 'open') return restaurant.open;
      if (filterBy === 'fast') return restaurant.deliveryTime <= 30;
      return true;
    })
    ?.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
      if (sortBy === 'delivery') return (a.deliveryTime || 30) - (b.deliveryTime || 30);
      return 0;
    }) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="mb-8">
          <Typography
            variant="h3"
            className="font-display font-bold mb-4 text-gray-800"
          >
            Discover <span className="text-gradient">Restaurants</span>
          </Typography>
          <Typography variant="h6" className="text-gray-600 mb-6">
            Find your favorite restaurants and order delicious food
          </Typography>

          {/* Search and Filters */}
          <Paper className="p-6 rounded-2xl shadow-custom mb-6">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="bg-white rounded-lg"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    style: { borderRadius: '12px' }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    style={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="delivery">Delivery Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    label="Filter"
                    style={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="all">All Restaurants</MenuItem>
                    <MenuItem value="open">Open Now</MenuItem>
                    <MenuItem value="fast">Fast Delivery</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {searchFromParams && (
              <Box className="mt-4 flex items-center gap-2">
                <Typography variant="body2" className="text-gray-600">
                  Search results for: "{searchFromParams}"
                </Typography>
                <Button
                  size="small"
                  onClick={handleClearSearch}
                  className="text-primary-600"
                >
                  Clear
                </Button>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Results Count */}
        <Box className="mb-6">
          <Typography variant="h6" className="text-gray-700">
            {loading ? 'Loading...' : `${filteredAndSortedRestaurants.length} restaurants found`}
          </Typography>
        </Box>

        {/* Restaurant Grid */}
        <Grid container spacing={4}>
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
            : filteredAndSortedRestaurants.map((restaurant) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                  <Card className="hover-scale shadow-custom border-0 rounded-2xl overflow-hidden">
                    <Box className="relative">
                      <CardMedia
                        component="img"
                        height="200"
                        image={restaurant.images?.[0] || '/api/placeholder/300/200'}
                        alt={restaurant.name}
                        className="object-cover"
                      />
                      <Box className="absolute top-3 left-3">
                        <Chip
                          label={restaurant.open ? "Open" : "Closed"}
                          size="small"
                          className={restaurant.open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        />
                      </Box>
                      <Box className="absolute top-3 right-3">
                        <Chip
                          label="Free Delivery"
                          size="small"
                          className="bg-blue-100 text-blue-800"
                        />
                      </Box>
                    </Box>
                    
                    <CardContent className="p-4">
                      <Typography variant="h6" className="font-display font-semibold mb-2 text-gray-800 truncate">
                        {restaurant.name}
                      </Typography>
                      
                      <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
                        {restaurant.description || restaurant.cuisineType}
                      </Typography>
                      
                      <Box className="flex items-center gap-2 mb-3">
                        <Box className="flex items-center gap-1">
                          <Star className="text-yellow-500" fontSize="small" />
                          <Typography variant="body2" className="font-semibold text-gray-700">
                            {restaurant.rating || 4.5}
                          </Typography>
                        </Box>
                        <Typography variant="body2" className="text-gray-500">
                          (120+ reviews)
                        </Typography>
                      </Box>
                      
                      <Box className="flex items-center justify-between mb-4">
                        <Box className="flex items-center gap-1 text-gray-600">
                          <Schedule fontSize="small" />
                          <Typography variant="body2">
                            {restaurant.deliveryTime || 30}-{(restaurant.deliveryTime || 30) + 15} min
                          </Typography>
                        </Box>
                        <Box className="flex items-center gap-1 text-gray-600">
                          <LocationOn fontSize="small" />
                          <Typography variant="body2">
                            {restaurant.address?.city || '2.5 km'}
                          </Typography>
                        </Box>
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

        {/* Empty State */}
        {!loading && filteredAndSortedRestaurants.length === 0 && (
          <Box className="text-center py-16">
            <Typography variant="h5" className="text-gray-600 mb-4">
              No restaurants found
            </Typography>
            <Typography variant="body1" className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </Typography>
            <Button
              onClick={handleClearSearch}
              variant="contained"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6"
            >
              View All Restaurants
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Restaurants;

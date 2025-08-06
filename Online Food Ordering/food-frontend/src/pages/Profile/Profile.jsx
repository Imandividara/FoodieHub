import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';
import { setUser } from '../../redux/authSlice';
import { getUserOrders } from '../../redux/orderSlice';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
    
    dispatch(getUserOrders());
  }, [dispatch, isAuthenticated, navigate, user]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // In a real app, you would call an API to update user profile
      dispatch(setUser({ ...user, ...profileData }));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setProfileData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  const recentOrders = orders?.slice(0, 3) || [];
  const totalOrders = orders?.length || 0;
  const totalSpent = orders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="mb-8">
          <Typography
            variant="h3"
            className="font-display font-bold mb-4 text-gray-800"
          >
            My <span className="text-gradient">Profile</span>
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Manage your account and view order history
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} md={8}>
            <Paper className="rounded-2xl shadow-custom p-6 mb-6">
              <Box className="flex items-center justify-between mb-6">
                <Typography variant="h5" className="font-display font-semibold text-gray-800">
                  Profile Information
                </Typography>
                {!isEditing ? (
                  <IconButton
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-50 text-primary-600 hover:bg-primary-100"
                  >
                    <Edit />
                  </IconButton>
                ) : (
                  <Box className="flex gap-2">
                    <IconButton
                      onClick={handleSave}
                      className="bg-green-50 text-green-600 hover:bg-green-100"
                    >
                      <Save />
                    </IconButton>
                    <IconButton
                      onClick={handleCancel}
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <Person className="text-gray-400 mr-2" />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <Email className="text-gray-400 mr-2" />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <Phone className="text-gray-400 mr-2" />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <LocationOn className="text-gray-400 mr-2" />
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Recent Orders */}
            <Paper className="rounded-2xl shadow-custom p-6">
              <Box className="flex items-center justify-between mb-6">
                <Typography variant="h5" className="font-display font-semibold text-gray-800">
                  Recent Orders
                </Typography>
                <Button
                  onClick={() => navigate('/orders')}
                  variant="outlined"
                  className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  View All
                </Button>
              </Box>

              {recentOrders.length === 0 ? (
                <Box className="text-center py-8">
                  <Typography variant="body1" className="text-gray-600 mb-4">
                    No orders yet
                  </Typography>
                  <Button
                    onClick={() => navigate('/restaurants')}
                    variant="contained"
                    className="bg-primary-500 hover:bg-primary-600 rounded-lg"
                  >
                    Start Ordering
                  </Button>
                </Box>
              ) : (
                <Box className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="border border-gray-200 rounded-xl">
                      <CardContent className="p-4">
                        <Box className="flex items-center justify-between">
                          <Box>
                            <Typography variant="h6" className="font-semibold text-gray-800 mb-1">
                              Order #{order.id}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 mb-2">
                              {order.restaurant?.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box className="text-right">
                            <Typography variant="h6" className="font-bold text-primary-600 mb-1">
                              ₹{order.totalAmount?.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600">
                              {order.items?.length} items
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Profile Stats */}
          <Grid item xs={12} md={4}>
            <Paper className="rounded-2xl shadow-custom p-6 mb-6">
              <Box className="text-center mb-6">
                <Avatar
                  sx={{ width: 80, height: 80 }}
                  className="mx-auto mb-4 bg-primary-500"
                >
                  {user?.fullName?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="h5" className="font-display font-semibold text-gray-800 mb-2">
                  {user?.fullName || 'User'}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {user?.email}
                </Typography>
              </Box>

              <Divider className="my-4" />

              <Box className="space-y-4">
                <Box className="text-center">
                  <Typography variant="h4" className="font-bold text-primary-600 mb-1">
                    {totalOrders}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Total Orders
                  </Typography>
                </Box>
                
                <Box className="text-center">
                  <Typography variant="h4" className="font-bold text-primary-600 mb-1">
                    ₹{totalSpent.toFixed(0)}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Total Spent
                  </Typography>
                </Box>
                
                <Box className="text-center">
                  <Typography variant="h4" className="font-bold text-primary-600 mb-1">
                    {user?.role === 'ROLE_CUSTOMER' ? 'Customer' : 'Restaurant Owner'}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Account Type
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Quick Actions */}
            <Paper className="rounded-2xl shadow-custom p-6">
              <Typography variant="h6" className="font-display font-semibold mb-4 text-gray-800">
                Quick Actions
              </Typography>
              <Box className="space-y-3">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/orders')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg justify-start"
                >
                  View All Orders
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/restaurants')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg justify-start"
                >
                  Browse Restaurants
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg justify-start"
                >
                  Help & Support
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;

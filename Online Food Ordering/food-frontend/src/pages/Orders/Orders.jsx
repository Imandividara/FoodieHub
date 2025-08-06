import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Grid,
  Button,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  Receipt,
  Schedule,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material';
import { getUserOrders } from '../../redux/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(getUserOrders());
  }, [dispatch, isAuthenticated, navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="text-green-500" />;
      case 'PENDING':
        return <Pending className="text-yellow-500" />;
      case 'OUT_FOR_DELIVERY':
        return <LocalShipping className="text-blue-500" />;
      case 'CANCELLED':
        return <Cancel className="text-red-500" />;
      default:
        return <Schedule className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'OUT_FOR_DELIVERY':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="mb-8">
          <Typography
            variant="h3"
            className="font-display font-bold mb-4 text-gray-800"
          >
            Your <span className="text-gradient">Orders</span>
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Track and manage your food orders
          </Typography>
        </Box>

        {loading ? (
          <Box className="space-y-6">
            {Array.from(new Array(3)).map((_, index) => (
              <Card key={index} className="rounded-2xl shadow-custom">
                <CardContent className="p-6">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Skeleton variant="text" height={30} width="60%" />
                      <Skeleton variant="text" height={20} width="40%" className="mt-2" />
                      <Skeleton variant="text" height={20} width="80%" className="mt-4" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Skeleton variant="rectangular" height={100} className="rounded-lg" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : orders?.length === 0 ? (
          <Paper className="p-12 rounded-2xl shadow-custom text-center">
            <Receipt sx={{ fontSize: 64 }} className="text-gray-400 mb-4" />
            <Typography variant="h5" className="font-display font-semibold mb-4 text-gray-800">
              No Orders Yet
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start exploring restaurants!
            </Typography>
            <Button
              onClick={() => navigate('/restaurants')}
              variant="contained"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6"
            >
              Browse Restaurants
            </Button>
          </Paper>
        ) : (
          <Box className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="rounded-2xl shadow-custom hover-scale">
                <CardContent className="p-6">
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                      <Box className="flex items-center justify-between mb-4">
                        <Typography variant="h6" className="font-display font-semibold text-gray-800">
                          Order #{order.id}
                        </Typography>
                        <Box className="flex items-center gap-2">
                          {getStatusIcon(order.orderStatus)}
                          <Chip
                            label={order.orderStatus?.replace('_', ' ') || 'PENDING'}
                            className={getStatusColor(order.orderStatus)}
                          />
                        </Box>
                      </Box>

                      <Typography variant="body2" className="text-gray-600 mb-2">
                        Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>

                      <Typography variant="body2" className="text-gray-600 mb-4">
                        {order.restaurant?.name}
                      </Typography>

                      <Box className="space-y-2 mb-4">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <Box key={index} className="flex items-center gap-3">
                            <Avatar
                              src={item.food?.images?.[0] || '/api/placeholder/40/40'}
                              alt={item.food?.name}
                              sx={{ width: 32, height: 32 }}
                              className="rounded-lg"
                            />
                            <Typography variant="body2" className="text-gray-700">
                              {item.food?.name} x {item.quantity}
                            </Typography>
                          </Box>
                        ))}
                        {order.items?.length > 3 && (
                          <Typography variant="body2" className="text-gray-500 ml-11">
                            +{order.items.length - 3} more items
                          </Typography>
                        )}
                      </Box>

                      <Box className="flex items-center gap-4">
                        <Typography variant="h6" className="font-bold text-primary-600">
                          ₹{order.totalAmount?.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {order.items?.length} items
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box className="flex flex-col gap-3 h-full justify-between">
                        <Box className="bg-gray-50 rounded-lg p-4">
                          <Typography variant="body2" className="font-semibold text-gray-800 mb-2">
                            Delivery Address
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {order.deliveryAddress?.streetAddress}<br />
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.postalCode}
                          </Typography>
                        </Box>

                        <Box className="flex gap-2">
                          <Button
                            variant="outlined"
                            size="small"
                            className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg flex-1"
                          >
                            View Details
                          </Button>
                          {order.orderStatus === 'COMPLETED' && (
                            <Button
                              variant="contained"
                              size="small"
                              className="bg-primary-500 hover:bg-primary-600 rounded-lg flex-1"
                            >
                              Reorder
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Orders;

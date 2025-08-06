import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartOutlined,
  ArrowBack,
} from '@mui/icons-material';
import { getCart, updateCartItem, removeCartItem, clearCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    try {
      await dispatch(updateCartItem({ itemId, quantity: newQuantity }));
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeCartItem(itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart());
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Container maxWidth="sm">
          <Paper className="p-8 rounded-2xl shadow-custom text-center">
            <ShoppingCartOutlined sx={{ fontSize: 64 }} className="text-gray-400 mb-4" />
            <Typography variant="h5" className="font-display font-semibold mb-4 text-gray-800">
              Please Sign In
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              You need to sign in to view your cart
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6"
            >
              Sign In
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Container maxWidth="sm">
          <Paper className="p-8 rounded-2xl shadow-custom text-center">
            <ShoppingCartOutlined sx={{ fontSize: 64 }} className="text-gray-400 mb-4" />
            <Typography variant="h5" className="font-display font-semibold mb-4 text-gray-800">
              Your Cart is Empty
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              Start adding some delicious items to your cart
            </Typography>
            <Button
              component={Link}
              to="/restaurants"
              variant="contained"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6"
            >
              Browse Restaurants
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="mb-8">
          <Box className="flex items-center gap-4 mb-4">
            <IconButton
              onClick={() => navigate(-1)}
              className="bg-white shadow-md rounded-lg"
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h3"
              className="font-display font-bold text-gray-800"
            >
              Your <span className="text-gradient">Cart</span>
            </Typography>
          </Box>
          <Typography variant="h6" className="text-gray-600">
            {totalItems} items in your cart
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Paper className="rounded-2xl shadow-custom">
              <Box className="p-6">
                <Box className="flex items-center justify-between mb-6">
                  <Typography variant="h5" className="font-display font-semibold text-gray-800">
                    Cart Items
                  </Typography>
                  {items.length > 0 && (
                    <Button
                      onClick={handleClearCart}
                      color="error"
                      variant="outlined"
                      className="rounded-lg"
                    >
                      Clear Cart
                    </Button>
                  )}
                </Box>

                <Box className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="border border-gray-200 rounded-xl">
                      <CardContent className="p-4">
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} sm={2}>
                            <Avatar
                              src={item.food?.images?.[0] || '/api/placeholder/80/80'}
                              alt={item.food?.name}
                              sx={{ width: 60, height: 60 }}
                              className="rounded-lg"
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Typography variant="h6" className="font-semibold text-gray-800 mb-1">
                              {item.food?.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600">
                              {item.food?.description}
                            </Typography>
                            <Typography variant="h6" className="font-bold text-primary-600 mt-2">
                              ₹{item.food?.price}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={3}>
                            <Box className="flex items-center gap-2">
                              <IconButton
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                className="bg-gray-100 hover:bg-gray-200 rounded-lg"
                                size="small"
                              >
                                <Remove />
                              </IconButton>
                              <Typography variant="h6" className="mx-3 font-semibold min-w-[2rem] text-center">
                                {item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                className="bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-lg"
                                size="small"
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={2}>
                            <Box className="flex items-center justify-between">
                              <Typography variant="h6" className="font-bold text-gray-800">
                                ₹{(item.food?.price * item.quantity).toFixed(2)}
                              </Typography>
                              <IconButton
                                onClick={() => handleRemoveItem(item.id)}
                                color="error"
                                className="hover:bg-red-50"
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Paper className="rounded-2xl shadow-custom sticky top-8">
              <Box className="p-6">
                <Typography variant="h5" className="font-display font-semibold mb-6 text-gray-800">
                  Order Summary
                </Typography>

                <Box className="space-y-4 mb-6">
                  <Box className="flex justify-between">
                    <Typography variant="body1" className="text-gray-600">
                      Subtotal ({totalItems} items)
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                      ₹{totalAmount?.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box className="flex justify-between">
                    <Typography variant="body1" className="text-gray-600">
                      Delivery Fee
                    </Typography>
                    <Typography variant="body1" className="font-semibold text-green-600">
                      Free
                    </Typography>
                  </Box>
                  
                  <Box className="flex justify-between">
                    <Typography variant="body1" className="text-gray-600">
                      Platform Fee
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                      ₹5.00
                    </Typography>
                  </Box>
                  
                  <Box className="flex justify-between">
                    <Typography variant="body1" className="text-gray-600">
                      GST (5%)
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                      ₹{(totalAmount * 0.05)?.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Divider className="my-4" />

                <Box className="flex justify-between mb-6">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" className="font-bold text-primary-600">
                    ₹{(totalAmount + 5 + (totalAmount * 0.05))?.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  onClick={handleCheckout}
                  variant="contained"
                  fullWidth
                  size="large"
                  className="bg-primary-500 hover:bg-primary-600 rounded-xl py-3 font-semibold text-lg shadow-lg"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <Box className="mt-4 p-4 bg-green-50 rounded-lg">
                  <Typography variant="body2" className="text-green-800 font-semibold">
                    🎉 Free delivery on this order!
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;

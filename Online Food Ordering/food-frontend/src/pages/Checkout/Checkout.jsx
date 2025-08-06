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
  Button,
  TextField,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  CreditCard,
  AccountBalanceWallet,
  MonetizationOn,
} from '@mui/icons-material';
import { getCart } from '../../redux/cartSlice';
import { createOrder } from '../../redux/orderSlice';
import toast from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.order);

  const [deliveryAddress, setDeliveryAddress] = useState({
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(getCart());
  }, [dispatch, isAuthenticated, navigate]);

  const handleAddressChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.streetAddress || !deliveryAddress.city) {
      toast.error('Please fill in delivery address');
      return;
    }

    const orderData = {
      deliveryAddress,
      paymentMethod
    };

    try {
      const result = await dispatch(createOrder(orderData));
      if (result.type === 'order/createOrder/fulfilled') {
        toast.success('Order placed successfully!');
        navigate('/orders');
      }
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  const finalAmount = totalAmount + 5 + (totalAmount * 0.05);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container maxWidth="sm">
          <Paper className="p-8 rounded-2xl shadow-custom text-center">
            <Typography variant="h5" className="font-display font-semibold mb-4 text-gray-800">
              Your cart is empty
            </Typography>
            <Button
              onClick={() => navigate('/restaurants')}
              variant="contained"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg"
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
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
              className="bg-white shadow-md rounded-lg px-4"
            >
              Back
            </Button>
            <Typography
              variant="h3"
              className="font-display font-bold text-gray-800"
            >
              <span className="text-gradient">Checkout</span>
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Order Details & Address */}
          <Grid item xs={12} lg={8}>
            {/* Delivery Address */}
            <Paper className="rounded-2xl shadow-custom p-6 mb-6">
              <Typography variant="h5" className="font-display font-semibold mb-6 text-gray-800">
                Delivery Address
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="streetAddress"
                    value={deliveryAddress.streetAddress}
                    onChange={handleAddressChange}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    variant="outlined"
                    className="bg-white rounded-lg"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    name="stateProvince"
                    value={deliveryAddress.stateProvince}
                    onChange={handleAddressChange}
                    variant="outlined"
                    className="bg-white rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={deliveryAddress.postalCode}
                    onChange={handleAddressChange}
                    variant="outlined"
                    className="bg-white rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={deliveryAddress.country}
                    onChange={handleAddressChange}
                    variant="outlined"
                    className="bg-white rounded-lg"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Method */}
            <Paper className="rounded-2xl shadow-custom p-6">
              <Typography variant="h5" className="font-display font-semibold mb-6 text-gray-800">
                Payment Method
              </Typography>
              
              <FormControl component="fieldset">
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-3"
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box className="flex items-center gap-3">
                        <CreditCard className="text-primary-500" />
                        <Box>
                          <Typography variant="body1" className="font-semibold">
                            Credit/Debit Card
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Pay securely with your card
                          </Typography>
                        </Box>
                      </Box>
                    }
                    className="border rounded-lg p-3 m-0"
                  />
                  <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label={
                      <Box className="flex items-center gap-3">
                        <AccountBalanceWallet className="text-primary-500" />
                        <Box>
                          <Typography variant="body1" className="font-semibold">
                            Digital Wallet
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Pay with Paytm, PhonePe, GPay
                          </Typography>
                        </Box>
                      </Box>
                    }
                    className="border rounded-lg p-3 m-0"
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box className="flex items-center gap-3">
                        <MonetizationOn className="text-primary-500" />
                        <Box>
                          <Typography variant="body1" className="font-semibold">
                            Cash on Delivery
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Pay when you receive your order
                          </Typography>
                        </Box>
                      </Box>
                    }
                    className="border rounded-lg p-3 m-0"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Paper className="rounded-2xl shadow-custom sticky top-8">
              <Box className="p-6">
                <Typography variant="h5" className="font-display font-semibold mb-6 text-gray-800">
                  Order Summary
                </Typography>

                {/* Order Items */}
                <Box className="space-y-4 mb-6">
                  {items.map((item) => (
                    <Box key={item.id} className="flex items-center gap-3">
                      <Avatar
                        src={item.food?.images?.[0] || '/api/placeholder/50/50'}
                        alt={item.food?.name}
                        sx={{ width: 40, height: 40 }}
                        className="rounded-lg"
                      />
                      <Box className="flex-1">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          {item.food?.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" className="font-semibold">
                        ₹{(item.food?.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider className="my-4" />

                {/* Price Breakdown */}
                <Box className="space-y-3 mb-6">
                  <Box className="flex justify-between">
                    <Typography variant="body1" className="text-gray-600">
                      Subtotal
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
                    ₹{finalAmount?.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  onClick={handlePlaceOrder}
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  className="bg-primary-500 hover:bg-primary-600 rounded-xl py-3 font-semibold text-lg shadow-lg"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>

                <Box className="mt-4 p-4 bg-green-50 rounded-lg">
                  <Typography variant="body2" className="text-green-800 text-center">
                    🛡️ Your payment is secure and encrypted
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

export default Checkout;

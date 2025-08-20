import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
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
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white text-center">
          <div className="font-display font-semibold mb-4 text-gray-800 text-2xl">Your cart is empty</div>
          <button
            onClick={() => navigate('/restaurants')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-2"
              title="Back"
            >
              <span className="text-xl">←</span> Back
            </button>
            <h2 className="font-display font-bold text-gray-800 text-3xl md:text-4xl">
              <span className="text-yellow-400">Checkout</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details & Address */}
          <div className="lg:col-span-2">
            {/* Delivery Address */}
            <div className="rounded-2xl shadow-lg bg-white p-6 mb-6">
              <div className="font-display font-semibold mb-6 text-gray-800 text-xl">Delivery Address</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Street Address<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={deliveryAddress.streetAddress}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">State/Province</label>
                  <input
                    type="text"
                    name="stateProvince"
                    value={deliveryAddress.stateProvince}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={deliveryAddress.postalCode}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={deliveryAddress.country}
                    onChange={handleAddressChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl shadow-lg bg-white p-6">
              <div className="font-display font-semibold mb-6 text-gray-800 text-xl">Payment Method</div>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-yellow-400' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-yellow-400"
                  />
                  <span className="text-yellow-500 text-xl">💳</span>
                  <div>
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-gray-600 text-sm">Pay securely with your card</div>
                  </div>
                </label>
                <label className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${paymentMethod === 'wallet' ? 'ring-2 ring-yellow-400' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-yellow-400"
                  />
                  <span className="text-yellow-500 text-xl">👛</span>
                  <div>
                    <div className="font-semibold">Digital Wallet</div>
                    <div className="text-gray-600 text-sm">Pay with Paytm, PhonePe, GPay</div>
                  </div>
                </label>
                <label className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${paymentMethod === 'cod' ? 'ring-2 ring-yellow-400' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-yellow-400"
                  />
                  <span className="text-yellow-500 text-xl">💵</span>
                  <div>
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-gray-600 text-sm">Pay when you receive your order</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-2xl shadow-lg bg-white sticky top-8">
              <div className="p-6">
                <div className="font-display font-semibold mb-6 text-gray-800 text-xl">Order Summary</div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.food?.images?.[0] || '/api/placeholder/50/50'}
                        alt={item.food?.name}
                        className="rounded-lg w-10 h-10 object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{item.food?.name}</div>
                        <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">₹{(item.food?.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <div className="text-gray-600">Subtotal</div>
                    <div className="font-semibold">₹{totalAmount?.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Delivery Fee</div>
                    <div className="font-semibold text-green-600">Free</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">Platform Fee</div>
                    <div className="font-semibold">₹5.00</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-600">GST (5%)</div>
                    <div className="font-semibold">₹{(totalAmount * 0.05)?.toFixed(2)}</div>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <div className="font-bold text-gray-800">Total Amount</div>
                  <div className="font-bold text-yellow-500">₹{finalAmount?.toFixed(2)}</div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl py-3 font-semibold text-lg shadow-lg disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="text-green-800 text-center">🛡️ Your payment is secure and encrypted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

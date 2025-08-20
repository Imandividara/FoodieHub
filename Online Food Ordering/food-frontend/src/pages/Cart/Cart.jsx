import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
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
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white text-center">
          <div className="flex justify-center mb-4">
            <span className="text-gray-400 text-6xl">🛒</span>
          </div>
          <div className="font-display font-semibold mb-4 text-gray-800 text-2xl">Please Sign In</div>
          <div className="text-gray-600 mb-6">You need to sign in to view your cart</div>
          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold">Sign In</button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white text-center">
          <div className="flex justify-center mb-4">
            <span className="text-gray-400 text-6xl">🛒</span>
          </div>
          <div className="font-display font-semibold mb-4 text-gray-800 text-2xl">Your Cart is Empty</div>
          <div className="text-gray-600 mb-6">Start adding some delicious items to your cart</div>
          <Link to="/restaurants">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold">Browse Restaurants</button>
          </Link>
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
              className="bg-white shadow-md rounded-lg p-2"
              title="Back"
            >
              <span className="text-2xl">←</span>
            </button>
            <h2 className="font-display font-bold text-gray-800 text-3xl md:text-4xl">
              Your <span className="text-yellow-400">Cart</span>
            </h2>
          </div>
          <div className="text-gray-600 text-lg">{totalItems} items in your cart</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl shadow-lg bg-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-display font-semibold text-gray-800 text-xl">Cart Items</div>
                  {items.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="rounded-lg border border-red-300 text-red-500 px-4 py-2 hover:bg-red-50 font-semibold"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-2 flex justify-center">
                          <img
                            src={item.food?.images?.[0] || '/api/placeholder/80/80'}
                            alt={item.food?.name}
                            className="rounded-lg w-16 h-16 object-cover"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <div className="font-semibold text-gray-800 mb-1">{item.food?.name}</div>
                          <div className="text-gray-600 text-sm">{item.food?.description}</div>
                          <div className="font-bold text-yellow-500 mt-2">₹{item.food?.price}</div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                              title="Decrease"
                            >
                              <span className="text-xl">−</span>
                            </button>
                            <span className="mx-3 font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg p-2"
                              title="Increase"
                            >
                              <span className="text-xl">＋</span>
                            </button>
                          </div>
                        </div>
                        <div className="sm:col-span-2 flex flex-col items-end gap-2">
                          <div className="font-bold text-gray-800">₹{(item.food?.price * item.quantity).toFixed(2)}</div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="hover:bg-red-50 rounded-full p-2"
                            title="Remove"
                          >
                            <span className="text-red-500 text-xl">🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-2xl shadow-lg bg-white sticky top-8">
              <div className="p-6">
                <div className="font-display font-semibold mb-6 text-gray-800 text-xl">Order Summary</div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <div className="text-gray-600">Subtotal ({totalItems} items)</div>
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

                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex justify-between mb-6">
                  <div className="font-bold text-gray-800">Total Amount</div>
                  <div className="font-bold text-yellow-500">₹{(totalAmount + 5 + (totalAmount * 0.05))?.toFixed(2)}</div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl py-3 font-semibold text-lg shadow-lg disabled:opacity-50"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="text-green-800 font-semibold">🎉 Free delivery on this order!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display font-bold mb-4 text-gray-800 text-3xl md:text-4xl">
            My <span className="text-yellow-400">Profile</span>
          </h2>
          <p className="text-gray-600 text-lg">Manage your account and view order history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="md:col-span-2">
            <div className="rounded-2xl shadow-lg bg-white p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-gray-800 text-xl">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-full p-2"
                    title="Edit"
                  >
                    ✏️
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-100 text-green-700 hover:bg-green-200 rounded-full p-2"
                      title="Save"
                    >
                      💾
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-100 text-red-700 hover:bg-red-200 rounded-full p-2"
                      title="Cancel"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full rounded-lg border border-gray-300 py-2 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl shadow-lg bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-gray-800 text-xl">Recent Orders</h3>
                <button
                  onClick={() => navigate('/orders')}
                  className="border border-yellow-400 text-yellow-500 hover:bg-yellow-50 rounded-lg px-4 py-2 font-semibold"
                >
                  View All
                </button>
              </div>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <button
                    onClick={() => navigate('/restaurants')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">Order #{order.id}</div>
                          <div className="text-gray-600 mb-2 text-sm">{order.restaurant?.name}</div>
                          <div className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-500 mb-1">₹{order.totalAmount?.toFixed(2)}</div>
                          <div className="text-gray-600 text-sm">{order.items?.length} items</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Profile Stats & Quick Actions */}
          <div>
            <div className="rounded-2xl shadow-lg bg-white p-6 mb-6">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 bg-yellow-400 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="font-display font-semibold text-gray-800 mb-2 text-xl">{user?.fullName || 'User'}</div>
                <div className="text-gray-600 text-sm">{user?.email}</div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="font-bold text-yellow-500 text-2xl mb-1">{totalOrders}</div>
                  <div className="text-gray-600 text-sm">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-500 text-2xl mb-1">₹{totalSpent.toFixed(0)}</div>
                  <div className="text-gray-600 text-sm">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-500 text-2xl mb-1">{user?.role === 'ROLE_CUSTOMER' ? 'Customer' : 'Restaurant Owner'}</div>
                  <div className="text-gray-600 text-sm">Account Type</div>
                </div>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="rounded-2xl shadow-lg bg-white p-6">
              <div className="font-display font-semibold mb-4 text-gray-800 text-lg">Quick Actions</div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 font-semibold text-left"
                >
                  View All Orders
                </button>
                <button
                  onClick={() => navigate('/restaurants')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 font-semibold text-left"
                >
                  Browse Restaurants
                </button>
                <button
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 font-semibold text-left"
                >
                  Help & Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
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
        return <span className="text-green-500 text-xl">✔️</span>;
      case 'PENDING':
        return <span className="text-yellow-500 text-xl">⏳</span>;
      case 'OUT_FOR_DELIVERY':
        return <span className="text-blue-500 text-xl">🚚</span>;
      case 'CANCELLED':
        return <span className="text-red-500 text-xl">❌</span>;
      default:
        return <span className="text-gray-500 text-xl">🕒</span>;
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display font-bold mb-4 text-gray-800 text-3xl md:text-4xl">
            Your <span className="text-yellow-400">Orders</span>
          </h2>
          <div className="text-gray-600 text-lg">Track and manage your food orders</div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from(new Array(3)).map((_, index) => (
              <div key={index} className="rounded-2xl shadow-lg bg-white p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : orders?.length === 0 ? (
          <div className="p-12 rounded-2xl shadow-lg bg-white text-center">
            <div className="flex justify-center mb-4">
              <span className="text-gray-400 text-6xl">🧾</span>
            </div>
            <div className="font-display font-semibold mb-4 text-gray-800 text-2xl">No Orders Yet</div>
            <div className="text-gray-600 mb-6">You haven't placed any orders yet. Start exploring restaurants!</div>
            <button
              onClick={() => navigate('/restaurants')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl shadow-lg bg-white hover:scale-[1.01] transition-transform p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-display font-semibold text-gray-800 text-lg">Order #{order.id}</div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus?.replace('_', ' ') || 'PENDING'}
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-600 text-sm mb-2">
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>

                    <div className="text-gray-600 text-sm mb-4">{order.restaurant?.name}</div>

                    <div className="space-y-2 mb-4">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={item.food?.images?.[0] || '/api/placeholder/40/40'}
                            alt={item.food?.name}
                            className="rounded-lg w-8 h-8 object-cover"
                          />
                          <span className="text-gray-700 text-sm">{item.food?.name} x {item.quantity}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <span className="text-gray-500 ml-11 text-xs">+{order.items.length - 3} more items</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="font-bold text-yellow-500 text-lg">₹{order.totalAmount?.toFixed(2)}</div>
                      <div className="text-gray-600 text-sm">{order.items?.length} items</div>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-3 h-full justify-between">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-800 mb-2 text-sm">Delivery Address</div>
                      <div className="text-gray-600 text-sm">
                        {order.deliveryAddress?.streetAddress}<br />
                        {order.deliveryAddress?.city}, {order.deliveryAddress?.postalCode}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        className="border border-yellow-400 text-yellow-500 hover:bg-yellow-50 rounded-lg flex-1 px-4 py-2 font-semibold text-sm"
                      >
                        View Details
                      </button>
                      {order.orderStatus === 'COMPLETED' && (
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg flex-1 px-4 py-2 font-semibold text-sm"
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

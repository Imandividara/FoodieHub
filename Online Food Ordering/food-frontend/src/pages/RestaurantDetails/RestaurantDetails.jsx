import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
import { getRestaurantById } from '../../redux/restaurantSlice';
import { getFoodsByRestaurant } from '../../redux/foodSlice';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentRestaurant, loading: restaurantLoading } = useSelector((state) => state.restaurant);
  const { foods, categories, loading: foodLoading } = useSelector((state) => state.food);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getRestaurantById(id));
      dispatch(getFoodsByRestaurant(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = async (food) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addToCart({
        foodId: food.id,
        quantity: 1,
        ingredients: []
      }));
      toast.success(`${food.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const filteredFoods = selectedCategory === 0 
    ? foods 
    : foods?.filter(food => food.foodCategory?.name === categories[selectedCategory - 1]);

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-80 bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded mb-4 w-3/5 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-2/5 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-2xl">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-80 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 relative h-full">
          <div className="flex items-center h-full text-white">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/20 backdrop-blur-sm mr-4 rounded-full p-2"
              title="Back"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <div className="font-display font-bold mb-2 text-3xl md:text-4xl">{currentRestaurant.name}</div>
              <div className="mb-3 text-gray-100 text-lg">{currentRestaurant.description}</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-300 text-lg">★</span>
                  <span className="font-semibold">{currentRestaurant.rating || 4.5}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">⏰</span>
                  <span>{currentRestaurant.openingHours || '30-45 min'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">📍</span>
                  <span>{currentRestaurant.address?.city || 'City Center'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentRestaurant.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{currentRestaurant.open ? 'Open Now' : 'Closed'}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Free Delivery</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">{currentRestaurant.cuisineType || 'Multi Cuisine'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="rounded-2xl shadow-lg bg-white mb-6 overflow-x-auto">
          <div className="flex space-x-2 px-4 py-2">
            <button
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${selectedCategory === 0 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setSelectedCategory(0)}
            >
              All Items
            </button>
            {categories?.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${selectedCategory === index + 1 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedCategory(index + 1)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items */}
        <div>
          <div className="font-display font-bold mb-6 text-gray-800 text-2xl md:text-3xl">
            {selectedCategory === 0 ? 'All Items' : categories[selectedCategory - 1]}
          </div>

          {foodLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from(new Array(6)).map((_, index) => (
                <div key={index} className="rounded-2xl shadow-lg bg-white">
                  <div className="h-52 bg-gray-200 rounded-t-2xl animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredFoods?.map((food) => (
                <div key={food.id} className="hover:scale-[1.01] transition-transform shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                  <img
                    src={food.images?.[0] || '/api/placeholder/300/200'}
                    alt={food.name}
                    className="object-cover w-full h-52"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-display font-semibold text-gray-800 text-lg">{food.name}</div>
                      {food.vegetarian && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Veg</span>
                      )}
                    </div>
                    <div className="text-gray-600 mb-3 text-sm line-clamp-2">{food.description}</div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-400 text-base">★</span>
                      <span className="text-gray-600 text-sm">4.5 (89 reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-yellow-500 text-lg">₹{food.price}</div>
                      <button
                        onClick={() => handleAddToCart(food)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-4 py-2 font-semibold flex items-center gap-2"
                      >
                        <span className="text-xl">＋</span> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!foodLoading && filteredFoods?.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-600 mb-4 text-2xl">No items found in this category</div>
              <div className="text-gray-500">Try selecting a different category</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;

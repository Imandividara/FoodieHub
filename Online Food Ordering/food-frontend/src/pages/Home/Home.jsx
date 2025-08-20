import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Removed Material UI imports. Use only Tailwind CSS and React components.
import { getRestaurants } from '../../redux/restaurantSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const featuredRestaurants = restaurants?.slice(0, 6) || [];
  // Icon SVGs for features
  const icons = {
    delivery: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5A1.5 1.5 0 106 21a1.5 1.5 0 00-1.5-1.5zm13.5 0A1.5 1.5 0 1121 21a1.5 1.5 0 01-3 0zm-13.5 0V5.25A2.25 2.25 0 016.75 3h7.5A2.25 2.25 0 0116.5 5.25v14.25m-12 0h12m0 0h2.25A2.25 2.25 0 0021 17.25V12.75a2.25 2.25 0 00-2.25-2.25H16.5" /></svg>
    ),
    restaurant: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21v-7.5m0 0A2.25 2.25 0 016.75 11.25h10.5A2.25 2.25 0 0119.5 13.5v7.5m-15 0h15" /></svg>
    ),
    offer: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.25-8.25H21m-18 0H3m15.364-6.364l1.061 1.061M4.575 19.425l1.061-1.061m12.728 0l-1.061-1.061M4.575 4.575l1.061 1.061" /></svg>
    ),
    clock: (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
    ),
    star: (
      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" /></svg>
    ),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-yellow-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="font-display font-bold mb-6 text-white animate-fade-in text-4xl md:text-5xl">
                Delicious Food
                <br />
                <span className="text-yellow-300">Delivered Fast</span>
              </h1>
              <p className="mb-8 text-gray-100 leading-relaxed animate-slide-up text-lg">
                Discover amazing restaurants near you and get your favorite meals delivered in under 30 minutes. Fresh, hot, and ready to enjoy!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up mt-5">
                <Link to="/restaurants" className="rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all bg-yellow-400 text-gray-900 text-center">
                  Order Now
                </Link>
                <button className="border border-white text-white hover:bg-white hover:text-yellow-500 rounded-full px-8 py-3 font-semibold transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center animate-bounce-slow">
              <img
                src="/assets/food.jpg"
                alt="Food delivery"
                className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-display font-bold text-center mb-12 text-gray-800 text-3xl md:text-4xl">
          Why Choose <span className="text-yellow-400">FoodieHub</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: icons.delivery,
              title: 'Fast Delivery',
              description: 'Get your food delivered in under 30 minutes with our express delivery service.',
            },
            {
              icon: icons.restaurant,
              title: 'Best Restaurants',
              description: 'Partnered with the finest restaurants in your city to bring you quality meals.',
            },
            {
              icon: icons.offer,
              title: 'Great Deals',
              description: 'Enjoy amazing discounts and offers on your favorite restaurants.',
            },
          ].map((feature, index) => (
            <div key={index} className="h-full hover:scale-105 transition-transform shadow-lg border-0 rounded-2xl p-8 bg-white text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-primary-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-display font-semibold mb-3 text-gray-800 text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="font-display font-bold text-gray-800 text-3xl md:text-4xl">
              Featured <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Restaurants</span>
            </h2>
            <Link
              to="/restaurants"
              className="border border-yellow-400 text-yellow-500 hover:bg-yellow-50 rounded-lg px-6 py-2 font-semibold transition-all text-center"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading
              ? Array.from(new Array(6)).map((_, index) => (
                  <div key={index} className="rounded-2xl shadow-lg bg-white animate-pulse">
                    <div className="h-48 w-full bg-gray-200 rounded-t-2xl" />
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))
              : featuredRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="hover:scale-105 transition-transform shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                    <img
                      src={restaurant.images?.[0] || '/api/placeholder/300/200'}
                      alt={restaurant.name}
                      className="object-cover w-full h-48"
                    />
                    <div className="p-6">
                      <h3 className="font-display font-semibold mb-2 text-gray-800 text-lg">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {restaurant.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        {icons.star}
                        <span className="text-gray-600 text-sm">4.5 (120+ reviews)</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          {icons.clock}
                          <span>{restaurant.openingHours || '30-45 min'}</span>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Free Delivery</span>
                      </div>
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 rounded-lg py-2 font-semibold w-full block text-center text-gray-900 transition-all"
                      >
                        View Menu
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 text-center text-white">
          <h2 className="font-display font-bold mb-4 text-3xl md:text-4xl">
            Ready to Order?
          </h2>
          <p className="mb-8 text-gray-100 text-lg">
            Join thousands of satisfied customers and enjoy delicious meals delivered to your door.
          </p>
          <Link
            to="/restaurants"
            className="bg-white text-yellow-500 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all inline-block"
          >
            Start Ordering
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

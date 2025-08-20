import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
import { getRestaurants, searchRestaurants } from '../../redux/restaurantSlice';

const Restaurants = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { restaurants, searchResults, loading } = useSelector((state) => state.restaurant);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const searchFromParams = searchParams.get('search');

  useEffect(() => {
    if (searchFromParams) {
      dispatch(searchRestaurants(searchFromParams));
      setSearchQuery(searchFromParams);
    } else {
      dispatch(getRestaurants());
    }
  }, [dispatch, searchFromParams]);

  // Fix: Add filteredAndSortedRestaurants and search/clear handlers
  const displayRestaurants = searchFromParams ? searchResults : restaurants;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      dispatch(searchRestaurants(searchQuery));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    dispatch(getRestaurants());
  };

  const filteredAndSortedRestaurants = displayRestaurants
    ?.filter((restaurant) => {
      if (filterBy === 'all') return true;
      if (filterBy === 'open') return restaurant.open;
      if (filterBy === 'fast') return restaurant.deliveryTime <= 30;
      return true;
    })
    ?.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
      if (sortBy === 'delivery') return (a.deliveryTime || 30) - (b.deliveryTime || 30);
      return 0;
    }) || [];
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="font-display font-bold mb-4 text-gray-800 text-3xl md:text-4xl">
            Discover <span className="text-yellow-400">Restaurants</span>
          </div>
          <div className="text-gray-600 mb-6 text-lg">Find your favorite restaurants and order delicious food</div>

          {/* Search and Filters */}
          <div className="p-6 rounded-2xl shadow-lg bg-white mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 px-3">
                <span className="text-gray-400 text-xl mr-2">🔍</span>
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="w-full py-2 bg-transparent outline-none"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-2 bg-white text-gray-700 font-semibold"
                >
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="delivery">Delivery Time</option>
                </select>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-2 bg-white text-gray-700 font-semibold"
                >
                  <option value="all">All Restaurants</option>
                  <option value="open">Open Now</option>
                  <option value="fast">Fast Delivery</option>
                </select>
              </div>
            </div>

            {searchFromParams && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-600 text-sm">Search results for: "{searchFromParams}"</span>
                <button
                  onClick={handleClearSearch}
                  className="text-yellow-500 font-semibold text-sm underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <div className="text-gray-700 text-lg font-semibold">
            {loading ? 'Loading...' : `${filteredAndSortedRestaurants.length} restaurants found`}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <div key={index} className="rounded-2xl shadow-lg bg-white">
                  <div className="h-52 bg-gray-200 rounded-t-2xl animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              ))
            : filteredAndSortedRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="hover:scale-[1.01] transition-transform shadow-lg border-0 rounded-2xl overflow-hidden bg-white relative">
                  <div className="relative">
                    <img
                      src={restaurant.images?.[0] || '/api/placeholder/300/200'}
                      alt={restaurant.name}
                      className="object-cover w-full h-52"
                    />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${restaurant.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{restaurant.open ? 'Open' : 'Closed'}</span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Free Delivery</span>
                  </div>
                  <div className="p-4">
                    <div className="font-display font-semibold mb-2 text-gray-800 text-lg truncate">{restaurant.name}</div>
                    <div className="text-gray-600 mb-3 text-sm line-clamp-2">{restaurant.description || restaurant.cuisineType}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500 text-base">★</span>
                      <span className="font-semibold text-gray-700 text-sm">{restaurant.rating || 4.5}</span>
                      <span className="text-gray-500 text-xs">(120+ reviews)</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-gray-600 text-sm">
                        <span className="text-lg">⏰</span>
                        {restaurant.deliveryTime || 30}-{(restaurant.deliveryTime || 30) + 15} min
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 text-sm">
                        <span className="text-lg">📍</span>
                        {restaurant.address?.city || '2.5 km'}
                      </span>
                    </div>
                    <Link
                      to={`/restaurant/${restaurant.id}`}
                      className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg py-2 font-semibold text-center"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && filteredAndSortedRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-600 mb-4 text-2xl">No restaurants found</div>
            <div className="text-gray-500 mb-6">Try adjusting your search or filters</div>
            <button
              onClick={handleClearSearch}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg px-6 py-2 font-semibold"
            >
              View All Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
// Removed leftover Material UI JSX and duplicate code. Only Tailwind/React code remains above.
};

export default Restaurants;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
import { logout } from '../../redux/authSlice';
import { getCart } from '../../redux/cartSlice';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Mobile drawer content using Tailwind
  const mobileDrawerContent = (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      <div className="p-4 font-display text-xl font-bold border-b border-gray-800">FoodieHub</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
          <span>🏠</span> Home
        </Link>
        <Link to="/restaurants" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
          <span>🍽️</span> Restaurants
        </Link>
        {isAuthenticated && <>
          <Link to="/cart" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
            <span>🛒</span> Cart
            {totalItems > 0 && <span className="ml-auto bg-red-500 text-xs rounded-full px-2 py-0.5">{totalItems}</span>}
          </Link>
          <Link to="/orders" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
            <span>📦</span> Orders
          </Link>
          <Link to="/profile" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
            <span>👤</span> Profile
          </Link>
          <button onClick={() => { handleLogout(); setMobileDrawerOpen(false); }} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800 w-full text-left">
            <span>🚪</span> Logout
          </button>
        </>}
        {!isAuthenticated && <>
          <Link to="/login" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800">
            <span>👤</span> Login
          </Link>
        </>}
      </nav>
    </div>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-black to-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center px-4 py-3">
          {isMobile && (
            <button
              className="mr-3 text-white focus:outline-none"
              onClick={handleMobileDrawerToggle}
              aria-label="Open menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          )}
          <Link to="/" className="font-display text-gradient font-bold text-2xl no-underline flex-shrink-0 text-yellow-400 mr-6">FoodieHub</Link>
          {!isMobile && (
            <div className="flex items-center gap-6 mr-auto">
              <Link to="/" className="hover:bg-gray-800 rounded-lg px-4 py-2 transition-colors text-white">Home</Link>
              <Link to="/restaurants" className="hover:bg-gray-800 text-yellow-400 rounded-lg px-4 py-2 transition-colors">Restaurants</Link>
            </div>
          )}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-2-2" /></svg>
              </span>
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-gray-900"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Link to="/cart" className="relative hover:bg-gray-800 rounded-lg p-2 transition-colors">
                <span role="img" aria-label="cart" className="text-xl">🛒</span>
                {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5 py-0.5 text-white">{totalItems}</span>}
              </Link>
            )}
            {isAuthenticated ? (
              <div className="relative group ml-2">
                <button
                  onClick={handleProfileMenuOpen}
                  className="hover:bg-yellow-400 bg-yellow-500 rounded-full w-9 h-9 flex items-center justify-center text-gray-900 font-bold focus:outline-none"
                >
                  {user?.fullName?.charAt(0) || 'U'}
                </button>
                {anchorEl && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link to="/profile" onClick={handleProfileMenuClose} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" onClick={handleProfileMenuClose} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              !isMobile && (
                <div className="flex gap-2">
                  <Link to="/login" className="rounded-lg px-4 py-2 border border-yellow-400 text-yellow-500 hover:bg-yellow-50">Login</Link>
                  <Link to="/register" className="rounded-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900">Sign Up</Link>
                </div>
              )
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Drawer */}
      {isMobile && mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={handleMobileDrawerToggle}>
          <div className="fixed left-0 top-0 h-full z-50" onClick={e => e.stopPropagation()}>
            {mobileDrawerContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Home,
  Restaurant,
  Receipt,
  ExitToApp,
} from '@mui/icons-material';
import { logout } from '../../redux/authSlice';
import { getCart } from '../../redux/cartSlice';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const mobileDrawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, bgcolor: 'secondary.700', color: 'white' }}>
        <Typography variant="h6" className="font-display">
          FoodieHub
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/" onClick={() => setMobileDrawerOpen(false)}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/restaurants" onClick={() => setMobileDrawerOpen(false)}>
          <ListItemIcon><Restaurant /></ListItemIcon>
          <ListItemText primary="Restaurants" />
        </ListItem>
        {isAuthenticated && (
          <>
            <ListItem button component={Link} to="/cart" onClick={() => setMobileDrawerOpen(false)}>
              <ListItemIcon>
                <Badge badgeContent={totalItems} color="error">
                  <CartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button component={Link} to="/orders" onClick={() => setMobileDrawerOpen(false)}>
              <ListItemIcon><Receipt /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button component={Link} to="/profile" onClick={() => setMobileDrawerOpen(false)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => { handleLogout(); setMobileDrawerOpen(false); }}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Divider />
            <ListItem button component={Link} to="/login" onClick={() => setMobileDrawerOpen(false)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" className="glass-effect shadow-custom" elevation={0}  sx={{
          background: 'linear-gradient(to right, #000000, #030712)', // Green (secondary-800) to black (gray-950) mix
        }}>
        <Toolbar className="max-w-7xl mx-auto w-full px-4">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className="font-display text-gradient font-bold no-underline flex-shrink-0"
            sx={{ textDecoration: 'none', mr: 3, color: '#4ade80' }}
          >
            FoodieHub
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mr: 'auto' }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                className="hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors"
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/restaurants"
                color="inherit"
                className="hover:bg-gray-100 text-secondary-400 rounded-lg px-4 py-2 transition-colors"
              >
                Restaurants
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              size="small"
              className="bg-white rounded-lg"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                style: { borderRadius: '12px' }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated && (
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <Badge badgeContent={totalItems} color="error">
                  <CartIcon className='text-secondary-400' />
                </Badge>
              </IconButton>
            )}

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  className="hover:bg-gray-100 bg-secondary-400 rounded-lg p-1 transition-colors ml-2"
                >
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                    className="text-sm"
                  >
                    {user?.fullName?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    className: 'mt-2 shadow-custom rounded-lg'
                  }}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
                    <PersonIcon sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/orders" onClick={handleProfileMenuClose}>
                    <Receipt sx={{ mr: 1 }} /> Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    className="rounded-lg px-4 py-2 border-primary-500 text-primary-600 hover:bg-primary-50"
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    className="rounded-lg px-4 py-2 bg-primary-500 hover:bg-primary-600"
                  >
                    Sign Up
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {mobileDrawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;

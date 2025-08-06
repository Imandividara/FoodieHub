import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Restaurants from './pages/Restaurants/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#ea580c',
    },
    secondary: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
    },
    background: {
      default: '#f9fafb',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Poppins', 'system-ui', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#374151',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  borderRadius: '12px',
                },
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

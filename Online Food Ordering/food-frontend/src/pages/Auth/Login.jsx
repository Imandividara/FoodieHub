import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from '@mui/icons-material';
import { loginUser, clearError } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await dispatch(loginUser(formData));
      if (result.type === 'auth/loginUser/fulfilled') {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <Container maxWidth="sm">
        <Paper className="rounded-3xl shadow-custom p-8 glass-effect">
          <Box className="text-center mb-8">
            <Typography
              variant="h3"
              className="font-display font-bold text-gradient mb-2"
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Sign in to your account to continue ordering
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-6 rounded-lg">
              {typeof error === 'string' ? error : 'Login failed. Please check your credentials.'}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              className="bg-white rounded-lg"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-400" />
                  </InputAdornment>
                ),
                style: { borderRadius: '12px' }
              }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              className="bg-white rounded-lg"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { borderRadius: '12px' }
              }}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-600 rounded-xl py-3 font-semibold text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Divider className="my-8">
            <Typography variant="body2" className="text-gray-500 px-4">
              Or continue with
            </Typography>
          </Divider>

          <Box className="flex gap-4 mb-8">
            <Button
              variant="outlined"
              fullWidth
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3"
              startIcon={<Google />}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3"
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </Box>

          <Box className="text-center">
            <Typography variant="body2" className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold no-underline"
              >
                Sign up here
              </Link>
            </Typography>
          </Box>

          <Box className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-primary-600 hover:text-primary-700 text-sm no-underline"
            >
              Forgot your password?
            </Link>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

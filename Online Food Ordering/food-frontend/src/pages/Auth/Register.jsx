import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Removed Material UI and icons. Use only Tailwind CSS and React components.
import { registerUser, clearError } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'ROLE_CUSTOMER',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));
      if (result.type === 'auth/registerUser/fulfilled') {
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-yellow-500 mb-2">Join FoodieHub</h1>
          <p className="text-gray-600">Create your account and start ordering delicious food</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm font-medium">
            {typeof error === 'string' ? error : 'Registration failed. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Person SVG icon */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Email SVG icon */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h-9A2.25 2.25 0 005.25 6v12A2.25 2.25 0 007.5 20.25h9a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0016.5 3.75zM5.25 6l6.75 6.75L18.75 6" /></svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Lock SVG icon */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6-6V9a6 6 0 1112 0v2m-6 6a2 2 0 104 0 2 2 0 00-4 0z" /></svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-10 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675m1.662-2.662A9.956 9.956 0 0112 2.5c5.523 0 10 4.477 10 10 0 1.657-.336 3.234-.938 4.675m-1.662 2.662A9.956 9.956 0 0112 21.5c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Lock SVG icon */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6-6V9a6 6 0 1112 0v2m-6 6a2 2 0 104 0 2 2 0 00-4 0z" /></svg>
              </span>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPassword ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="ROLE_CUSTOMER">Customer</option>
              <option value="ROLE_RESTAURANT_OWNER">Restaurant Owner</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl py-3 font-semibold text-lg shadow-lg transform hover:scale-105 transition-all disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 flex items-center justify-center gap-2"
          >
            {/* Google SVG icon */}
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.77-5.77C34.64 3.7 29.8 1.5 24 1.5 14.82 1.5 6.98 7.5 3.5 15.5l6.91 5.37C12.1 15.09 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.5 24c0-1.64-.15-3.22-.43-4.74H24v9.24h12.7c-.55 2.97-2.18 5.48-4.64 7.18l7.19 5.59C43.98 37.5 46.5 31.25 46.5 24z"/><path fill="#FBBC05" d="M10.41 28.13A14.5 14.5 0 019.5 24c0-1.43.24-2.81.66-4.13l-6.91-5.37A23.97 23.97 0 00.5 24c0 3.77.9 7.34 2.5 10.5l7.41-6.37z"/><path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.15 15.91-5.86l-7.19-5.59c-2.01 1.35-4.59 2.15-8.72 2.15-6.44 0-11.9-5.59-13.59-12.87l-7.41 6.37C6.98 40.5 14.82 46.5 24 46.5z"/></g></svg>
            Google
          </button>
          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 flex items-center justify-center gap-2"
          >
            {/* Facebook SVG icon */}
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            Facebook
          </button>
        </div>

        <div className="text-center">
          <span className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-semibold no-underline"
            >
              Sign in here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

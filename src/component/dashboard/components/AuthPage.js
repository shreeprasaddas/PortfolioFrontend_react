import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner.js'; // Assuming LoadingSpinner is in the same directory

const AuthPage = ({ onLogin, onRegister, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (isLoginMode) {
      await onLogin(email, password);
    } else {
      await onRegister(email, password);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-white">
        {isLoginMode ? 'Admin Login' : 'Create Admin Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-5 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            isLoginMode ? 'Login' : 'Register'
          )}
        </button>
      </form>
      <p className="text-sm text-center text-gray-400">
        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={toggleMode}
          disabled={isLoading}
          className="font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoginMode ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;

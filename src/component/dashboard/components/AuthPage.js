import React, { useState } from 'react';
import './auth.css'
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
    <div className="auth-container">
  <h2 className="auth-heading">
    {isLoginMode ? 'Admin Login' : 'Create Admin Account'}
  </h2>
  <form onSubmit={handleSubmit} className="auth-form">
    <div>
      <label htmlFor="email" className="auth-label">Email Address</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
        placeholder="you@example.com"
        required
        disabled={isLoading}
      />
    </div>
    <div>
      <label htmlFor="password" className="auth-label">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
        placeholder="••••••••"
        required
        disabled={isLoading}
      />
    </div>
    <button
      type="submit"
      disabled={isLoading}
      className="auth-button"
    >
      {isLoading ? <LoadingSpinner size="sm" /> : isLoginMode ? 'Login' : 'Register'}
    </button>
  </form>
  <p className="auth-toggle-text">
    {isLoginMode ? "Don't have an account? " : "Already have an account? "}
    <button
      onClick={toggleMode}
      disabled={isLoading}
      className="auth-toggle-button"
    >
      {isLoginMode ? 'Register here' : 'Login here'}
    </button>
  </p>
</div>
  );
};

export default AuthPage;

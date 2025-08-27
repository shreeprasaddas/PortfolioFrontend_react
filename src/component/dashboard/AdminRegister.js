import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from './apiService';
import './admin.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Secret key validation (basic - backend will do the real validation)
    if (!formData.secretKey) {
      newErrors.secretKey = 'Secret key is required for admin registration';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.makeRequest('/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          secretKey: formData.secretKey
        })
      });

      console.log('Registration response:', response);

      if (response.register && !response.err && response.validKey) {
        setSuccessMessage(response.message || 'Admin account created successfully! You can now login.');
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          secretKey: ''
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else if (response.userExist) {
        setErrors({ email: response.message || 'An admin with this email already exists' });
      } else if (response.validKey === false) {
        setErrors({ secretKey: response.message || 'Invalid secret key. Please contact the system administrator.' });
      } else if (response.err) {
        // Handle different error types based on the message
        if (response.message && response.message.toLowerCase().includes('secret key')) {
          setErrors({ secretKey: response.message });
        } else {
          setErrors({ general: response.message || 'Registration failed. Please try again.' });
        }
      } else {
        setErrors({ general: response.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: 'Registration failed. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      secretKey: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="admin-register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Admin Registration</h2>
          <p>Create a new admin account with secret key authorization</p>
        </div>

        {successMessage && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>{successMessage}</p>
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            <div className="error-icon">⚠</div>
            <p>{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter a secure password (min 6 characters)"
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="secretKey">Admin Secret Key</label>
            <input
              type="password"
              id="secretKey"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
              className={errors.secretKey ? 'error' : ''}
              placeholder="Enter the admin secret key"
              required
            />
            {errors.secretKey && <span className="field-error">{errors.secretKey}</span>}
            <small className="form-hint">
              Contact the system administrator for the secret key if you don't have it.
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isLoading} 
              className="register-btn"
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </button>
            
            <button 
              type="button" 
              onClick={clearForm}
              className="clear-btn"
              disabled={isLoading}
            >
              Clear Form
            </button>
          </div>
        </form>

        <div className="register-footer">
          <p>Already have an admin account?</p>
          <Link to="/admin" className="login-link">Login to Dashboard</Link>
        </div>

        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <div className="security-text">
            <h4>Security Notice</h4>
            <p>Admin registration requires a valid secret key. This ensures only authorized personnel can create admin accounts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;

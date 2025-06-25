
import React, { useState, useEffect, useCallback } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';

// Existing components
import Navbar from './components/Navbar.js';
import AuthPageComponent from './components/AuthPage.js'; // Corrected/Confirmed path
import DashboardPage from './components/DashboardPage.js';
import LoadingSpinner from './components/LoadingSpinner.js';

// New placeholder components (to be created)
import SecondHomePage from './new_components/SecondHomePage.js';
import ContactPage from './new_components/ContactPage.js';
import HomePage from './new_components/HomePage.js';
import PortfolioPage from './new_components/PortfolioPage.js';
import Footer from './new_components/Footer.js';
import AdminPage from './new_components/AdminPage.js';


// API service
import { 
  fetchPortfolio, 
  addPost as apiAddPost, 
  updatePost as apiUpdatePost, 
  deletePost as apiDeletePost, 
  loginUser, 
  registerUser 
} from './services/apiService.js';

const PageLayout = ({ currentUser, onLogout, error, clearError, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-100">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 shadow-lg text-center absolute top-0 left-1/2 transform -translate-x-1/2 w-auto max-w-md z-50">
            {error}
            <button onClick={clearError} className="ml-4 font-bold text-lg leading-none">&times;</button>
          </div>
        )}
        <div className={error ? 'pt-16' : ''}> {/* Add padding if error is shown */}
         {children || <Outlet />} {/* Outlet for nested routes if used, or children */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [portfolioPosts, setPortfolioPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For initial app load and subsequent operations
  const [appError, setAppError] = useState(null); // Global error for App level

  // Effect for initializing user from localStorage
  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false); // Finished initial user check
  }, []);

  const clearAppError = () => setAppError(null);

  const loadPortfolio = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    clearAppError();
    try {
      const posts = await fetchPortfolio();
      setPortfolioPosts(posts);
    } catch (err) {
      setAppError('Failed to load portfolio posts.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Effect for loading portfolio when user changes
  useEffect(() => {
    if (currentUser) {
      loadPortfolio();
    } else {
      setPortfolioPosts([]); // Clear posts if logged out
    }
  }, [currentUser, loadPortfolio]);

  const handleLogin = async (email, pass) => {
    setIsLoading(true);
    clearAppError();
    try {
      const user = await loginUser(email, pass);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsLoading(false);
      return true;
    } catch (err) {
      setAppError(err.message || 'Login failed.');
      setIsLoading(false);
      return false;
    }
  };

  const handleRegister = async (email, pass) => {
    setIsLoading(true);
    clearAppError();
    try {
      const result = await registerUser(email, pass);
      if (result.register && !result.userExist && !result.err) {
        // Auto-login after successful registration
        const loginSuccess = await handleLogin(email, pass); // This will set isLoading false
        return loginSuccess;
      } else {
        setAppError(result.userExist ? 'User already exists.' : 'Registration failed.');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setAppError(err.message || 'Registration failed.');
      setIsLoading(false);
      return false;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setPortfolioPosts([]);
    // Navigate to home or login page is handled by router based on currentUser
  };

  const handleAddPost = async (postData) => {
    setIsLoading(true);
    clearAppError();
    try {
      const newPost = await apiAddPost(postData);
      setPortfolioPosts(prevPosts => [newPost, ...prevPosts]);
      setIsLoading(false);
      return true;
    } catch (err) {
      setAppError('Failed to add post.');
      setIsLoading(false);
      return false;
    }
  };

  const handleUpdatePost = async (postId, postData) => {
    setIsLoading(true);
    clearAppError();
    try {
      const updatedPost = await apiUpdatePost(postId, postData);
      setPortfolioPosts(prevPosts =>
        prevPosts.map(p => (p.id === postId ? updatedPost : p))
      );
      setIsLoading(false);
      return true;
    } catch (err) {
      setAppError('Failed to update post.');
      setIsLoading(false);
      return false;
    }
  };

  const handleDeletePost = async (postId) => {
    setIsLoading(true);
    clearAppError();
    try {
      await apiDeletePost(postId);
      setPortfolioPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      setIsLoading(false);
      return true;
    } catch (err) {
      setAppError('Failed to delete post.');
      setIsLoading(false);
      return false;
    }
  };

  // ProtectedRoute and AuthRoute components
  const ProtectedRoute = ({ children }) => {
    if (isLoading && !currentUser && typeof localStorage !== 'undefined' && localStorage.getItem('currentUser')) { // Still checking initial auth
        return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><LoadingSpinner size="lg"/></div>;
    }
    return currentUser ? children : <Navigate to="/admin" replace />;
  };

  const AuthRoute = ({ children }) => {
     if (isLoading && !currentUser && typeof localStorage !== 'undefined' && localStorage.getItem('currentUser')) { // Still checking initial auth
        return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><LoadingSpinner size="lg"/></div>;
    }
    return currentUser ? <Navigate to="/dashboard" replace /> : children;
  };
  
  // Initial loading state for the whole app before router is ready
   if (isLoading && !currentUser && typeof localStorage !== 'undefined' && localStorage.getItem('currentUser') === null) {
     // This condition is tricky. The useEffect for user loading handles setIsLoading(false).
     // Let's rely on the individual route protection for loading spinner if needed.
     // The main 'isLoading' starts true, useEffect sets it false after checking localStorage.
   }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout currentUser={currentUser} onLogout={handleLogout} error={appError} clearError={clearAppError}><SecondHomePage /></PageLayout>,
    },
    {
      path: "/contact",
      element: <PageLayout currentUser={currentUser} onLogout={handleLogout} error={appError} clearError={clearAppError}><ContactPage /></PageLayout>,
    },
    {
      path: "/about",
      element: <PageLayout currentUser={currentUser} onLogout={handleLogout} error={appError} clearError={clearAppError}><HomePage /></PageLayout>,
    },
    {
      path: "/portfolio",
      element: <PageLayout currentUser={currentUser} onLogout={handleLogout} error={appError} clearError={clearAppError}><PortfolioPage /></PageLayout>,
    },
    {
      path: "/admin",
      element: (
        <AuthRoute>
          {/* AdminPage might have a simpler layout or no layout if AuthPageComponent is full-page */}
           {/* Global error display for AdminPage */}
            {appError && (
                <div className="bg-red-500 text-white p-3 rounded mb-4 shadow-lg text-center fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000] w-auto max-w-md">
                {appError}
                <button onClick={clearAppError} className="ml-4 font-bold text-lg leading-none">&times;</button>
                </div>
            )}
          <AdminPage onLogin={handleLogin} onRegister={handleRegister} isLoading={isLoading} />
        </AuthRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <PageLayout currentUser={currentUser} onLogout={handleLogout} error={appError} clearError={clearAppError}>
            <DashboardPage
              posts={portfolioPosts}
              onAddPost={handleAddPost}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
              isLoading={isLoading}
              refreshPosts={loadPortfolio}
            />
          </PageLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to={currentUser ? "/dashboard" : "/"} replace />,
    }
  ]);

  // Initial app loading screen, if still loading user from localStorage
  if (isLoading && !currentUser && typeof localStorage !== 'undefined' && localStorage.getItem('currentUser')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <LoadingSpinner size="lg" />
        <div className="text-xl ml-4">Loading Portfolio Dashboard...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from './apiService';

// Initial state
const initialState = {
  // Authentication
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  // Dashboard data
  activeTab: 'overview',
  stats: {
    totalProjects: 0,
    totalAdmins: 0,
    totalContactForms: 0,
    recentActivity: []
  },

  // Projects
  projects: [],
  projectsLoading: false,
  projectsError: null,

  // Admin users
  adminUsers: [],
  adminUsersLoading: false,
  adminUsersError: null,

  // Contact forms
  contactForms: [],
  contactFormsLoading: false,
  contactFormsError: null,

  // Files
  uploadedFiles: [],
  filesLoading: false,
  filesError: null
};

// Action types
const actionTypes = {
  // Loading states
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  // Authentication
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',

  // Dashboard
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_STATS: 'SET_STATS',

  // Projects
  SET_PROJECTS_LOADING: 'SET_PROJECTS_LOADING',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  SET_PROJECTS_ERROR: 'SET_PROJECTS_ERROR',

  // Admin users
  SET_ADMIN_USERS_LOADING: 'SET_ADMIN_USERS_LOADING',
  SET_ADMIN_USERS: 'SET_ADMIN_USERS',
  ADD_ADMIN_USER: 'ADD_ADMIN_USER',
  DELETE_ADMIN_USER: 'DELETE_ADMIN_USER',
  SET_ADMIN_USERS_ERROR: 'SET_ADMIN_USERS_ERROR',

  // Contact forms
  SET_CONTACT_FORMS_LOADING: 'SET_CONTACT_FORMS_LOADING',
  SET_CONTACT_FORMS: 'SET_CONTACT_FORMS',
  DELETE_CONTACT_FORM: 'DELETE_CONTACT_FORM',
  SET_CONTACT_FORMS_ERROR: 'SET_CONTACT_FORMS_ERROR',

  // Files
  SET_FILES_LOADING: 'SET_FILES_LOADING',
  SET_FILES: 'SET_FILES',
  ADD_FILE: 'ADD_FILE',
  DELETE_FILE: 'DELETE_FILE',
  SET_FILES_ERROR: 'SET_FILES_ERROR'
};

// Reducer
function dashboardReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };

    case actionTypes.LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false
      };

    case actionTypes.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };

    case actionTypes.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case actionTypes.SET_STATS:
      return { ...state, stats: action.payload };

    // Projects
    case actionTypes.SET_PROJECTS_LOADING:
      return { ...state, projectsLoading: action.payload };

    case actionTypes.SET_PROJECTS:
      return { 
        ...state, 
        projects: action.payload, 
        projectsLoading: false,
        projectsError: null 
      };

    case actionTypes.ADD_PROJECT:
      return { 
        ...state, 
        projects: [...state.projects, action.payload] 
      };

    case actionTypes.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.tittle === action.payload.oldTitle
            ? { ...project, ...action.payload.updatedProject }
            : project
        )
      };

    case actionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.tittle !== action.payload)
      };

    case actionTypes.SET_PROJECTS_ERROR:
      return { 
        ...state, 
        projectsError: action.payload, 
        projectsLoading: false 
      };

    // Admin users
    case actionTypes.SET_ADMIN_USERS_LOADING:
      return { ...state, adminUsersLoading: action.payload };

    case actionTypes.SET_ADMIN_USERS:
      return { 
        ...state, 
        adminUsers: action.payload, 
        adminUsersLoading: false,
        adminUsersError: null 
      };

    case actionTypes.ADD_ADMIN_USER:
      return { 
        ...state, 
        adminUsers: [...state.adminUsers, action.payload] 
      };

    case actionTypes.DELETE_ADMIN_USER:
      return {
        ...state,
        adminUsers: state.adminUsers.filter(user => user._id !== action.payload)
      };

    case actionTypes.SET_ADMIN_USERS_ERROR:
      return { 
        ...state, 
        adminUsersError: action.payload, 
        adminUsersLoading: false 
      };

    // Contact forms
    case actionTypes.SET_CONTACT_FORMS_LOADING:
      return { ...state, contactFormsLoading: action.payload };

    case actionTypes.SET_CONTACT_FORMS:
      return { 
        ...state, 
        contactForms: action.payload, 
        contactFormsLoading: false,
        contactFormsError: null 
      };

    case actionTypes.DELETE_CONTACT_FORM:
      return {
        ...state,
        contactForms: state.contactForms.filter(form => form._id !== action.payload)
      };

    case actionTypes.SET_CONTACT_FORMS_ERROR:
      return { 
        ...state, 
        contactFormsError: action.payload, 
        contactFormsLoading: false 
      };

    // Files
    case actionTypes.SET_FILES_LOADING:
      return { ...state, filesLoading: action.payload };

    case actionTypes.SET_FILES:
      return { 
        ...state, 
        uploadedFiles: action.payload, 
        filesLoading: false,
        filesError: null 
      };

    case actionTypes.ADD_FILE:
      return { 
        ...state, 
        uploadedFiles: [...state.uploadedFiles, action.payload] 
      };

    case actionTypes.DELETE_FILE:
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(file => file.name !== action.payload)
      };

    case actionTypes.SET_FILES_ERROR:
      return { 
        ...state, 
        filesError: action.payload, 
        filesLoading: false 
      };

    default:
      return state;
  }
}

// Create context
const DashboardContext = createContext();

// Provider component
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = apiService.isAuthenticated();
      dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: isAuth });
      
      if (isAuth) {
        await loadDashboardData();
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Action creators
  const actions = {
    // Authentication actions
    async login(credentials) {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      dispatch({ type: actionTypes.CLEAR_ERROR });

      try {
        const result = await apiService.login(credentials);
        
        if (result.token) {
          dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { email: credentials.email } });
          await loadDashboardData();
          return { success: true };
        } else {
          dispatch({ type: actionTypes.LOGIN_FAILURE, payload: 'Invalid credentials' });
          return { success: false, error: 'Invalid credentials' };
        }
      } catch (error) {
        const errorMessage = apiService.handleApiError(error);
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    },

    logout() {
      apiService.logout();
      dispatch({ type: actionTypes.LOGOUT });
    },

    setActiveTab(tab) {
      dispatch({ type: actionTypes.SET_ACTIVE_TAB, payload: tab });
    },

    // Projects actions
    async loadProjects() {
      dispatch({ type: actionTypes.SET_PROJECTS_LOADING, payload: true });
      
      try {
        const projects = await apiService.getProjects();
        dispatch({ type: actionTypes.SET_PROJECTS, payload: projects });
      } catch (error) {
        dispatch({ type: actionTypes.SET_PROJECTS_ERROR, payload: apiService.handleApiError(error) });
      }
    },

    async createProject(projectData) {
      try {
        const result = await apiService.createProject(projectData);
        if (result) {
          await actions.loadProjects(); // Reload projects
          return { success: true };
        }
      } catch (error) {
        return { success: false, error: apiService.handleApiError(error) };
      }
    },

    async updateProject(title, projectData) {
      try {
        const result = await apiService.updateProject(title, projectData);
        if (result) {
          await actions.loadProjects(); // Reload projects
          return { success: true };
        }
      } catch (error) {
        return { success: false, error: apiService.handleApiError(error) };
      }
    },

    async deleteProject(title) {
      try {
        await apiService.deleteProject(title);
        dispatch({ type: actionTypes.DELETE_PROJECT, payload: title });
        return { success: true };
      } catch (error) {
        return { success: false, error: apiService.handleApiError(error) };
      }
    },

    // Admin users actions
    async loadAdminUsers() {
      dispatch({ type: actionTypes.SET_ADMIN_USERS_LOADING, payload: true });
      
      try {
        const result = await apiService.getAdminUsers();
        dispatch({ type: actionTypes.SET_ADMIN_USERS, payload: result.data || [] });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ADMIN_USERS_ERROR, payload: apiService.handleApiError(error) });
      }
    },

    async createAdminUser(userData) {
      try {
        const result = await apiService.createAdminUser(userData);
        if (!result.err && result.register) {
          await actions.loadAdminUsers(); // Reload admin users
          return { success: true };
        } else if (result.userExist) {
          return { success: false, error: 'User already exists' };
        } else {
          return { success: false, error: 'Failed to create admin user' };
        }
      } catch (error) {
        return { success: false, error: apiService.handleApiError(error) };
      }
    },

    // Contact forms actions
    async loadContactForms() {
      dispatch({ type: actionTypes.SET_CONTACT_FORMS_LOADING, payload: true });
      
      try {
        // For now, using placeholder data as the backend endpoint doesn't exist
        const placeholderData = [
          {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            message: 'Interested in your services',
            date: new Date().toISOString()
          }
        ];
        dispatch({ type: actionTypes.SET_CONTACT_FORMS, payload: placeholderData });
      } catch (error) {
        dispatch({ type: actionTypes.SET_CONTACT_FORMS_ERROR, payload: apiService.handleApiError(error) });
      }
    },

    // Load dashboard statistics
    async loadStats() {
      try {
        const stats = await apiService.getDashboardStats();
        dispatch({ type: actionTypes.SET_STATS, payload: stats });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  };

  // Load all dashboard data
  const loadDashboardData = async () => {
    await Promise.all([
      actions.loadProjects(),
      actions.loadAdminUsers(),
      actions.loadContactForms(),
      actions.loadStats()
    ]);
  };

  return (
    <DashboardContext.Provider value={{ state, actions }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export default DashboardContext;

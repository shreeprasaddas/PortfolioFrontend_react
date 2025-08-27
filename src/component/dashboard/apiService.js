// API Service for Admin Dashboard
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token from cookies
  getAuthToken() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('uid='))
      ?.split('=')[1];
  }

  // Helper method to make requests with proper headers
  async makeRequest(endpoint, options = {}) {
    const token = this.getAuthToken();
    
    // Default headers - but don't set Content-Type for FormData
    const defaultHeaders = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    
    // Only add Content-Type: application/json if not FormData
    const isFormData = options.body instanceof FormData;
    if (!isFormData && !options.headers?.['Content-Type']) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      credentials: 'include', // Include cookies in requests
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication APIs
  async login(credentials) {
    return this.makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyToken() {
    const token = this.getAuthToken();
    if (!token) return false;
    
    // You might want to implement a token verification endpoint
    return true;
  }

  // Project APIs
  async getProjects() {
    return this.makeRequest('/projects');
  }

  async createProject(projectData) {
    // Handle FormData for file uploads
    let body = projectData;
    const headers = {};
    
    if (!(projectData instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(projectData);
    }

    return this.makeRequest('/projects', {
      method: 'POST',
      body: body,
      headers,
    });
  }

  async updateProject(title, projectData) {
    // Handle FormData for file uploads
    let body = projectData;
    const headers = {};
    
    if (!(projectData instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(projectData);
    }

    return this.makeRequest(`/projects/${encodeURIComponent(title)}`, {
      method: 'PUT',
      body: body,
      headers,
    });
  }

  async deleteProject(title) {
    return this.makeRequest(`/projects/${encodeURIComponent(title)}`, {
      method: 'DELETE',
    });
  }

  // Admin User APIs
  async getAdminUsers() {
    return this.makeRequest('/getAdmin', {
      method: 'POST',
    });
  }

  async createAdminUser(userData) {
    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async deleteAdminUser(userId) {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Contact Form APIs
  async getContactForms() {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest('/contact-forms');
  }

  async deleteContactForm(formId) {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest(`/contact-forms/${formId}`, {
      method: 'DELETE',
    });
  }

  async replyToContact(formId, replyData) {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest(`/contact-forms/${formId}/reply`, {
      method: 'POST',
      body: JSON.stringify(replyData),
    });
  }

  // File Management APIs
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getUploadedFiles() {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest('/files');
  }

  async deleteFile(filename) {
    // This endpoint would need to be implemented in the backend
    return this.makeRequest(`/files/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
    });
  }

  // Portfolio Data APIs
  async getPortfolioData() {
    return this.makeRequest('/getPortfolio');
  }

  // Statistics APIs
  async getDashboardStats() {
    try {
      const [projects, admins] = await Promise.all([
        this.getProjects(),
        this.getAdminUsers(),
      ]);

      return {
        totalProjects: projects?.length || 0,
        totalAdmins: admins?.no_of_user || 0,
        totalContactForms: 0, // Would need backend implementation
        recentActivity: [
          `${projects?.length || 0} total projects`,
          `${admins?.no_of_user || 0} admin users`,
          'System running smoothly'
        ]
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalProjects: 0,
        totalAdmins: 0,
        totalContactForms: 0,
        recentActivity: ['Unable to fetch statistics']
      };
    }
  }

  // Form submission API
  async submitContactForm(formData) {
    return this.makeRequest('/form', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Utility methods
  logout() {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // Error handler for common errors
  handleApiError(error) {
    if (error.message.includes('401')) {
      this.logout();
      window.location.reload();
      return 'Authentication failed. Please login again.';
    }
    
    if (error.message.includes('403')) {
      return 'Access forbidden. You do not have permission for this action.';
    }
    
    if (error.message.includes('404')) {
      return 'Resource not found.';
    }
    
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
    
    return error.message || 'An unexpected error occurred.';
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the class as well for testing or multiple instances
export { ApiService };

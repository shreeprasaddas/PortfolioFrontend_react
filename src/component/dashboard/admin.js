import React, { useEffect, useState } from "react";
import "./admin.css";

const API_URL = "http://localhost:5000";

function Admin() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalAdmins: 0,
    totalContactForms: 0,
    recentActivity: []
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({ 
    tittle: "", 
    link: "", 
    imgLink: "", 
    paragraph: "" 
  });
  const [editTittle, setEditTittle] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Admin users state
  const [adminUsers, setAdminUsers] = useState([]);
  const [newAdminForm, setNewAdminForm] = useState({ email: "", password: "" });
  const [adminSearch, setAdminSearch] = useState("");

  // Contact forms state
  const [contactForms, setContactForms] = useState([]);
  const [contactSearch, setContactSearch] = useState("");

  // File management state
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Check authentication on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('uid='))
      ?.split('=')[1];
    
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  };

  // Authentication functions
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (data.token) {
        setIsAuthenticated(true);
        setLoginForm({ email: "", password: "" });
        fetchDashboardData();
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setActiveTab("overview");
  };

  // Data fetching functions
  const fetchDashboardData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchAdminUsers(),
      fetchContactForms(),
      fetchStats()
    ]);
  };

  const fetchStats = async () => {
    try {
      // Fetch various statistics
      const projectsRes = await fetch(`${API_URL}/projects`);
      const projectsData = await projectsRes.json();
      
      const adminsRes = await fetch(`${API_URL}/getAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const adminsData = await adminsRes.json();

      setStats({
        totalProjects: projectsData.length || 0,
        totalAdmins: adminsData.no_of_user || 0,
        totalContactForms: contactForms.length || 0,
        recentActivity: [
          `${projectsData.length || 0} total projects`,
          `${adminsData.no_of_user || 0} admin users`,
          "System running smoothly"
        ]
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/getAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.data) {
        setAdminUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const fetchContactForms = async () => {
    // This would need to be implemented in backend
    // For now, using placeholder data
    setContactForms([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        message: "Interested in your services",
        date: new Date().toISOString()
      }
    ]);
  };

  // Project management functions
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.keys(projectForm).forEach(key => {
        formData.append(key, projectForm[key]);
      });
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const url = editTittle 
        ? `${API_URL}/projects/${editTittle}` 
        : `${API_URL}/projects`;
      
      const method = editTittle ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        setProjectForm({ tittle: "", link: "", imgLink: "", paragraph: "" });
        setSelectedFile(null);
        setEditTittle(null);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectDelete = async (tittle) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await fetch(`${API_URL}/projects/${tittle}`, { 
          method: "DELETE" 
        });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleProjectEdit = (project) => {
    setProjectForm({
      tittle: project.tittle,
      link: project.link,
      imgLink: project.imgLink,
      paragraph: project.paragraph,
    });
    setEditTittle(project.tittle);
    setActiveTab("projects");
  };

  // Admin user management functions
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdminForm),
      });

      const data = await response.json();
      
      if (!data.err && data.register) {
        setNewAdminForm({ email: "", password: "" });
        fetchAdminUsers();
        alert("Admin user created successfully!");
      } else if (data.userExist) {
        alert("User already exists!");
      } else {
        alert("Failed to create admin user");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Failed to create admin user");
    } finally {
      setIsLoading(false);
    }
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProjectForm(prev => ({
          ...prev,
          imgLink: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter functions
  const filteredProjects = projects.filter((p) =>
    p.tittle?.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.paragraph?.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredAdmins = adminUsers.filter((admin) =>
    admin.email?.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredContacts = contactForms.filter((contact) =>
    contact.firstName?.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.lastName?.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.email?.toLowerCase().includes(contactSearch.toLowerCase())
  );

  // Login form component
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="login-card">
          <h2>Admin Login</h2>
          {loginError && <div className="error-message">{loginError}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                required
              />
            </div>
            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main dashboard component
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span>Welcome, Admin</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === "overview" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          className={activeTab === "projects" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button 
          className={activeTab === "admins" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("admins")}
        >
          Admin Users
        </button>
        <button 
          className={activeTab === "contacts" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("contacts")}
        >
          Contact Forms
        </button>
        <button 
          className={activeTab === "files" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("files")}
        >
          File Management
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Projects</h3>
                <p className="stat-number">{stats.totalProjects}</p>
              </div>
              <div className="stat-card">
                <h3>Admin Users</h3>
                <p className="stat-number">{stats.totalAdmins}</p>
              </div>
              <div className="stat-card">
                <h3>Contact Submissions</h3>
                <p className="stat-number">{stats.totalContactForms}</p>
              </div>
              <div className="stat-card">
                <h3>System Status</h3>
                <p className="stat-status">Active</p>
              </div>
            </div>
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <ul>
                {stats.recentActivity.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="projects-section">
            <h2>Project Management</h2>
            
            <form onSubmit={handleProjectSubmit} className="project-form">
              <div className="form-row">
                <input
                  name="tittle"
                  placeholder="Project Title"
                  value={projectForm.tittle}
                  onChange={(e) => setProjectForm(prev => ({...prev, tittle: e.target.value}))}
                  required
                />
                <input
                  name="link"
                  placeholder="Project Link (optional)"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm(prev => ({...prev, link: e.target.value}))}
                />
              </div>
              
              <div className="form-row">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {projectForm.imgLink && (
                  <img src={projectForm.imgLink} alt="Preview" className="image-preview" />
                )}
              </div>
              
              <textarea
                name="paragraph"
                placeholder="Project Description"
                value={projectForm.paragraph}
                onChange={(e) => setProjectForm(prev => ({...prev, paragraph: e.target.value}))}
                required
                rows="4"
              />
              
              <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                  {editTittle ? "Update Project" : "Add Project"}
                </button>
                {editTittle && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditTittle(null);
                      setProjectForm({ tittle: "", link: "", imgLink: "", paragraph: "" });
                      setSelectedFile(null);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="projects-list">
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="search-input"
              />
              
              <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                  <div key={index} className="project-card">
                    <img src={`${API_URL}${project.imgLink}`} alt={project.tittle} />
                    <div className="project-info">
                      <h4>{project.tittle}</h4>
                      <p>{project.paragraph}</p>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      )}
                      <div className="project-actions">
                        <button onClick={() => handleProjectEdit(project)} className="edit-btn">
                          Edit
                        </button>
                        <button onClick={() => handleProjectDelete(project.tittle)} className="delete-btn">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "admins" && (
          <div className="admins-section">
            <h2>Admin User Management</h2>
            
            <form onSubmit={handleAdminSubmit} className="admin-form">
              <h3>Add New Admin</h3>
              <div className="form-row">
                <input
                  type="email"
                  placeholder="Email"
                  value={newAdminForm.email}
                  onChange={(e) => setNewAdminForm(prev => ({...prev, email: e.target.value}))}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newAdminForm.password}
                  onChange={(e) => setNewAdminForm(prev => ({...prev, password: e.target.value}))}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Admin"}
              </button>
            </form>

            <div className="admins-list">
              <input
                type="text"
                placeholder="Search admins..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="search-input"
              />
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin, index) => (
                    <tr key={index}>
                      <td>{admin.email}</td>
                      <td>
                        <button className="danger-btn">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="contacts-section">
            <h2>Contact Form Submissions</h2>
            
            <input
              type="text"
              placeholder="Search contacts..."
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              className="search-input"
            />
            
            <div className="contacts-grid">
              {filteredContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <h4>{contact.firstName} {contact.lastName}</h4>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone:</strong> {contact.phone}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                  <p><strong>Date:</strong> {new Date(contact.date).toLocaleDateString()}</p>
                  <div className="contact-actions">
                    <button className="reply-btn">Reply</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="files-section">
            <h2>File Management</h2>
            <div className="upload-section">
              <input type="file" multiple onChange={handleFileChange} />
              <button>Upload Files</button>
            </div>
            <div className="files-grid">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-card">
                  <img src={file.url} alt={file.name} />
                  <p>{file.name}</p>
                  <button className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;

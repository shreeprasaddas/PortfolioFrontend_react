# Admin Dashboard

A comprehensive admin dashboard for managing your portfolio website with full CRUD operations, user management, and analytics.

## Features

### 🔐 Authentication
- Secure JWT-based login system
- Session management with cookies
- Automatic logout on token expiration
- Protected routes and API endpoints

### 📊 Dashboard Overview
- Real-time statistics display
- Project count, admin users, contact submissions
- Recent activity feed
- System status monitoring

### 🎨 Project Management
- **Create** new projects with image upload
- **Read** all projects with search functionality
- **Update** existing project details
- **Delete** projects with confirmation
- File upload with image preview
- Responsive project grid layout

### 👥 Admin User Management
- Add new admin users
- View all admin accounts
- Remove admin access
- Search and filter admin users
- Password-protected registration

### 📧 Contact Form Management
- View all contact form submissions
- Search through submissions
- Mark as replied
- Delete form submissions
- Track response status

### 📁 File Management
- Upload multiple files
- View uploaded files grid
- Delete unwanted files
- File size and type validation
- Storage statistics

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **React Context** - State management
- **React Router** - Navigation
- **CSS3** - Responsive styling with animations

### Backend Integration
- **REST API** - Full CRUD operations
- **JWT Authentication** - Secure access
- **File Upload** - Multer integration
- **Error Handling** - Comprehensive error management

## File Structure

```
dashboard/
├── AdminDashboard.js          # Main dashboard component with provider
├── admin.js                   # Legacy admin component (can be removed)
├── admin.css                  # Comprehensive styling
├── apiService.js              # API communication utility
├── DashboardContext.js        # State management with Context API
└── README.md                  # This documentation
```

## Components Architecture

### Main Components
- **AdminDashboard** - Root component with provider wrapper
- **LoginForm** - Authentication interface
- **OverviewSection** - Statistics and dashboard summary
- **ProjectsSection** - Project CRUD operations
- **AdminUsersSection** - User management
- **ContactFormsSection** - Contact form viewer
- **FileManagementSection** - File upload and management

### State Management
- **DashboardContext** - Centralized state with reducer pattern
- **apiService** - Singleton service for API calls
- Automatic data fetching and caching
- Error state management

## API Endpoints

### Authentication
- `POST /login` - Admin login
- `POST /register` - Create new admin

### Projects
- `GET /projects` - Fetch all projects
- `POST /projects` - Create new project
- `PUT /projects/:title` - Update project
- `DELETE /projects/:title` - Delete project

### Admin Users
- `POST /getAdmin` - Fetch admin users
- `POST /register` - Create admin user

### Contact Forms
- `GET /contact-forms` - Fetch submissions
- `DELETE /contact-forms/:id` - Delete submission
- `PATCH /contact-forms/:id/reply` - Mark as replied

### File Management
- `POST /files/upload` - Upload single file
- `POST /files/upload-multiple` - Upload multiple files
- `GET /files` - List uploaded files
- `DELETE /files/:filename` - Delete file

## Usage

### Installation
1. Ensure backend server is running on port 5000
2. Install frontend dependencies: `npm install`
3. Start development server: `npm start`
4. Navigate to `/admin` route

### Initial Setup
1. Create your first admin user via backend registration
2. Login with admin credentials
3. Start managing your portfolio content

### Adding Projects
1. Go to Projects tab
2. Fill out project form (title, link, description)
3. Upload project image
4. Submit to create new project

### Managing Users
1. Go to Admin Users tab
2. Add new admin with email and password
3. View existing admin accounts
4. Remove access as needed

### Viewing Contacts
1. Go to Contact Forms tab
2. View all form submissions
3. Search through contacts
4. Mark as replied or delete

## Styling

### Design System
- **Colors**: Modern blue gradient theme (#667eea to #764ba2)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Grid-based responsive design
- **Animation**: Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Flexible grid layouts
- Touch-friendly interface

### CSS Classes
- `.admin-dashboard` - Main container
- `.admin-header` - Top navigation
- `.admin-nav` - Tab navigation
- `.admin-content` - Main content area
- `.stat-card` - Statistics cards
- `.project-card` - Project display cards

## Error Handling

### Frontend
- Form validation with real-time feedback
- API error display with user-friendly messages
- Loading states for better UX
- Confirmation dialogs for destructive actions

### Backend Integration
- Automatic token refresh handling
- Network error recovery
- File upload error handling
- Graceful degradation

## Security Features

### Authentication
- JWT token-based authentication
- Secure cookie storage
- Automatic logout on token expiration
- Protected API endpoints

### File Upload
- File type validation (images only)
- File size limits (10MB max)
- Secure filename generation
- Directory traversal protection

### Data Validation
- Form input validation
- SQL injection prevention
- XSS protection
- CSRF protection with CORS

## Performance

### Optimization
- Lazy loading of components
- Image optimization
- API request caching
- Efficient re-rendering with React Context

### Bundle Size
- Tree shaking for unused code
- CSS minification
- Image compression
- Code splitting for large files

## Development

### Adding New Features
1. Create new component in dashboard folder
2. Add to main AdminDashboard component
3. Update navigation in admin-nav
4. Add corresponding API endpoints

### Customization
- Modify `admin.css` for styling changes
- Update `DashboardContext.js` for state changes
- Extend `apiService.js` for new API calls
- Add new sections to `AdminDashboard.js`

## Troubleshooting

### Common Issues
1. **Login fails**: Check backend server and credentials
2. **Images not loading**: Verify file upload and server static files
3. **API errors**: Check network and backend endpoints
4. **Styling issues**: Clear browser cache and check CSS imports

### Debug Mode
- Open browser developer tools
- Check console for error messages
- Verify network requests in Network tab
- Use React Developer Tools for component debugging

## Future Enhancements

### Planned Features
- Email notifications for contact forms
- Advanced analytics with charts
- Bulk operations for projects
- Advanced file management with folders
- Real-time notifications
- Export/import functionality
- Multi-language support
- Dark theme toggle

### Possible Improvements
- WebSocket integration for real-time updates
- Progressive Web App (PWA) features
- Advanced search with filters
- Pagination for large datasets
- Keyboard shortcuts
- Drag and drop file upload
- Image editing capabilities

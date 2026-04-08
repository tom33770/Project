# BookStore Frontend

Modern React-based frontend for the BookStore e-commerce application with responsive design and smooth user experience.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI**: Gradient backgrounds, smooth animations, and attractive styling
- **User Authentication**: Login/register forms with validation
- **Book Catalog**: Search, filter, and sort functionality
- **Shopping Cart**: Add, update, remove items with real-time updates
- **Checkout Process**: Multi-step checkout with payment options
- **Admin Panel**: Separate admin interface for management
- **Personalized Experience**: Dynamic content based on user login status

## 🛠️ Technology Stack

- **React**: 19.2.4 - Modern React with concurrent features
- **React Router**: 6.16.0 - Client-side routing
- **Axios**: 1.6.0 - HTTP client for API calls
- **Vite**: 8.0.4 - Fast build tool and dev server
- **ESLint**: 9.39.4 - Code linting and quality
- **CSS**: Custom modern styling with responsive design

## 📦 Dependencies

### Production Dependencies
- `react`: ^19.2.4 - React library
- `react-dom`: ^19.2.4 - React DOM rendering
- `react-router-dom`: ^6.16.0 - Routing library
- `axios`: ^1.6.0 - HTTP client

### Development Dependencies
- `@vitejs/plugin-react`: ^6.0.1 - Vite React plugin
- `@types/react`: ^19.2.14 - TypeScript types for React
- `@types/react-dom`: ^19.2.3 - TypeScript types for React DOM
- `eslint`: ^9.39.4 - JavaScript linter
- `eslint-plugin-react-hooks`: ^7.0.1 - React hooks linting
- `eslint-plugin-react-refresh`: ^0.5.2 - React refresh linting
- `globals`: ^17.4.0 - Global variables for ESLint
- `vite`: ^8.0.4 - Build tool

## 🚀 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   - The API base URL is configured in `src/services/api.js`
   - Update the base URL if your backend is running on a different port

3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🏃 Running the Application

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Code Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Footer.jsx        # Site footer
│   │   ├── AdminBooks.jsx    # Admin book management
│   │   ├── AdminNav.jsx      # Admin navigation
│   │   ├── AdminUsers.jsx    # Admin user management
│   │   └── ErrorBoundary.jsx # Error handling
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Books.jsx         # Book catalog
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Checkout.jsx      # Checkout process
│   │   ├── Orders.jsx        # Order history
│   │   ├── Login.jsx         # User login
│   │   ├── Register.jsx      # User registration
│   │   ├── Profile.jsx       # User profile
│   │   └── AdminPanel.jsx    # Admin dashboard
│   ├── context/              # React context providers
│   │   └── AuthContext.jsx   # Authentication context
│   ├── services/             # API service functions
│   │   └── api.js            # Axios configuration
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles and variables
│   └── main.jsx              # App entry point
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## 🎨 Styling

The application uses custom CSS with modern design principles:

- **CSS Variables**: Consistent color scheme and spacing
- **Responsive Grid**: Flexible layouts that adapt to screen sizes
- **Modern Effects**: Hover animations, transitions, and shadows
- **Mobile-First**: Optimized for mobile devices first
- **Accessibility**: Proper contrast ratios and focus states

### Key Style Features
- Gradient backgrounds and buttons
- Card-based layouts with shadows
- Smooth animations and transitions
- Responsive typography
- Consistent spacing system

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px - Single column layouts, stacked elements
- **Tablet**: 768px - 1199px - Two-column grids, adjusted spacing
- **Desktop**: > 1200px - Multi-column layouts, full features

## 🔧 Key Components

### Authentication Flow
- Login/Register forms with validation
- Protected routes for authenticated users
- Admin-only routes with role checking

### Shopping Experience
- Book catalog with search and filters
- Real-time cart updates
- Secure checkout process
- Order history and tracking

### Admin Interface
- Separate admin navigation
- CRUD operations for books and users
- Analytics and reporting

## 🌐 API Integration

The frontend communicates with the Laravel backend API:

- **Base URL**: Configured in `src/services/api.js`
- **Authentication**: Bearer tokens via Laravel Sanctum
- **Error Handling**: Comprehensive error states and messages
- **Loading States**: User feedback during API calls

## 🚀 Performance

- **Vite**: Fast development and optimized builds
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Minified CSS and JS
- **Lazy Loading**: Components loaded on demand

## 🧪 Development

### Code Quality
- ESLint configuration for consistent code style
- React-specific linting rules
- TypeScript types for better development experience

### Hot Module Replacement
- Instant updates during development
- State preservation on file changes
- Fast refresh for React components

## 🤝 Contributing

1. Follow the existing code style and structure
2. Use meaningful component and variable names
3. Add proper error handling
4. Test on multiple screen sizes
5. Update documentation for new features

## 📝 License

This project is part of the BookStore application and follows the same license terms.

# Book Store Management System

A full-stack e-commerce application built with Laravel (backend) and React (frontend) for managing an online bookstore with user authentication, shopping cart, checkout, and administrative features.

## 🚀 Features

### User Features
- 🔐 User Registration and Authentication
- 📚 Browse Book Catalog with Search and Filtering
- 🛒 Shopping Cart Management
- 💳 Secure Checkout with Multiple Payment Options (Credit Card, Debit Card, Esewa, Bank Transfer)
- 📦 Order History and Tracking
- 👤 User Profile Management
- 📱 Fully Responsive Mobile Design

### Admin Features
- 📊 Admin Dashboard with Analytics
- 📝 Book Management (Add, Edit, Delete)
- 👥 User Management
- 📈 Sales Reports and Statistics
- 🔍 Advanced Search Algorithms

### Technical Features
- ⚡ Fast Search Algorithms (Linear Search, Quick Sort)
- 🎨 Modern UI with Gradient Designs
- 🔒 Secure API with Laravel Sanctum
- 📊 Database Optimization
- 🧪 Comprehensive Testing Suite

## 🛠️ Tech Stack

### Backend (Laravel)
- **Framework**: Laravel 13.0
- **PHP**: 8.3+
- **Authentication**: Laravel Sanctum 4.3
- **Database**: MySQL/PostgreSQL
- **Testing**: PHPUnit 12.5.12
- **Development Tools**:
  - Laravel Tinker 3.0
  - Laravel Pail 1.2.5
  - Laravel Pint 1.27

### Frontend (React)
- **Framework**: React 19.2.4
- **Routing**: React Router DOM 6.16.0
- **HTTP Client**: Axios 1.6.0
- **Build Tool**: Vite 8.0.4
- **Styling**: Custom CSS with Modern Design
- **Development Tools**:
  - ESLint 9.39.4
  - TypeScript Types for React

### Additional Tools
- **CSS Framework**: Tailwind CSS 4.0.0 (Backend)
- **Process Management**: Concurrently 9.0.1
- **Code Quality**: Mockery 1.6, Collision 8.6
- **Data Generation**: FakerPHP 1.23

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **PHP**: 8.3 or higher
- **Composer**: Latest version
- **Node.js**: 18+ with npm
- **MySQL/PostgreSQL**: Database server
- **Git**: Version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd book-project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=bookstore
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run database migrations and seeders
php artisan migrate --seed

# Install Node.js dependencies for backend assets
npm install

# Build backend assets (optional)
npm run build
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install

# Start development server
npm run dev
```

### 4. Running the Application

#### Development Mode (Recommended)
```bash
# From the backend directory
composer run dev
```
This will start:
- Laravel server on `http://localhost:8000`
- Vite dev server for frontend
- Queue worker
- Log monitoring

#### Manual Setup
```bash
# Terminal 1: Start Laravel backend
cd backend
php artisan serve

# Terminal 2: Start frontend dev server
cd frontend
npm run dev

# Terminal 3: Start queue worker (if needed)
cd backend
php artisan queue:work
```

### 5. Access the Application

- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:8000`
- **Admin Panel**: `http://localhost:5173/admin` (admin@example.com / password)

## 📁 Project Structure

```
book-project/
├── backend/                    # Laravel API Backend
│   ├── app/                    # Application code
│   │   ├── Http/Controllers/   # API Controllers
│   │   ├── Models/            # Eloquent Models
│   │   └── Services/          # Business logic
│   ├── database/              # Migrations & Seeders
│   ├── routes/                # API Routes
│   ├── tests/                 # PHPUnit tests
│   ├── composer.json          # PHP dependencies
│   └── package.json           # Node.js dependencies
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context
│   │   └── services/         # API services
│   ├── public/               # Static assets
│   └── package.json          # Dependencies
└── README.md                 # This file
```

## 🔧 Available Scripts

### Backend Scripts
```bash
# Install dependencies and setup
composer run setup

# Start development environment
composer run dev

# Run tests
composer run test

# Build assets
npm run build

# Start dev server for assets
npm run dev
```

### Frontend Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
php artisan test
```

### Frontend Testing
```bash
cd frontend
npm run lint
```

## 📊 Database Schema

The application uses the following main tables:
- `users` - User accounts
- `books` - Book catalog
- `cart_items` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Order line items

## 🔒 Security Features

- CSRF Protection
- SQL Injection Prevention
- XSS Protection
- Secure Authentication with Sanctum
- Input Validation and Sanitization

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section below
2. Open an issue on GitHub
3. Contact the development team

## 🔍 Troubleshooting

### Common Issues

**Database Connection Error**
- Ensure your `.env` file has correct database credentials
- Make sure the database server is running
- Run `php artisan migrate` to create tables

**Frontend Not Loading**
- Check if Vite dev server is running on port 5173
- Clear browser cache
- Run `npm install` in frontend directory

**API Authentication Issues**
- Ensure Laravel Sanctum is properly configured
- Check CORS settings in `config/cors.php`

**Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Laravel cache: `php artisan cache:clear`

## 📈 Performance

The application includes several performance optimizations:
- Database query optimization
- Efficient search algorithms
- Lazy loading of relationships
- Asset optimization with Vite
- Caching strategies

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] API rate limiting
- [ ] Real-time inventory updates

---

**Made with ❤️ for book lovers everywhere**

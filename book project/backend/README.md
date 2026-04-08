# BookStore Backend API

Laravel-based REST API for the BookStore e-commerce application.

## 🚀 Features

- **User Authentication**: Registration, login, and profile management
- **Book Management**: CRUD operations for books
- **Shopping Cart**: Add, update, remove items
- **Order Processing**: Complete checkout flow
- **Admin Panel**: User and book management
- **Search Algorithms**: Linear search and quick sort implementations
- **API Documentation**: RESTful endpoints

## 🛠️ Technology Stack

- **Laravel**: 13.0
- **PHP**: 8.3+
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Sanctum
- **Testing**: PHPUnit
- **Asset Building**: Vite + Tailwind CSS

## 📦 Dependencies

### Production Dependencies
- `laravel/framework`: ^13.0 - Core Laravel framework
- `laravel/sanctum`: ^4.3 - API authentication
- `laravel/tinker`: ^3.0 - Interactive shell

### Development Dependencies
- `fakerphp/faker`: ^1.23 - Test data generation
- `laravel/pail`: ^1.2.5 - Log monitoring
- `laravel/pint`: ^1.27 - Code style fixing
- `mockery/mockery`: ^1.6 - Mocking framework
- `nunomaduro/collision`: ^8.6 - Error handling
- `phpunit/phpunit`: ^12.5.12 - Testing framework

### Frontend Dependencies (for admin assets)
- `@tailwindcss/vite`: ^4.0.0 - Tailwind CSS integration
- `axios`: >=1.11.0 <=1.14.0 - HTTP client
- `concurrently`: ^9.0.1 - Run multiple commands
- `laravel-vite-plugin`: ^3.0.0 - Laravel Vite integration
- `tailwindcss`: ^4.0.0 - Utility-first CSS framework
- `vite`: ^8.0.0 - Fast build tool

## 🚀 Installation

1. **Install PHP dependencies**:
   ```bash
   composer install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database configuration**:
   - Update `.env` with your database credentials
   - Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

4. **Install Node.js dependencies** (for admin assets):
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode
```bash
composer run dev
```
This starts Laravel server, queue worker, and Vite dev server concurrently.

### Manual Setup
```bash
# Start Laravel server
php artisan serve

# Start queue worker (in another terminal)
php artisan queue:work

# Build/watch assets
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### Books
- `GET /api/books` - List books (with search/sort)
- `GET /api/books/{id}` - Get book details

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/checkout` - Process checkout

### Admin (requires admin role)
- `GET /api/admin/users` - List users
- `GET /api/admin/books` - List all books
- `POST /api/admin/books` - Create book
- `PUT /api/admin/books/{id}` - Update book
- `DELETE /api/admin/books/{id}` - Delete book

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter TestName
```

## 🔧 Available Commands

```bash
# Database operations
php artisan migrate
php artisan migrate:rollback
php artisan db:seed

# Cache management
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Queue management
php artisan queue:work
php artisan queue:failed

# Code quality
./vendor/bin/pint
```

## 📁 Key Files Structure

```
backend/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Models/              # Eloquent Models
│   ├── Services/            # Business Logic
│   └── Providers/           # Service Providers
├── database/
│   ├── factories/           # Model Factories
│   ├── migrations/          # Database Migrations
│   └── seeders/             # Database Seeders
├── routes/
│   └── api.php              # API Routes
├── tests/                   # Test Files
└── config/                  # Configuration Files
```

## 🔒 Security

- CSRF protection on all forms
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure password hashing
- CORS configuration

## 📊 Performance

- Database query optimization
- Eager loading of relationships
- Caching strategies
- Asset optimization

## 🤝 Contributing

1. Follow PSR-12 coding standards
2. Write tests for new features
3. Update documentation
4. Create meaningful commit messages

## 📝 License

This project is part of the BookStore application and follows the same license terms.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

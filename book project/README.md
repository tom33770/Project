# Book Store Management System

A full-stack application built with Laravel (backend) and React (frontend) for managing an online bookstore with user authentication, shopping cart, and administrative features.

## Project Structure

- **backend/**: Laravel API backend
- **frontend/**: React custom app frontend

## Tech Stack

- **Backend**: Laravel 11, MySQL/PostgreSQL, Laravel Sanctum, PHP 8.1+
- **Frontend**: React, React Router, Axios, Tailwind CSS, Shadcn/ui

## Features

1. User Authentication (Register/Login)
2. Book Catalog with Search and Sort Algorithms
3. Shopping Cart
4. Checkout and Orders
5. Admin Management
6. Algorithm Implementation (Linear Search, Quick Sort)

## Getting Started

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Documentation

See individual README files in backend/ and frontend/ folders for detailed setup instructions.

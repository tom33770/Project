#!/bin/bash
# Install Sanctum
cd /workspaces/Project/bookproject/backend
composer require laravel/sanctum

# Publish Sanctum config
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Install CORS capability through middleware (built in Laravel 11)
echo "CORS configuration will be done in config/cors.php"

<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\EsewaController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'remove']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Order routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/checkout', [OrderController::class, 'store']);
    Route::post('/payments/esewa/initiate', [EsewaController::class, 'initiate']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // Admin routes
    Route::middleware('admin')->group(function () {
        // Book management
        Route::post('/admin/books', [BookController::class, 'store']);
        Route::put('/admin/books/{id}', [BookController::class, 'update']);
        Route::delete('/admin/books/{id}', [BookController::class, 'destroy']);

        // User management
        Route::get('/admin/users', [AdminController::class, 'users']);
        Route::post('/admin/users', [AdminController::class, 'createUser']);
        Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

        // Order management
        Route::get('/admin/orders', [AdminController::class, 'orders']);
        Route::put('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);
    });
});

// eSewa callback routes
Route::match(['get', 'post'], '/payments/esewa/success', [EsewaController::class, 'success']);
Route::match(['get', 'post'], '/payments/esewa/failure', [EsewaController::class, 'failure']);

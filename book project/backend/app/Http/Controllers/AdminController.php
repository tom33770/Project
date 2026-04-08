<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get all users (admin only).
     */
    public function users(Request $request)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();

        return response()->json([
            'users' => $users,
            'count' => $users->count(),
        ]);
    }

    /**
     * Delete a user (admin only).
     */
    public function deleteUser(Request $request, $id)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->user()->id == $id) {
            return response()->json(['message' => 'Cannot delete your own user account'], 400);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Create a new user (admin only).
     */
    public function createUser(Request $request)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'user',
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    /**
     * Update a user (admin only).
     */
    public function updateUser(Request $request, $id)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }
        if (isset($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Get all books with statistics (admin only).
     */
    public function books(Request $request)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $books = Book::withCount('orderItems')->orderBy('order_items_count', 'desc')->get();
        $totalBooks = $books->count();
        $totalStock = $books->sum('stock');
        $totalSales = $books->sum('order_items_count');

        return response()->json([
            'books' => $books,
            'statistics' => [
                'total_books' => $totalBooks,
                'total_stock' => $totalStock,
                'total_sales' => $totalSales,
                'average_price' => round($books->avg('price'), 2),
            ],
        ]);
    }
}

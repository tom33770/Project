<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get current user's cart items.
     */
    public function index(Request $request)
    {
        $cartItems = $request->user()->cartItems()->with('book')->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->book->price;
        });

        return response()->json([
            'items' => $cartItems,
            'total' => $total,
            'count' => $cartItems->count(),
        ]);
    }

    /**
     * Add a book to cart.
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->where('book_id', $validated['book_id'])
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'user_id' => $request->user()->id,
                'book_id' => $validated['book_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'item' => $cartItem->load('book'),
        ], 201);
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $cartItem->update($validated);

        return response()->json([
            'message' => 'Cart item updated',
            'item' => $cartItem->load('book'),
        ]);
    }

    /**
     * Remove a cart item.
     */
    public function remove(Request $request, $id)
    {
        $cartItem = CartItem::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart',
        ]);
    }

    /**
     * Clear the entire cart.
     */
    public function clear(Request $request)
    {
        CartItem::where('user_id', $request->user()->id)->delete();

        return response()->json([
            'message' => 'Cart cleared',
        ]);
    }
}

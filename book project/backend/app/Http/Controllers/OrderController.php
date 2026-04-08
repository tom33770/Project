<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Get user's orders.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('orderItems.book')->latest()->get();

        return response()->json([
            'orders' => $orders,
            'count' => $orders->count(),
        ]);
    }

    /**
     * Create a new order (checkout).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'payment_method' => 'required|string|in:credit_card,debit_card,paypal,bank_transfer',
        ]);

        // Get cart items
        $cartItems = $request->user()->cartItems()->with('book')->get();

        if ($cartItems->count() === 0) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        // Use transaction to ensure data consistency
        try {
            return DB::transaction(function () use ($request, $validated, $cartItems) {
                // Calculate total and check stock
                $total = 0;
                foreach ($cartItems as $item) {
                    if ($item->book->stock < $item->quantity) {
                        throw new \Exception("Insufficient stock for book: {$item->book->title}");
                    }
                    $total += $item->quantity * $item->book->price;
                }

                // Create order
                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'address' => $validated['address'],
                    'payment_method' => $validated['payment_method'],
                    'total' => $total,
                    'status' => 'confirmed',
                ]);

                // Create order items and reduce stock
                foreach ($cartItems as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'book_id' => $item->book->id,
                        'quantity' => $item->quantity,
                        'price' => $item->book->price,
                    ]);

                    // Reduce book stock
                    $item->book->decrement('stock', $item->quantity);
                }

                // Clear cart
                CartItem::where('user_id', $request->user()->id)->delete();

                return response()->json([
                    'message' => 'Order created successfully',
                    'order' => $order->load('orderItems.book'),
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Order creation failed: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get a specific order.
     */
    public function show(Request $request, $id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->with('orderItems.book')
            ->firstOrFail();

        return response()->json($order);
    }

    /**
     * Update order status (admin only).
     */
    public function updateStatus(Request $request, $id)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'message' => 'Order status updated',
            'order' => $order->load('orderItems.book'),
        ]);
    }
}

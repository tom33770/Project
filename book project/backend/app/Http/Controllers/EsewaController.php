<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class EsewaController extends Controller
{
    protected function getFrontendUrl(): string
    {
        return env('FRONTEND_URL', 'http://localhost:5173');
    }

    protected function getEsewaConfig(): array
    {
        return [
            'merchant_code' => env('ESEWA_MERCHANT_CODE', 'EPAYTEST'),
            'payment_url' => env('ESEWA_PAYMENT_URL', 'https://uat.esewa.com.np/epay/main'),
            'verify_url' => env('ESEWA_VERIFY_URL', 'https://uat.esewa.com.np/epay/transrec'),
            'success_url' => env('APP_URL', 'http://localhost:8000') . '/api/payments/esewa/success',
            'failure_url' => env('APP_URL', 'http://localhost:8000') . '/api/payments/esewa/failure',
        ];
    }

    public function initiate(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'billing_address' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $cartItems = $user->cartItems()->with('book')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        return DB::transaction(function () use ($user, $validated, $cartItems) {
            $total = 0;

            foreach ($cartItems as $item) {
                if ($item->book->stock < $item->quantity) {
                    throw new \Exception("Insufficient stock for book: {$item->book->title}");
                }
                $total += $item->quantity * $item->book->price;
            }

            $order = Order::create([
                'user_id' => $user->id,
                'address' => $validated['address'],
                'payment_method' => 'esewa',
                'total' => $total,
                'status' => 'pending',
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $item->book->id,
                    'quantity' => $item->quantity,
                    'price' => $item->book->price,
                ]);

                $item->book->decrement('stock', $item->quantity);
            }

            CartItem::where('user_id', $user->id)->delete();

            $config = $this->getEsewaConfig();
            $payload = [
                'amt' => number_format($total, 2, '.', ''),
                'pdc' => 0,
                'psc' => 0,
                'txAmt' => 0,
                'tAmt' => number_format($total, 2, '.', ''),
                'pid' => 'ORDER' . $order->id,
                'scd' => $config['merchant_code'],
                'su' => $config['success_url'],
                'fu' => $config['failure_url'],
            ];

            return response()->json([
                'action_url' => $config['payment_url'],
                'payload' => $payload,
                'order_id' => $order->id,
            ]);
        });
    }

    public function success(Request $request)
    {
        $oid = $request->input('oid');
        $amt = $request->input('amt');
        $refId = $request->input('refId');

        if (!$oid || !$amt || !$refId) {
            return redirect($this->getFrontendUrl() . '/orders?esewa=invalid');
        }

        $orderId = (int) str_replace('ORDER', '', $oid);
        $order = Order::with('orderItems.book')->find($orderId);

        if (!$order || $order->status !== 'pending') {
            return redirect($this->getFrontendUrl() . '/orders?esewa=invalid');
        }

        $verified = $this->verifyPayment($oid, $amt, $refId);

        if ($verified && abs($order->total - (float) $amt) < 0.01) {
            $order->status = 'confirmed';
            $order->save();

            return redirect($this->getFrontendUrl() . '/orders?esewa=success');
        }

        $this->cancelOrder($order);

        return redirect($this->getFrontendUrl() . '/orders?esewa=failed');
    }

    public function failure(Request $request)
    {
        $oid = $request->input('oid');

        if ($oid) {
            $orderId = (int) str_replace('ORDER', '', $oid);
            $order = Order::with('orderItems.book')->find($orderId);
            if ($order && $order->status === 'pending') {
                $this->cancelOrder($order);
            }
        }

        return redirect($this->getFrontendUrl() . '/orders?esewa=cancelled');
    }

    protected function verifyPayment(string $pid, string $amt, string $refId): bool
    {
        $config = $this->getEsewaConfig();

        $response = Http::asForm()->post($config['verify_url'], [
            'amt' => $amt,
            'scd' => $config['merchant_code'],
            'pid' => $pid,
            'rid' => $refId,
        ]);

        return str_contains((string) $response->body(), 'Success');
    }

    protected function cancelOrder(Order $order): void
    {
        if ($order->status === 'cancelled') {
            return;
        }

        foreach ($order->orderItems as $item) {
            $item->book->increment('stock', $item->quantity);
        }

        $order->status = 'cancelled';
        $order->save();
    }
}

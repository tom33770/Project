<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'genre',
        'price',
        'stock',
        'cover_image',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Get the cart items for the book.
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the order items for the book.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}

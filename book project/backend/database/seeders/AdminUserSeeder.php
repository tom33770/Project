<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@bookstore.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Test User',
            'email' => 'user@bookstore.com',
            'password' => bcrypt('password123'),
            'role' => 'user',
        ]);
    }
}

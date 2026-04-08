<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'price' => 12.99,
                'stock' => 50,
                'description' => 'A classic American novel set in the Jazz Age.',
            ],
            [
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee',
                'price' => 14.99,
                'stock' => 45,
                'description' => 'A gripping tale of racial injustice and childhood innocence.',
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'price' => 13.99,
                'stock' => 60,
                'description' => 'A dystopian novel about totalitarianism.',
            ],
            [
                'title' => 'Pride and Prejudice',
                'author' => 'Jane Austen',
                'price' => 11.99,
                'stock' => 55,
                'description' => 'A romantic novel about love and social class.',
            ],
            [
                'title' => 'The Catcher in the Rye',
                'author' => 'J.D. Salinger',
                'price' => 10.99,
                'stock' => 40,
                'description' => 'A coming-of-age story about teenage rebellion.',
            ],
            [
                'title' => 'The Hobbit',
                'author' => 'J.R.R. Tolkien',
                'price' => 15.99,
                'stock' => 70,
                'description' => 'An adventure story about a hobbit\'s unexpected journey.',
            ],
            [
                'title' => 'Harry Potter and the Sorcerer\'s Stone',
                'author' => 'J.K. Rowling',
                'price' => 16.99,
                'stock' => 100,
                'description' => 'A magical adventure in the world of wizards.',
            ],
            [
                'title' => 'The Lord of the Rings',
                'author' => 'J.R.R. Tolkien',
                'price' => 24.99,
                'stock' => 30,
                'description' => 'An epic fantasy adventure.',
            ],
            [
                'title' => 'Brave New World',
                'author' => 'Aldous Huxley',
                'price' => 13.99,
                'stock' => 50,
                'description' => 'A dystopian novel about consumerism and control.',
            ],
            [
                'title' => 'Jane Eyre',
                'author' => 'Charlotte Brontë',
                'price' => 12.99,
                'stock' => 45,
                'description' => 'A gothic romance novel about independence and love.',
            ],
            [
                'title' => 'Wuthering Heights',
                'author' => 'Emily Brontë',
                'price' => 11.99,
                'stock' => 35,
                'description' => 'A dark romance on the Yorkshire moors.',
            ],
            [
                'title' => 'The Picture of Dorian Gray',
                'author' => 'Oscar Wilde',
                'price' => 9.99,
                'stock' => 40,
                'description' => 'A philosophical novel about art, beauty, and morality.',
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    /**
     * Get all books with optional search and sort.
     */
    public function index(Request $request)
    {
        $books = Book::all();
        $metadata = [];

        // Perform linear search if query is provided
        if ($request->has('search') && !empty($request->search)) {
            $searchResult = $this->bookService->linearSearch($books, $request->search);
            $books = collect($searchResult['results']);
            $metadata = [
                'algorithm_used' => $searchResult['algorithm'],
                'execution_time_ms' => $searchResult['execution_time_ms'],
                'results_count' => $searchResult['count'],
            ];
        }

        // Perform sort if sort params are provided
        if ($request->has('sort') && !empty($request->sort) && in_array($request->sort, ['price', 'title'])) {
            $direction = $request->get('direction', 'asc');
            $sortResult = $this->bookService->quickSort($books, $request->sort, $direction);
            $books = collect($sortResult['results']);
            $metadata['algorithm_used'] = $sortResult['algorithm'];
            $metadata['sort_field'] = $sortResult['field'];
            $metadata['sort_direction'] = $sortResult['direction'];
            $metadata['execution_time_ms'] = $sortResult['execution_time_ms'] ?? 0;
        }

        return response()->json([
            'books' => $books,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Get a single book by ID.
     */
    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    /**
     * Create a new book (admin only).
     */
    public function store(Request $request)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book,
        ], 201);
    }

    /**
     * Update a book (admin only).
     */
    public function update(Request $request, $id)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'author' => 'string|max:255',
            'genre' => 'nullable|string|max:255',
            'price' => 'numeric|min:0',
            'stock' => 'integer|min:0',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $book->update($validated);

        return response()->json([
            'message' => 'Book updated successfully',
            'book' => $book,
        ]);
    }

    /**
     * Delete a book (admin only).
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully',
        ]);
    }
}

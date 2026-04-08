<?php

namespace App\Services;

use Illuminate\Support\Collection;

class BookService
{
    /**
     * Linear search to find books by title or author.
     * Time Complexity: O(n)
     */
    public function linearSearch(Collection $books, string $query): array
    {
        $startTime = microtime(true);
        $results = [];

        foreach ($books as $book) {
            if (
                stripos($book->title, $query) !== false ||
                stripos($book->author, $query) !== false ||
                stripos($book->genre ?? '', $query) !== false
            ) {
                $results[] = $book;
            }
        }

        $executionTime = round((microtime(true) - $startTime) * 1000, 2);

        return [
            'results' => $results,
            'algorithm' => 'Linear Search',
            'execution_time_ms' => $executionTime,
            'count' => count($results),
        ];
    }

    /**
     * Quick sort implementation for books.
     * Time Complexity: O(n log n) average case
     */
    public function quickSort(Collection $books, string $field, string $direction = 'asc'): array
    {
        $startTime = microtime(true);

        $array = $books->toArray();
        $sortedArray = $this->quickSortHelper($array, 0, count($array) - 1, $field, $direction);

        $executionTime = round((microtime(true) - $startTime) * 1000, 2);

        return [
            'results' => $sortedArray,
            'algorithm' => 'Quick Sort',
            'field' => $field,
            'direction' => strtoupper($direction),
            'execution_time_ms' => $executionTime,
            'count' => count($sortedArray),
        ];
    }

    /**
     * Quick sort helper function.
     */
    private function quickSortHelper(&$array, int $low, int $high, string $field, string $direction): array
    {
        if ($low < $high) {
            $pi = $this->partition($array, $low, $high, $field, $direction);

            $this->quickSortHelper($array, $low, $pi - 1, $field, $direction);
            $this->quickSortHelper($array, $pi + 1, $high, $field, $direction);
        }

        return $array;
    }

    /**
     * Partition function for quick sort.
     */
    private function partition(&$array, int $low, int $high, string $field, string $direction): int
    {
        $pivot = $array[$high];
        $i = $low - 1;

        for ($j = $low; $j < $high; $j++) {
            $comparison = $this->compareValues(
                $array[$j][$field] ?? $array[$j]->{$field},
                $pivot[$field] ?? $pivot->{$field}
            );

            $shouldSwap = ($direction === 'asc' && $comparison < 0) ||
                          ($direction === 'desc' && $comparison > 0);

            if ($shouldSwap) {
                $i++;
                [$array[$i], $array[$j]] = [$array[$j], $array[$i]];
            }
        }

        [$array[$i + 1], $array[$high]] = [$array[$high], $array[$i + 1]];

        return $i + 1;
    }

    /**
     * Compare values for sorting.
     */
    private function compareValues($a, $b): int
    {
        if (is_numeric($a) && is_numeric($b)) {
            return $a <=> $b;
        }

        return strcmp((string)$a, (string)$b);
    }
}

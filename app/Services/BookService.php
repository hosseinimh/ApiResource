<?php

namespace App\Services;

use App\Models\Book as Entity;
use App\Http\Resources\BookResource as EntityResource;

class BookService extends Service
{
    public function __construct()
    {
        $this->entityResource = EntityResource::class;
    }

    public function get($bookId)
    {
        $book = Entity::get($bookId) ?? null;

        return $this->handleGet($book);
    }

    public function getPagination($name, $categoryId, $page)
    {
        $name = strlen($name) > 0 ? $name : null;
        $categoryId = ($categoryId = intval($categoryId)) > 0 ? $categoryId : 0;
        $books = Entity::getPagination($name, $categoryId, $page) ?? null;

        return $this->handleGetItems($books);
    }

    public function store($name, $description, $extraInfo, $categoryId, $tags)
    {
        $tags = (is_array($tags) && count($tags) > 0) ? implode('#', $tags) : null;
        $data = [
            'name' => $name,
            'image' => null,
            'description' => $description,
            'extra_info' => $extraInfo,
            'category_id' => $categoryId,
            'tags' => $tags,
        ];
        $book = Entity::create($data);
        $result = $this->handleStore($book);

        if ($book) {
            $result['entity'] = $book;
        }

        return $result;
    }

    public function update($bookId, $name, $description, $extraInfo, $categoryId, $tags)
    {
        $book = Entity::get($bookId);

        if (!$book) {
            return $this->handleItemNotFound();
        }

        $tags = (is_array($tags) && count($tags) > 0) ? '#' . implode('#', $tags) : null;
        $data = [
            'name' => $name,
            'description' => $description,
            'extra_info' => $extraInfo,
            'category_id' => $categoryId,
            'tags' => $tags,
        ];
        $updated = $book->update($data);
        $result = $this->handleUpdate($updated);

        if ($updated) {
            $result['entity'] = $book;
        }

        return $result;
    }
}

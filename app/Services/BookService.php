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

        return $this->handleGetPagination($books);
    }

    public function store($name, $image, $description, $extraInfo, $categoryId, $tags)
    {
        $tags = (is_array($tags) && count($tags) > 0) ? implode('#', $tags) : null;
        $data = [
            'name' => $name,
            'image' => $image,
            'description' => $description,
            'extraInfo' => $extraInfo,
            'categoryId' => $categoryId,
            'tags' => $tags,
        ];
        $result = Entity::create($data);

        return $this->handleStore($result);
    }

    public function update($categoryId, $title)
    {
        $category = Entity::get($categoryId);

        if (!$category) {
            return $this->handleItemNotFound();
        }

        $data = [
            'title' => $title,
        ];
        $result = $category->update($data);

        return $this->handleUpdate($result);
    }
}

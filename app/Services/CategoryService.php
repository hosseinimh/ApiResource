<?php

namespace App\Services;

use App\Models\Category as Entity;
use App\Http\Resources\CategoryResource as EntityResource;
use App\Models\Error;

class CategoryService extends Service
{
    public function __construct()
    {
        $this->entityResource = EntityResource::class;
    }

    public function get($categoryId)
    {
        $category = Entity::get($categoryId) ?? null;

        return $this->handleGet($category);
    }

    public function getPagination($title, $page)
    {
        $categories = Entity::getPagination($title, $page) ?? null;

        return $this->handleGetItems($categories);
    }

    public function getAll()
    {
        $categories = Entity::getAll() ?? null;

        return $this->handleGetItems($categories);
    }

    public function store($title)
    {
        $data = [
            'title' => $title,
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

    public function remove($categoryId)
    {
        $category = Entity::get($categoryId);

        if (!$category) {
            return $this->handleItemNotFound();
        }

        $bookService = new BookService();

        foreach ($category->books as $book) {
            $bookService->removeByEntity($book);
        }

        return $this->handleDelete($category->delete());
    }
}

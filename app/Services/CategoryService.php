<?php

namespace App\Services;

use App\Models\Category as Entity;
use App\Http\Resources\CategoryResource as EntityResource;

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

        return $this->handleGetPagination($categories);
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
}

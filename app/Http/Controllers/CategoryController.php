<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\GetCategoryRequest;
use App\Http\Requests\Category\IndexCategoriesRequest;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

class CategoryController extends Controller
{
    public function index(IndexCategoriesRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->title, $request->page));
    }

    public function show(GetCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->get($request->id));
    }

    public function store(StoreCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->store($request->title));
    }

    public function update(UpdateCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->update($request->id, $request->title));
    }
}

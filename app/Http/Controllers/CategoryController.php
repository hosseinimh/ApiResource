<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\GetCategoryRequest;
use App\Http\Requests\Category\IndexCategoriesRequest;
use App\Http\Requests\Category\RemoveCategoryRequest;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(IndexCategoriesRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->title, $request->page));
    }

    public function indexApi()
    {
        $data = $this->service->getAll();

        if ($data && array_key_exists('items', $data)) {
            return $this->handleJsonResponse($data['items'], 200, false, true);
        }

        return $this->handleJsonResponse([], 200, false, true);
    }

    public function getAll()
    {
        return $this->handleJsonResponse($this->service->getAll());
    }

    public function show(GetCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->get($request->id));
    }

    public function showApi(Request $request)
    {
        $id = $request->id ? intval($request->id) : 0;

        if ($id > 0) {
            $data = $this->service->get($request->id);

            if ($data && array_key_exists('item', $data)) {
                return $this->handleJsonResponse($data['item'], 200, false, true);
            }
        }

        return $this->handleJsonResponse(null, 200, false, true);
    }

    public function store(StoreCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->store($request->title));
    }

    public function update(UpdateCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->update($request->id, $request->title));
    }

    public function remove(RemoveCategoryRequest $request)
    {
        return $this->handleJsonResponse($this->service->remove($request->id));
    }
}

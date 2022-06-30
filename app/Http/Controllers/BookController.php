<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\GetBookRequest;
use App\Http\Requests\Book\IndexBooksRequest;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;

class BookController extends Controller
{
    public function index(IndexBooksRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->name, $request->category_id, $request->page));
    }

    public function show(GetBookRequest $request)
    {
        return $this->handleJsonResponse($this->service->get($request->id));
    }

    public function store(StoreBookRequest $request)
    {
        return $this->handleJsonResponse($this->service->store($request->name, $request->image, $request->description, $request->extra_info, $request->category_id, $request->tags));
    }

    public function update(UpdateBookRequest $request)
    {
        return $this->handleJsonResponse($this->service->update($request->id, $request->name, $request->image, $request->description, $request->extra_info, $request->category_id, $request->tags));
    }
}

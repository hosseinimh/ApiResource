<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\GetBookRequest;
use App\Http\Requests\Book\IndexBooksRequest;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;
use App\Services\CategoryService;

class BookController extends Controller
{
    public function index(IndexBooksRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->name, $request->category_id, $request->page));
    }

    public function show(GetBookRequest $request)
    {
        $data = $this->service->get($request->id);
        $categories = (new CategoryService())->getAll();

        if (array_key_exists('items', $categories)) {
            $data['categories'] = $categories['items'];
        }

        return $this->handleJsonResponse($data);
    }

    public function store(StoreBookRequest $request)
    {
        $result = $this->service->store($request->name, $request->description, $request->extra_info, $request->category_id, $request->tags);

        if (array_key_exists('entity', $result)) {
            $uploadResult = (new FileUploaderController())->uploadBookImage($request, $result['entity']);
            $result['uploaded'] = $uploadResult['uploaded'];
            $result['uploadedText'] = $uploadResult['uploadedText'];

            unset($result['entity']);
        }

        return $this->handleJsonResponse($result);
    }

    public function update(UpdateBookRequest $request)
    {
        $result = $this->service->update($request->id, $request->name, $request->description, $request->extra_info, $request->category_id, $request->tags);

        if (array_key_exists('entity', $result)) {
            $uploadResult = (new FileUploaderController())->uploadBookImage($request, $result['entity']);
            $result['uploaded'] = $uploadResult['uploaded'];
            $result['uploadedText'] = $uploadResult['uploadedText'];

            unset($result['entity']);
        }

        return $this->handleJsonResponse($result);
    }
}

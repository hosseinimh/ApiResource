<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\GetBookRequest;
use App\Http\Requests\Book\IndexBooksRequest;
use App\Http\Requests\Book\RemoveBookRequest;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Returns a list of paginated books.
     *
     * @param  App\Http\Requests\Book\IndexBooksRequest $request
     * @return Illuminate\Http\JsonResponse
     * @throws Illuminate\Validation\ValidationException when $request is not matching the format.
     * @method POST
     */
    public function index(IndexBooksRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->name, $request->category_id, $request->page));
    }

    /**
     * Returns a list of all books.
     *
     * @param  App\Http\Requests\Book\IndexBooksRequest $request
     * @return json
     * @method GET
     */
    public function indexApi()
    {
        $data = $this->service->getAll();

        if ($data && array_key_exists('items', $data)) {
            return $this->handleJsonResponse($data['items'], 200, false, true);
        }

        return $this->handleJsonResponse([], 200, false, true);
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

    public function remove(RemoveBookRequest $request)
    {
        return $this->handleJsonResponse($this->service->remove($request->id));
    }
}

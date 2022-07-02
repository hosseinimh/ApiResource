<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\GetUserRequest;
use App\Http\Requests\User\IndexUsersRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    public function index(IndexUsersRequest $request)
    {
        return $this->handleJsonResponse($this->service->getPagination($request->username, $request->name, $request->page));
    }

    public function show(GetUserRequest $request)
    {
        return $this->handleJsonResponse($this->service->get($request->id));
    }

    public function getAuth(Request $request)
    {
        return $this->handleJsonResponse($this->service->getAuth());
    }

    public function update(UpdateUserRequest $request)
    {
        return $this->handleJsonResponse($this->service->update($request->id, $request->name, $request->family));
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        return $this->handleJsonResponse($this->service->changePassword($request->id, $request->new_password));
    }

    public function login(LoginRequest $request)
    {
        $result = $this->service->login($request->username, $request->password);

        if ($result['_result'] === '0') {
            return $this->handleJsonResponse($result, 200, false);
        }

        return $this->handleJsonResponse($result);
    }

    public function logout()
    {
        return $this->handleJsonResponse($this->service->logout());
    }
}

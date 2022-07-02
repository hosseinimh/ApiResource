<?php

namespace App\Services;

use App\Constants\ErrorCodes;
use App\Models\User as Entity;
use App\Http\Resources\UserResource as EntityResource;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService extends Service
{
    public function __construct()
    {
        $this->entityResource = EntityResource::class;
    }

    public function get($userId)
    {
        $user = Entity::get($userId) ?? null;

        return $this->handleGet($user);
    }

    public function getAuth()
    {
        $user = Entity::get(auth('api')->user()->id) ?? null;

        return $this->handleGet($user);
    }

    public function getPagination($username, $nameFamily, $page)
    {
        $users = Entity::getPagination($username, $nameFamily, $nameFamily, $page) ?? null;

        return $this->handleGetItems($users);
    }

    public function update($userId, $name, $family)
    {
        $user = Entity::get($userId);

        if (!$user) {
            return $this->handleItemNotFound();
        }

        $data = [
            'name' => $name,
            'family' => $family,
        ];
        $result = $user->update($data);

        return $this->handleUpdate($result);
    }

    public function changePassword($userId, $password)
    {
        $user = Entity::get($userId);

        if (!$user) {
            return $this->handleItemNotFound();
        }

        Entity::updatePassword($userId, Hash::make($password));

        return $this->handleOK();
    }

    public function login($username, $password, $guard = 'api')
    {
        if (!$token = auth($guard)->attempt(['username' => $username, 'password' => $password])) {
            return $this->handleError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCodes::USER_NOT_FOUND]);
        }

        return $this->handleOK(['_token' => $this->createNewToken($guard, $token)]);
    }

    public function logout($guard = null)
    {
        auth($guard)->logout();
        JWTAuth::invalidate(JWTAuth::parseToken());

        return $this->handleOK();
    }

    public function refresh($guard = 'api')
    {
        return $this->createNewToken($guard, auth($guard)->refresh());
    }

    protected function createNewToken($guard, $token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth($guard)->factory()->getTTL() * 1,
            'user' => new EntityResource(Entity::get(auth($guard)->user()->id))
        ];
    }
}

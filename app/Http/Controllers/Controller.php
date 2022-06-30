<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCodes;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Helpers\Helper;
use App\Services\Service;
use App\Services\UserService;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $service;

    public function __construct(Service $service = null)
    {
        date_default_timezone_set('Asia/Tehran');

        $this->service = $service;
    }

    public function handleJsonResponse($data, $statusCode = 200, $hasToken = true)
    {
        $array = [];

        foreach ($data as $key => $value) {
            $array[$key] = $value;
        }

        if ($hasToken) {
            $array['_token'] = (new UserService())->refresh();
        }

        return response()->json($array, $statusCode);
    }
}

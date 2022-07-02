<?php

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

Route::get('initialize', [Controller::class, 'initialize']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');

<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// auth users
Route::middleware(['cors', 'jwt', 'user'])->group(function () {
    Route::post('dashboard/review', [DashboardController::class, 'review']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show', [UserController::class, 'show']);
    Route::post('users/get_auth', [UserController::class, 'getAuth']);
    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/change_password', [UserController::class, 'changePassword']);
    Route::post('users/logout', [UserController::class, 'logout']);

    Route::post('categories', [CategoryController::class, 'index']);
    Route::post('categories/get_all', [CategoryController::class, 'getAll']);
    Route::post('categories/show', [CategoryController::class, 'show']);
    Route::post('categories/store', [CategoryController::class, 'store']);
    Route::post('categories/update', [CategoryController::class, 'update']);

    Route::post('books', [BookController::class, 'index']);
    Route::post('books/show', [BookController::class, 'show']);
    Route::post('books/store', [BookController::class, 'store']);
    Route::post('books/update', [BookController::class, 'update']);
});

// not auth users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
});

<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Services\BookService;
use App\Services\CategoryService;
use App\Services\DashboardService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(DashboardService::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController($app->make(UserService::class));
        });

        $this->app->bind(CategoryController::class, function ($app) {
            return new CategoryController($app->make(CategoryService::class));
        });

        $this->app->bind(BookController::class, function ($app) {
            return new BookController($app->make(BookService::class));
        });
    }
}

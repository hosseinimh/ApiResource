<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Services\Service;
use App\Services\UserService;
use Illuminate\Support\Facades\Artisan;

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

    public function initialize()
    {
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        echo 'Cache cleared successfully.';
        echo '<br/>';

        $files = glob(storage_path('app') . '/public/img/books/*');

        foreach ($files as $file) {
            if (is_file($file)) {
                @unlink($file);
            }
        }

        echo 'Old uploaded files deleted successfully.';
        echo '<br/>';

        Artisan::call('storage:link');
        echo 'Symbolic links created successfully.';
        echo '<br/>';

        Artisan::call('migrate:fresh');
        echo 'Database tables created successfully.';
        echo '<br/>';

        User::factory()->create();
        echo '1 user created successfully.';
        echo '<br/>';

        Category::factory()->count(5)
            ->has(Book::factory()->count(3))
            ->create();
        echo '5 categories created successfully.';
        echo '<br/>';
        echo '15 books created successfully.';

        echo '<br/>';
        echo '<br/>';
        echo '****';
        echo '<br/>';
        echo '<b>Username: admin</b>';
        echo '<br/>';
        echo '<b>Password: 1234</b>';
        echo '<br/>';
        echo '****';
        echo '<br/>';
        echo '<br/>';

        echo 'READY TO GO!';
        echo '<br/>';
    }
}

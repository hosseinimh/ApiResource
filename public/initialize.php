<?php

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

echo 'Initialize the project with fake data ...';
echo '<br/>';

try {
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

    echo 'Uploaded files deleted successfully.';
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
    echo '****';
    echo '<br/>';
    echo '<b>Username: admin</b>';
    echo '<br/>';
    echo '<b>Password: 1234</b>';
    echo '****';
    echo '<br/>';

    echo 'READY TO GO!';
    echo '<br/>';
} catch (\Exception $e) {
    die($e->getMessage());
}

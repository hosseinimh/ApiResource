<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Artisan::call('migrate:fresh');
        $this->command->info('Database tables were created successfully.');
        $this->command->info('');

        User::factory()->create();
        $this->command->info('1 user was created successfully.');

        Category::factory()->count(5)
            ->has(Book::factory()->count(3))
            ->create();
        $this->command->info('5 categories were created successfully.');
        $this->command->info('15 books were created successfully.');

        $this->command->info('');
        $this->command->info('****');
        $this->command->line('Username: admin');
        $this->command->line('Password: 1234');
        $this->command->info('****');
        $this->command->info('');
    }
}

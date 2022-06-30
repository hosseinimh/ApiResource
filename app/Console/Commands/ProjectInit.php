<?php

namespace App\Console\Commands;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class ProjectInit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initial project with fake data';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Artisan::call('migrate:fresh');
        $this->info('Tables created successfully.');
        $this->info('');

        $userData = [
            'username' => '123456',
            'password' => '1234',
            'name' => 'Mahmoud',
            'family' => 'Hosseini',
        ];

        User::create($userData);
        $this->info('1 user created successfully.');

        Category::factory()->count(5)->create()->each(function ($category) {
            Book::factory()
                ->count(3)
                ->for($category)
                ->create();
        });
        $this->info('5 categories created successfully.');
        $this->info('15 books created successfully.');

        $this->info('');
        $this->info('****');
        $this->line('Username: 123456');
        $this->line('Password: 1234');
        $this->info('****');
        $this->info('');

        return Command::SUCCESS;
    }
}

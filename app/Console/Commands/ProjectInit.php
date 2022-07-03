<?php

namespace App\Console\Commands;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
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
    protected $description = 'Initialize the project with fake data ...';

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
        $this->comment($this->description);
        $this->info('');

        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        $this->info('Cache was cleared successfully.');
        $this->info('');

        $files = glob(storage_path('app') . '/public/img/books/*');

        foreach ($files as $file) {
            if (is_file($file)) {
                @unlink($file);
            }
        }

        $this->info('Old uploaded files were deleted successfully.');
        $this->info('');

        Artisan::call('storage:link');
        $this->info('Symbolic links were created successfully.');
        $this->info('');

        Artisan::call('migrate:fresh');
        $this->info('Database tables were created successfully.');
        $this->info('');

        User::factory()->create();
        $this->info('1 user was created successfully.');

        Category::factory()->count(5)
            ->has(Book::factory()->count(3))
            ->create();
        $this->info('5 categories were created successfully.');
        $this->info('15 books were created successfully.');

        $this->info('');
        $this->info('****');
        $this->line('Username: admin');
        $this->line('Password: 1234');
        $this->info('****');
        $this->info('');

        $this->comment('READY TO GO!');
        $this->info('');

        return Command::SUCCESS;
    }
}

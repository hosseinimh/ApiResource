<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;

class DashboardService extends Service
{
    public function review()
    {
        $items = ['users' => User::getUsersCount(), 'categories' => Category::getCategoriesCount(), 'books' => Book::getBooksCount()];

        return $this->handleOK(['items' => $items]);
    }
}

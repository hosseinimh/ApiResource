<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_books';
    protected $fillable = [
        'name',
        'image',
        'description',
        'extra_info',
        'category_id',
        'tags',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function get($id)
    {
        return self::where('id', $id)->first();
    }

    public static function getPagination($name, $categoryId, $page)
    {
        if ($categoryId === 0) {
            return self::where('name', 'LIKE', '%' . $name . '%')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
        }

        return self::where('name', 'LIKE', '%' . $name . '%')->where('category_id', $categoryId)->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getAll()
    {
        return self::orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getBooksCount()
    {
        return self::count();
    }
}

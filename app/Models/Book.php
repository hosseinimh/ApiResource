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

    public static function getPagination($title, $page)
    {
        return self::where('title', 'LIKE', '%' . $title . '%')->orderBy('title', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getBooksCount()
    {
        return self::count();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_categories';
    protected $fillable = [
        'title',
    ];

    public function books()
    {
        return $this->hasMany(Category::class);
    }

    public static function get($id)
    {
        return self::where('id', $id)->first();
    }

    public static function getPagination($title, $page)
    {
        return self::where('title', 'LIKE', '%' . $title . '%')->orderBy('title', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getCategoriesCount()
    {
        return self::count();
    }
}

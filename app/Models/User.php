<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_users';
    protected $fillable = [
        'username',
        'password',
        'name',
        'family',
        'access_token',
    ];

    protected $hidden = [
        'password',
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public static function updatePassword($id, $password)
    {
        return DB::statement("UPDATE `tbl_users` SET password='$password' WHERE id=$id");
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function get($id)
    {
        return self::where('id', $id)->first();
    }

    public static function getPagination($username, $name, $family, $page)
    {
        return self::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getAll()
    {
        return self::orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public static function getUsersCount()
    {
        return self::count();
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use App\Constants\ErrorCodes;
use App\Constants\UserTypes;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

// 'investee|person_investor|company_investor' type users

class UserAuthMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = User::get(JWTAuth::parseToken()->authenticate()->id);

            if (!$user) {
                throw new \Exception(__('user.user_not_found'));
            }
        } catch (\Exception $e) {
            return response()->json(['_result' => '0', '_error' => $e->getMessage(), '_errorCode' => ErrorCodes::SERVER_ERROR], 200);
        }

        return $next($request);
    }
}

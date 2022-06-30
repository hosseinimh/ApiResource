<?php

namespace App\Http\Middleware;

use Closure;
use App\Constants\ErrorCodes;
use App\Models\Error;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
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
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                throw new \Exception(__('user.user_not_found'));
            }
        } catch (\Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['_result' => '0', '_error' => __('token.token_invalid'), '_errorCode' => ErrorCodes::TOKEN_INVALID]);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['_result' => '0', '_error' => __('token.token_expired'), '_errorCode' => ErrorCodes::TOKEN_EXPIRED]);
            } else {
                if ($e->getMessage() === __('user.user_not_found')) {
                    return response()->json(['_result' => 0, '_error' => __('user.user_not_found'), '_errorCode' => ErrorCodes::USER_NOT_FOUND]);
                }

                return response()->json(['_result' => '0', '_error' => __('token.token_not_found'), '_errorCode' => ErrorCodes::TOKEN_NOT_FOUND]);
            }
        }

        return $next($request);
    }
}
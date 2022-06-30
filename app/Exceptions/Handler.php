<?php

namespace App\Exceptions;

use App\Constants\ErrorCodes;
use App\Models\Error;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof UnauthorizedHttpException) {
            $preException = $exception->getPrevious();

            if ($preException instanceof TokenExpiredException) {
                return response()->json(['_result' => '0', '_error' => __('token.token_expired'), '_errorCode' => ErrorCodes::TOKEN_EXPIRED], 200);
            } else if ($preException instanceof TokenInvalidException) {
                return response()->json(['_result' => '0', '_error' => __('token.token_invalid'), '_errorCode' => ErrorCodes::TOKEN_INVALID], 200);
            } else if ($preException instanceof TokenBlacklistedException) {
                return response()->json(['_result' => '0', '_error' => ErrorCodes::TOKEN_BLACK_LISTED, '_errorCode' => ErrorCodes::TOKEN_BLACK_LISTED], 200);
            }

            if ($exception->getMessage() === __('token.token_not_found')) {
                return response()->json(['_result' => '0', '_error' => __('token.token_not_found'), '_errorCode' => ErrorCodes::TOKEN_NOT_PROVIDED], 200);
            } else if ($exception->getMessage() === __('user.user_not_found')) {
                return response()->json(['_result' => '0', '_error' => __('user.user_not_found'), '_errorCode' => ErrorCodes::USER_NOT_FOUND], 200);
            }
        } else if ($exception instanceof ValidationException) {
            return $exception->getResponse();
        }

        $this->storeError($exception);

        return response()->json(['_result' => '0', '_error' => __('general.server_error'), '_errorCode' => ErrorCodes::SERVER_ERROR], 200);
    }

    private function storeError($exception)
    {
        try {
            $message = 'url: ' . url()->current();
            $message .= "
" . $exception->__toString();

            foreach (getallheaders() as $name => $value) {
                $message .= "
$name: $value";
            }

            Error::create(['message' => $message]);
        } catch (\Exception) {
        }
    }
}

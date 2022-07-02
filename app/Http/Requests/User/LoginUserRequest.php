<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class LoginUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::USER_NOT_FOUND], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'username' => 'required|min:5|max:50',
            'password' => 'required|digits:4',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => __('user.username_required'),
            'username.min' => __('user.username_min'),
            'username.max' => __('user.username_max'),
            'password.required' => __('user.password_required'),
            'password.numeric' => __('user.password_numeric'),
            'password.digits' => __('user.password_digits'),
        ];
    }
}

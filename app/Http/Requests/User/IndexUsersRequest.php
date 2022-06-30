<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexUsersRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'username' => 'numeric|gt:0',
            'name' => 'max:50',
            'page' => 'numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'username.numeric' => __('user.username_numeric'),
            'username.gt' => __('user.username_gt'),
            'name.max' => __('user.name_max'),
            'page.numeric' => __('general.page_numeric'),
            'page.gt' => __('general.page_gt'),
        ];
    }
}

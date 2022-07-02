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
            'username' => 'max:50',
            'name' => 'max:50',
            'page' => 'numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'username.max' => __('user.username_max'),
            'name.max' => __('user.name_max'),
            'page.numeric' => __('general.page_numeric'),
            'page.gt' => __('general.page_gt'),
        ];
    }
}

<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class GetUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::FORM_INPUT_INVALID], 200);
        
        throw new ValidationException($validator, $response);
    }
    
    public function rules()
    {
        return [
            'id' => 'required|numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => __('user.id_required'),
            'id.numeric' => __('user.id_numeric'),
            'id.gt' => __('user.id_gt'),
        ];
    }
}
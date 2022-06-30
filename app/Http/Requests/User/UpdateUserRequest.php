<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'id' => 'required|numeric|gt:0',
            'name' => 'required|min:3|max:50',
            'family' => 'required|min:3|max:50',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => __('user.id_required'),
            'id.numeric' => __('user.id_numeric'),
            'id.gt' => __('user.id_gt'),
            'name.required' => __('user.name_required'),
            'name.min' => __('user.name_min'),
            'name.max' => __('user.name_max'),
            'family.required' => __('user.family_required'),
            'family.min' => __('user.family_min'),
            'family.max' => __('user.family_max'),
        ];
    }
}

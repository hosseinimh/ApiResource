<?php

namespace App\Http\Requests\Category;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class GetCategoryRequest extends FormRequest
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
            'id.required' => __('category.id_required'),
            'id.numeric' => __('category.id_numeric'),
            'id.gt' => __('category.id_gt'),
        ];
    }
}

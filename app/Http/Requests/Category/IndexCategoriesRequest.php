<?php

namespace App\Http\Requests\Category;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexCategoriesRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'title' => 'max:50',
            'page' => 'numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'title.max' => __('category.title_max'),
            'page.numeric' => __('general.page_numeric'),
            'page.gt' => __('general.page_gt'),
        ];
    }
}

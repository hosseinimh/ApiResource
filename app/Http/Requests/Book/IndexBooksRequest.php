<?php

namespace App\Http\Requests\Book;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexBooksRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCodes::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'max:50',
            'category_id' => 'numeric|gt:0',
            'page' => 'numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'name.max' => __('book.name_max'),
            'category_id.numeric' => __('book.category_id_numeric'),
            'category_id.gt' => __('book.category_id_gt'),
            'page.numeric' => __('general.page_numeric'),
            'page.gt' => __('general.page_gt'),
        ];
    }
}

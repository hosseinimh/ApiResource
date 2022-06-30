<?php

namespace App\Http\Requests\Book;

use App\Constants\ErrorCodes;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateBookRequest extends FormRequest
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
            'image' => 'max:50',
            'description' => 'max:1000',
            'extra_info' => 'max:1000',
            'category_id' => 'required|numeric|gt:0',
            'tags' => 'max:1000',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => __('book.id_required'),
            'id.numeric' => __('book.id_numeric'),
            'id.gt' => __('book.id_gt'),
            'name.required' => __('book.name_required'),
            'name.min' => __('book.name_min'),
            'name.max' => __('book.name_max'),
            'image.max' => __('book.image_max'),
            'description.max' => __('book.description_max'),
            'extra_info.max' => __('book.extra_info_max'),
            'category_id.required' => __('book.category_id_required'),
            'category_id.numeric' => __('book.category_id_numeric'),
            'category_id.gt' => __('book.category_id_gt'),
            'tags.max' => __('book.tags_max'),
        ];
    }
}

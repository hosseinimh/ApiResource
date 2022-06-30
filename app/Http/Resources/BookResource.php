<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'image' => $this->image ?? null,
            'description' => $this->description ?? null,
            'extraInfo' => $this->extra_info ?? null,
            'categoryId' => intval($this->category_id),
            'categoryTite' => $this->category->title,
            'tags' => $this->tags ?? null,
        ];
    }
}

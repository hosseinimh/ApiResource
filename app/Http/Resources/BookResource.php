<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Constants\Theme;

class BookResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'image' => $this->image ? Theme::BASE_URL . 'img/books/' . $this->image : '',
            'description' => $this->description ?? '',
            'extraInfo' => $this->extra_info ?? '',
            'categoryId' => intval($this->category_id),
            'categoryTite' => $this->category->title,
            'tags' => $this->tags ? $this->getTagsArray($this->tags) : null,
            'tagsText' => $this->tags ? $this->getTagsText($this->tags) : '',
        ];
    }

    private function getTagsArray($tags)
    {
        return array_filter(explode('#', $tags));
    }

    private function getTagsText($tags)
    {
        return trim(str_replace('#', ' #', $tags));
    }
}

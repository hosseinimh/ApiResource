<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => $this->name ?? '',
            'family' => $this->family ?? '',
        ];
    }
}

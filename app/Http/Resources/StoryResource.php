<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'genres' => $this->genres,
            'tags' => $this->tags,
            'creator' => $this->creator->name,
            'created_at' => Carbon::parse($this->created_at)->format('jS F, Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('jS F, Y'),
        ];
    }
}

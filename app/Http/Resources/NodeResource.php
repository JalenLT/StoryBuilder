<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [];

        switch ($this->type) {
            case 'character':
                $data = $this->character;
                break;
            case 'setting':
                $data = $this->setting;
                break;
            case 'feature':
                $data = $this->feature;
                break;
            case 'scene':
                $data = $this->scene;
                $data->points = $this->scene->points;
                break;
        }

        return [
            'id' => 'block:' . $this->id,
            'position' => $this->position,
            'type' => $this->type,
            'data' => $data
        ];
    }
}

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
                $character = $this->character;
                $data = [
                    'id' => $character->id,
                    'first_name' => [
                        'value' => $character->first_name,
                        'type' => 'string'
                    ],
                    'last_name' => [
                        'value' => $character->last_name,
                        'type' => 'string'
                    ],
                    'alias' => [
                        'value' => $character->alias,
                        'type' => 'string'
                    ],
                    'age' => [
                        'value' => $character->age,
                        'type' => 'integer'
                    ],
                    'gender' => [
                        'value' => $character->gender,
                        'type' => 'select',
                        'options' => 'gender'
                    ],
                    'description' => [
                        'value' => $character->description,
                        'type' => 'text'
                    ],
                    'background' => [
                        'value' => $character->background,
                        'type' => 'text'
                    ],
                    'motivation' => [
                        'value' => $character->motivation,
                        'type' => 'text'
                    ],
                    'story_id' => $character->story_id,
                    'setting_id' => $character->setting_id,
                    'creator_id' => $character->creator_id
                ];
                break;
            case 'setting':
                $setting = $this->setting;

                $data = [
                    'id' => $setting->id,
                    'name' => [
                        'value' => $setting->name,
                        'type' => 'string'
                    ],
                    'description' => [
                        'value' => $setting->description,
                        'type' => 'text'
                    ],
                    'world' => [
                        'value' => $setting->world,
                        'type' => 'string',
                    ],
                    'climate' => [
                        'value' => $setting->climate,
                        'type' => 'select',
                        'options' => 'climate'
                    ],
                    'era' => [
                        'value' => $setting->era,
                        'type' => 'select',
                        'options' => 'era'
                    ],
                    'story_id' => [
                        'value' => $setting->story_id,
                        'type' => 'integer'
                    ],
                ];
                break;
            case 'feature':
                $feature = $this->feature;

                $data = [
                    'id' => $feature->id,
                    'name' => [
                        'value' => $feature->name,
                        'type' => 'string'
                    ],
                    'description' => [
                        'value' => $feature->description,
                        'type' => 'text'
                    ],
                    'type' => [
                        'value' => $feature->type,
                        'type' => 'string',
                    ],
                    'story_id' => [
                        'value' => $feature->story_id,
                        'type' => 'integer'
                    ],
                ];
                break;
            case 'scene':
                $scene = $this->scene;

                $data = [
                    'id' => $scene->id,
                    'title' => [
                        'value' => $scene->title,
                        'type' => 'string'
                    ],
                    'points' => [
                        'points' => [],
                        'type' => 'array'
                    ],
                    'creator_id' => $scene->creator_id,
                    'story_id' => $scene->story_id,
                    'setting_id' => $scene->setting_id,
                ];

                foreach($scene->points() as $point){
                    $data['points']['points'][] = [
                        'id' => $point->id,
                        'text' => [
                            'value' => $point->text,
                            'type' => 'string'
                        ],
                        'creator_id' => $point->creator_id
                    ];
                }
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

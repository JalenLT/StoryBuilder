<?php

namespace App\Actions\Feature;

use App\Models\Story;
use App\Models\User;
use App\Models\Feature;

class CreateFeatureAction{
    public function __invoke(array $data, Story $story){
        return Feature::create([
            'name' => $data['name'],
            'type' => $data['type'],
            'description' => $data['description'],
            'story_id' => $story->id
        ]);
    }
}

<?php

namespace App\Actions\Block;

use App\Models\User;
use App\Models\Scene;

class CreateSceneAction{
    public function __invoke(array $data, User $user){
        return Scene::create([
            'title' => $data['title'],
            'creator_id' => $user->id,
            'story_id' => $data['story_id'],
        ]);
    }
}

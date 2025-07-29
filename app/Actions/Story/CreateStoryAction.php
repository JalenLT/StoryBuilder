<?php

namespace App\Actions\Story;

use App\Models\Story;
use App\Models\User;

class CreateStoryAction{
    public function __invoke(array $data, User $user){
        return Story::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'creator_id' => $user->id
        ]);
    }
}

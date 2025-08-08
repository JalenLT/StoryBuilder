<?php

namespace App\Actions\Block;

use App\Models\User;
use App\Models\Block;

class CreateBlockAction{
    public function __invoke(array $data, User $user){
        return Block::create([
            'title' => $data['title'],
            'creator_id' => $user->id,
            'story_id' => $data['story_id'],
            'setting_id' => $data['setting_id']
        ]);
    }
}

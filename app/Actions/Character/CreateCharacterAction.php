<?php

namespace App\Actions\Character;

use App\Models\User;
use App\Models\Character;

class CreateCharacterAction{
    public function __invoke(array $data, User $user){
        return Character::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'alias' => $data['alias'],
            'description' => $data['description'],
            'background' => $data['background'],
            'age' => $data['age'],
            'gender' => $data['gender'],
            'motivation' => $data['motivation'],
            'story_id' => $data['story_id'],
            'setting_id' => $data['setting_id'],
            'creator_id' => $user->id
        ]);
    }
}

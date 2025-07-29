<?php

namespace App\Actions\Setting;

use App\Models\User;
use App\Models\Setting;

class CreateSettingAction{
    public function __invoke(array $data, User $user){
        return Setting::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'world' => $data['world'] ?? null,
            'era' => $data['era'] ?? null,
            'climate' => $data['climate'] ?? null,
            'creator_id' => $user->id,
            'story_id' => $data['story_id']
        ]);
    }
}

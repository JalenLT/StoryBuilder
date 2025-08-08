<?php

namespace App\Actions\Point;

use App\Models\User;
use App\Models\Point;

class CreatePointAction{
    public function __invoke(array $data, User $user){
        return Point::create([
            'text' => $data['text'],
            'created_by' => $user->id
        ]);
    }
}

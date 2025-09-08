<?php

namespace App\Actions\Edge;

use App\Models\User;
use App\Models\Edge;

class CreateEdgeAction{
    public function __invoke(array $data, User $user){
        return Edge::create([
            'source' => $data['source'],
            'target' => $data['target'],
            'type' => $data['type'],
            'label' => $data['label'] ?? '',
            'story_id' => $data['story_id']
        ]);
    }
}

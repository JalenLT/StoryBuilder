<?php

namespace App\Actions\Node;

use App\Models\User;
use App\Models\Node;

class CreateNodeAction{
    public function __invoke(array $data, User $user){
        $node = Node::create([
            'position' => $data['position'],
            'type' => $data['type'],
            'story_id' => $data['story_id']
        ]);

        switch($data["type"]){
            case "character":
                $node->character()->create([
                    'first_name' => '',
                    'last_name' => '',
                    'alias' => '',
                    'description' => '',
                    'background' => '',
                    'age' => -1,
                    'gender' => '',
                    'motivation' => '',
                ]);
                break;
            case "setting":
                $node->setting()->create([
                    'name' => '',
                    'description' => '',
                    'world' => '',
                    'era' => '',
                    'climate' => '',
                    'creator_id' => $user->id,
                ]);
                break;
            case "feature":
                $node->feature()->create([
                    'name' => '',
                    'type' => '',
                    'description' => '',
                ]);
                break;
            case "scene":
                $node->scene()->create([
                    'title' => '',
                    'creator_id' => $user->id,
                ]);
                break;
        }

        return $node;
    }
}

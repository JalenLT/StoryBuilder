<?php

namespace App\Actions\Node;

use App\Models\User;
use App\Models\Node;
use Illuminate\Support\Facades\DB;

class UpdateNodeAction{
    public function __invoke(array $data, User $user): Node{
        $node = Node::findOrFail($data['id']);

        return DB::transaction(function() use($node, $data){
            $node->position = $data['position'];
            $node->save();
            return $node;
        });
    }
}


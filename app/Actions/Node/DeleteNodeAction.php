<?php

namespace App\Actions\Node;

use App\Models\User;
use App\Models\Node;

class DeleteNodeAction{
    public function __invoke(array $data, User $user){
        $node = Node::findOrFail($data['id']);
        $node->delete();
    }
}


<?php

namespace App\Actions\Edge;

use App\Models\User;
use App\Models\Edge;

class DeleteEdgeAction{
    public function __invoke(array $data, User $user){
        $edge = Edge::findOrFail($data['id']);
        $edge->delete();
    }
}


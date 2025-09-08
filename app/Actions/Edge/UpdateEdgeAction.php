<?php

namespace App\Actions\Edge;

use App\Models\User;
use App\Models\Edge;
use Illuminate\Support\Facades\DB;

class UpdateEdgeAction{
    public function __invoke(array $data, User $user): Edge{
        $edge = Edge::findOrFail($data['id']);

        return DB::transaction(function() use($edge, $data){
            $edge->type = $data['type'];
            $edge->label = $data['label'] ?? '';
            $edge->save();
            return $edge;
        });
    }
}


<?php

namespace App\Actions\Character;

use Illuminate\Support\Facades\DB;

class CreateCharacterRelationshipAction{
    public function __invoke(array $data){
        return DB::transaction(function() use($data){
           $row = DB::table('character_relationships')
           ->returning('*')
           ->insert([
               'character_a_id' => $data['character_a_id'],
               'character_b_id' => $data['character_b_id'],
               'type' => $data['type'],
               'notes' => $data['notes']
           ]);

           return $row[0] ?? null;
        });
    }
}

<?php

namespace App\Actions\Block;

use App\Models\User;
use App\Models\Block;
use Illuminate\Support\Facades\DB;

class CreateBlockConnectionAction{
    public function __invoke(array $data, User $user){
        return DB::transaction(function() use($data){
            $rows = DB::table('block_connections')
            ->returning('*')
            ->insert([
               'block_a_id' => $data['block_a_id'],
               'block_b_id' => $data['block_b_id'],
               'notes' => $data['notes']
            ]);

            return $rows[0] ?? null;
        });
    }
}

<?php

namespace App\Actions\Character;

use InvalidArgumentException;
use Illuminate\Support\Facades\DB;

class CreateCharacterInvolvementsAction{
    public function __invoke(array $data){
        return DB::transaction(function () use ($data) {
            // determine which involvable was provided
            if (! empty($data['setting_id'])) {
                $type = \App\Models\Setting::class;
                $involvableId = $data['setting_id'];
            } elseif (! empty($data['feature_id'])) {
                $type = \App\Models\Feature::class;
                $involvableId = $data['feature_id'];
            } elseif (! empty($data['block_id'])) {
                $type = \App\Models\Block::class;
                $involvableId = $data['block_id'];
            } else {
                throw new InvalidArgumentException('You must supply one of setting_id, feature_id or block_id.');
            }

            $now = now();
            // insert and get its new primary key
            $newId = DB::table('character_involvements')->insertGetId([
                'character_id'    => $data['character_id'],
                'involvable_type' => $type,
                'involvable_id'   => $involvableId
            ]);

            // return the complete row
            return DB::table('character_involvements')
                     ->where('id', $newId)
                     ->first();
        });
    }
}

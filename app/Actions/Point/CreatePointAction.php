<?php

namespace App\Actions\Point;

use App\Models\User;
use App\Models\Point;
use Illuminate\Support\Facades\DB;

class CreatePointAction{
    public function __invoke(array $data, User $user){
        $point = Point::create([
            'text' => $data['text'],
            'created_by' => $user->id
        ]);

        DB::transaction(function() use($point, $data){
            $index = DB::table('block_points')->where('block_id', $data['block_id'])->count() + 1;

            DB::table('block_points')->insert([
                'block_id' => $data['block_id'],
                'point_id' => $point->id,
                'index' => $index
            ]);
        });

        return $point;
    }
}

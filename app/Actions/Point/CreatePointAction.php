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
            $index = DB::table('scene_points')->where('scene_id', $data['scene_id'])->count() + 1;

            DB::table('scene_points')->insert([
                'scene_id' => $data['scene_id'],
                'point_id' => $point->id,
                'index' => $index
            ]);
        });

        return $point;
    }
}

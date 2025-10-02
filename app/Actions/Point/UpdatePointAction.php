<?php

namespace App\Actions\Point;

use App\Models\User;
use App\Models\Point;
use Illuminate\Support\Facades\DB;

class UpdatePointAction{
    public function __invoke(array $data, User $user): Point{
        $point = Point::find($data['id']);

        if(is_null($point)){
            if($data["text"] == null){
                $data["text"] = "";
            }
            $point = Point::create([
                'text' => $data['text'],
                'creator_id' => $user->id
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
        }else{
            return DB::transaction(function() use($point, $data){
                $point->text = $data['text'];
                $point->save();
                return $point;
            });
        }
    }
}


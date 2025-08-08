<?php

namespace App\Actions\Point;

use App\Models\User;
use App\Models\Point;
use Illuminate\Support\Facades\DB;

class UpdatePointAction{
    public function __invoke(array $data, User $user): Point{
        $point = Point::findOrFail($data['id']);

        return DB::transaction(function() use($point, $data){
            $point->text = $data['text'];
            $point->save();
            return $point;
        });
    }
}


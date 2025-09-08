<?php

namespace App\Actions\Block;

use App\Models\User;
use App\Models\Scene;
use Illuminate\Support\Facades\DB;

class UpdateSceneAction{
    public function __invoke(array $data, User $user): Scene{
        $scene = Scene::findOrFail($data['id']);

        return DB::transaction(function() use($scene, $data){
            $scene->title = $data['title'];
            $scene->save();
            return $scene;
        });
    }
}


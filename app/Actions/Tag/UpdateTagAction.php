<?php

namespace App\Actions\Tag;

use App\Models\User;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class UpdateTagAction{
    public function __invoke(array $data): Tag{
        $tag = Tag::findOrFail($data['id']);

        return DB::transaction(function() use($tag, $data){
            $tag->name = $data['name'];
            $tag->description = $data['description'];
            $tag->image = $data['image'];
            $tag->save();
            return $tag;
        });
    }
}


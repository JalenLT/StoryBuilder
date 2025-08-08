<?php

namespace App\Actions\Story;

use App\Models\User;
use App\Models\Story;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class UpdateStoryTagsAction{
    public function __invoke(array $data, User $user){
        $story = Story::findOrFail($data['story_id']);

        return DB::transaction(function() use($story, $data){
            $story->tags()->sync($data['tags']);
            return $story->tags()->get();
        });
    }
}

<?php

namespace App\Actions\Story;

use App\Models\Story;
use App\Models\User;

class UpdateStoryTagsAction{
    public function __invoke(array $data, User $user){
        $story = Story::findOrFail($data['story_id']);

        abort_unless($user->can('update', $story), 403);

        return DB::transaction(function() use($story, $data){
            $story->tags()->sync($data['tags']);
            return $story->tags()->get();
        });
    }
}

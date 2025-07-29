<?php

namespace App\Policies;

use App\Models\Story;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('stories.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Story $story): bool
    {
        return $user->getAttribute('id') === $story->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('stories.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Story $story): bool
    {
        return $user->getAttribute('id') === $story->getAttribute('creator_id') && $user->can('stories.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Story $story): bool
    {
        return $user->getAttribute('id') === $story->getAttribute('creator_id') && $user->can('stories.delete');
    }
}

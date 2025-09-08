<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Scene;
use App\Models\Story;

class ScenePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('scenes.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Scene $scene): bool
    {
        return $user->getAttribute('id') === $scene->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Story $story): bool
    {
        return $user->can('scenes.create') && $user->getAttribute('id') === $story->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Scene $scene): bool
    {
        return $user->getAttribute('id') === $scene->getAttribute('creator_id') && $user->can('scenes.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Scene $scene): bool
    {
        return $user->getAttribute('id') === $scene->getAttribute('creator_id') && $user->can('scenes.delete');
    }
}

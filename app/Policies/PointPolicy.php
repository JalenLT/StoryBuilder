<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Point;
use App\Models\Story;

class PointPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('points.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Point $point): bool
    {
        return $user->getAttribute('id') === $point->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Story $story): bool
    {
        return $user->can('points.create') && $user->getAttribute('id') === $story->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Point $point): bool
    {
        return $user->getAttribute('id') === $point->getAttribute('creator_id') && $user->can('points.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Point $point): bool
    {
        return $user->getAttribute('id') === $point->getAttribute('creator_id') && $user->can('stories.delete');
    }
}

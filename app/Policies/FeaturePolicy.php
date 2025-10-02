<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Feature;

class FeaturePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('features.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Feature $feature): bool
    {
        return $user->getAttribute('id') === $feature->story->creator_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('features.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Feature $feature): bool
    {
        return $user->getAttribute('id') === $feature->story->creator_id && $user->can('features.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Feature $feature): bool
    {
        return $user->getAttribute('id') === $feature->story->creator_id && $user->can('features.delete');
    }
}

<?php

namespace App\Policies;

use App\Models\User;

class GenrePolicy
{
    public function create(User $user): bool
    {
        return $user->can('genres.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->can('genres.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->can('genres.delete');
    }
}

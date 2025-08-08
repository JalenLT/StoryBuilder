<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Character;

class CharacterPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('characters.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Character $character): bool
    {
        return $user->getAttribute('id') === $character->creator_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('characters.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Character $character): bool
    {
        return $user->getAttribute('id') === $character->creator_id && $user->can('characters.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Character $character): bool
    {
        return $user->getAttribute('id') === $character->creator_id && $user->can('characters.delete');
    }
}

<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Block;
use App\Models\Story;

class BlockPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('blocks.viewAny');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Block $block): bool
    {
        return $user->getAttribute('id') === $block->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Story $story): bool
    {
        return $user->can('blocks.create') && $user->getAttribute('id') === $story->getAttribute('creator_id');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Block $block): bool
    {
        return $user->getAttribute('id') === $block->getAttribute('creator_id') && $user->can('blocks.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Block $block): bool
    {
        return $user->getAttribute('id') === $block->getAttribute('creator_id') && $user->can('blocks.delete');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CharacterInvolvement extends Model
{
    protected $fillable = [
        'character_id',
    ];

    /** Inverse of character_id FK */
    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function involvable()
    {
        return $this->morphTo();
    }
}

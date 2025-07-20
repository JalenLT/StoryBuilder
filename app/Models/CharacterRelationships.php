<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CharacterRelationships extends Model
{
    protected $fillable = [
        'character_a_id',
        'character_b_id',
        'type',
        'notes',
    ];

    public function characterA()
    {
        return $this->belongsTo(Character::class, 'character_a_id');
    }

    public function characterB()
    {
        return $this->belongsTo(Character::class, 'character_b_id');
    }
}

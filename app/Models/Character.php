<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'alias',
        'description',
        'background',
        'age',
        'gender',
        'motivation',
        'story_id',
        'setting_id',
        'character_id',
    ];

    public function story(){
        return $this->belongsTo(Story::class, 'story_id');
    }

    public function setting(){
        return $this->belongsTo(Setting::class, 'id', 'setting_id');
    }

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function involvements()
    {
        return $this->hasMany(CharacterInvolvement::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $fillable = [
        'title',
        'creator_id',
        'story_id',
        'setting_id',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function story()
    {
        return $this->belongsTo(Story::class, 'story_id');
    }

    public function setting(){
        return $this->hasOne(Setting::class, 'id', 'setting_id');
    }

    public function characterInvolvements()
    {
        return $this->morphMany(CharacterInvolvement::class, 'involvable');
    }
}

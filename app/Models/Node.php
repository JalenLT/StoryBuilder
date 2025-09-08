<?php

namespace App\Models;

use App\Models\Story;
use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
    protected $fillable = [
        'position',
        'type',
        'story_id'
    ];

    protected $casts = [
        'position' => 'array'
    ];

    public function story()
    {
        return $this->belongsTo(Story::class);
    }

    public function character()
    {
        return $this->hasOne(Character::class);
    }

    public function setting()
    {
        return $this->hasOne(Setting::class);
    }

    public function feature()
    {
        return $this->hasOne(Feature::class);
    }

    public function scene()
    {
        return $this->hasOne(Scene::class);
    }
}

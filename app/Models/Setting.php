<?php

namespace App\Models;

use App\Models\User;
use App\Models\Feature;
use App\Models\Character;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'name',
        'description',
        'world',
        'era',
        'climate',
        'creator_id',
        'story_id',
        'node_id'
    ];

    public function node(){
        return $this->belongsTo(Node::class, 'node_id');
    }

    public function features(){
        return $this->belongsToMany(Feature::class, 'setting_features', 'setting_id', 'feature_id');
    }

    public function characters(){
        return $this->hasMany(Character::class, 'setting_id');
    }

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function story(){
        return $this->belongsTo(Story::class, 'story_id');
    }
}

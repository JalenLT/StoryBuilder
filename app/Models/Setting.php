<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'name',
        'description',
        'world',
        'era',
        'climate'
    ];

    public function blocks(){
        return $this->belongsToMany(Block::class);
    }

    public function features(){
        return $this->belongsToMany(Feature::class, 'setting_features', 'setting_id', 'feature_id');
    }

    public function characters(){
        return $this->hasMany(Character::class, 'setting_id');
    }
}

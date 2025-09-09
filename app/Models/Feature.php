<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'name',
        'type',
        'description',
        'story_id',
        'node_id'
    ];

    public function node(){
        return $this->belongsTo(Node::class, 'node_id');
    }

    public function settings(){
        return $this->belongsToMany(Setting::class, 'setting_features', 'feature_id', 'setting_id');
    }

    public function story(){
        return $this->belongsTo(Story::class);
    }
}

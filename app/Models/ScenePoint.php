<?php

namespace App\Models;

use App\Models\Point;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;

class ScenePoint extends Model
{
    protected $fillable = [
        'scene_id',
        'point_id',
        'index'
    ];

    public function scene(){
        return $this->belongsTo(Scene::class);
    }

    public function point(){
        return $this->belongsTo(Point::class);
    }
}

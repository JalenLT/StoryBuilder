<?php

namespace App\Models;

use App\Models\User;
use App\Models\Story;
use Illuminate\Database\Eloquent\Model;

class Scene extends Model
{
    protected $fillable = [
        'title',
        'creator_id',
        'story_id',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function story()
    {
        return $this->belongsTo(Story::class, 'story_id');
    }

    public function points(){
        $scenePoints = ScenePoint::where('scene_id', $this->id)->orderBy('index')->get();

        $points = [];
        foreach($scenePoints as $scenePoint){
            $points[] = $scenePoint->point;
        }

        return $points;
    }
}

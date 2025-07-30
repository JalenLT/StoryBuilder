<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image'
    ];

    public function stories(){
        return $this->belongsToMany(Story::class, 'story_tags', 'tag_id', 'story_id');
    }
}

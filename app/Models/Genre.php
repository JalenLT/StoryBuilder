<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = [
        'name',
        'description',
        'icon'
    ];

    public function stories()
    {
        return $this->belongsToMany(Story::class, 'story_genres', 'genre_id', 'story_id');
    }
}

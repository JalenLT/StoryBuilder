<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = [
        'title',
        'description',
        'creator_id'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function genres(){
        return $this->belongsToMany(Genre::class, 'story_genres', 'story_id', 'genre_id');
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'story_tags', 'story_id', 'tag_id');
    }

    public function blocks(){
        return $this->hasMany(Block::class, 'story_id');
    }

    public function characters(){
        return $this->hasMany(Character::class, 'story_id');
    }

    public function settings(){
        return $this->hasMany(Setting::class, 'story_id');
    }
}

<?php

namespace App\Models;

use App\Models\Tag;
use App\Models\Edge;
use App\Models\Node;
use App\Models\User;
use App\Models\Genre;
use App\Models\Feature;
use App\Models\Setting;
use App\Models\Character;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = [
        'title',
        'description',
        'creator_id'
    ];

    public function nodes(){
        return $this->hasMany(Node::class, 'story_id');
    }

    public function edges(){
        return $this->hasMany(Edge::class, 'story_id');
    }

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

    public function characters(){
        return $this->hasMany(Character::class, 'story_id');
    }

    public function settings(){
        return $this->hasMany(Setting::class, 'story_id');
    }

    public function features(){
        return $this->hasMany(Feature::class, 'story_id');
    }
}

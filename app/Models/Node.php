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
}

<?php

namespace App\Models;

use App\Models\Story;
use Illuminate\Database\Eloquent\Model;

class Edge extends Model
{
    protected $fillable = [
        'source',
        'target',
        'type',
        'label',
        'story_id'
    ];

    public function story()
    {
        return $this->belongsTo(Story::class);
    }
}

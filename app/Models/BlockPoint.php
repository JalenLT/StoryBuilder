<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlockPoint extends Model
{
    protected $fillable = [
        'block_id',
        'point_id',
        'index'
    ];

    public function block(){
        return $this->belongsTo(Block::class);
    }

    public function point(){
        return $this->belongsTo(Point::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlockConnection extends Model
{
    protected $fillable = [
        'block_a_id',
        'block_b_id',
        'notes',
    ];

    public function blockA()
    {
        return $this->belongsTo(Block::class, 'block_a_id');
    }

    public function blockB()
    {
        return $this->belongsTo(Block::class, 'block_b_id');
    }
}

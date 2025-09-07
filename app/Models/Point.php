<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    protected $fillable = [
        'text',
        'creator_id'
    ];

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }
}

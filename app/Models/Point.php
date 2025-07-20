<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    protected $fillable = [
        'text',
        'created_by'
    ];

    public function creator(){
        return $this->belongsTo(User::class, 'created_by');
    }

    public function characterInvolvements()
    {
        return $this->morphMany(CharacterInvolvement::class, 'involvable');
    }
}

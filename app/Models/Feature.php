<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'name',
        'type',
        'description',
    ];

    public function settings(){
        return $this->belongsToMany(Setting::class, 'setting_features', 'feature_id', 'setting_id');
    }
}

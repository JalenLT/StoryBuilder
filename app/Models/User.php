<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Point;
use App\Models\Scene;
use App\Models\Story;
use App\Models\Setting;
use App\Models\Character;
use App\Models\Attachment;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function stories(){
        return $this->hasMany(Story::class);
    }

    public function attachments(){
        return $this->hasMany(Attachment::class);
    }

    public function scenes(){
        return $this->hasMany(Scene::class);
    }

    public function points(){
        return $this->hasMany(Point::class);
    }

    public function characters(){
        return $this->hasMany(Character::class);
    }

    public function settings(){
        return $this->hasMany(Setting::class);
    }
}

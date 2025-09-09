<?php

namespace App\Actions\Character;

use App\Models\User;
use App\Models\Character;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class UpdateCharacterAction{
    public function __invoke(array $data, User $user): Character{
        $character = Character::findOrFail($data['id']);

        return DB::transaction(function() use($character, $data){
            $character->first_name = $data['first_name'];
            $character->last_name = $data['last_name'];
            $character->alias = $data['alias'];
            $character->description = $data['description'];
            $character->background = $data['background'];
            $character->age = $data['age'];
            $character->gender = $data['gender'];
            $character->motivation = $data['motivation'];
            if(isset($data["setting_id"])) $character->setting_id = $data['setting_id'];
            $character->save();
            return $character;
        });
    }
}

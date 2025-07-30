<?php

namespace App\Actions\Feature;

use App\Models\User;
use App\Models\Feature;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class UpdateFeatureAction{
    public function __invoke(array $data, User $user): Feature{
        $feature = Feature::findOrFail($data['id']);

        abort_unless($user->can('update', $feature), 403);

        return DB::transaction(function() use($feature, $data){
            $feature->name = $data['name'];
            $feature->description = $data['description'];
            $feature->type = $data['type'];
            $feature->save();
            return $feature;
        });
    }
}

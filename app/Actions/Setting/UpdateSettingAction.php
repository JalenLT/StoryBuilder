<?php

namespace App\Actions\Setting;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class UpdateSettingAction{
    public function __invoke(array $data, User $user): Setting{
        $setting = Setting::findOrFail($data['id']);

        return DB::transaction(function() use($setting, $data){
            $setting->name = $data['name'];
            $setting->description = $data['description'];
            $setting->world = $data['world'] ?? null;
            $setting->era = $data['era'] ?? null;
            $setting->climate = $data['climate'] ?? null;
            $setting->save();
            return $setting;
        });
    }
}

<?php

namespace App\Actions\Setting;

use Illuminate\Support\Facades\DB;

class CreateSettingFeatureAction{
    public function __invoke(array $data){
        return DB::transaction(function() use($data){
            $rows = DB::table('setting_features')
            ->returning('*')
            ->insert([
                'setting_id' => $data['setting_id'],
                'feature_id' => $data['feature_id']
            ]);

            return $rows[0] ?? null;
        });
    }
}

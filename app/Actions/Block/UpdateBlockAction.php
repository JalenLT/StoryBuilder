<?php

namespace App\Actions\Block;

use App\Models\User;
use App\Models\Block;
use Illuminate\Support\Facades\DB;

class UpdateBlockAction{
    public function __invoke(array $data, User $user): Block{
        $block = Block::findOrFail($data['id']);

        return DB::transaction(function() use($block, $data){
            $block->title = $data['title'];
            $block->setting_id = $data['setting_id'];
            $block->save();
            return $block;
        });
    }
}


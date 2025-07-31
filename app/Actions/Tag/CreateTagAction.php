<?php

namespace App\Actions\Tag;

use App\Models\Tag;

class CreateTagAction{
    public function __invoke($data){
        return Tag::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'image' => $data['image']
        ]);
    }
}

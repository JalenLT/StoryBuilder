<?php

namespace App\Actions\Genre;

use App\Models\Genre;

class CreateGenreAction
{
    public function __invoke(array $data){
        return Genre::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'image' => $data['image']
        ]);
    }
}

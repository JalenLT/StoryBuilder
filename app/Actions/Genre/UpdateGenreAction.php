<?php

namespace App\Actions\Genre;

use App\Models\User;
use App\Models\Genre;
use Illuminate\Support\Facades\DB;

class UpdateGenreAction{
    public function __invoke(array $data, User $user): Genre{
        $genre = Genre::findOrFail($data['id']);

        return DB::transaction(function() use($genre, $data){
            $genre->name = $data['name'];
            $genre->description = $data['description'];
            $genre->image = $data['image'];
            $genre->save();
            return $genre;
        });
    }
}


<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use App\Actions\Genre\CreateGenreAction;
use App\Actions\Genre\UpdateGenreAction;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;

class GenreController extends Controller
{
    public function getAll(){
        $genres = Genre::all();

        return response()->json([
            'message' => 'Genres retrieved successfully',
            'data' => $genres
        ], 200);
    }

    public function store(StoreGenreRequest $request, CreateGenreAction $createGenreAction){
        $genre = $createGenreAction($request->validated());

        return response()->json([
            'message' => 'Genre created successfully',
            'data' => $genre
        ], 201);
    }

    public function update(UpdateGenreRequest $request, UpdateGenreAction $updateGenreAction){
        $genre = $updateGenreAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Genre updated successfully',
            'data' => $genre
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Actions\Tag\CreateTagAction;
use App\Actions\Tag\UpdateTagAction;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;

class TagController extends Controller
{
    public function getAll(){
        $tags = Tag::all();

        return response()->json([
            'message' => 'Tags retrieved successfully',
            'data' => $tags
        ]);
    }

    public function store(StoreTagRequest $request, CreateTagAction $createTagAction){
        $tag = $createTagAction($request->validated());

        return response()->json([
            'message' => 'Tag created successfully',
            'data' => $tag
        ], 201);
    }

    public function update(UpdateTagRequest $request, UpdateTagAction $updateTagAction){
        $tag = $updateTagAction($request->validated());

        return response()->json([
            'message' => 'Tag updated successfully',
            'data' => $tag
        ], 200);
    }
}

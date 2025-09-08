<?php

namespace App\Http\Controllers;

use App\Actions\Block\CreateSceneAction;
use App\Actions\Block\CreateBlockConnectionAction;
use App\Actions\Block\UpdateSceneAction;
use App\Http\Requests\StoreBlockConnectionRequest;
use App\Http\Requests\StoreSceneRequest;
use App\Http\Requests\UpdateSceneRequest;
use App\Models\Story;
use App\Http\Requests\GetSceneRequest;
use App\Http\Requests\GetStoryScenesRequest;
use App\Models\Scene;

class SceneController extends Controller
{
    public function get(GetSceneRequest $request, $id){
        $scene = Scene::find($id);

        return response()->json([
            'message' => 'Scene returned successfully',
            'data' => $scene
        ]);
    }

    public function getAllPerStory(GetStoryScenesRequest $request, $id){
        $story = Story::find($id);

        return response()->json([
            'message' => 'Scenes retrieved successfully',
            'data' => $story->scenes
        ], 200);
    }

    public function store(StoreSceneRequest $request, CreateSceneAction $createSceneAction){
        $scene = $createSceneAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Scene created successfully',
            'data' => $scene
        ], 201);
    }

    public function update(UpdateSceneRequest $request, UpdateSceneAction $updateSceneAction){
        $scene = $updateSceneAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Scene updated successfully',
            'data' => $scene
        ], 200);
    }
}

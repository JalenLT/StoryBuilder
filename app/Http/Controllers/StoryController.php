<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\StoryResource;
use App\Http\Requests\GetStoryRequest;
use App\Actions\Story\CreateStoryAction;
use App\Http\Requests\StoreStoryRequest;
use App\Actions\Story\UpdateStoryTagsAction;
use App\Http\Requests\UpdateStoryTagsRequest;
use App\Actions\Story\UpdateStoryGenresAction;
use App\Http\Requests\UpdateStoryGenresRequest;

class StoryController extends Controller
{

    public function getStory(GetStoryRequest $request, $id)
    {
        $story = Story::findOrFail($id);

        return response()->json([
            'message' => 'Story retrieved successfully',
            'data' => new StoryResource($story)
        ]);
    }

    public function getCurrentUserStories()
    {
        $stories = Auth::user()->stories()->get();

        return response()->json([
            'message' => 'User stories retrieved successfully',
            'data' => StoryResource::collection($stories)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoryRequest $request, CreateStoryAction $createStory)
    {
        $story = $createStory($request->validated(), $request->user());

        return response()->json([
            'message' => 'Story created successfully',
            'data' => new StoryResource($story)
        ], 201);
    }

    public function updateGenres(UpdateStoryGenresRequest $request, UpdateStoryGenresAction $updateStoryGenres){
        $genres = $updateStoryGenres($request->validated(), $request->user());

        return response()->json([
            'message' => 'Story genres updated successfully',
            'data' => $genres
        ], 200);
    }

    public function updateTags(UpdateStoryTagsRequest $request, UpdateStoryTagsAction $updateStoryTags){
        $tags = $updateStoryTags($request->validated(), $request->user());

        return response()->json([
            'message' => 'Story tags updated successfully',
            'data' => $tags
        ], 200);
    }
}

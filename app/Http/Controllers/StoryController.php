<?php

namespace App\Http\Controllers;

use App\Http\Resources\StoryResource;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Actions\Story\CreateStoryAction;
use App\Http\Requests\StoreStoryRequest;

class StoryController extends Controller
{
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

    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Story $story)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        //
    }
}

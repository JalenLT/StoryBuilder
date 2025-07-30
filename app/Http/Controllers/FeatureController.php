<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\Feature;
use Illuminate\Http\Request;
use App\Http\Requests\GetFeatureRequest;
use App\Http\Requests\StoreFeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;
use App\Actions\Feature\CreateFeatureAction;
use App\Actions\Feature\UpdateFeatureAction;
use App\Http\Requests\GetStoryFeaturesRequest;

class FeatureController extends Controller
{
    public function get(GetFeatureRequest $request, $id){
        $feature = Feature::find($id);

        return response()->json([
            'message' => 'Feature retrieved successfully',
            'data' => $feature
        ], 200);
    }

    public function getAllPerStory(GetStoryFeaturesRequest $request, $id){
        $story = Story::find($id);

        return response()->json([
            'message' => 'Features retrieved successfully',
            'data' => $story->features
        ], 200);
    }

    public function store(StoreFeatureRequest $request, CreateFeatureAction $createFeatureAction){
        $feature = $createFeatureAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Feature created successfully',
            'data' => $feature
        ], 201);
    }

    public function update(UpdateFeatureRequest $request, UpdateFeatureAction $updateFeatureAction){
        $feature = $updateFeatureAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Feature updated successfully',
            'data' => $feature
        ], 200);
    }
}

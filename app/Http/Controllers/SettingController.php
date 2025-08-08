<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\Setting;
use App\Http\Requests\GetSettingRequest;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Actions\Setting\CreateSettingAction;
use App\Actions\Setting\UpdateSettingAction;
use App\Http\Requests\GetStorySettingsRequest;
use App\Http\Requests\StoreSettingFeatureRequest;
use App\Actions\Setting\CreateSettingFeatureAction;

class SettingController extends Controller
{
    public function get(GetSettingRequest $request, $id){
        $setting = Setting::find($id);

        return response()->json([
            'message' => 'Setting retrieved successfully',
            'data' => $setting
        ], 200);
    }

    public function getAllPerStory(GetStorySettingsRequest $request, $id){
        $story = Story::find($id);

        return response()->json([
            'message' => 'Settings retrieved successfully',
            'data' => $story->settings
        ], 200);
    }

    public function store(StoreSettingRequest $request, CreateSettingAction $createSettingAction){
        $setting = $createSettingAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Setting created successfully',
            'data' => $setting
        ], 201);
    }

    public function update(UpdateSettingRequest $request, UpdateSettingAction $updateSettingAction){
        $setting = $updateSettingAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Setting updated successfully',
            'data' => $setting
        ], 200);
    }

    public function connectFeature(StoreSettingFeatureRequest $request, CreateSettingFeatureAction $createSettingFeatureAction){
        $settingFeature = $createSettingFeatureAction($request->validated());

        return response()->json([
            'message' => 'Setting feature connection created successfully',
            'data' => $settingFeature
        ], 201);
    }
}

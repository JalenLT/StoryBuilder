<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use App\Http\Requests\GetCharacterRequest;
use App\Http\Requests\StoreCharacterRequest;
use App\Http\Requests\UpdateCharacterRequest;
use App\Actions\Character\CreateCharacterAction;
use App\Actions\Character\UpdateCharacterAction;
use App\Http\Requests\GetStoryCharactersRequest;
use App\Http\Requests\StoreCharacterInvolvementRequest;
use App\Http\Requests\StoreCharacterRelationshipRequest;
use App\Actions\Character\CreateCharacterInvolvementsAction;
use App\Actions\Character\CreateCharacterRelationshipAction;

class CharacterController extends Controller
{
    public function get(GetCharacterRequest $request, $id){
        $character = Character::find($id);

        return response()->json([
            'message' => 'Character retrieved successfully',
            'data' => $character
        ], 200);
    }

    public function getAllPerStory(GetStoryCharactersRequest $request, $id){
        $characters = Character::where('story_id', $id)->get();

        return response()->json([
            'message' => 'Characters retrieved successfully',
            'data' => $characters
        ], 200);
    }

    public function store(StoreCharacterRequest $request, CreateCharacterAction $createCharacterAction){
        $character = $createCharacterAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Character created successfully',
            'data' => $character
        ], 201);
    }

    public function update(UpdateCharacterRequest $request, UpdateCharacterAction $updateCharacterAction){
        $character = $updateCharacterAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Character updated successfully',
            'data' => $character
        ], 200);
    }

    public function storeCharacterRelationship(StoreCharacterRelationshipRequest $request, CreateCharacterRelationshipAction $createCharacterRelationshipAction){
        $characterRelationship = $createCharacterRelationshipAction($request->validated());

        return response()->json([
            'message' => 'Character relationship created successfully',
            'data' => $characterRelationship
        ], 201);
    }

    public function storeCharacterInvolvement(StoreCharacterInvolvementRequest $request, CreateCharacterInvolvementsAction $createCharacterInvolvementsAction){
        $characterInvolvement = $createCharacterInvolvementsAction($request->validated());

        return response()->json([
            'message' => 'Character involvement created successfully',
            'data' => $characterInvolvement
        ], 201);
    }
}

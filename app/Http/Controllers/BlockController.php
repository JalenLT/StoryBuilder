<?php

namespace App\Http\Controllers;

use App\Actions\Block\CreateBlockAction;
use App\Actions\Block\CreateBlockConnectionAction;
use App\Actions\Block\UpdateBlockAction;
use App\Http\Requests\StoreBlockConnectionRequest;
use App\Http\Requests\StoreBlockRequest;
use App\Http\Requests\UpdateBlockRequest;
use App\Models\Block;
use App\Models\Story;
use Illuminate\Http\Request;
use App\Http\Requests\GetBlockRequest;
use App\Http\Requests\GetStoryBlocksRequest;

class BlockController extends Controller
{
    public function get(GetBlockRequest $request, $id){
        $block = Block::find($id);

        return response()->json([
            'message' => 'Block returned successfully',
            'data' => $block
        ]);
    }

    public function getAllPerStory(GetStoryBlocksRequest $request, $id){
        $story = Story::find($id);

        return response()->json([
            'message' => 'Blocks retrieved successfully',
            'data' => $story->blocks
        ], 200);
    }

    public function store(StoreBlockRequest $request, CreateBlockAction $createBlockAction){
        $block = $createBlockAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Block created successfully',
            'data' => $block
        ], 201);
    }

    public function update(UpdateBlockRequest $request, UpdateBlockAction $updateBlockAction){
        $block = $updateBlockAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Block updated successfully',
            'data' => $block
        ], 200);
    }

    public function storeBlockConnection(StoreBlockConnectionRequest $request, CreateBlockConnectionAction $createBlockConnectionAction){
        $block_connection = $createBlockConnectionAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Block connection created successfully',
            'data' => $block_connection
        ], 201);
    }
}

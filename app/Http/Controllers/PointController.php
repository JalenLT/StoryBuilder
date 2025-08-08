<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Point;
use Illuminate\Http\Request;
use App\Http\Requests\GetPointRequest;
use App\Actions\Point\CreatePointAction;
use App\Actions\Point\UpdatePointAction;
use App\Http\Requests\StorePointRequest;
use App\Http\Requests\UpdatePointRequest;
use App\Http\Requests\GetBlockPointsRequest;

class PointController extends Controller
{
    public function getAll(){
        $points = Point::where('creator_id', auth()->user()->getAttribute('id'))->get();

        return response()->json([
            'message' => 'Points retrieved successfully',
            'data' => $points
        ]);
    }

    public function getAllPerBlock(GetBlockPointsRequest $request, $block_id){
        $block = Block::find($block_id);

        return response()->json([
            'message' => 'Points retrieved successfully',
            'data' => $block->points
        ]);
    }

    public function get(GetPointRequest $request, $id){
        $point = Point::find($id);

        return response()->json([
            'message' => 'Point retrieved successfully',
            'data' => $point
        ]);
    }

    public function store(StorePointRequest $request, CreatePointAction $createPointAction){
        $point = $createPointAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Point created successfully',
            'data' => $point
        ], 201);
    }

    public function update(UpdatePointRequest $request, UpdatePointAction $updatePointAction){
        $point = $updatePointAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Point updated successfully',
            'data' => $point
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Edge;
use App\Http\Requests\GetEdgeRequest;
use App\Actions\Edge\CreateEdgeAction;
use App\Actions\Edge\DeleteEdgeAction;
use App\Actions\Edge\UpdateEdgeAction;
use App\Http\Requests\StoreEdgeRequest;
use App\Http\Requests\DeleteEdgeRequest;
use App\Http\Requests\UpdateEdgeRequest;

class EdgeController extends Controller
{
    public function get(GetEdgeRequest $request, $id){
        $edge = Edge::find($id);

        return response()->json([
            'message' => 'Edge returned successfully',
            'data' => $edge
        ]);
    }

    public function store(StoreEdgeRequest $request, CreateEdgeAction $createEdgeAction){
        $edge = $createEdgeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Edge created successfully',
            'data' => $edge
        ], 201);
    }

    public function update(UpdateEdgeRequest $request, UpdateEdgeAction $updateEdgeAction){
        $edge = $updateEdgeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Edge updated successfully',
            'data' => $edge
        ], 200);
    }

    public function delete(DeleteEdgeRequest $request, DeleteEdgeAction $deleteEdgeAction){
        $deleteEdgeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Edge deleted successfully'
        ], 200);
    }
}


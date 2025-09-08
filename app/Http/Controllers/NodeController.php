<?php

namespace App\Http\Controllers;

use App\Models\Node;
use App\Http\Resources\NodeResource;
use App\Http\Requests\GetNodeRequest;
use App\Actions\Node\CreateNodeAction;
use App\Actions\Node\DeleteNodeAction;
use App\Actions\Node\UpdateNodeAction;
use App\Http\Requests\StoreNodeRequest;
use App\Http\Requests\DeleteNodeRequest;
use App\Http\Requests\UpdateNodeRequest;
use App\Http\Requests\GetAllNodesRequest;

class NodeController extends Controller
{
    public function get(GetNodeRequest $request, $id){
        $node = Node::find($id);

        return response()->json([
            'message' => 'Node returned successfully',
            'data' => $node
        ]);
    }

    public function getAll(GetAllNodesRequest $request, $story_id){
        $nodes = Node::where('story_id', $story_id)->get();

        return response()->json([
            'message' => 'Nodes returned successfully',
            'data' => NodeResource::collection($nodes)
        ]);
    }

    public function store(StoreNodeRequest $request, CreateNodeAction $createNodeAction){
        $node = $createNodeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Node created successfully',
            'data' => $node
        ], 201);
    }

    public function update(UpdateNodeRequest $request, UpdateNodeAction $updateNodeAction){
        $node = $updateNodeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Node updated successfully',
            'data' => $node
        ], 200);
    }

    public function delete(DeleteNodeRequest $request, DeleteNodeAction $deleteNodeAction){
        $deleteNodeAction($request->validated(), $request->user());

        return response()->json([
            'message' => 'Node deleted successfully'
        ], 200);
    }
}

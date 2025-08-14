import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, EdgeChange, addEdge, type OnConnect } from '@xyflow/react';
import { NodeData } from '@/types';
import Inspector from '@/components/inspector/show';
import { useInspectorStore } from '@/components/inspector/store';
import '@xyflow/react/dist/style.css';

import StoryNode from '@/components/nodes/story';

const nodeTypes = {
    story: StoryNode
};

const initialNodes: Node[] = [
    {
        id: 'block:1',
        position: { x: 100, y: 100 },
        data: { 
            label: {
                value: "Fate's Gambit",
                type: 'string'
            }, 
            description: {
                value: 'A deck of cards. A game of power. A fate worth daring.',
                type: 'text'
            },
        },
        type: 'story'
    },
    {
        id: 'block:2',
        position: { x: 300, y: 200 },
        data: { label: 'Block 2' },
    }
];

const initialEdges: Edge[] = [
    // {
    //     id: 'block:1-block:2',
    //     source: 'block:1',
    //     target: 'block:2',
    //     type: 'step',
    //     label: 'relates to'
    // }
];

export default function BoardView(){
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        []
    );
    const updateNodeData = useCallback((id: string, patch: Partial<NodeData>) => {
        setNodes((nodesSnapshot) => 
            nodesSnapshot.map(node => 
                node.id === id ? { ...node, data: { ...node.data, ...patch } } : node
            )
        );
    }, [setNodes]);
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneClick={() => setSelectedId(undefined)}
                nodeTypes={nodeTypes}
                fitView>
                <Background />
                <Controls />
                <Inspector nodes={nodes} updateNodeData={updateNodeData} />
            </ReactFlow>
        </div>
    );
}

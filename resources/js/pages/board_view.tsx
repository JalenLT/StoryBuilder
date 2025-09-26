import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, EdgeChange, addEdge, type OnConnect, useReactFlow } from '@xyflow/react';
import { NodeData } from '@/types';
import Inspector from '@/components/inspector/show';
import { useInspectorStore } from '@/components/inspector/store';
import '@xyflow/react/dist/style.css';

import StoryNode from '@/components/nodes/story';
import FeatureNode from '@/components/nodes/feature';
import SettingNode from '@/components/nodes/setting';
import CharacterNode from '@/components/nodes/character';
import SceneNode from '@/components/nodes/scene';

import PaneContextMenu from '@/components/pane-context-menu';

import { SmartEdge } from '@/components/smart-edge';

import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from '@/api/axios';
import axios from 'axios';

import { CharacterData } from '@/types';

import { usePerNodeDebouncedSaver } from '@/components/hooks/use-per-node-debounced-saver';
import { useUpdateCharacterData } from '@/components/hooks/use-update-character-data';
import { characterToPayload } from '@/components/payload/character-to-payload';

const nodeTypes = {
    story: StoryNode,
    feature: FeatureNode,
    setting: SettingNode,
    character: CharacterNode,
    scene: SceneNode
};

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

async function fetchNodes(storyId: number) {
    try {
        // Use our pre-configured apiClient
        const response = await apiClient.get(`/api/v1/nodes/get-all/${storyId}`);

        toast.success(response.data?.message);
        return response.data?.data;

    } catch (error: any) {
        let errorMessage = 'An unknown error occurred.';
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Unauthenticated.'}`;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error("Failed to fetch nodes:", errorMessage);
        toast.error("Failed to fetch nodes."); // Give user feedback
        throw new Error(errorMessage);
    }
}

function useUpdateNode(storyId: number){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({id, position}: {id: number, position: {x: number, y: number}}) => {
            const response = await apiClient.post(import.meta.env.VITE_APP_URL + '/api/v1/nodes/update', {
                id,
                position,
                story_id: storyId
            });

            return response.data;
        },
        onSuccess: (newNode) => {
            toast.success(newNode.message);

            qc.invalidateQueries({queryKey: ['story', storyId, 'nodes']});
        },
        onError: (error) => {
            let errorMessage = 'An unexpected error occurred.';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || `Request failed...`;
            }

            toast.error(errorMessage);
        },
    });
}

export default function BoardView(){
    /*****************
     *** INSPECTOR ***
     *****************/
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const setCurrentAction = useInspectorStore((state) => state.setCurrentAction);
    const storyId = 1;
    const updateNodeMutation = useUpdateNode(storyId);
    const updateCharacterDataMutation = useUpdateCharacterData(storyId);
    const { getNode } = useReactFlow();

    const { schedule: scheduleCharacterSave } = usePerNodeDebouncedSaver<string, Partial<CharacterData>>(500, (nodeId, mergedPatch) => {
        const node = getNode(nodeId);
        console.log(nodeId, mergedPatch);

        if(!node || node.type !== 'character') return;

        const current = node.data as CharacterData;


        const nextData: CharacterData = { ...current, ...(mergedPatch as Partial<CharacterData>) };
        updateCharacterDataMutation.mutate(characterToPayload(nextData, storyId));
    });

    /***********************
     *** NODES AND EDGES ***
     ***********************/
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const edgeTypes = { smart: SmartEdge };
    const onNodesChange = useCallback(
        async (changes: NodeChange[]) => {
            setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
        },
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    );
    const onNodeDragStop = useCallback((_e: React.MouseEvent, node: Node) => {
        updateNodeMutation.mutate({
            id: Number(node.id.split(':')[1]),
            position: { x: node.position.x, y: node.position.y }
        });
    }, []);
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge({...params, type: 'smart'}, edgesSnapshot)),
        []
    );

    const updateNodeData = useCallback((id: string, patch: Partial<NodeData>) => {
        setNodes((nodesSnapshot) =>
            nodesSnapshot.map(node => {
                if (node.id !== id) return node;

                const nextData = { ...node.data, ...patch };
                return { ...node, data: nextData };
            })
        );

        const node = getNode(id);
        if(node?.type === "character"){
            scheduleCharacterSave(id, patch as Partial<CharacterData>);
        }
    }, [setNodes, scheduleCharacterSave, getNode]);

    const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
        event.stopPropagation();
        setSelectedId(edge.id);
        setCurrentAction("view_edge");
    }, [setSelectedId, setCurrentAction]);

    const nodesQuery = useQuery({
        queryKey: ['story', storyId, 'nodes'],
        queryFn: () => fetchNodes(storyId),
        enabled: !!storyId,
        staleTime: 60_000,
    });

    useEffect(() => {
        if (nodesQuery.data){
            console.log(nodesQuery.data);
            setNodes(nodesQuery.data);
        }
    }, [nodesQuery.data, setNodes]);

    /*************************
     *** PANE CONTEXT MENU ***
     *************************/
    const [paneMenu, setPaneMenu] = useState<{ x: number, y: number } | null>(null);
    const onPaneContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        setPaneMenu({ x: event.clientX, y: event.clientY });
    }, []);
    const onPaneClick = useCallback(() => {
        setPaneMenu(null);
        setSelectedId(undefined);
        setCurrentAction(undefined);
    }, []);
    const handleCloseMenu = () => {
        setPaneMenu(null);
    };

    /********************************
     *** DISABLE RIGHT CLICK MENU ***
     ********************************/
    // useEffect(() => {
    //     const handleContextMenu = (e: Event) => {
    //         e.preventDefault()
    //     }

    //     document.addEventListener("contextmenu", handleContextMenu)

    //     return () => {
    //         document.removeEventListener("contextmenu", handleContextMenu)
    //     }
    // }, []);

    if(nodesQuery.isLoading){
        return <div>Loading...</div>
    }

    if(nodesQuery.isError){
        return <div>Error: {(nodesQuery.error as Error)?.message}</div>
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneClick={onPaneClick}
                onPaneContextMenu={onPaneContextMenu}
                onEdgeClick={onEdgeClick}
                onNodeDragStop={onNodeDragStop}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{ type: "smart" }}
                nodeTypes={nodeTypes}
                fitView
            >
                <MiniMap
                    nodeStrokeWidth={3}
                    position='top-right'
                />
                <Background />
                <Controls />
                <Inspector nodes={nodes} updateNodeData={updateNodeData} />
            </ReactFlow>
            {paneMenu && <PaneContextMenu x={paneMenu.x} y={paneMenu.y} onClose={handleCloseMenu} createNode={setNodes} />}
            <Toaster richColors position='top-center' />
        </div>
    );
}

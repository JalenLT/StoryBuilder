import { useState, useCallback, useEffect, MouseEvent } from 'react';
import { ReactFlow, MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, EdgeChange, addEdge, type OnConnect, ReactFlowProvider } from '@xyflow/react';
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

const nodeTypes = {
    story: StoryNode,
    feature: FeatureNode,
    setting: SettingNode,
    character: CharacterNode,
    scene: SceneNode
};

const initialNodes: Node[] = [
    {
        id: 'block:1',
        position: { x: 100, y: 100 },
        data: {
            id: "1",
            label: {
                value: "Fate's Gambit",
                type: 'string'
            },
            description: {
                value: 'A deck of cards. A game of power. A fate worth daring.',
                type: 'text'
            },
            genres: {
                value: ['Adventure', 'Fantasy'],
                type: 'multiselect',
                options: 'genre'
            },
            tags: {
                value: [],
                type: 'multiselect',
                options: 'tag'
            },
        },
        type: 'story'
    },
    {
        id: 'block:2',
        position: { x: 400, y: 300},
        data: {
            id: "2",
            name: {
                value: "Tower's Dimensional Door",
                type: 'string'
            },
            type: {
                value: 'Building Component',
                type: 'string'
            },
            description: {
                value: "Colossal double doors, crafted from aged oak and bound in iron bands, marked its entrance. They matched the tower’s base exactly, two doors side by side, each easily twice Marmalade’s height. Their surfaces were etched with faint patterns, concentric circles fading toward the centre, worn almost smooth by time.",
                type: 'text'
            },
            story_id: {
                value: 1,
                type: 'integer'
            }
        },
        type: 'feature'
    },
    {
        id: 'block:3',
        position: { x: 100, y: 600},
        data: {
            id: "3",
            name: {
                value: "The Tower",
                type: 'string'
            },
            description: {
                value: `
                    The tower rises impossibly from the heart of a small isle, its form both awe-inspiring and unnerving. From a distance it resembles a colossal spiral shell stripped raw, its structure splitting into different sections as it climbs toward the heavens.

                    Base: The lowest tiers are carved from storm-black stone, solid and oppressive.

                    Mid-section: Above that, rusted steel girders lace the structure, like an exposed skeleton holding fractured weight.

                    Upper tiers: Higher still, crystalline arches bloom into a fractal crown, drifting apart as though suspended in slow motion.

                    Summit: Each ledge narrows until the tower culminates in a jagged spire, impossibly delicate yet unwaveringly tall.

                    The golden embers of the setting sun catch its edges, painting the tower in streaks of firelight. At once ancient, industrial, and alien, the monument appears less built than conjured—an architecture that defies reason, flickering into existence like magnetic fluid drawn to its unseen core.
                `,
                type: 'text'
            },
            world: {
                value: 'Earth',
                type: 'string'
            },
            era: {
                value: 'Modern',
                type: 'select',
                options: 'era'
            },
            climate: {
                value: 'Tropical',
                type: 'select',
                options: 'climate'
            },
            story_id: {
                value: 1,
                type: 'integer'
            }
        },
        type: 'setting',
        connectable: true
    },
    {
        id: 'block:4',
        position: { x: 400, y: 1000},
        data: {
            id: "4",
            first_name: {
                value: 'Marmalade',
                type: 'string'
            },
            last_name: {
                value: 'Gray',
                type: 'string'
            },
            alias: {
                value: "Marm",
                type: 'string'
            },
            age: {
                value: 28,
                type: 'integer'
            },
            gender: {
                value: 'Male',
                type: 'select',
                options: 'gender'
            },
            description: {
                value: "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper suscipit interdum. Duis feugiat vehicula eros, vel congue erat tristique vel. Aenean eget congue massa. Etiam mollis neque risus, ut scelerisque tortor lobortis eget.",
                type: 'text'
            },
            background: {
                value: "Background: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper suscipit interdum. Duis feugiat vehicula eros, vel congue erat tristique vel. Aenean eget congue massa. Etiam mollis neque risus, ut scelerisque tortor lobortis eget.",
                type: 'text'
            },
            motivation: {
                value: "Motivation: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper suscipit interdum. Duis feugiat vehicula eros, vel congue erat tristique vel. Aenean eget congue massa. Etiam mollis neque risus, ut scelerisque tortor lobortis eget.",
                type: 'text'
            },
            story_id: 1,
            creator_id: 1,
            setting_id: 1
        },
        type: 'character'
    },
    {
        id: 'block:5',
        position: { x: 600, y: 1400},
        data: {
            id: "5",
            title: {
                value: "The Endless Repeat",
                type: 'string'
            },
            points: {
                points: [
                    {
                        id: 1,
                        text: {
                            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            type: "string"
                        },
                        creator_id: 1
                    },
                    {
                        id: 2,
                        text: {
                            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            type: "string"
                        },
                        creator_id: 1
                    },
                    {
                        id: 3,
                        text: {
                            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            type: "string"
                        },
                        creator_id: 1
                    },
                ],
                type: 'array'
            },
            creator_id: 1,
            story_id: 1,
            setting_id: 1,
        },
        type: 'scene'
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
    /*****************
     *** INSPECTOR ***
     *****************/
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const setCurrentAction = useInspectorStore((state) => state.setCurrentAction);

    /***********************
     *** NODES AND EDGES ***
     ***********************/
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const edgeTypes = { smart: SmartEdge };
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge({...params, type: 'smart'}, edgesSnapshot)),
        []
    );
    const updateNodeData = useCallback((id: string, patch: Partial<NodeData>) => {
        setNodes((nodesSnapshot) =>
            nodesSnapshot.map(node =>
                node.id === id ? { ...node, data: { ...node.data, ...patch } } : node
            )
        );
    }, [setNodes]);
    const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
        event.stopPropagation();
        setSelectedId(edge.id);
        setCurrentAction("view_edge");
    }, [setSelectedId, setCurrentAction]);

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

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onPaneClick={onPaneClick}
                    onPaneContextMenu={onPaneContextMenu}
                    onEdgeClick={onEdgeClick}
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
            </ReactFlowProvider>
            <Toaster richColors position='top-center' />
        </div>
    );
}

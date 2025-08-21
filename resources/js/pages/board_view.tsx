import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, EdgeChange, addEdge, type OnConnect } from '@xyflow/react';
import { NodeData } from '@/types';
import Inspector from '@/components/inspector/show';
import { useInspectorStore } from '@/components/inspector/store';
import '@xyflow/react/dist/style.css';

import StoryNode from '@/components/nodes/story';
import FeatureNode from '@/components/nodes/feature';
import SettingNode from '@/components/nodes/setting';
import CharacterNode from '@/components/nodes/character';
import SceneNode from '@/components/nodes/scene';

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
            title: {
                value: "The Endless Repeat",
                type: 'string'
            },
            points: {
                points: [
                    {
                        text: {
                            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            type: "string"
                        },
                        creator_id: 1
                    },
                    {
                        text: {
                            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            type: "string"
                        },
                        creator_id: 1
                    },
                    {
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

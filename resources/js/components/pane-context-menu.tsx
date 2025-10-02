import { X, PersonStanding, Shrub, Trees, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCallback } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { CreateNode } from "./create-node-card";
import { useCreateNode } from "./hooks/use-create-node";

const NODE_WIDTH = 672 / 2; // Width of the node (2xl)



export default function PaneContextMenu({x, y, onClose, createNode}: {x: number, y: number, onClose: () => void, createNode: (nodes: any) => void}) {
    const { screenToFlowPosition } = useReactFlow();
    const { zoom } = useViewport();

    const storyId = 1;
    const createNodeMutation = useCreateNode(storyId);

    const onCreateCharacter = useCallback(async () => {
        try {
            const nodePosition = screenToFlowPosition({
                x: x,
                y: y,
            });
            const id = Math.floor(Math.random() * 100000).toString();
            const newNode: any = {
                id: `character:${id}`,
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                data: {
                    id,
                    first_name: {
                        value: '',
                        type: 'string'
                    },
                    last_name: {
                        value: '',
                        type: 'string'
                    },
                    alias: {
                        value: "",
                        type: 'string'
                    },
                    age: {
                        value: null,
                        type: 'integer'
                    },
                    gender: {
                        value: '',
                        type: 'select',
                        options: 'gender'
                    },
                    description: {
                        value: "",
                        type: 'text'
                    },
                    background: {
                        value: "",
                        type: 'text'
                    },
                    motivation: {
                        value: "",
                        type: 'text'
                    },
                    story_id: 0,
                    creator_id: 0,
                    setting_id: 0
                },
                origin: [0.5, 0.0],
                type: 'character',
            };

            await createNodeMutation.mutateAsync({
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                type: 'character'
            });

            createNode((oldNodes: Node[]) => oldNodes.concat(newNode));

            onClose();
        } catch (error: unknown) {
            onClose();
        }
    }, [screenToFlowPosition, x, y, zoom, createNode, createNodeMutation, onClose]);
    const onCreateFeature = useCallback(async () => {
        try {
            const nodePosition = screenToFlowPosition({
                x: x,
                y: y,
            });
            const id = Math.floor(Math.random() * 100000).toString();
            const newNode: any = {
                id: `feature:${id}`,
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                data: {
                    id,
                    name: {
                        value: "",
                        type: 'string'
                    },
                    type: {
                        value: '',
                        type: 'string'
                    },
                    description: {
                        value: "",
                        type: 'text'
                    },
                    story_id: {
                        value: 0,
                        type: 'integer'
                    }
                },
                origin: [0.5, 0.0],
                type: 'feature',
            };

            await createNodeMutation.mutateAsync({
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                type: 'feature'
            });

            createNode((oldNodes: Node[]) => oldNodes.concat(newNode));
            onClose();
        } catch (error: unknown) {
            onClose();
        }
    }, []);
    const onCreateSetting = useCallback(async () => {
        try {
            const nodePosition = screenToFlowPosition({
                x: x,
                y: y,
            });
            const id = Math.floor(Math.random() * 100000).toString();
            const newNode: any = {
                id: `setting:${id}`,
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                data: {
                    id,
                    name: {
                        value: "",
                        type: 'string'
                    },
                    description: {
                        value: ``,
                        type: 'text'
                    },
                    world: {
                        value: '',
                        type: 'string'
                    },
                    era: {
                        value: '',
                        type: 'select',
                        options: 'era'
                    },
                    climate: {
                        value: '',
                        type: 'select',
                        options: 'climate'
                    },
                    story_id: {
                        value: 0,
                        type: 'integer'
                    }
                },
                origin: [0.5, 0.0],
                type: 'setting',
            };

            await createNodeMutation.mutateAsync({
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                type: 'setting'
            });

            createNode((oldNodes: Node[]) => oldNodes.concat(newNode));
            onClose();
        } catch (error: unknown) {
            onClose();
        }
    }, []);
    const onCreateScene = useCallback(async () => {
        try {
            const nodePosition = screenToFlowPosition({
                x: x,
                y: y,
            });
            const id = Math.floor(Math.random() * 100000).toString();
            const newNode: any = {
                id: `scene:${id}`,
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                data: {
                    id,
                    title: {
                        value: "",
                        type: 'string'
                    },
                    points: {
                        points: [],
                        type: 'array'
                    },
                    creator_id: 0,
                    story_id: 0,
                    setting_id: 0,
                },
                origin: [0.5, 0.0],
                type: 'scene',
            };

            await createNodeMutation.mutateAsync({
                position: {
                    x: nodePosition.x + (NODE_WIDTH / 2) / zoom,
                    y: nodePosition.y
                },
                type: 'scene'
            });

            createNode((oldNodes: Node[]) => oldNodes.concat(newNode));
            onClose();
        } catch (error: unknown) {
            onClose();
        }
    }, []);
    return (
        <>
            <Card
                style={{
                    top: `${y}px`,
                    left: `${x}px`,
                }}
                className="absolute w-md z-10 bg-white rounded-sm p-2"
            >
                <CardHeader>
                    <CardTitle>Create Node</CardTitle>
                </CardHeader>
                <div className="absolute -top-4 -right-4">
                    <Button variant={"outline"} size="icon" className="rounded-full" onClick={onClose}>
                        <X />
                    </Button>
                </div>
                <CreateNode
                    icon={<PersonStanding className="mx-auto" />}
                    title="Character"
                    onClick={onCreateCharacter}
                    backgroundColorBase="bg-purple-50"
                    backgroundColorHover="bg-purple-100"
                    borderColorBase="border-purple-400"
                    borderColorHover="border-purple-500"
                    textColor="text-purple-600"
                    iconColor="text-purple-800"
                />
                <br />
                <CreateNode
                    icon={<Shrub className="mx-auto" />}
                    title="Feature"
                    onClick={onCreateFeature}
                    backgroundColorBase="bg-lime-50"
                    backgroundColorHover="bg-lime-100"
                    borderColorBase="border-lime-400"
                    borderColorHover="border-lime-500"
                    textColor="text-lime-600"
                    iconColor="text-lime-800"
                />
                <br />
                <CreateNode
                    icon={<Trees className="mx-auto" />}
                    title="Setting"
                    onClick={onCreateSetting}
                    backgroundColorBase="bg-green-50"
                    backgroundColorHover="bg-green-100"
                    borderColorBase="border-green-400"
                    borderColorHover="border-green-500"
                    textColor="text-green-600"
                    iconColor="text-green-800"
                />
                <br />
                <CreateNode
                    icon={<ScrollText className="mx-auto" />}
                    title="Scene"
                    onClick={onCreateScene}
                    backgroundColorBase="bg-slate-50"
                    backgroundColorHover="bg-slate-100"
                    borderColorBase="border-slate-400"
                    borderColorHover="border-slate-500"
                    textColor="text-slate-600"
                    iconColor="text-slate-800"
                />
            </Card>
        </>
    );
}


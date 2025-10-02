import { Position, NodeToolbar, useReactFlow } from '@xyflow/react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { useInspectorStore } from './inspector/store';
import { CopyPlus, SquarePen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateNode } from './hooks/use-create-node';
import { useDeleteNode } from './hooks/use-delete-node';

export default function CustomNodeToolbar({id}: {id: string}){
    const { getNodes, setNodes, setEdges } = useReactFlow();
    const setCurrentAction = useInspectorStore((state) => state.setCurrentAction);
    const storyId = 1;
    const createNodeMutation = useCreateNode(storyId);
    const deleteNodeMutation = useDeleteNode(storyId);

    const deleteNode = (id: string) => {
        try {
            setNodes((nodesSnapshot) => nodesSnapshot.filter((node) => node.id !== id));
            setEdges((edgesSnapshot) => edgesSnapshot.filter((edge) => edge.source !== id && edge.target !== id));

            id = id.split(':')[1];

            deleteNodeMutation.mutate({id});

            toast.success("Node deleted");
        } catch (error: unknown) {
            toast.error(error as string);
        }
    };

    const duplicateNode = (id: string) => {
        try {
            const newNodeId = Math.floor(Math.random() * 100000).toString();
            const sourceNode = getNodes().find((node) => node.id === id);
            if (!sourceNode) {
                // THROW ERROR AND SHOW ALERT
                return;
            }
            const newNode: any = {
                id: 'character:' + Math.floor(Math.random() * 100000).toString(),
                data: {
                    ...sourceNode?.data,
                    id: newNodeId,
                },
                type: sourceNode?.type,
                position: { x: sourceNode?.position.x + 100, y: sourceNode?.position.y + 100 },
            }
            createNodeMutation.mutate({
                position: { x: sourceNode?.position.x + 100, y: sourceNode?.position.y + 100 },
                type: newNode.type
            });
            setNodes((oldNodes) => oldNodes.concat(newNode))

            toast.success("Node duplicated");
        } catch (error: unknown) {
            toast.error(error as string);
        }
    }

    return (
        <>
            <TooltipProvider>
                <NodeToolbar className='grid grid-cols-3 gap-3' position={Position.Top}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                className="border border-slate-500 bg-white hoverable:bg-slate-50 rounded-full"
                                onClick={() => {
                                    duplicateNode(id);
                                }}
                            >
                                <CopyPlus className="text-slate-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Duplicate
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                className="border border-blue-500 bg-white hoverable:bg-blue-50 rounded-full"
                                onClick={() => {
                                    setCurrentAction("edit_node");
                                }}
                            >
                                <SquarePen className="text-blue-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Edit
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                className="border border-red-500 bg-white hoverable:bg-red-50 rounded-full"
                                onClick={() => {
                                    deleteNode(id);
                                }}
                            >
                                <Trash2 className="text-red-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Delete
                        </TooltipContent>
                    </Tooltip>
                </NodeToolbar>
            </TooltipProvider>
        </>
    );
}

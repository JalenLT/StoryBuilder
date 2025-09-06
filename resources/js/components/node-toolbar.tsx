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

export default function CustomNodeToolbar({id}: {id: string}){
    const { getNodes, setNodes, setEdges } = useReactFlow();
    const setCurrentAction = useInspectorStore((state) => state.setCurrentAction);

    const deleteNode = (id: string) => {
        setNodes((nodesSnapshot) => nodesSnapshot.filter((node) => node.id !== id));
        setEdges((edgesSnapshot) => edgesSnapshot.filter((edge) => edge.source !== id && edge.target !== id));
    };

    const duplicateNode = (id: string) => {
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
        setNodes((oldNodes) => oldNodes.concat(newNode))
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

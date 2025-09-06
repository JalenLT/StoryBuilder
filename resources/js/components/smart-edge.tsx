import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
    type EdgeProps,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import { Trash2, TextCursor } from "lucide-react";
import { useInspectorStore } from './inspector/store';

export function SmartEdge(props: EdgeProps) {
    const { setEdges } = useReactFlow();
    const setCurrentAction = useInspectorStore((state) => state.setCurrentAction);
    const currentAction = useInspectorStore((state) => state.currentAction);
    const selectedId = useInspectorStore((state) => state.selectedId);
    const {
        id, sourceX, sourceY, targetX, targetY, markerEnd, selected, data, label
    } = props;

    const [path, labelX, labelY] = getBezierPath({
        sourceX, sourceY, targetX, targetY,
    });

    const deleteEdge = (id: string) => {
        setEdges((edgesSnapshot) => edgesSnapshot.filter((edge) => edge.id !== id));
    };

    return (
        <>
            <BaseEdge id={id} path={path} markerEnd={markerEnd} style={props.style} />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: "all",
                        zIndex: 10,
                    }}
                    className="nodrag nopan grid grid-cols-2 gap-2"
                >
                    {selected && currentAction === "view_edge" && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        className="border border-blue-500 bg-white hoverable:bg-blue-50 rounded-full"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setCurrentAction("edit_edge");
                                        }}
                                    >
                                        <TextCursor className="text-blue-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Rename
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        className="border border-red-500 bg-white hoverable:bg-red-50 rounded-full"
                                        onClick={() => {
                                            deleteEdge(id);
                                        }}
                                    >
                                        <Trash2 className="text-red-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Delete
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {selected && currentAction === "edit_edge" && (
                        <Input
                            type="text"
                            value={label as string}
                            id={`${id}_input`}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(e) => {
                                setEdges((edgesSnapshot) =>
                                    edgesSnapshot.map((edge) =>
                                        edge.id === id ? { ...edge, label: e.target.value } : edge
                                    )
                                );
                            }}
                            className="bg-white"
                        />
                    )}
                    {!selected && (
                        <span>{label}</span>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

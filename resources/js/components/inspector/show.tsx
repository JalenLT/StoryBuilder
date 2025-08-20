import { Panel, Node } from '@xyflow/react';
import { NodeData } from '@/types';
import { useInspectorStore } from './store';
import { useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { GenreOptions, TagOptions } from '../nodes/story';
import { EraOptions, ClimateOptions } from '../nodes/setting';
import { GenderOptions } from '../nodes/character';

function capitalizeFirstLetter(str: string) {
  if (!str) return str; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type InspectorProps = {
    nodes: Node<NodeData>[],
    updateNodeData: (id: string, patch: Partial<NodeData>) => void;
}

export default function Inspector({ nodes, updateNodeData }: InspectorProps){
    const selectedId = useInspectorStore((state) => state.selectedId);
    const node = useMemo(() => nodes.find((node) => node.id === selectedId), [selectedId, nodes]);

    if (!node) return <Panel position='bottom-right'>No node selected</Panel>;

    return (
        <>
            <Panel
                position='bottom-right'
                className='bg-white border p-3'
            >
                <h4><strong>Inspector</strong></h4>
                <div className={'p-3 overflow-auto max-h-136'}>
                    {Object.entries(node.data).map(([key, value]) => {
                        if (key.includes("_id")) return null;

                        return (
                            <div key={key} className="mb-3">
                                <Label htmlFor={key} className="mb-3">
                                    {capitalizeFirstLetter(key)}
                                </Label>
                                <div className="max-w-100">
                                    {value.type === "string" && (
                                        <Input
                                            type="text"
                                            value={value.value ?? ""}
                                            id={key}
                                            placeholder={key}
                                            onChange={(e) =>
                                                updateNodeData(node.id, {
                                                    [key]: { value: e.target.value, type: value.type },
                                                })
                                            }
                                        />
                                    )}
                                    {value.type === "text" && (
                                        <Textarea
                                            value={value.value ?? ""}
                                            id={key}
                                            placeholder={key}
                                            className="max-h-48 overflow-y-auto resize-y"
                                            onChange={(e) =>
                                                updateNodeData(node.id, {
                                                    [key]: { value: e.target.value, type: value.type },
                                                })
                                            }
                                        />
                                    )}
                                    {value.type === "integer" && (
                                        <Input
                                            type="number"
                                            value={value.value ?? ""}
                                            id={key}
                                            placeholder={key}
                                            onChange={(e) =>
                                                updateNodeData(node.id, {
                                                    [key]: { value: e.target.value, type: value.type },
                                                })
                                            }
                                        />
                                    )}
                                    {value.type === "select" && (
                                        <Select
                                            value={value.value ?? ""}
                                            onValueChange={(v) =>
                                                updateNodeData(node.id, {
                                                    [key]: { value: v, type: value.type, options: value.options },
                                                })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={key} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {value.options === "climate" &&
                                                    ClimateOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                {value.options === "era" &&
                                                    EraOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                {value.options === "gender" &&
                                                    GenderOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                    {value.type === "multiselect" && (
                                        <MultiSelect
                                            defaultValues={[...value.value]}
                                            onValuesChange={(v) =>
                                                updateNodeData(node.id, {
                                                    [key]: { value: v, type: value.type, options: value.options },
                                                })
                                            }
                                        >
                                            <MultiSelectTrigger className="w-full max-w-[400px]">
                                                <MultiSelectValue placeholder="Select options..." />
                                            </MultiSelectTrigger>
                                            <MultiSelectContent>
                                                <MultiSelectGroup>
                                                    {value.options === "genre" &&
                                                        GenreOptions.map((option) => (
                                                            <MultiSelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MultiSelectItem>
                                                        ))}
                                                    {value.options === "tag" &&
                                                        TagOptions.map((option) => (
                                                            <MultiSelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MultiSelectItem>
                                                        ))}
                                                </MultiSelectGroup>
                                            </MultiSelectContent>
                                        </MultiSelect>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Panel>
        </>
    );
}

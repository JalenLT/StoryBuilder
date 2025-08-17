import { Panel, Node } from '@xyflow/react';
import { NodeData } from '@/types';
import { useInspectorStore } from './store';
import { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

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
                <div className={'p-3'}>
                    {Object.entries(node.data).map(([key, value]) => (
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">{capitalizeFirstLetter(key)}</label>
                            {value.type === 'string' && (
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={value.value ?? ''}
                                    onChange={(e) =>
                                        updateNodeData(node.id, { [key]: { value: e.target.value, type: value.type } })
                                    }
                                />
                            )}
                            {value.type === 'text' && (
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Write your thoughts here..."
                                    value={value.value ?? ''}
                                    onChange={(e) =>
                                        updateNodeData(node.id, { [key]: { value: e.target.value, type: value.type } })
                                    }
                                />
                            )}
                            {value.type === 'integer' && (
                                <input type='number'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={value.value ?? ''}
                                    onChange={(e) =>
                                        updateNodeData(node.id, { [key]: { value: e.target.value, type: value.type } })
                                    }
                                />
                            )}
                            {value.type === 'select' && (
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={value.value ?? ''}
                                    onChange={(e) =>
                                        updateNodeData(node.id, { [key]: { value: e.target.value, type: value.type, options: value.options } })
                                    }
                                >
                                    {value.options?.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
            </Panel>
        </>
    );
}

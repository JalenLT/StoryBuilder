import { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Trees, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';
import CustomNodeToolbar from '../node-toolbar';
import { SettingData } from '@/types';

type ClimateData = { label: string; value: string };
type EraData = { label: string; value: string };

export const ClimateOptions: ClimateData[] = [
    { value: 'Arctic / Polar', label: 'Arctic / Polar' },
    { value: 'Cold / Boreal', label: 'Cold / Boreal' },
    { value: 'Temperate', label: 'Temperate' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Desert / Arid', label: 'Desert / Arid' },
    { value: 'Tropical', label: 'Tropical' },
    { value: 'Savanna', label: 'Savanna' },
    { value: 'Steppe / Plains', label: 'Steppe / Plains' },
    { value: 'Mountain / Highland', label: 'Mountain / Highland' },
    { value: 'Oceanic / Coastal', label: 'Oceanic / Coastal' },
    { value: 'Swamp / Wetland', label: 'Swamp / Wetland' },
];

export const EraOptions: EraData[] = [
    { value: 'Prehistoric', label: 'Prehistoric' },
    { value: 'Ancient', label: 'Ancient' },
    { value: 'Classical', label: 'Classical' },
    { value: 'Medieval', label: 'Medieval' },
    { value: 'Renaissance', label: 'Renaissance' },
    { value: 'Early Modern', label: 'Early Modern' },
    { value: 'Industrial', label: 'Industrial' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Contemporary', label: 'Contemporary' },
    { value: 'Futuristic', label: 'Futuristic' },
    { value: 'Post-Apocalyptic', label: 'Post-Apocalyptic' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Mythic', label: 'Mythic' },
];

function SettingNode({
    id,
    data,
    isConnectable,
    selected,
}: {
    id: string;
    data: SettingData;
    isConnectable: boolean;
    selected?: boolean;
}) {
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const { getNode } = useReactFlow();
    const [show, setShow] = useState(false);

    return (
        <>
        <CustomNodeToolbar id={id} />
        <div
            className={`relative max-w-2xl rounded-4xl border p-3 shadow-sm transition-colors bg-green-50
            ${selected ? 'border-green-700 shadow-green-200 ring-1 ring-green-200' : 'border-green-400 hoverable:border-green-500'}`}
            onClick={() => setSelectedId(id)}
        >
            <div className="absolute top-3 left-3 text-slate-800">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShow(!show);
                    }}
                    className="opacity-75 hoverable:opacity-100 transition-opacity"
                >
                    {show ? <EyeClosed /> : <Eye />}
                </button>
            </div>

            <div className="absolute top-3 right-3 text-green-600 flex items-center">
                <Trees className="mr-1" />
                <span className="text-sm">Setting</span>
            </div>

            <div className="text-lg text-center mx-25 flex items-baseline justify-center gap-2">
                <strong className="text-slate-900">{data.name?.value ? data.name.value : <span className="text-slate-500">--Unknown--</span>}</strong>
                {data.world?.value && (
                    <>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-700">{data.world.value}</span>
                    </>
                )}
            </div>

            {(data.era?.value || data.climate?.value) && (
                <div className="mt-1 flex items-center justify-center gap-2 text-center">
                    {data.era?.value && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                            {data.era.value}
                        </span>
                    )}
                    {data.climate?.value && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                            {data.climate.value}
                        </span>
                    )}
                </div>
            )}

            <div className="text-center">
                {show && <span className="text-gray-600">{data.description.value}</span>}
            </div>

            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }}
                isValidConnection={(connection) => {
                    const source = getNode(connection.source);
                    return source?.type === "character" || source?.type === "feature";
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }}
                isValidConnection={(connection) => {
                    const target = getNode(connection.target);
                    return target?.type === "setting" || target?.type === "character" || target?.type === "scene";
                }}
            />
        </div>
        </>
    );
}

export default memo(SettingNode);

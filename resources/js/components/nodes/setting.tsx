import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Trees, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';

type SettingData = {
    name: {value: string, type: string},
    description: {value: string, type: string},
    world?: {value: string, type: string},
    era?: {value: string, type: string, options?: {value: string, label: string}[]},
    climate?: {value: string, type: string, options?: {value: string, label: string}[]},
    story_id: BigInteger
};

type ClimateData = {
    label: string,
    value: string
}

type EraData = {
    label: string,
    value: string
}

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

function SettingNode({id, data, isConnectable, selected}: {id: string, data: SettingData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const [show, setShow] = useState(false);

    return (<>
        <div
            className={`relative bg-green-100 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-green-800 shadow-green-200" : "border-green-500" }`}
            onClick={() => setSelectedId(id)}
        >
            <div className={`absolute top-3 left-3 text-slate-800`}>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setShow(!show);
                }}>
                    {show ? <EyeClosed /> : <Eye />}
                </button>
            </div>
            <div className={`absolute top-3 right-3 text-green-500 flex items-center`}>
                <Trees className="mr-1" />
                <span>Setting</span>
            </div>
            <div className={`text-lg text-center mx-25`}>
                <strong>{data.name.value}</strong> | {data.world?.value}
            </div>
            <div className={`text-center`}>
                {data.era?.value} | {data.climate?.value}
            </div>
            <div className={`text-center`}>
                {show && <span className="text-gray-500">{data.description.value}</span>}
            </div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    </>);
}

export default memo(SettingNode);

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

function SettingNode({id, data, isConnectable, selected}: {id: string, data: SettingData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const [show, setShow] = useState(false);

    return (<>
        <div
            className={`relative bg-green-100 rounded-4xl border p-3 shadow-sm transition-colors ${ selected ? "border-green-800 shadow-green-200" : "border-green-500" }`}
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

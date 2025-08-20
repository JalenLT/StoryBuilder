import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shrub, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';

type FeatureData = {
    name: {value: string, type: string};
    type: {value: string, type: string};
    description: {value: string, type: string};
    story_id: BigInteger;
};

function FeatureNode({id, data, isConnectable, selected}: {id: string, data: FeatureData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const [show, setShow] = useState(false);

    return (<>
        <div
            className={`relative bg-green-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-green-500 shadow-green-200" : "border-green-300" }`}
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
            <div className={`absolute top-3 right-3 text-green-300 flex items-center`}>
                <Shrub className="mr-1" />
                <span>Feature</span>
            </div>
            <div className={`text-lg text-center mx-25`}>
                <strong>{data.name.value}</strong> | {data.type.value}
            </div>
            <div className={`text-center`}>
                {show && <span className="text-gray-500">{data.description.value}</span>}
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    </>);
}

export default memo(FeatureNode);

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
            className={`relative bg-green-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-green-700 shadow-green-200 ring-1 ring-green-200" : "border-green-400 hover:border-green-500" }`}
            onClick={() => setSelectedId(id)}
        >
            <div className={`absolute top-3 left-3 text-slate-800`}>
                <button onClick={(e) => {
                        e.stopPropagation();
                        setShow(!show);
                    }}
                    className="opacity-75 hover:opacity-100 transition-opacity"
                >
                    {show ? <EyeClosed /> : <Eye />}
                </button>
            </div>
            <div className={`absolute top-3 right-3 text-green-600 flex items-center`}>
                <Shrub className="mr-1" />
                <span className='text-sm'>Feature</span>
            </div>
            <div className={`text-lg text-center mx-25 flex items-baseline justify-center gap-2`}>
                <strong className="text-slate-900">{data.name.value}</strong>
                {data.type?.value && (
                    <>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-700">{data.type.value}</span>
                    </>
                )}
            </div>
            <div className={`text-center`}>
                {show && <span className="text-gray-600">{data.description.value}</span>}
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    </>);
}

export default memo(FeatureNode);

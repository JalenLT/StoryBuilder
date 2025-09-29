import { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Shrub, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';
import CustomNodeToolbar from '../node-toolbar';
import { FeatureData } from '@/types';

function FeatureNode({id, data, isConnectable, selected}: {id: string, data: FeatureData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const { getNode } = useReactFlow();
    const [show, setShow] = useState(false);

    return (<>
        <CustomNodeToolbar id={id} />
        <div
            className={`relative bg-lime-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-lime-700 shadow-lime-200 ring-1 ring-lime-200" : "border-lime-400 hoverable:border-lime-500" }`}
            onClick={() => setSelectedId(id)}
        >
            <div className={`absolute top-3 left-3 text-slate-800`}>
                <button onClick={(e) => {
                        e.stopPropagation();
                        setShow(!show);
                    }}
                    className="opacity-75 hoverable:opacity-100 transition-opacity"
                >
                    {show ? <EyeClosed /> : <Eye />}
                </button>
            </div>
            <div className={`absolute top-3 right-3 text-lime-600 flex items-center`}>
                <Shrub className="mr-1" />
                <span className='text-sm'>Feature</span>
            </div>
            <div className={`text-lg text-center mx-25 flex items-baseline justify-center gap-2`}>
                <strong className="text-slate-900">{data.name?.value ? data.name.value : <span className="text-slate-500">--Unknown--</span>}</strong>
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
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }}
                isValidConnection={(connection) => {
                    const target = getNode(connection.target);
                    return target?.type === "setting";
                }}
            />
        </div>
    </>);
}

export default memo(FeatureNode);

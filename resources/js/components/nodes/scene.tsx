import { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { ScrollText, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';
import CustomNodeToolbar from '../node-toolbar';
import { SceneData } from '@/types';

function SceneNode({id, data, isConnectable, selected}: {id: string, data: SceneData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const { getNode } = useReactFlow();
    const [show, setShow] = useState(false);

    return (<>
        <CustomNodeToolbar id={id} />
        <div
            className={`relative bg-slate-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-slate-700 shadow-slate-200 ring-1 ring-slate-200" : "border-slate-400 hoverable:border-slate-500" }`}
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
            <div className={`absolute top-3 right-3 text-slate-600 flex items-center`}>
                <ScrollText className="mr-1" />
                <span className='text-sm'>Scene</span>
            </div>
            <div className={`text-lg text-center mx-25 flex items-baseline justify-center gap-2`}>
                <strong className="text-slate-900">{data.title?.value ? data.title.value : <span className="text-slate-500">--Unknown--</span>}</strong>
            </div>
            <div className={``}>
                {show && (<>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {data.points.points.map((point, index) => (
                            <li key={`${data.title.value}-${index}`}>
                                <strong className="text-slate-900">{point.text.value}</strong>
                            </li>
                        ))}
                    </ul>
                </>)}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }}
                isValidConnection={(connection) => {
                    const source = getNode(connection.source);
                    return source?.type === "setting" || source?.type === "character" || source?.type === "scene";
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }}
                isValidConnection={(connection) => {
                    const target = getNode(connection.target);
                    return target?.type === "scene";
                }}
            />
        </div>
    </>);
}

export default memo(SceneNode);

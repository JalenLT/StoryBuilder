import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ScrollText, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';


type PointData = {
    text: {
        value: string;
        type: string;
    };
    creator_id: BigInteger;
}

type SceneData = {
    title: { value: string, type: string },
    points: { points: PointData[], type: string },
    creator_id: BigInteger,
    story_id: BigInteger,
    setting_id: BigInteger
};

function SceneNode({id, data, isConnectable, selected}: {id: string, data: SceneData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const [show, setShow] = useState(false);

    return (<>
        <div
            className={`relative bg-slate-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-slate-700 shadow-slate-200 ring-1 ring-slate-200" : "border-slate-400 hover:border-slate-500" }`}
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
            <div className={`absolute top-3 right-3 text-slate-600 flex items-center`}>
                <ScrollText className="mr-1" />
                <span className='text-sm'>Scene</span>
            </div>
            <div className={`text-lg text-center mx-25 flex items-baseline justify-center gap-2`}>
                <strong className="text-slate-900">{data.title.value}</strong>
            </div>
            <div className={`text-center`}>
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
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    </>);
}

export default memo(SceneNode);

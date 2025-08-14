import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BookText } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';

type StoryData = {
    label: {value: string, type: string};
    description:  {value: string, type: string};
};

function StoryNode({id, data, isConnectable, selected}: {id: string,data: StoryData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);

    return (
        <>
            <div 
                className={`relative bg-blue-50 rounded-full border p-3 shadow-sm transition-colors ${ selected ? "border-blue-500 shadow-blue-200" : "border-blue-300" }`}
                onClick={() => setSelectedId(id)}
            >
                <div className={`absolute top-3 right-3 text-blue-300`}>
                    <BookText />
                </div>
                <div className={`text-center`}>
                    <strong>{data.label.value}</strong>
                </div>
                <div className={`text-center`}>
                    <span className="text-gray-500">{data.description.value}</span>
                </div>
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            </div>
        </>
    );
}

export default memo(StoryNode);

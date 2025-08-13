import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BookText } from 'lucide-react';

type StoryData = {
    label: string;
    description: string;
};

function StoryNode({data, isConnectable, selected}: {data: StoryData, isConnectable: boolean, selected?: boolean}){
    return (
        <>
            <div className={`relative bg-blue-50 rounded-full border p-3 shadow-sm transition-colors ${
                selected ? "border-blue-500 shadow-blue-200" : "border-blue-300"
            }`}>
                <div className={`absolute top-3 right-3 text-blue-300`}>
                    <BookText />
                </div>
                <div className={`text-center`}>
                    <strong>{data.label}</strong>
                </div>
                <div className={`text-center`}>
                    <span className="text-gray-500">{data.description}</span>
                </div>
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            </div>
        </>
    );
}

export default memo(StoryNode);

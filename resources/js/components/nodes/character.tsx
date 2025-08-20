import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PersonStanding, Mars, Venus, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CharacterData = {
    first_name: { value: string, type: string };
    last_name: { value: string, type: string };
    alias: { value: string, type: string };
    description: { value: string, type: string };
    background: { value: string, type: string };
    age: { value: number, type: string };
    gender: { value: string, type: string };
    motivation: { value: string, type: string };
    story_id: BigInteger;
    creator_id: BigInteger;
    setting_id: BigInteger;
}

type GenderData = {
    label: string;
    value: string;
}

export const GenderOptions: GenderData[] = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
]

function CharacterNode({id, data, isConnectable, selected}: {id: string, data: CharacterData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);
    const [show, setShow] = useState(false);

    return (<>
        <div
            className={`relative bg-purple-50 rounded-4xl border p-3 shadow-sm transition-colors max-w-2xl ${ selected ? "border-purple-500 shadow-purple-200" : "border-purple-300" }`}
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
            <div className={`absolute top-3 right-3 text-purple-300 flex items-center`}>
                <PersonStanding className="mr-1" />
                <span>Character</span>
            </div>
            <div className="text-lg text-center mx-35 flex items-center justify-center gap-1">
                <strong>{data.first_name.value} {data.last_name.value}</strong>
                <sub>{data.alias.value}</sub>
                {data.gender.value === 'Male' ? (
                <Mars className="text-blue-600 inline-block" />
                ) : (
                <Venus className="text-red-600 inline-block" />
                )}
            </div>
            <div className='text-center'>
                Age {data.age.value}
            </div>
            <div className={`text-center`}>
                {show && (
                    <Tabs defaultValue="description" className="w-full flex items-center content-center">
                        <TabsList className='bg-transparent border border-purple-200'>
                            {data.description && <TabsTrigger 
                                value="description" 
                                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                            >
                                Description
                            </TabsTrigger>}
                            {data.background && <TabsTrigger 
                                value="background" 
                                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                            >
                                Background
                            </TabsTrigger>}
                            {data.motivation && <TabsTrigger 
                                value="motivation" 
                                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                            >
                                Motivation
                            </TabsTrigger>}
                        </TabsList>
                        {data.description && <TabsContent value="description">{data.description.value}</TabsContent>}
                        {data.background && <TabsContent value="background">{data.background.value}</TabsContent>}
                        {data.motivation && <TabsContent value="motivation">{data.motivation.value}</TabsContent>}
                    </Tabs>
                )}
            </div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    </>);
}

export default memo(CharacterNode);

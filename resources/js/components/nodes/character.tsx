import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PersonStanding, Mars, Venus, Eye, EyeClosed } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CharacterData = {
    id: string;
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
            className={`relative max-w-2xl rounded-4xl bg-purple-50 shadow-sm border p-3 transition-colors
            ${ selected ? "border-purple-700 shadow-purple-200 ring-1 ring-purple-200" : "border-purple-400 hoverable:border-purple-500" }`}
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
            <div className={`absolute top-3 right-3 text-purple-600 flex items-center`}>
                <PersonStanding className="mr-1" />
                <span className="text-sm">Character</span>
            </div>
            <div className="text-lg text-center mx-35 flex items-baseline justify-center gap-2">
                <strong className="text-slate-900">{data.first_name?.value ? data.first_name.value + " " + data.last_name.value : <span className="text-slate-500">--Unknown--</span>}</strong>
                <sub className="text-slate-700">{data.alias.value}</sub>
                {data.gender?.value &&
                    (data.gender.value === "Male" ? (
                        <Mars className="text-blue-600 inline-block" />
                    ) : (
                        <Venus className="text-red-600 inline-block" />
                    )
                )}
            </div>
            <div className={`text-center ${ show ? 'mb-3' : 'mb-0'}`}>
                {data.age?.value && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
                        Age {data.age.value}
                    </span>
                )}
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
                        {data.description && <TabsContent value="description" className="text-gray-600">{data.description.value}</TabsContent>}
                        {data.background && <TabsContent value="background" className="text-gray-600">{data.background.value}</TabsContent>}
                        {data.motivation && <TabsContent value="motivation" className="text-gray-600">{data.motivation.value}</TabsContent>}
                    </Tabs>
                )}
            </div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }} />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }} />
        </div>
    </>);
}

export default memo(CharacterNode);

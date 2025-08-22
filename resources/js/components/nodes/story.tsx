import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BookText } from 'lucide-react';
import { useInspectorStore } from '../inspector/store';

type StoryData = {
    id: string;
    label: {value: string, type: string};
    description:  {value: string, type: string};
    genres: {value: string[], type: string, options: string};
    tags: {value: string[], type: string, options: string};
};

type GenreData = {
    label: string;
    value: string;
}

type TagData = {
    label: string;
    value: string;
}

export const GenreOptions: GenreData[] = [
    {label: "Fantasy", value: "Fantasy"},
    {label: "Science Fiction", value: "Science Fiction"},
    {label: "Horror", value: "Horror"},
    {label: "Mystery", value: "Mystery"},
    {label: "Thriller / Suspense", value: "Thriller / Suspense"},
    {label: "Romance", value: "Romance"},
    {label: "Historical Fiction", value: "Historical Fiction"},
    {label: "Adventure", value: "Adventure"},
    {label: "Drama", value: "Drama"},
    {label: "Dystopian / Post-Apocalyptic", value: "Dystopian / Post-Apocalyptic"},
    {label: "Biography", value: "Biography"},
    {label: "Self-Help / Inspirational", value: "Self-Help / Inspirational"},
    {label: "True Crime", value: "True Crime"},
    {label: "Dark Fantasy", value: "Dark Fantasy"},
    {label: "Paranormal Romance", value: "Paranormal Romance"},
    {label: "Cyberpunk", value: "Cyberpunk"},
    {label: "Epic / High Fantasy", value: "Epic / High Fantasy"},
    {label: "Slice of Life", value: "Slice of Life"},
    {label: "Comedy", value: "Comedy"},
];

export const TagOptions: TagData[] = [
    {label: "Coming of Age", value: "Coming of Age"},
    {label: "Redemption", value: "Redemption"},
    {label: "Revenge", value: "Revenge"},
    {label: "Betrayal", value: "Betrayal"},
    {label: "Survival", value: "Survival"},
    {label: "Hope", value: "Hope"},
    {label: "Tragedy", value: "Tragedy"},
    {label: "Friendship", value: "Friendship"},
    {label: "Found Family", value: "Found Family"},
    {label: "Love Triangle", value: "Love Triangle"},
    {label: "Dark", value: "Dark"},
    {label: "Lighthearted", value: "Lighthearted"},
    {label: "Whimsical", value: "Whimsical"},
    {label: "Gritty", value: "Gritty"},
    {label: "Suspenseful", value: "Suspenseful"},
    {label: "Epic", value: "Epic"},
    {label: "Emotional", value: "Emotional"},
    {label: "Satirical", value: "Satirical"},
    {label: "Tense", value: "Tense"},
    {label: "Urban", value: "Urban"},
    {label: "Rural", value: "Rural"},
    {label: "Medieval", value: "Medieval"},
    {label: "Futuristic", value: "Futuristic"},
    {label: "Post-Apocalyptic", value: "Post-Apocalyptic"},
    {label: "Alternate History", value: "Alternate History"},
    {label: "Steampunk", value: "Steampunk"},
    {label: "Mythic", value: "Mythic"},
    {label: "Supernatural", value: "Supernatural"},
    {label: "Magic", value: "Magic"},
    {label: "Time Travel", value: "Time Travel"},
    {label: "Parallel Worlds", value: "Parallel Worlds"},
    {label: "Superpowers", value: "Superpowers"},
    {label: "Aliens", value: "Aliens"},
    {label: "Monsters", value: "Monsters"},
    {label: "Undead", value: "Undead"},
    {label: "Gods", value: "Gods"},
    {label: "Prophecy", value: "Prophecy"},
    {label: "Curses", value: "Curses"},
    {label: "Ancient Relics", value: "Ancient Relics"},
    {label: "Political Intrigue", value: "Political Intrigue"},
    {label: "War", value: "War"},
    {label: "Rebellion", value: "Rebellion"},
    {label: "Heist", value: "Heist"},
    {label: "Investigation", value: "Investigation"},
    {label: "Quest", value: "Quest"},
];



function StoryNode({id, data, isConnectable, selected}: {id: string,data: StoryData, isConnectable: boolean, selected?: boolean}){
    const setSelectedId = useInspectorStore((state) => state.setSelectedId);

    return (
        <>
            <div
                className={`relative bg-blue-50 rounded-full border p-3 shadow-sm transition-colors min-h-13 max-w-2xl ${ selected ? "border-blue-700 shadow-blue-200 ring-1 ring-blue-200" : "border-blue-400 hover:border-blue-500" }`}
                onClick={() => setSelectedId(id)}
            >
                <div className={`absolute top-3 right-3 flex items-center text-blue-600`}>
                    <BookText className="mr-1" />
                    <span className='text-sm'>Story</span>
                </div>
                <div className={`text-lg text-center mx-25`}>
                    <strong className="text-slate-900">{data.label.value}</strong>
                </div>
                <div className={`text-center`}>
                    <span className="text-gray-600">{data.description.value}</span>
                </div>
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={{ width: '10px', height: '10px', backgroundColor: 'white', borderColor: 'black' }} />
            </div>
        </>
    );
}

export default memo(StoryNode);

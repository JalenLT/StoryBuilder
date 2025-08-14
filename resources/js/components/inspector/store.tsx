import { create } from 'zustand';

type InspectorStore = {
    selectedId?: string;
    setSelectedId: (id?: string) => void;
}

export const useInspectorStore = create<InspectorStore>((set) => ({
    selectedId: undefined,
    setSelectedId: (id?: string) => set({ selectedId: id }),
}));
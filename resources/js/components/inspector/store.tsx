import { create } from 'zustand';

type InspectorStore = {
    selectedId?: string;
    setSelectedId: (id?: string) => void;
    currentAction?: string;
    setCurrentAction: (action?: string) => void;
}

export const useInspectorStore = create<InspectorStore>((set) => ({
    selectedId: undefined,
    currentAction: undefined,
    setSelectedId: (id?: string) => set({ selectedId: id }),
    setCurrentAction: (action?: string) => set({ currentAction: action }),
}));

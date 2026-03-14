import { create } from 'zustand';
import { BoardElement } from '../models/element.types';

export interface BoardState {
  elements: BoardElement[];
  selectedElementId: string | null;
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string) => void;
  selectedElement: (id: string) => void;
  clearSelection: () => void;
}
export const useBoardStore = create<BoardState>((set) => ({
  elements: [],
  selectedElementId: null,
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })),
  deleteElement: (id) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
  selectedElement: (id) => set(() => ({ selectedElementId: id })),
  clearSelection: () => set(() => ({ selectedElementId: null })),
}));

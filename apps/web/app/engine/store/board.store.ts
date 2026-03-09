import { create } from 'zustand';

export interface BoardElement {
  id: string;
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface BoardState {
  elements: BoardElement[];
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string) => void;
}
export const useBoardStore = create<BoardState>((set) => ({
  elements: [],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id == id ? { ...el, ...updates } : el)),
    })),
  deleteElement: (id) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
}));

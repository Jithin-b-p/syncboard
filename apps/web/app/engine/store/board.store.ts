import { create } from 'zustand';
import { BoardElement } from '../models/element.types';

export interface BoardState {
  elements: BoardElement[];
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string) => void;
}
export const useBoardStore = create<BoardState>((set) => ({
  elements: [
    {
      id: '1',
      type: 'rectangle',
      x: 200,
      y: 200,
      width: 200,
      height: 120,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id == id ? { ...el, ...updates } : el)),
    })),
  deleteElement: (id) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
}));

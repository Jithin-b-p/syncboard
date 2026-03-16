import { create } from 'zustand';
import { BoardElement } from '../models/element.types';
import { ResizeHandles } from '../utils/getResizeHandles';
import { SelectionBox } from '../selection/selection.types';

export interface BoardState {
  elements: BoardElement[];
  selectedElementId: string | null;
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string) => void;
  selectedElement: (id: string) => void;
  clearSelection: () => void;
  isResizing: boolean;
  activeResizeHandle: ResizeHandles | null;
  setIsResizing: (value: boolean) => void;
  setActiveResizeHandle: (handle: ResizeHandles | null) => void;
  selectionBox: SelectionBox | null;
  setSelectionBox: (box: SelectionBox | null) => void;
  selectedElementIds: Set<string>;
  setSelectedElements: (ids: Set<string>) => void;
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
  clearSelection: () => set(() => ({ selectedElementIds: new Set(), selectedElementId: null })),
  isResizing: false,
  activeResizeHandle: null,

  setIsResizing: (value) =>
    set(() => ({
      isResizing: value,
    })),

  setActiveResizeHandle: (value) => set(() => ({ activeResizeHandle: value })),

  selectionBox: null,
  setSelectionBox: (box) => set({ selectionBox: box }),

  selectedElementIds: new Set(),
  setSelectedElements: (ids) => set({ selectedElementIds: new Set(ids) }),
}));

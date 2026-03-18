import { create } from 'zustand';
import { BoardElement } from '../models/element.types';
import { ResizeHandles } from '../utils/getResizeHandles';
import { SelectionBox } from '../selection/selection.types';
import { HistoryStore } from '../history/history.types';
import { createInitialHistoryState, pushToHistory, redo, undo } from '../history/history.store';

const initialState = {
  elements: [],
  selectedElementsIds: new Set<string>(),
};

export interface BoardState {
  elements: BoardElement[];
  addElement: (element: BoardElement) => void;
  updateElement: (id: string | null, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string | null) => void;
  selectElement: (id: string) => void;
  clearSelection: () => void;
  isResizing: boolean;
  activeResizeHandle: ResizeHandles | null;
  setIsResizing: (value: boolean) => void;
  setActiveResizeHandle: (handle: ResizeHandles | null) => void;
  selectionBox: SelectionBox | null;
  setSelectionBox: (box: SelectionBox | null) => void;
  selectedElementIds: Set<string>;
  setSelectedElements: (ids: Set<string>) => void;
  history: HistoryStore;
  setPresent: (state: { elements: BoardElement[]; selectedElementIds: Set<string> }) => void;
  undo: () => void;
  redo: () => void;
}
export const useBoardStore = create<BoardState>((set) => ({
  elements: [],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => {
      const updatedElements = state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      );
      const newHistory = pushToHistory(state.history, {
        elements: updatedElements,
        selectedElementsIds: state.selectedElementIds,
      });

      return { elements: updatedElements, history: newHistory };
    }),
  deleteElement: (id) =>
    set((state) => ({ elements: state.elements.filter((el) => el.id !== id) })),
  selectElement: (id) => set(() => ({ selectedElementIds: new Set([id]) })),
  clearSelection: () => set(() => ({ selectedElementIds: new Set() })),
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
  history: createInitialHistoryState(initialState),
  setPresent: (newState) =>
    set((state) => {
      const newHistory = pushToHistory(state.history, {
        elements: newState.elements,
        selectedElementsIds: newState.selectedElementIds,
      });

      return {
        history: newHistory,
        elements: newState.elements,
        selectedElementIds: newState.selectedElementIds,
      };
    }),

  undo: () => {
    set((state) => {
      const newhistory = undo(state.history);

      return {
        history: newhistory,
        elements: newhistory.present.elements,
        selectedElementIds: newhistory.present.selectedElementsIds,
      };
    });
  },
  redo: () => {
    set((state) => {
      const newHistory = redo(state.history);
      return {
        history: newHistory,
        elements: newHistory.present.elements,
        selectedElementIds: newHistory.present.selectedElementsIds,
      };
    });
  },
}));

import { create } from 'zustand';
import { BoardElement } from '../models/element.types';
import { ResizeHandles } from '../utils/getResizeHandles';
import { SelectionBox } from '../selection/selection.types';
import { HistoryStore } from '../history/history.types';
import { pushCommand, redo, undo } from '../history/history.store';
import { Command } from '../commands/command.types';

const initialState = {
  past: [],
  future: [],
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
  undo: () => void;
  redo: () => void;
  executeCommand: (command: Command) => void;
}
export const useBoardStore = create<BoardState>((set) => ({
  elements: [],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => {
      const updatedElements = state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      );

      return { elements: updatedElements };
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
  history: initialState,
  undo: () => {
    set((state) => {
      const newhistory = undo(state.history);

      return {
        history: newhistory,
      };
    });
  },
  redo: () => {
    set((state) => {
      const newHistory = redo(state.history);
      return {
        history: newHistory,
      };
    });
  },

  executeCommand: (command: Command) =>
    set((state) => {
      command.execute();
      const newHistory = pushCommand(state.history, command);

      return { history: newHistory };
    }),
}));

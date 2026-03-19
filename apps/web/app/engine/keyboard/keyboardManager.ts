import { DeleteElementsCommand } from '../commands/deleteElements.command';
import { DuplicateElementsCommand } from '../commands/duplicateElements.command';
import { useBoardStore } from '../store/board.store';

export function handleKeyDown(event: KeyboardEvent) {
  const store = useBoardStore.getState();
  const isCtrl = event.ctrlKey || event.metaKey;

  if (isCtrl && event.key === 'z' && !event.shiftKey) {
    event.preventDefault();

    store.undo();
    return;
  }

  if (isCtrl && event.key === 'z' && event.shiftKey) {
    event.preventDefault();
    store.redo();
    return;
  }

  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();

    const { elements, selectedElementIds } = store;
    if (selectedElementIds.size === 0) return;

    const command = new DeleteElementsCommand(elements, selectedElementIds);
    store.executeCommand(command);
    return;
  }

  if (isCtrl && event.key === 'd') {
    event.preventDefault();
    const { elements, selectedElementIds } = store;

    if (selectedElementIds.size === 0) return;

    const command = new DuplicateElementsCommand(elements, selectedElementIds);
    store.executeCommand(command);
  }
}

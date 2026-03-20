import { DeleteElementsCommand } from '../commands/deleteElements.command';
import { DuplicateElementsCommand } from '../commands/duplicateElements.command';
import { MoveByKeyCommand } from '../commands/moveByKey.command';
import { useBoardStore } from '../store/board.store';

export function handleKeyDown(event: KeyboardEvent) {
  const MOVE_STEP = event.shiftKey ? 10 : 1;

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
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();

    const command = new MoveByKeyCommand(0, -MOVE_STEP);
    store.executeCommand(command);
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();

    const command = new MoveByKeyCommand(0, MOVE_STEP);
    store.executeCommand(command);
    return;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();

    const command = new MoveByKeyCommand(-MOVE_STEP, 0);
    store.executeCommand(command);
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    const command = new MoveByKeyCommand(MOVE_STEP, 0);
    store.executeCommand(command);
    return;
  }

  if (isCtrl && event.key === 'a') {
    event.preventDefault();

    const allIds = new Set(store.elements.map((el) => el.id));

    useBoardStore.setState({ selectedElementIds: allIds });
    return;
  }
}

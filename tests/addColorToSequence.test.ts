import assert from 'assert';
import { useEscapeRoom } from '../client/src/lib/stores/useEscapeRoom';

// reset store
useEscapeRoom.getState().reset();

const { addColorToSequence } = useEscapeRoom.getState();

for (const c of ['r','g','b','y']) {
  addColorToSequence(c);
}

const state = useEscapeRoom.getState();
assert.strictEqual(state.solved[1], true, 'Puzzle should be solved after correct sequence');
assert.strictEqual(state.colorSequence.length, 0, 'colorSequence should be cleared after solving');
console.log('addColorToSequence test passed');

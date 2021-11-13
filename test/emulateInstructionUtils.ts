import emulateInstruction from "../src/emulateInstruction";
import State8080 from "../src/state8080";

/* eslint-disable-next-line import/prefer-default-export */
export const testInstruction = (
  state: State8080,
  instruction: number,
  pcIncrement: number,
  cyclesDecrement: number,
  before: () => void = null,
  after: () => void = null
) => {
  const { pc, cycles } = state;
  state.memory[state.pc] = instruction;
  if (before) {
    before();
  }

  emulateInstruction(state);

  expect(state.pc).toBe(pc + pcIncrement);
  expect(state.cycles).toBe(cycles - cyclesDecrement);
  if (after) {
    after();
  }
};

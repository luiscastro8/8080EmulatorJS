import emulateInstruction from "../src/emulateInstruction";
import State8080 from "../src/state8080";

describe("emulate instructions", () => {
  let state: State8080;
  beforeEach(() => {
    state = new State8080();
  });

  test("unknown opcode", () => {
    const pc = state.getPC();
    state.getMemory()[state.getPC()] = 0xfd;

    expect(() => emulateInstruction(state)).toThrowError();
  });

  test("0x00", () => {
    const pc = state.getPC();
    const cycles = state.getCycles();
    state.getMemory()[state.getPC()] = 0x00;

    emulateInstruction(state);

    expect(state.getPC()).toBe(pc + 1);
    expect(state.getCycles()).toBe(cycles - 4);
  });
});

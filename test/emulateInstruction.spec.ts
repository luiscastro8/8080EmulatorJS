import emulateInstruction from "../src/emulateInstruction";
import State8080 from "../src/state8080";

describe("emulate instructions", () => {
  let state: State8080;
  beforeEach(() => {
    state = new State8080();
  });

  test("unknown opcode", () => {
    state.memory[state.pc] = 0xfd;

    expect(() => emulateInstruction(state)).toThrowError();
  });

  test("0x00", () => {
    const { pc, cycles } = state;
    state.memory[state.pc] = 0x00;

    emulateInstruction(state);

    expect(state.pc).toBe(pc + 1);
    expect(state.cycles).toBe(cycles - 4);
  });

  test("0xc3", () => {
    const { cycles } = state;
    state.memory[state.pc] = 0xc3;
    state.memory[state.pc + 1] = 0x21;
    state.memory[state.pc + 2] = 0x20;

    emulateInstruction(state);

    expect(state.pc).toBe(0x2021);
    expect(state.cycles).toBe(cycles - 10);
  });
});

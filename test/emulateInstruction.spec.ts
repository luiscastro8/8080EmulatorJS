import emulateInstruction from "../src/emulateInstruction";
import State8080 from "../src/state8080";
import { testInstruction } from "./emulateInstructionUtils";

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
    testInstruction(state, 0x00, 1, 4);
  });

  test("0x01", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
      state.memory[state.pc + 2] = 0x21;
    };
    const after = () => {
      expect(state.b).toBe(0x21);
      expect(state.c).toBe(0x20);
    };
    testInstruction(state, 0x01, 3, 10, before, after);
  });

  test("0x05", () => {
    const before = () => {
      state.b = 0x00;
    };
    const after = () => {
      expect(state.b).toBe(0xff);
    };
    testInstruction(state, 0x05, 1, 5, before, after);
  });

  test("0x06", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x69;
    };
    const after = () => {
      expect(state.b).toBe(0x69);
    };
    testInstruction(state, 0x06, 2, 7, before, after);
  });

  test("0x0a", () => {
    const before = () => {
      state.b = 0x31;
      state.c = 0x32;
      state.memory[0x3132] = 0x33;
    };
    const after = () => {
      expect(state.a).toBe(0x33);
    };
    testInstruction(state, 0x0a, 1, 7, before, after);
  });

  test("0x11", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
      state.memory[state.pc + 2] = 0x21;
    };
    const after = () => {
      expect(state.d).toBe(0x21);
      expect(state.e).toBe(0x20);
    };
    testInstruction(state, 0x11, 3, 10, before, after);
  });

  test("0x13", () => {
    const before = () => {
      state.d = 0xff;
      state.e = 0xff;
    };
    const after = () => {
      expect(state.d).toBe(0x0);
      expect(state.e).toBe(0x0);
    };
    testInstruction(state, 0x13, 1, 6, before, after);
  });

  test("0x1a", () => {
    const before = () => {
      state.d = 0x31;
      state.e = 0x32;
      state.memory[0x3132] = 0x33;
    };
    const after = () => {
      expect(state.a).toBe(0x33);
    };
    testInstruction(state, 0x1a, 1, 7, before, after);
  });

  test("0x21", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
      state.memory[state.pc + 2] = 0x21;
    };
    const after = () => {
      expect(state.h).toBe(0x21);
      expect(state.l).toBe(0x20);
    };
    testInstruction(state, 0x21, 3, 10, before, after);
  });

  test("0x23", () => {
    const before = () => {
      state.h = 0xff;
      state.l = 0xff;
    };
    const after = () => {
      expect(state.h).toBe(0x0);
      expect(state.l).toBe(0x0);
    };
    testInstruction(state, 0x23, 1, 6, before, after);
  });

  test("0x31", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x21;
      state.memory[state.pc + 2] = 0x20;
    };
    const after = () => {
      expect(state.sp).toBe(0x2021);
    };
    testInstruction(state, 0x31, 3, 10, before, after);
  });

  test("0x77", () => {
    const before = () => {
      state.h = 0x20;
      state.l = 0x21;
      state.a = 0x22;
    };
    const after = () => {
      expect(state.memory[0x2021]).toBe(0x22);
    };
    testInstruction(state, 0x77, 1, 7, before, after);
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

  test("0xcd", () => {
    const { sp, cycles } = state;
    state.pc = 0x2021;
    state.memory[state.pc] = 0xcd;
    state.memory[state.pc + 1] = 0x22;
    state.memory[state.pc + 2] = 0x23;

    emulateInstruction(state);

    expect(state.sp).toBe(sp - 2);
    expect(state.pc).toBe(0x2322);
    expect(state.memory[sp - 1]).toBe(0x20);
    expect(state.memory[sp - 2]).toBe(0x21 + 3);
    expect(state.cycles).toBe(cycles - 17);
  });
});

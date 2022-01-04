import emulateInstruction from "../src/emulateInstruction";
import State8080 from "../src/state8080";
import { testInstruction } from "./emulateInstructionUtils";

describe("emulate instructions", () => {
  let state: State8080;
  let setFlagsSpy: jest.SpyInstance;
  let writeToPortSpy: jest.SpyInstance;
  beforeEach(() => {
    state = new State8080();
    setFlagsSpy = jest.spyOn(state.cc, "setFlags");
    writeToPortSpy = jest.spyOn(state, "writeToPort");
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
    expect(setFlagsSpy).toHaveBeenCalled();
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

  describe("0x09", () => {
    test("0x03 + 0x04 = 0x07", () => {
      const before = () => {
        state.h = 0x00;
        state.l = 0x03;
        state.b = 0x00;
        state.c = 0x04;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0x00);
        expect(state.l).toBe(0x07);
        expect(state.cc.cy).toBe(false);
      };
      testInstruction(state, 0x09, 1, 11, before, after);
    });

    test("0xff + 0xfe & 0xff = 0xfd", () => {
      const before = () => {
        state.h = 0xff;
        state.l = 0xff;
        state.b = 0xff;
        state.c = 0xfe;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0xff);
        expect(state.l).toBe(0xfd);
        expect(state.cc.cy).toBe(true);
      };
      testInstruction(state, 0x09, 1, 11, before, after);
    });
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

  test("0x0d", () => {
    const before = () => {
      state.c = 0x05;
    };
    const after = () => {
      expect(state.c).toBe(0x04);
      expect(setFlagsSpy).toBeCalled();
    };
    testInstruction(state, 0x0d, 1, 5, before, after);
  });

  test("0x0e", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
    };
    const after = () => {
      expect(state.c).toBe(0x20);
    };
    testInstruction(state, 0x0e, 2, 7, before, after);
  });

  test("0x0f", () => {
    const before = () => {
      state.a = 0b01010101;
    };
    const after = () => {
      expect(state.a).toBe(0b10101010);
      expect(state.cc.cy).toBe(true);
    };
    testInstruction(state, 0x0f, 1, 4, before, after);
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

  describe("0x19", () => {
    test("0x03 + 0x04 = 0x07", () => {
      const before = () => {
        state.h = 0x00;
        state.l = 0x03;
        state.d = 0x00;
        state.e = 0x04;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0x00);
        expect(state.l).toBe(0x07);
        expect(state.cc.cy).toBe(false);
      };
      testInstruction(state, 0x19, 1, 11, before, after);
    });

    test("0xff + 0xfe & 0xff = 0xfd", () => {
      const before = () => {
        state.h = 0xff;
        state.l = 0xff;
        state.d = 0xff;
        state.e = 0xfe;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0xff);
        expect(state.l).toBe(0xfd);
        expect(state.cc.cy).toBe(true);
      };
      testInstruction(state, 0x19, 1, 11, before, after);
    });
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

  test("0x26", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x21;
    };
    const after = () => {
      expect(state.h).toBe(0x21);
    };
    testInstruction(state, 0x26, 2, 7, before, after);
  });

  describe("0x29", () => {
    test("0x03 + 0x03 = 0x06", () => {
      const before = () => {
        state.h = 0x00;
        state.l = 0x03;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0x00);
        expect(state.l).toBe(0x06);
        expect(state.cc.cy).toBe(false);
      };
      testInstruction(state, 0x29, 1, 11, before, after);
    });

    test("0xff + 0xff & 0xff = 0xfe", () => {
      const before = () => {
        state.h = 0xff;
        state.l = 0xff;
        state.cc.cy = false;
      };
      const after = () => {
        expect(state.h).toBe(0xff);
        expect(state.l).toBe(0xfe);
        expect(state.cc.cy).toBe(true);
      };
      testInstruction(state, 0x29, 1, 11, before, after);
    });
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

  test("0x32", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x21;
      state.memory[state.pc + 2] = 0x20;
      state.a = 0x22;
    };
    const after = () => {
      expect(state.memory[0x2021]).toBe(0x22);
    };
    testInstruction(state, 0x32, 3, 13, before, after);
  });

  test("0x36", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
    };
    const after = () => {
      expect(state.memory[(state.h << 8) | state.l]).toBe(0x20);
    };
    testInstruction(state, 0x36, 2, 10, before, after);
  });

  test("0x3a", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x21;
      state.memory[state.pc + 2] = 0x20;
      state.memory[0x2021] = 0x30;
    };
    const after = () => {
      expect(state.a).toBe(0x30);
    };
    testInstruction(state, 0x3a, 3, 13, before, after);
  });

  test("0x3e", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
    };
    const after = () => {
      expect(state.a).toBe(0x20);
    };
    testInstruction(state, 0x3e, 2, 7, before, after);
  });

  test("0x56", () => {
    const before = () => {
      state.h = 0x30;
      state.l = 0x31;
      state.memory[(state.h << 8) | state.l] = 0x21;
    };
    const after = () => {
      expect(state.d).toBe(0x21);
    };
    testInstruction(state, 0x56, 1, 7, before, after);
  });

  test("0x5e", () => {
    const before = () => {
      state.h = 0x30;
      state.l = 0x31;
      state.memory[(state.h << 8) | state.l] = 0x21;
    };
    const after = () => {
      expect(state.e).toBe(0x21);
    };
    testInstruction(state, 0x5e, 1, 7, before, after);
  });

  test("0x66", () => {
    const before = () => {
      state.h = 0x30;
      state.l = 0x31;
      state.memory[(state.h << 8) | state.l] = 0x21;
    };
    const after = () => {
      expect(state.h).toBe(0x21);
    };
    testInstruction(state, 0x66, 1, 7, before, after);
  });

  test("0x6f", () => {
    const before = () => {
      state.a = 0x21;
    };
    const after = () => {
      expect(state.l).toBe(0x21);
    };
    testInstruction(state, 0x6f, 1, 5, before, after);
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

  test("0x7a", () => {
    const before = () => {
      state.d = 0x20;
    };
    const after = () => {
      expect(state.a).toBe(0x20);
    };
    testInstruction(state, 0x7a, 1, 5, before, after);
  });

  test("0x7b", () => {
    const before = () => {
      state.e = 0x21;
    };
    const after = () => {
      expect(state.a).toBe(0x21);
    };
    testInstruction(state, 0x7b, 1, 5, before, after);
  });

  test("0x7c", () => {
    const before = () => {
      state.h = 0x20;
    };
    const after = () => {
      expect(state.a).toBe(0x20);
    };
    testInstruction(state, 0x7c, 1, 5, before, after);
  });

  test("0x7e", () => {
    const before = () => {
      state.h = 0x30;
      state.l = 0x31;
      state.memory[(state.h << 8) | state.l] = 0x21;
    };
    const after = () => {
      expect(state.a).toBe(0x21);
    };
    testInstruction(state, 0x7e, 1, 7, before, after);
  });

  test("0xa7", () => {
    const after = () => {
      expect(setFlagsSpy).toBeCalled();
    };
    testInstruction(state, 0xa7, 1, 4, undefined, after);
  });

  test("0xaf", () => {
    const before = () => {
      state.a = 0b10101010;
    };
    const after = () => {
      expect(state.a).toBe(0);
      expect(setFlagsSpy).toBeCalled();
    };
    testInstruction(state, 0xaf, 1, 4, before, after);
  });

  test("0xc1", () => {
    const { sp } = state;
    const before = () => {
      state.memory[state.sp] = 0x20;
      state.memory[state.sp + 1] = 0x21;
    };
    const after = () => {
      expect(state.sp).toBe(sp + 2);
      expect(state.c).toBe(0x20);
      expect(state.b).toBe(0x21);
    };
    testInstruction(state, 0xc1, 1, 10, before, after);
  });

  test("0xc2 if zero", () => {
    const { cycles, pc } = state;
    state.memory[state.pc] = 0xc2;
    state.memory[state.pc + 1] = 0x21;
    state.memory[state.pc + 2] = 0x20;
    state.cc.setFlags(0, false);

    emulateInstruction(state);

    expect(state.pc).toBe(pc + 3);
    expect(state.cycles).toBe(cycles - 10);
  });

  test("0xc2 if not zero", () => {
    const { cycles } = state;
    state.memory[state.pc] = 0xc2;
    state.memory[state.pc + 1] = 0x21;
    state.memory[state.pc + 2] = 0x20;
    state.cc.setFlags(1, false);

    emulateInstruction(state);

    expect(state.pc).toBe(0x2021);
    expect(state.cycles).toBe(cycles - 15);
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

  test("0xc5", () => {
    const { sp } = state;
    const before = () => {
      state.c = 0x21;
      state.b = 0x20;
    };
    const after = () => {
      expect(state.sp).toBe(sp - 2);
      expect(state.memory[state.sp]).toBe(0x21);
      expect(state.memory[state.sp + 1]).toBe(0x20);
    };
    testInstruction(state, 0xc5, 1, 11, before, after);
  });

  test("0xc6", () => {
    const before = () => {
      state.a = 0x05;
      state.memory[state.pc + 1] = 0x02;
    };
    const after = () => {
      expect(state.a).toBe(0x07);
      expect(setFlagsSpy).toBeCalled();
    };
    testInstruction(state, 0xc6, 2, 7, before, after);
  });

  test("0xc9", () => {
    const { cycles, sp } = state;
    state.memory[state.pc] = 0xc9;
    state.memory[state.sp] = 0x21;
    state.memory[state.sp + 1] = 0x20;

    emulateInstruction(state);

    expect(state.pc).toBe(0x2021);
    expect(state.cycles).toBe(cycles - 10);
    expect(state.sp).toBe(sp + 2);
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

  test("0xd1", () => {
    const { sp } = state;
    const before = () => {
      state.memory[state.sp] = 0x20;
      state.memory[state.sp + 1] = 0x21;
    };
    const after = () => {
      expect(state.sp).toBe(sp + 2);
      expect(state.e).toBe(0x20);
      expect(state.d).toBe(0x21);
    };
    testInstruction(state, 0xd1, 1, 10, before, after);
  });

  test("0xd3", () => {
    const before = () => {
      state.memory[state.pc + 1] = 0x20;
    };
    const after = () => {
      expect(writeToPortSpy).toBeCalledWith(0x20);
    };
    testInstruction(state, 0xd3, 2, 10, before, after);
  });

  test("0xd5", () => {
    const { sp } = state;
    const before = () => {
      state.e = 0x21;
      state.d = 0x20;
    };
    const after = () => {
      expect(state.sp).toBe(sp - 2);
      expect(state.memory[state.sp]).toBe(0x21);
      expect(state.memory[state.sp + 1]).toBe(0x20);
    };
    testInstruction(state, 0xd5, 1, 11, before, after);
  });

  test("0xe1", () => {
    const { sp } = state;
    const before = () => {
      state.memory[state.sp] = 0x20;
      state.memory[state.sp + 1] = 0x21;
    };
    const after = () => {
      expect(state.sp).toBe(sp + 2);
      expect(state.l).toBe(0x20);
      expect(state.h).toBe(0x21);
    };
    testInstruction(state, 0xe1, 1, 10, before, after);
  });

  test("0xe5", () => {
    const { sp } = state;
    const before = () => {
      state.l = 0x21;
      state.h = 0x20;
    };
    const after = () => {
      expect(state.sp).toBe(sp - 2);
      expect(state.memory[state.sp]).toBe(0x21);
      expect(state.memory[state.sp + 1]).toBe(0x20);
    };
    testInstruction(state, 0xe5, 1, 11, before, after);
  });

  test("0xe6", () => {
    const before = () => {
      state.a = 0b10011101;
      state.memory[state.pc + 1] = 0b11001100;
    };
    const after = () => {
      expect(state.a).toBe(0b10001100);
      expect(setFlagsSpy).toBeCalledTimes(1);
    };
    testInstruction(state, 0xe6, 2, 7, before, after);
  });

  test("0xeb", () => {
    const before = () => {
      state.h = 0x20;
      state.l = 0x21;
      state.d = 0x22;
      state.e = 0x23;
    };
    const after = () => {
      expect(state.h).toBe(0x22);
      expect(state.l).toBe(0x23);
      expect(state.d).toBe(0x20);
      expect(state.e).toBe(0x21);
    };
    testInstruction(state, 0xeb, 1, 4, before, after);
  });

  test("0xf1", () => {
    const { sp } = state;
    const before = () => {
      state.memory[state.sp] = 0b00011010;
      state.memory[state.sp + 1] = 0x21;
    };
    const after = () => {
      expect(state.sp).toBe(sp + 2);
      expect(state.cc.getFlags()).toBe(0b00011010);
      expect(state.a).toBe(0x21);
    };
    testInstruction(state, 0xf1, 1, 10, before, after);
  });

  test("0xfb", () => {
    const before = () => {
      state.enableInterrupt = false;
    };
    const after = () => {
      expect(state.enableInterrupt).toBe(true);
    };
    testInstruction(state, 0xfb, 1, 4, before, after);
  });

  test("0xfe", () => {
    const after = () => {
      expect(setFlagsSpy).toBeCalled();
    };
    testInstruction(state, 0xfe, 2, 7, undefined, after);
  });
});

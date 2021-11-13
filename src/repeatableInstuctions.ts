import State8080 from "./state8080";

export enum STATEEnums {
  B,
  D,
  H,
  SP,
}

export const LDAX = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      const address = (state.b << 8) | state.c;
      state.a = state.memory[address];
      break;
    }
    case STATEEnums.D: {
      const address = (state.d << 8) | state.e;
      state.a = state.memory[address];
      break;
    }
    default: {
      throw new Error();
    }
  }
  state.pc += 1;
  state.cycles -= 7;
};

export const LXI = (state: State8080, arg: STATEEnums) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  /* eslint-disable-next-line default-case */
  switch (arg) {
    case STATEEnums.B: {
      state.c = instruction[1];
      state.b = instruction[2];
      break;
    }
    case STATEEnums.D: {
      state.e = instruction[1];
      state.d = instruction[2];
      break;
    }
    case STATEEnums.H: {
      state.l = instruction[1];
      state.h = instruction[2];
      break;
    }
    case STATEEnums.SP: {
      state.sp = (instruction[2] << 8) + instruction[1];
      break;
    }
  }
  state.pc += 3;
  state.cycles -= 10;
};

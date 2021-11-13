import State8080 from "./state8080";

export enum LXIENUMS {
  B,
  D,
  H,
  SP,
}

export const LXI = (state: State8080, arg: LXIENUMS) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  /* eslint-disable-next-line default-case */
  switch (arg) {
    case LXIENUMS.B: {
      state.c = instruction[1];
      state.b = instruction[2];
      break;
    }
    case LXIENUMS.D: {
      state.e = instruction[1];
      state.d = instruction[2];
      break;
    }
    case LXIENUMS.H: {
      state.l = instruction[1];
      state.h = instruction[2];
      break;
    }
    case LXIENUMS.SP: {
      state.sp = (instruction[2] << 8) + instruction[1];
      break;
    }
  }
  state.pc += 3;
  state.cycles -= 10;
};

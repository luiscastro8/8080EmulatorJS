import State8080 from "./state8080";
import { HILO } from "./utils";

export enum STATEEnums {
  B,
  D,
  H,
  SP,
  PSW,
}

export enum JumpEnums {
  M,
  NCY,
  Z,
}

export const CALL = (state: State8080, newAddress: number) => {
  const returnAddress = state.pc + 3;
  state.memory[state.sp - 1] = returnAddress >> 8;
  state.memory[state.sp - 2] = returnAddress & 0xff;
  state.sp -= 2;
  state.pc = newAddress;
};

export const DAD = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      const hl = (state.h << 8) | state.l;
      const bc = (state.b << 8) | state.c;
      const answer = hl + bc;
      state.h = (answer >> 8) & 0xff;
      state.l = answer & 0xff;
      state.cc.cy = answer > 0xffff;
      break;
    }
    case STATEEnums.D: {
      const hl = (state.h << 8) | state.l;
      const de = (state.d << 8) | state.e;
      const answer = hl + de;
      state.h = (answer >> 8) & 0xff;
      state.l = answer & 0xff;
      state.cc.cy = answer > 0xffff;
      break;
    }
    case STATEEnums.H: {
      const hl = (state.h << 8) | state.l;
      const answer = hl * 2;
      state.h = (answer >> 8) & 0xff;
      state.l = answer & 0xff;
      state.cc.cy = answer > 0xff;
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
  state.pc += 1;
  state.cycles -= 11;
};

export const DCX = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.H: {
      const hl = (state.h << 8) | state.l;
      const answer = hl - 1;
      state.h = (answer >> 8) & 0xff;
      state.l = answer & 0xff;
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
  state.pc += 1;
  state.cycles -= 6;
};

export const DCR = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      state.c -= 1;
      state.cc.setFlags(state.c, false);
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
};

export const INX = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      let address = (state.b << 8) | state.c;
      address += 1;
      state.b = (address >> 8) & 0xff;
      state.c = address & 0xff;
      break;
    }
    case STATEEnums.D: {
      let address = (state.d << 8) | state.e;
      address += 1;
      state.d = (address >> 8) & 0xff;
      state.e = address & 0xff;
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
  state.pc += 1;
  state.cycles -= 6;
};

export const JUMP = (state: State8080, arg: JumpEnums) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  switch (arg) {
    case JumpEnums.M: {
      if (state.cc.s) {
        state.pc = HILO(instruction[2], instruction[1]);
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    case JumpEnums.NCY: {
      if (!state.cc.cy) {
        state.pc = HILO(instruction[2], instruction[1]);
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    case JumpEnums.Z: {
      if (state.cc.z) {
        state.pc = HILO(instruction[2], instruction[1]);
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
};

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
      throw new Error("An error has occurred");
    }
  }
  state.pc += 1;
  state.cycles -= 7;
};

export const LXI = (state: State8080, arg: STATEEnums) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
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
    default: {
      throw new Error("An error has occurred");
    }
  }
  state.pc += 3;
  state.cycles -= 10;
};

export const POP = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      state.c = state.memory[state.sp];
      state.b = state.memory[state.sp + 1];
      break;
    }
    case STATEEnums.D: {
      state.e = state.memory[state.sp];
      state.d = state.memory[state.sp + 1];
      break;
    }
    case STATEEnums.H: {
      state.l = state.memory[state.sp];
      state.h = state.memory[state.sp + 1];
      break;
    }
    case STATEEnums.PSW: {
      state.cc.z = !!(state.memory[state.sp] & 0b1);
      state.cc.s = !!((state.memory[state.sp] >> 1) & 0b1);
      state.cc.p = !!((state.memory[state.sp] >> 2) & 0b1);
      state.cc.cy = !!((state.memory[state.sp] >> 3) & 0b1);
      state.cc.ac = !!((state.memory[state.sp] >> 4) & 0b1);
      state.a = state.memory[state.sp + 1];
      break;
    }
    default: {
      throw new Error("An error has occurred");
    }
  }
  state.pc += 1;
  state.cycles -= 10;
  state.sp += 2;
};

export const PUSH = (state: State8080, arg: STATEEnums) => {
  switch (arg) {
    case STATEEnums.B: {
      state.memory[state.sp - 2] = state.c;
      state.memory[state.sp - 1] = state.b;
      break;
    }
    case STATEEnums.D: {
      state.memory[state.sp - 2] = state.e;
      state.memory[state.sp - 1] = state.d;
      break;
    }
    case STATEEnums.H: {
      state.memory[state.sp - 2] = state.l;
      state.memory[state.sp - 1] = state.h;
      break;
    }
    case STATEEnums.PSW: {
      state.memory[state.sp - 1] = state.a;
      state.memory[state.sp - 2] = state.cc.getFlags();
      break;
    }
    default: {
      throw new Error("An error has occured");
    }
  }
  state.sp -= 2;
  state.pc += 1;
  state.cycles -= 11;
};

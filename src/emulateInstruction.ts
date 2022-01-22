import {
  DAD,
  DCR,
  DCX,
  INX,
  JUMP,
  JumpEnums,
  LDAX,
  LXI,
  POP,
  PUSH,
  STATEEnums,
} from "./repeatableInstuctions";
import State8080 from "./state8080";

/* eslint-disable no-param-reassign */
const emulateInstruction = (state: State8080) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  const opcode = instruction[0];
  switch (opcode) {
    case 0x00: {
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x01: {
      LXI(state, STATEEnums.B);
      break;
    }
    case 0x03: {
      INX(state, STATEEnums.B);
      break;
    }
    case 0x05: {
      state.b -= 1;
      state.cc.setFlags(state.b, false);
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x06: {
      state.b = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x07: {
      let firstBit = state.a & 0b10000000;
      state.cc.cy = !!firstBit;
      firstBit >>= 7;
      state.a <<= 1;
      state.a |= firstBit;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x09: {
      DAD(state, STATEEnums.B);
      break;
    }
    case 0x0a: {
      LDAX(state, STATEEnums.B);
      break;
    }
    case 0x0d: {
      DCR(state, STATEEnums.B);
      break;
    }
    case 0x0e: {
      state.c = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x0f: {
      let lastBit = state.a & 0b1;
      state.cc.cy = !!lastBit;
      lastBit <<= 7;
      state.a >>= 1;
      state.a |= lastBit;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x11: {
      LXI(state, STATEEnums.D);
      break;
    }
    case 0x13: {
      INX(state, STATEEnums.D);
      break;
    }
    case 0x16: {
      state.d = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x19: {
      DAD(state, STATEEnums.D);
      break;
    }
    case 0x1a: {
      LDAX(state, STATEEnums.D);
      break;
    }
    case 0x21: {
      LXI(state, STATEEnums.H);
      break;
    }
    case 0x23: {
      let address = (state.h << 8) | state.l;
      address += 1;
      state.h = (address >> 8) & 0xff;
      state.l = address & 0xff;
      state.pc += 1;
      state.cycles -= 6;
      break;
    }
    case 0x26: {
      state.h = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x29: {
      DAD(state, STATEEnums.H);
      break;
    }
    case 0x2b: {
      DCX(state, STATEEnums.H);
      break;
    }
    case 0x2e: {
      state.l = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x31: {
      LXI(state, STATEEnums.SP);
      break;
    }
    case 0x32: {
      const address = (instruction[2] << 8) | instruction[1];
      state.memory[address] = state.a;
      state.pc += 3;
      state.cycles -= 13;
      break;
    }
    case 0x35: {
      const address = (state.h << 8) | state.l;
      state.memory[address] -= 1;
      state.cc.setFlags(state.memory[address], false);
      state.pc += 1;
      state.cycles -= 10;
      break;
    }
    case 0x36: {
      const address = (state.h << 8) | state.l;
      state.memory[address] = instruction[1];
      state.pc += 2;
      state.cycles -= 10;
      break;
    }
    case 0x37: {
      state.cc.cy = true;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x3a: {
      const address = (instruction[2] << 8) | instruction[1];
      state.a = state.memory[address];
      state.pc += 3;
      state.cycles -= 13;
      break;
    }
    case 0x3d: {
      state.a -= 1;
      state.cc.setFlags(state.a, false);
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x3e: {
      state.a = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x46: {
      const address = (state.h << 8) | state.l;
      state.b = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x4f: {
      state.c = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x56: {
      const address = (state.h << 8) | state.l;
      state.d = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x57: {
      state.d = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x5e: {
      const address = (state.h << 8) | state.l;
      state.e = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x5f: {
      state.e = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x66: {
      const address = (state.h << 8) | state.l;
      state.h = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x67: {
      state.h = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x6f: {
      state.l = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x77: {
      const address = (state.h << 8) | state.l;
      state.memory[address] = state.a;
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x78: {
      state.a = state.b;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x79: {
      state.a = state.c;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x7a: {
      state.a = state.d;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x7b: {
      state.a = state.e;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x7c: {
      state.a = state.h;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x7d: {
      state.a = state.l;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x7e: {
      const address = (state.h << 8) | state.l;
      state.a = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xa7: {
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xa8: {
      state.a ^= state.b;
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xaf: {
      state.a ^= state.a;
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xb0: {
      state.a |= state.b;
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xb6: {
      const address = (state.h << 8) | state.l;
      state.a |= state.memory[address];
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xc0: {
      if (!state.cc.z) {
        state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
        state.sp += 2;
        state.cycles -= 11;
      } else {
        state.cycles -= 5;
        state.pc += 1;
      }
      break;
    }
    case 0xc1: {
      POP(state, STATEEnums.B);
      break;
    }
    case 0xc2: {
      if (!state.cc.z) {
        state.pc = (instruction[2] << 8) | instruction[1];
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    case 0xc3: {
      state.pc = (instruction[2] << 8) | instruction[1];
      state.cycles -= 10;
      break;
    }
    case 0xc4: {
      if (!state.cc.z) {
        const returnAddress = state.pc + 3;
        state.memory[state.sp - 1] = (returnAddress >> 8) & 0xff;
        state.memory[state.sp - 2] = returnAddress & 0xff;
        state.sp -= 2;
        state.pc = (instruction[2] << 8) | instruction[1];
        state.cycles -= 18;
      } else {
        state.pc += 3;
        state.cycles -= 11;
      }
      break;
    }
    case 0xc5: {
      PUSH(state, STATEEnums.B);
      break;
    }
    case 0xc6: {
      const answer = state.a + instruction[1];
      state.cc.setFlags(answer, true);
      state.a = answer;
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0xc8: {
      if (state.cc.z) {
        state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
        state.sp += 2;
        state.cycles -= 11;
      } else {
        state.pc += 1;
        state.cycles -= 5;
      }
      break;
    }
    case 0xc9: {
      state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
      state.sp += 2;
      state.cycles -= 10;
      break;
    }
    case 0xca: {
      JUMP(state, JumpEnums.Z);
      break;
    }
    case 0xcd: {
      const returnAddress = state.pc + 3;
      state.memory[state.sp - 1] = returnAddress >> 8;
      state.memory[state.sp - 2] = returnAddress & 0xff;
      state.sp -= 2;
      state.pc = (instruction[2] << 8) | instruction[1];
      state.cycles -= 17;
      break;
    }
    case 0xd0: {
      if (!state.cc.cy) {
        state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
        state.sp += 2;
        state.cycles -= 11;
      } else {
        state.pc += 1;
        state.cycles -= 5;
      }
      break;
    }
    case 0xd1: {
      POP(state, STATEEnums.D);
      break;
    }
    case 0xd2: {
      JUMP(state, JumpEnums.NCY);
      break;
    }
    case 0xd3: {
      state.writeToPort(instruction[1]);
      state.pc += 2;
      state.cycles -= 10;
      break;
    }
    case 0xd5: {
      PUSH(state, STATEEnums.D);
      break;
    }
    case 0xd6: {
      const answer = state.a - instruction[1];
      state.a = answer;
      state.cc.setFlags(answer, true);
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0xd8: {
      if (state.cc.cy) {
        state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
        state.sp += 2;
        state.cycles -= 11;
      } else {
        state.pc += 1;
        state.cycles -= 5;
      }
      break;
    }
    case 0xda: {
      if (state.cc.cy) {
        state.pc = (instruction[2] << 8) | instruction[1];
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    case 0xdb: {
      state.readFromPort(instruction[1]);
      state.pc += 2;
      state.cycles -= 10;
      break;
    }
    case 0xe1: {
      POP(state, STATEEnums.H);
      break;
    }
    case 0xe3: {
      const hl = (state.h << 8) | state.l;
      state.l = state.memory[state.sp];
      state.memory[state.sp] = hl & 0xff;
      state.h = state.memory[state.sp + 1];
      state.memory[state.sp + 1] = (hl & 0xff00) >> 8;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xe5: {
      PUSH(state, STATEEnums.H);
      break;
    }
    case 0xe6: {
      state.a &= instruction[1];
      state.cc.setFlags(state.a, true);
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0xe9: {
      state.pc = (state.h << 8) | state.l;
      state.cycles -= 4;
      break;
    }
    case 0xeb: {
      let temp = state.d;
      state.d = state.h;
      state.h = temp;
      temp = state.e;
      state.e = state.l;
      state.l = temp;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xf1: {
      POP(state, STATEEnums.PSW);
      break;
    }
    case 0xf5: {
      PUSH(state, STATEEnums.PSW);
      break;
    }
    case 0xfb: {
      state.enableInterrupt = true;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xfe: {
      state.cc.setFlags(state.a - instruction[1], true);
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    default: {
      throw new Error(`unknown opcode: 0x${Number(opcode).toString(16)}`);
    }
  }
};
/* eslint-enable no-param-reassign */

export default emulateInstruction;

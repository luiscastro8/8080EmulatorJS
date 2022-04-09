import {
  CALL,
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
import { HILO } from "./utils";

const emulateInstruction = (state: State8080) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  const theOpCode = instruction[0];
  switch (theOpCode) {
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
    case 0x04: {
      state.b += 1;
      state.cc.setFlags(state.b, false);
      state.pc += 1;
      state.cycles -= 5;
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
    case 0x0c: {
      state.c += 1;
      state.cc.setFlags(state.c, false);
      state.pc += 1;
      state.cycles -= 5;
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
    case 0x14: {
      state.d += 1;
      state.cc.setFlags(state.d, false);
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x15: {
      state.d -= 1;
      state.cc.setFlags(state.d, false);
      state.pc += 1;
      state.cycles -= 5;
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
    case 0x1f: {
      const lastBit = state.a & 0b1;
      state.a >>= 1;
      state.a |= (state.cc.cy ? 1 : 0) << 7;
      state.cc.cy = !!lastBit;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x21: {
      LXI(state, STATEEnums.H);
      break;
    }
    case 0x22: {
      const address = HILO(instruction[2], instruction[1]);
      state.memory[address] = state.l;
      state.memory[address + 1] = state.h;
      state.pc += 3;
      state.cycles -= 16;
      break;
    }
    case 0x23: {
      let address = HILO(state.h, state.l);
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
    case 0x2a: {
      const address = HILO(instruction[2], instruction[1]);
      state.l = state.memory[address];
      state.h = state.memory[address + 1];
      state.pc += 3;
      state.cycles -= 16;
      break;
    }
    case 0x2b: {
      DCX(state, STATEEnums.H);
      break;
    }
    case 0x2c: {
      state.l += 1;
      state.cc.setFlags(state.l, false);
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x2e: {
      state.l = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x2f: {
      state.a = ~state.a;
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x31: {
      LXI(state, STATEEnums.SP);
      break;
    }
    case 0x32: {
      const address = HILO(instruction[2], instruction[1]);
      state.memory[address] = state.a;
      state.pc += 3;
      state.cycles -= 13;
      break;
    }
    case 0x34: {
      const address = HILO(state.h, state.l);
      state.memory[address] += 1;
      state.cc.setFlags(state.memory[address], false);
      state.pc += 1;
      state.cycles -= 10;
      break;
    }
    case 0x35: {
      const address = HILO(state.h, state.l);
      state.memory[address] -= 1;
      state.cc.setFlags(state.memory[address], false);
      state.pc += 1;
      state.cycles -= 10;
      break;
    }
    case 0x36: {
      const address = HILO(state.h, state.l);
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
      const address = HILO(instruction[2], instruction[1]);
      state.a = state.memory[address];
      state.pc += 3;
      state.cycles -= 13;
      break;
    }
    case 0x3c: {
      state.a += 1;
      state.cc.setFlags(state.a, false);
      state.pc += 1;
      state.cycles -= 5;
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
    case 0x41: {
      state.b = state.c;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x46: {
      const address = HILO(state.h, state.l);
      state.b = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x47: {
      state.b = state.a;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x4e: {
      const address = HILO(state.h, state.l);
      state.c = state.memory[address];
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
      const address = HILO(state.h, state.l);
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
      const address = HILO(state.h, state.l);
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
    case 0x61: {
      state.h = state.c;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x65: {
      state.h = state.l;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x66: {
      const address = HILO(state.h, state.l);
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
    case 0x68: {
      state.l = state.b;
      state.pc += 1;
      state.cycles -= 5;
      break;
    }
    case 0x69: {
      state.l = state.c;
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
    case 0x70: {
      const address = HILO(state.h, state.l);
      state.memory[address] = state.b;
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x71: {
      const address = HILO(state.h, state.l);
      state.memory[address] = state.c;
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x77: {
      const address = HILO(state.h, state.l);
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
      const address = HILO(state.h, state.l);
      state.a = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x80: {
      const answer = state.a + state.b;
      state.a = answer;
      state.cc.setFlags(answer, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x81: {
      const answer = state.a + state.c;
      state.a = answer;
      state.cc.setFlags(answer, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x85: {
      const answer = state.a + state.l;
      state.a = answer;
      state.cc.setFlags(answer, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x86: {
      const address = HILO(state.h, state.l);
      const answer = state.a + state.memory[address];
      state.a = answer & 0xff;
      state.cc.setFlags(answer, true);
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xa0: {
      state.a &= state.b;
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xa6: {
      const address = HILO(state.h, state.l);
      state.a &= state.memory[address];
      state.cc.setFlags(state.a, true);
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
    case 0xb4: {
      state.a |= state.h;
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xb6: {
      const address = HILO(state.h, state.l);
      state.a |= state.memory[address];
      state.cc.setFlags(state.a, true);
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xb8: {
      state.cc.setFlags(state.a - state.b, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xbc: {
      state.cc.setFlags(state.a - state.h, true);
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0xbe: {
      const address = HILO(state.h, state.l);
      state.cc.setFlags(state.a - state.memory[address], true);
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xc0: {
      if (!state.cc.z) {
        state.pc = HILO(state.memory[state.sp + 1], state.memory[state.sp]);
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
        state.pc = HILO(instruction[2], instruction[1]);
        state.cycles -= 15;
      } else {
        state.pc += 3;
        state.cycles -= 10;
      }
      break;
    }
    case 0xc3: {
      state.pc = HILO(instruction[2], instruction[1]);
      state.cycles -= 10;
      break;
    }
    case 0xc4: {
      if (!state.cc.z) {
        const returnAddress = state.pc + 3;
        state.memory[state.sp - 1] = (returnAddress >> 8) & 0xff;
        state.memory[state.sp - 2] = returnAddress & 0xff;
        state.sp -= 2;
        state.pc = HILO(instruction[2], instruction[1]);
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
        state.pc = HILO(state.memory[state.sp + 1], state.memory[state.sp]);
        state.sp += 2;
        state.cycles -= 11;
      } else {
        state.pc += 1;
        state.cycles -= 5;
      }
      break;
    }
    case 0xc9: {
      state.pc = HILO(state.memory[state.sp + 1], state.memory[state.sp]);
      state.sp += 2;
      state.cycles -= 10;
      break;
    }
    case 0xca: {
      JUMP(state, JumpEnums.Z);
      break;
    }
    case 0xcc: {
      if (state.cc.z) {
        CALL(state, HILO(instruction[2], instruction[1]));
        state.cycles -= 18;
      } else {
        state.pc += 3;
        state.cycles -= 11;
      }
      break;
    }
    case 0xcd: {
      CALL(state, HILO(instruction[2], instruction[1]));
      state.cycles -= 17;
      break;
    }
    case 0xd0: {
      if (!state.cc.cy) {
        state.pc = HILO(state.memory[state.sp + 1], state.memory[state.sp]);
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
    case 0xd4: {
      if (!state.cc.cy) {
        CALL(state, HILO(instruction[2], instruction[1]));
        state.cycles -= 18;
      } else {
        state.pc += 3;
        state.cycles -= 11;
      }
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
        state.pc = HILO(state.memory[state.sp + 1], state.memory[state.sp]);
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
        state.pc = HILO(instruction[2], instruction[1]);
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
    case 0xde: {
      // set in a temporary variable instead of directly to state.a so bits don't get lost
      const answer = state.a - instruction[1] - (state.cc.cy ? 1 : 0);
      state.a = answer;
      state.cc.setFlags(answer, true);
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0xe1: {
      POP(state, STATEEnums.H);
      break;
    }
    case 0xe3: {
      const hl = HILO(state.h, state.l);
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
      state.pc = HILO(state.h, state.l);
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
    case 0xf6: {
      state.a |= instruction[1];
      state.cc.setFlags(state.a, true);
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0xfa: {
      JUMP(state, JumpEnums.M);
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
      throw new Error(`unknown opcode: 0x${Number(theOpCode).toString(16)}`);
    }
  }
};
/* eslint-enable no-param-reassign */

export default emulateInstruction;

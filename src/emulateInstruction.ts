import {
  DAD,
  DCR,
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
      let address = (state.d << 8) | state.e;
      address += 1;
      state.d = (address >> 8) & 0xff;
      state.e = address & 0xff;
      state.pc += 1;
      state.cycles -= 6;
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
    case 0x31: {
      LXI(state, STATEEnums.SP);
      break;
    }
    case 0x36: {
      const address = (state.h << 8) | state.l;
      state.memory[address] = instruction[1];
      state.pc += 2;
      state.cycles -= 10;
      break;
    }
    case 0x3a: {
      const address = (instruction[2] << 8) | instruction[1];
      state.a = state.memory[address];
      state.pc += 3;
      state.cycles -= 13;
      break;
    }
    case 0x3e: {
      state.a = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x56: {
      const address = (state.h << 8) | state.l;
      state.d = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x5e: {
      const address = (state.h << 8) | state.l;
      state.e = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0x66: {
      const address = (state.h << 8) | state.l;
      state.h = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
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
    case 0x7e: {
      const address = (state.h << 8) | state.l;
      state.a = state.memory[address];
      state.pc += 1;
      state.cycles -= 7;
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
    case 0xc9: {
      state.pc = state.memory[state.sp] | (state.memory[state.sp + 1] << 8);
      state.sp += 2;
      state.cycles -= 10;
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
    case 0xd1: {
      POP(state, STATEEnums.D);
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
    case 0xe1: {
      POP(state, STATEEnums.H);
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

import { LDAX, LXI, STATEEnums } from "./repeatableInstuctions";
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
      // SetFlags(state.b, false, state); TODO
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
    case 0x0a: {
      LDAX(state, STATEEnums.B);
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
    case 0x31: {
      LXI(state, STATEEnums.SP);
      break;
    }
    case 0x77: {
      const address = (state.h << 8) | state.l;
      state.memory[address] = state.a;
      state.pc += 1;
      state.cycles -= 7;
      break;
    }
    case 0xc3: {
      state.pc = (instruction[2] << 8) | instruction[1];
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
    default: {
      throw new Error(`unknown opcode: 0x${Number(opcode).toString(16)}`);
    }
  }
};
/* eslint-enable no-param-reassign */

export default emulateInstruction;

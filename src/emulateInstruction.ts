import { LXI, LXIENUMS } from "./repeatableInstuctions";
import State8080 from "./state8080";

/* eslint-disable no-param-reassign */
const emulateInstruction = (state: State8080) => {
  const instruction = state.memory.slice(state.pc, state.pc + 3);
  const opcode = instruction[0];
  /* eslint-disable-next-line */
  console.log(`emulating instruction 0x${Number(opcode).toString(16)}`);
  switch (opcode) {
    case 0x00: {
      state.pc += 1;
      state.cycles -= 4;
      break;
    }
    case 0x01: {
      LXI(state, LXIENUMS.B);
      break;
    }
    case 0x06: {
      state.b = instruction[1];
      state.pc += 2;
      state.cycles -= 7;
      break;
    }
    case 0x11: {
      LXI(state, LXIENUMS.D);
      break;
    }
    case 0x21: {
      LXI(state, LXIENUMS.H);
      break;
    }
    case 0x31: {
      LXI(state, LXIENUMS.SP);
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

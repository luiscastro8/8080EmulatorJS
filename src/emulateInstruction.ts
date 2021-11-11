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
    case 0xc3: {
      state.pc = (instruction[2] << 8) | instruction[1];
      state.cycles -= 10;
      break;
    }
    default: {
      throw new Error(`unknown opcode: ${opcode}`);
    }
  }
};
/* eslint-enable no-param-reassign */

export default emulateInstruction;

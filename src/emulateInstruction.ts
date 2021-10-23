import State8080 from "./state8080";

const emulateInstruction = (state: State8080) => {
  const instruction = state.getMemory().slice(state.getPC(), state.getPC() + 3);
  const opcode = instruction[0];
  switch (opcode) {
    case 0x00: {
      state.setPC(state.getPC() + 1);
      state.setCycles(state.getCycles() - 4);
      break;
    }
    case 0xc3: {
      state.setPC((instruction[2] << 8) | instruction[1]);
      state.setCycles(state.getCycles() - 10);
      break;
    }
    default: {
      throw new Error(`unknown opcode: ${opcode}`);
    }
  }
};

export default emulateInstruction;

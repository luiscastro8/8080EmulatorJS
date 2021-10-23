import State8080 from "./state8080";

const emulateInstruction = (state: State8080) => {
  const opcode = state.getMemory()[state.getPC()];
  switch (opcode) {
    case 0x00: {
      state.setPC(state.getPC() + 1);
      state.setCycles(state.getCycles() - 4);
      break;
    }
    default: {
      throw new Error("unknown opcode");
    }
  }
};

export default emulateInstruction;

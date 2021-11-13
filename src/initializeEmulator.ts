import emulateInstruction from "./emulateInstruction";
import State8080 from "./state8080";

const initializeEmulator = (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  const state = new State8080();
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.memory[i] = romBuffer[i];
  }

  for (let i = 0; i < 100; i += 1) {
    emulateInstruction(state);
  }
};

export default initializeEmulator;

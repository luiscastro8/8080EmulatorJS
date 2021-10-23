import emulateInstruction from "./emulateInstruction";
import State8080 from "./state8080";

const initializeEmulator = (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  const state = new State8080();
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.getMemory()[i] = romBuffer[i];
  }
  emulateInstruction(state);
  emulateInstruction(state);
  emulateInstruction(state);
  emulateInstruction(state);
};

export default initializeEmulator;

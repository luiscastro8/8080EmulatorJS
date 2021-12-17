import emulateInstruction from "./emulateInstruction";
import State8080 from "./state8080";

let state: State8080;
let startFrame: number;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const processInterrupt = async () => {
  if (state.enableInterrupt) {
    state.memory[state.sp - 1] = (state.pc >> 8) & 0xff;
    state.memory[state.sp - 2] = state.pc & 0xff;
    state.sp -= 2;
    state.pc = state.interruptPointer;

    if (state.interruptPointer === 0x10) {
      state.interruptPointer = 0x08;
    } else {
      const timeBetweenFrames =
        Math.floor(new Date().getTime() / 1000) - startFrame;
      startFrame = Math.floor(new Date().getTime() / 1000);
      if (timeBetweenFrames < 17) {
        await sleep(1000);
      }
      state.interruptPointer = 0x10;
      // TODO update display
    }
  }
};

const initializeEmulator = async (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  startFrame = Math.floor(new Date().getTime() / 1000);
  state = new State8080();
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.memory[i] = romBuffer[i];
  }

  for (let i = 0; i < 100000; i += 1) {
    if (i > 37300) {
      /* eslint-disable-next-line no-console */
      console.log(
        `${i}: emulating instruction 0x${Number(
          state.memory[state.pc]
        ).toString(16)}`
      );
    }
    emulateInstruction(state);

    if (state.cycles <= 0) {
      processInterrupt();
    }
  }
};

export default initializeEmulator;

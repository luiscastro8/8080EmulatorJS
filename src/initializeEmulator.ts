import emulateInstruction from "./emulateInstruction";
import State8080 from "./state8080";

let state: State8080;
let startFrame: number;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const updateDisplay = () => {
  const ctx = (
    document.getElementById("canvas") as HTMLCanvasElement
  ).getContext("2d");
  const imageData = ctx.getImageData(0, 0, 224, 256);
  let videoPointer = 0x2400;
  for (let w = 0; w < 224; w += 1) {
    for (let h = 31; h >= 0; h -= 1) {
      let byte = state.memory[videoPointer];
      for (let b = 0; b < 8; b += 1) {
        if (byte % 2 === 0) {
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 0] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 1] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 2] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 3] = 255;
        } else {
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 0] = 255;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 1] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 2] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 3] = 255;
        }
        byte = Math.floor(byte / 2);
      }
      videoPointer += 1;
    }
  }
  ctx.putImageData(imageData, 0, 0);
};

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
      updateDisplay();
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
    if (i > 40000) {
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

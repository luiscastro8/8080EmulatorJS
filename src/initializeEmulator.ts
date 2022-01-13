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
        await sleep(17 - timeBetweenFrames);
      }
      state.interruptPointer = 0x10;
      updateDisplay();
    }
  }
};

const convert = (a: number, pad: number): string =>
  Number(a).toString(16).padStart(pad, "0");

const initializeEmulator = async (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  startFrame = Math.floor(new Date().getTime() / 1000);
  state = new State8080();
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.memory[i] = romBuffer[i];
  }

  for (let i = 0; i < 1000000; i += 1) {
    if (i > 788000 && i % 1 === 0) {
      /* eslint-disable-next-line no-console */
      console.log(
        `${i}: ${convert(state.a, 2)} ${convert(state.b, 2)}${convert(
          state.c,
          2
        )} ${convert(state.d, 2)}${convert(state.e, 2)} ${convert(
          state.h,
          2
        )}${convert(state.l, 2)} ${convert(state.pc, 4)} ${convert(
          state.sp,
          4
        )} ${state.cc.z ? "z" : "."}${state.cc.s ? "s" : "."}${
          state.cc.p ? "p" : "."
        }${state.enableInterrupt ? "i" : "."}${state.cc.cy ? "c" : "."}`
      );
    }
    emulateInstruction(state);

    if (state.cycles <= 0) {
      /* eslint-disable-next-line no-await-in-loop */
      await processInterrupt();
      state.cycles += 16667;
    }
  }
};

export default initializeEmulator;

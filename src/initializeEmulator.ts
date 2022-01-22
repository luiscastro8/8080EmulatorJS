import emulateInstruction from "./emulateInstruction";
import State8080 from "./state8080";

let state: State8080;
let frameStartTime: number;
let count: number = 0;

let frameBuffer: Uint32Array;

const updateDisplay = () => {
  let videoPointer = 0x2400;
  let minX = -1;
  let minY = -1;
  let maxX = -1;
  let maxY = -1;
  for (let w = 0; w < 224; w += 1) {
    for (let h = 31; h >= 0; h -= 1) {
      let byte = state.memory[videoPointer];
      for (let b = 0; b < 8; b += 1) {
        if (
          frameBuffer[(h + 1) * (224 * 8) - (b * 224 + 224) + w] !==
          byte % 2
        ) {
          if (w < minX || minX === -1) {
            minX = w;
          }
          if (w > maxX || maxX === -1) {
            maxX = w;
          }
          if ((h + 1) * 8 - b < minY || minY === -1) {
            minY = (h + 1) * 8 - b;
          }
          if ((h + 1) * 8 - b > maxY || maxY === -1) {
            maxY = (h + 1) * 8 - b;
          }
          frameBuffer[(h + 1) * (224 * 8) - (b * 224 + 224) + w] = byte % 2;
        }

        byte = Math.floor(byte / 2);
      }
      videoPointer += 1;
    }
  }

  const ctx = (
    document.getElementById("canvas") as HTMLCanvasElement
  ).getContext("2d");
  // const imageData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);
  const imageData = ctx.getImageData(0, 0, 224, 256);
  for (let i = 0; i < 224 * 256; i += 1) {
    imageData.data[i * 4 + 0] = frameBuffer[i] === 0 ? 0 : 255;
    imageData.data[i * 4 + 1] = 0;
    imageData.data[i * 4 + 2] = 0;
    imageData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
};

const processInterrupt = (time: number): boolean => {
  if (state.enableInterrupt) {
    state.memory[state.sp - 1] = (state.pc >> 8) & 0xff;
    state.memory[state.sp - 2] = state.pc & 0xff;
    state.sp -= 2;
    state.pc = state.interruptPointer;

    if (state.interruptPointer === 0x10) {
      state.interruptPointer = 0x08;
      return false;
    }
    const timeBetweenFrames = time - frameStartTime;
    frameStartTime = time;
    const fpsDisplay = document.getElementById("fps");
    fpsDisplay.innerText = `FPS: ${Math.round(1000 / timeBetweenFrames)}`;

    state.interruptPointer = 0x10;

    updateDisplay();

    return true;
  }
  return false;
};

const convert = (a: number, pad: number): string =>
  Number(a).toString(16).padStart(pad, "0");

const emulatorLoop = (time: number) => {
  let shouldBreakLoop = false;
  while (!shouldBreakLoop) {
    if (count > 1980417 && count % 1 === 0) {
      /* eslint-disable-next-line no-console */
      console.log(
        `${count}: ${convert(state.a, 2)} ${convert(state.b, 2)}${convert(
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
    count += 1;

    if (state.cycles <= 0) {
      state.cycles += 16667;
      shouldBreakLoop = processInterrupt(time);
    }
  }

  requestAnimationFrame(emulatorLoop);
};

const initializeEmulator = async (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  frameStartTime = performance.now();
  state = new State8080();
  frameBuffer = new Uint32Array(224 * 256);
  for (let i = 0; i < frameBuffer.length; i += 1) {
    frameBuffer[i] = 0;
  }
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.memory[i] = romBuffer[i];
  }

  requestAnimationFrame(emulatorLoop);
};

export default initializeEmulator;

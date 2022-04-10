import emulateInstruction from "./emulateInstruction";
import InputManager from "./inputManager";
import State8080 from "./state8080";

let state: State8080;
let inputManager: InputManager;
let frameStartTime: number;

const updateDisplay = () => {
  const ctx = (
    document.getElementById("canvas") as HTMLCanvasElement
  ).getContext("2d");
  const imageData = new ImageData(224, 256);
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
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 0] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 1] = 255;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 2] = 0;
          imageData.data[((h + 1) * 1792 - b * 224 + w) * 4 + 3] = 255;
        }
        byte = (byte / 2) >> 0;
      }
      videoPointer += 1;
    }
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

const processInputDown = (event: KeyboardEvent) => {
  if (event.code === "KeyC") {
    inputManager.credit = true;
  } else if (event.code === "Enter") {
    inputManager.p1Start = true;
  } else if (event.code === "KeyK") {
    inputManager.p1Fire = true;
  } else if (event.code === "KeyJ") {
    inputManager.p1Left = true;
  } else if (event.code === "KeyL") {
    inputManager.p1Right = true;
  }
};

const processInputUp = (event: KeyboardEvent) => {
  if (event.code === "Enter") {
    inputManager.p1Start = false;
  } else if (event.code === "KeyC") {
    inputManager.credit = false;
  } else if (event.code === "KeyL") {
    inputManager.p1Right = false;
  } else if (event.code === "KeyK") {
    inputManager.p1Fire = false;
  } else if (event.code === "KeyJ") {
    inputManager.p1Left = false;
  }
};

const emulatorLoop = (time: number) => {
  let shouldBreakLoop = false;
  while (!shouldBreakLoop) {
    state.ports.r1 = inputManager.getR1();

    emulateInstruction(state);

    if (state.cycles <= 0) {
      state.cycles += 16667;
      if (state.enableInterrupt) {
        shouldBreakLoop = processInterrupt(time);
      }
    }
  }

  requestAnimationFrame(emulatorLoop);
};

const initializeEmulator = async (loadFileEvent: ProgressEvent<FileReader>) => {
  const reader = <FileReader>loadFileEvent.currentTarget;
  const romBuffer = new Uint8Array(<ArrayBuffer>reader.result);
  frameStartTime = performance.now();
  state = new State8080();
  inputManager = new InputManager();
  for (let i = 0; i < romBuffer.length; i += 1) {
    state.memory[i] = romBuffer[i];
  }

  document.onkeydown = processInputDown;
  document.onkeyup = processInputUp;

  requestAnimationFrame(emulatorLoop);
};

export default initializeEmulator;

import initializeEmulator from "./initializeEmulator";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(224, 256);
const fullScreenButton = <HTMLButtonElement>(
  document.getElementById("fullscreen-button")
);

const fileInput = <HTMLInputElement>document.getElementById("fileinput");
fileInput.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.onloadend = initializeEmulator;

  const file = (<HTMLInputElement>event.target).files[0];
  reader.readAsArrayBuffer(file);
});
fullScreenButton.addEventListener("click", () => {
  canvas.requestFullscreen();
});

// Iterate through every pixel
for (let i = 0; i < imageData.data.length; i += 4) {
  // Modify pixel data
  imageData.data[i + 0] = 0; // R value
  imageData.data[i + 1] = 0; // G value
  imageData.data[i + 2] = 0; // B value
  imageData.data[i + 3] = 255; // A value
}

// Draw image data to the canvas
ctx.putImageData(imageData, 0, 0);

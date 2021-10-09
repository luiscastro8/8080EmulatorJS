const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(100, 100);

const fileInput = <HTMLInputElement>document.getElementById("fileinput");
fileInput.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    // console.log(reader.result);
  };
  const file = (<HTMLInputElement>e.target).files[0];
  reader.readAsArrayBuffer(file);
});

// Iterate through every pixel
for (let i = 0; i < imageData.data.length; i += 4) {
  // Modify pixel data
  imageData.data[i + 0] = 190; // R value
  imageData.data[i + 1] = 0; // G value
  imageData.data[i + 2] = 210; // B value
  imageData.data[i + 3] = 255; // A value
}

// Draw image data to the canvas
ctx.putImageData(imageData, 20, 20);

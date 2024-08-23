self.onmessage = function(event) {
  const { imageData, numColors } = event.data;
  const pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      pixels.push([r, g, b, a]);
  }
  console.log("Worker Extracted Pixels:", pixels); // Debugging log
  const colors = quantizeColors(pixels, numColors);
  self.postMessage({ colors });
};

function quantizeColors(pixels, numColors) {
  const colorCounts = {};
  for (const [r, g, b, a] of pixels) {
      const key = `${r},${g},${b},${a}`;
      if (!colorCounts[key]) colorCounts[key] = 0;
      colorCounts[key]++;
  }
  console.log("Worker Color Counts:", colorCounts); // Debugging log
  const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numColors)
      .map(([key]) => key.split(',').map(Number));
  console.log("Worker Sorted Colors:", sortedColors); // Debugging log
  return sortedColors;
}
self.onmessage = function(event) {
    const { imageData, numColors } = event.data;
    const pixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        pixels.push([r, g, b]);
    }

    const colors = quantizeColors(pixels, numColors);
    self.postMessage({ colors });
};

function quantizeColors(pixels, numColors) {
    const colorCounts = {};
    for (const [r, g, b] of pixels) {
        const key = `${r},${g},${b}`;
        if (!colorCounts[key]) colorCounts[key] = 0;
        colorCounts[key]++;
    }

    const sortedColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, numColors)
        .map(([key]) => key.split(',').map(Number));

    return sortedColors;
}

import { useCallback } from 'react';

const ASCII_CHARS = " .:-=+*#%@";

export function useAsciiEngine() {
  const renderAscii = useCallback((sourceCtx, targetCtx, targetWidth, targetHeight, cols, rows, settings, theme) => {
    if (!sourceCtx || !targetCtx) return;

    const { brightness = 0, contrast = 0, invert = false } = settings;
    const chars = invert ? ASCII_CHARS.split('').reverse().join('') : ASCII_CHARS;
    const charLen = chars.length;

    // Get pixel data from the tiny source canvas
    const imageData = sourceCtx.getImageData(0, 0, cols, rows);
    const data = imageData.data;

    // Clear target canvas
    if (theme === 'matrix') {
      targetCtx.fillStyle = '#000000';
    } else if (theme === 'synthwave') {
      targetCtx.fillStyle = '#240046';
    } else {
      targetCtx.fillStyle = '#000000'; // True color bg
    }
    targetCtx.fillRect(0, 0, targetWidth, targetHeight);

    // Setup font
    const cellWidth = targetWidth / cols;
    const cellHeight = targetHeight / rows;
    
    // Set font size to fill the cell height
    targetCtx.font = `${cellHeight}px "Fira Code", monospace`;
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'middle';

    // Pre-calculate contrast factor
    // Contrast formula: factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
    // We'll use a simpler one: f = (contrast / 100) + 1  ... actually standard formula is better
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    // Colors for themes
    const matrixColor = '#00FF41';
    const synthwaveColor = '#ff007f';
    const synthwaveSecondary = '#00f0ff';

    // Loop through pixels
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const offset = (y * cols + x) * 4;
        let r = data[offset];
        let g = data[offset + 1];
        let b = data[offset + 2];
        const a = data[offset + 3];

        if (a === 0) continue; // Skip transparent

        // Apply brightness
        r += brightness;
        g += brightness;
        b += brightness;

        // Apply contrast
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;

        // Clamp values
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        // Standard relative luminance
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Map to ASCII char
        const charIndex = Math.floor((luminance / 255) * (charLen - 1));
        const char = chars[charIndex];

        // Only draw if it's not a space
        if (char !== ' ') {
          const posX = x * cellWidth + cellWidth / 2;
          const posY = y * cellHeight + cellHeight / 2;

          if (theme === 'truecolor') {
            targetCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          } else if (theme === 'synthwave') {
            // Alternate colors based on luminance or row for synthwave effect
            targetCtx.fillStyle = luminance > 128 ? synthwaveSecondary : synthwaveColor;
          } else {
            targetCtx.fillStyle = matrixColor;
          }

          targetCtx.fillText(char, posX, posY);
        }
      }
    }
  }, []);

  return { renderAscii };
}

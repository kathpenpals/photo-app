export const filterConfigs = {
  original: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    sepia: 0,
  },
  clarendon: {
    brightness: 5,
    contrast: 10,
    saturation: 15,
    hue: 0,
    sepia: 0,
  },
  juno: {
    brightness: 0,
    contrast: 15,
    saturation: -10,
    hue: 200,
    sepia: 5,
  },
  lark: {
    brightness: 8,
    contrast: -5,
    saturation: 10,
    hue: 240,
    sepia: -10,
  },
  ludwig: {
    brightness: 10,
    contrast: 5,
    saturation: 20,
    hue: 30,
    sepia: 15,
  },
  perpetua: {
    brightness: -5,
    contrast: 15,
    saturation: 25,
    hue: 180,
    sepia: 0,
  },
  reyes: {
    brightness: 15,
    contrast: -10,
    saturation: 5,
    hue: 40,
    sepia: 10,
  },
  slumber: {
    brightness: 5,
    contrast: -5,
    saturation: -15,
    hue: 270,
    sepia: 5,
  },
};

export function applyFilter(canvas, image, filterId) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const config = filterConfigs[filterId] || filterConfigs.original;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    r += (config.brightness * 2.55);
    g += (config.brightness * 2.55);
    b += (config.brightness * 2.55);

    const contrast = (config.contrast + 100) / 100;
    r = ((r / 255 - 0.5) * contrast + 0.5) * 255;
    g = ((g / 255 - 0.5) * contrast + 0.5) * 255;
    b = ((b / 255 - 0.5) * contrast + 0.5) * 255;

    const gray = r * 0.299 + g * 0.587 + b * 0.114;
    const saturation = (config.saturation + 100) / 100;
    r = gray + (r - gray) * saturation;
    g = gray + (g - gray) * saturation;
    b = gray + (b - gray) * saturation;

    if (config.hue !== 0) {
      const hueShift = config.hue / 360;
      const rgb = rgbToHsb(r, g, b);
      rgb.h = (rgb.h + hueShift) % 1;
      const rgb2 = hsbToRgb(rgb.h, rgb.s, rgb.b);
      r = rgb2.r;
      g = rgb2.g;
      b = rgb2.b;
    }

    if (config.sepia !== 0) {
      const sepiaAmount = config.sepia / 100;
      const sepiaR = r * (1 - sepiaAmount) + (r * 0.393 + g * 0.769 + b * 0.189) * sepiaAmount;
      const sepiaG = g * (1 - sepiaAmount) + (r * 0.349 + g * 0.686 + b * 0.168) * sepiaAmount;
      const sepiaB = b * (1 - sepiaAmount) + (r * 0.272 + g * 0.534 + b * 0.131) * sepiaAmount;
      r = sepiaR;
      g = sepiaG;
      b = sepiaB;
    }

    data[i] = Math.max(0, Math.min(255, r));
    data[i + 1] = Math.max(0, Math.min(255, g));
    data[i + 2] = Math.max(0, Math.min(255, b));
  }

  ctx.putImageData(imageData, 0, 0);
}

function rgbToHsb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        break;
    }
  }

  return {
    h,
    s: max === 0 ? 0 : d / max,
    b: max,
  };
}

function hsbToRgb(h, s, b) {
  let r, g, bl;
  if (s === 0) {
    r = g = bl = b;
  } else {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = b * (1 - s);
    const q = b * (1 - f * s);
    const t = b * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        (r = b), (g = t), (bl = p);
        break;
      case 1:
        (r = q), (g = b), (bl = p);
        break;
      case 2:
        (r = p), (g = b), (bl = t);
        break;
      case 3:
        (r = p), (g = q), (bl = b);
        break;
      case 4:
        (r = t), (g = p), (bl = b);
        break;
      case 5:
        (r = b), (g = p), (bl = q);
        break;
      default:
        break;
    }
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(bl * 255),
  };
}
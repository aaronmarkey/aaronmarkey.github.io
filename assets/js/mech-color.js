const ColorIntensity = {
  LIGHT: 1,
  MEDIUM: 2,
  DARK: 3
};

const ColorThemes = {
  light: {
    background: ColorIntensity.LIGHT,
    codeBackground: ColorIntensity.DARK,
    codeColor: ColorIntensity.LIGHT,
    gradientStart: ColorIntensity.MEDIUM,
    gradientEnd: ColorIntensity.MEDIUM,
    primaryOne: ColorIntensity.DARK,
    primaryTwo: ColorIntensity.DARK,
  },
  dark: {
    background: ColorIntensity.DARK,
    codeBackground: ColorIntensity.LIGHT,
    codeColor: ColorIntensity.DARK,
    gradientStart: ColorIntensity.MEDIUM,
    gradientEnd: ColorIntensity.MEDIUM,
    primaryOne: ColorIntensity.LIGHT,
    primaryTwo: ColorIntensity.LIGHT,
  }
};

const ColorFunctions = {
  rangeForIntensity(intensity) {
    let range;
    switch(intensity) {
      case ColorIntensity.LIGHT:
        range = {
          min: 200,
          max: 255
        };
        break;
      case ColorIntensity.MEDIUM:
        range = {
          min: 56,
          max: 199
        };
        break;
      case ColorIntensity.DARK:
        range = {
          min: 0,
          max: 55
        };
        break;
      default:
        range = {
          min: 0,
          max: 255
        };
    }
    return range;
  },
  getRgbCss(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
  },
  getColorMono(intensity) {
    const range = this.rangeForIntensity(intensity);
    const value = randomInt(range.min, range.max);
    return [value, value, value];
  },
  getColor(intensity) {
    const range = this.rangeForIntensity(intensity);
    const value = randomInt(range.min, range.max);
    return [randomInt(range.min, range.max), randomInt(range.min, range.max), randomInt(range.min, range.max)];
  }
}

class ColorPalette {
  constructor({ name, background, codeBackground, codeColor, gradientStart, gradientEnd, primaryOne, primaryTwo }) {
    this.name = name;
    this.slug = name.toLowerCase().replace(" ", "-");
    this.background = background;
    this.codeBackground = codeBackground;
    this.codeColor = codeColor;
    this.gradientStart = gradientStart;
    this.gradientEnd = gradientEnd;
    this.primaryOne = primaryOne;
    this.primaryTwo = primaryTwo;
  }

  getColorFor(purpose, theme) {
    return this[purpose](theme[purpose]);
  }

  getPickerColors(theme) {
    const isLight = theme === ColorThemes.light;
    const pickerFont = isLight ? 0 : 255;
    const pickerBorder = isLight ? 0 : 255;
    const pickerBackground = isLight ? 255 : 0;
    const pickerHighlight = isLight ? 230 : 25;

    return {
      pickerBorder: ColorFunctions.getRgbCss(pickerBorder, pickerBorder, pickerBorder),
      pickerBackground: ColorFunctions.getRgbCss(pickerBackground, pickerBackground, pickerBackground),
      pickerFont: ColorFunctions.getRgbCss(pickerFont, pickerFont, pickerFont),
      pickerHighlight: ColorFunctions.getRgbCss(pickerHighlight, pickerHighlight, pickerHighlight),
    };
  }

  colors(theme) {
    return {
      ...this.getPickerColors(theme),
      background: this.getColorFor("background", theme),
      codeBackground: this.getColorFor("codeBackground", theme),
      codeColor: this.getColorFor("codeColor", theme),
      gradientStart: this.getColorFor("gradientStart", theme),
      gradientEnd: this.getColorFor("gradientEnd", theme),
      primaryOne: this.getColorFor("primaryOne", theme),
      primaryTwo: this.getColorFor("primaryTwo", theme)
    };
  }
}


const ColorPalettes = {
  roses: new ColorPalette({
    name: "Roses",
    background(intensity) {
      return ColorFunctions.getRgbCss(255, 230, 247);
    },
    codeBackground(intensity) {
      return ColorFunctions.getRgbCss(255, 204, 204);
    },
    codeColor(intensity) {
      return ColorFunctions.getRgbCss(153, 0, 102);
    },
    gradientStart(intensity) {
      return ColorFunctions.getRgbCss(204, 0, 0);
    },
    gradientEnd(intensity) {
      return ColorFunctions.getRgbCss(255, 102, 204);
    },
    primaryOne(intensity) {
      return ColorFunctions.getRgbCss(128, 0, 0);
    },
    primaryTwo(intensity) {
      return ColorFunctions.getRgbCss(153, 0, 102);
    }
  }),
  monochrome: new ColorPalette({
    name: "Monochrome",
    background(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    codeBackground(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    codeColor(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    gradientStart(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    gradientEnd(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    primaryOne(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    primaryTwo(intensity) {
      const color = ColorFunctions.getColorMono(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    }
  }),
  shuffle: new ColorPalette({
    name: "Shuffle",
    background(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    codeBackground(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    codeColor(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    gradientStart(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    gradientEnd(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    primaryOne(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    },
    primaryTwo(intensity) {
      const color = ColorFunctions.getColor(intensity);
      return ColorFunctions.getRgbCss(color[0], color[1], color[2]);
    }
  })
};

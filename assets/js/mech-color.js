const rmgCOLORS = {
  theme: {
    roses: {
      background: "rgb(255, 230, 247)",
      codeBackground: "rgb(255, 204, 204)",
      codeColor: "rgb(153, 0, 102)",
      gradientStart: "rgb(204, 0, 0)",
      gradientEnd: "rgb(255, 102, 204)",
      primaryOne: "rgb(128, 0, 0)",
      primaryTwo: "rgb(153, 0, 102)"
    }
  },
  shade: {
    light: {
      background: "light",
      codeBackground: "dark",
      codeColor: "light",
      gradientStart: "medium",
      gradientEnd: "medium",
      primaryOne: "dark",
      primaryTwo: "dark"
    },
    dark: {
      background: "dark",
      codeBackground: "light",
      codeColor: "dark",
      gradientStart: "medium",
      gradientEnd: "medium",
      primaryOne: "light",
      primaryTwo: "light"
    }
  }
};
const rmgColorFunctions = {
  randomRbg(shade, grayScale) {
    const shadeRange = {
      light: {
        min: 200,
        max: 255
      },
      medium: {
        min: 56,
        max: 200
      },
      dark: {
        min: 0,
        max: 55
      }
    };
    const range = shadeRange[shade];

    if (grayScale) {
      const value = randomInt(range.min, range.max);
      return [value, value, value]
    } else {
      const red = randomInt(range.min, range.max);
      const blue = randomInt(range.min, range.max);
      const green = randomInt(range.min, range.max);
      return [red, blue, green];
    }
  },
  rgbCss(colorArray) {
    return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
  },
  generateRmgColors (shade, grayScale) {
    return {
      background: this.rgbCss(this.randomRbg(shade.background, grayScale)),
      codeBackground: this.rgbCss(this.randomRbg(shade.codeBackground, grayScale)),
      codeColor: this.rgbCss(this.randomRbg(shade.codeColor, grayScale)),
      gradientStart: this.rgbCss(this.randomRbg(shade.gradientStart, grayScale)),
      gradientEnd: this.rgbCss(this.randomRbg(shade.gradientEnd, grayScale)),
      primaryOne: this.rgbCss(this.randomRbg(shade.primaryOne, grayScale)),
      primaryTwo: this.rgbCss(this.randomRbg(shade.primaryTwo, grayScale)),
    };
  },
  generatePickerColors (shade) {
    const isLight = shade === rmgCOLORS.shade.light;
    const pickerFont = isLight ? 0 : 255;
    const pickerBorder = isLight ? 0 : 255;
    const pickerBackground = isLight ? 255 : 0;
    const pickerHighlight = isLight ? 230 : 25;

    return {
      pickerBorder: this.rgbCss([pickerBorder, pickerBorder, pickerBorder]),
      pickerBackground: this.rgbCss([pickerBackground, pickerBackground, pickerBackground]),
      pickerFont: this.rgbCss([pickerFont, pickerFont, pickerFont]),
      pickerHighlight: this.rgbCss([pickerHighlight, pickerHighlight, pickerHighlight]),
    };
  }
};

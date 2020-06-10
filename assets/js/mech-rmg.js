class RmgEngine {
  constructor({ theme, fonts }) {
    this.theme = theme;
    if (fonts.body === null || fonts.code === null || fonts.header === null) {
      this.fonts = rmgFont.getAll();
    } else {
      this.fonts = fonts;
    }
  }

  initializeFonts() {
    this.injectFontLinkElements();
    this.setPageFontStyles();
    this.setTitleFonts();
  }

  injectFontLinkElements() {
    const nodes = [
      rmgFont.getNodeFromFont(this.fonts.body, null),
      rmgFont.getNodeFromFont(this.fonts.code, null),
      rmgFont.getNodeFromFont(this.fonts.header, null),
    ];
    dom.appendNodes(SELECTORS.element.head, nodes);
  }

  setPageFontStyles () {
    const styles = `
      body {
        font-family: ${this.fonts.body};
      }
      code {
        font-family: ${this.fonts.code};
      }
      .story h1,
      .story h2,
      .story h3,
      .story h4,
      .story h5,
      .story h6 {
        font-family: ${this.fonts.header};
      }
    `;
    dom.setInnerContent(dot(SELECTORS.class.mech.randFontStyle), styles);
  }

  setTitleFonts () {
    const headerTitle = document.querySelector(dot(SELECTORS.class.mech.headerTitle));
    const siteTitle = SITE.title.split("");
    let fonts = [];
    let spans = [];
    let nodes = [];

    siteTitle.forEach(char => {
      const font = rmgFont.getHeader();
      fonts.push(font);
      nodes.push(rmgFont.getNodeFromFont(font, char));
    });
    dom.appendNodes(SELECTORS.element.head, nodes);

    nodes.forEach((node, index) => {
      const span = document.createElement("span");
      span.style = `font-family: ${fonts[index]};`;
      span.innerHTML = siteTitle[index];
      spans.push(span.outerHTML);
    });
    headerTitle.innerHTML = spans.join("");
  }

  getShade() {
    let shade = rmgCOLORS.shade.light;

    if (this.theme === SITE.rmg.themes.shuffle || this.theme === SITE.rmg.themes.monochrome) {
      if (randomInt(0, 9) % 2 === 0)  {
        shade = rmgCOLORS.shade.dark;
      }
    }

    return shade;
  }

  generateColorStyles (colors) {
    return `
      body {
        background: ${colors.background};
      }
      .story {
        color: ${colors.primaryOne};
      }
      .story blockquote {
        border-left-color: ${colors.primaryOne};
      }
      .story h1,
      .story h2,
      .story h3,
      .story h4,
      .story h5,
      .story h6 {
        color: ${colors.primaryTwo};
      }
      .story hr {
        background: ${colors.primaryTwo};
      }
      .story code,
      .story pre {
        background: ${colors.codeBackground};
        color: ${colors.codeColor};
      }
      .story .date {
        color: ${colors.primaryTwo};
      }
      a,
      .text-gradient {
        background: -webkit-linear-gradient(315deg, ${colors.gradientStart}, ${colors.gradientEnd});
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
      }
      .border-gradient {
        -webkit-border-image: -webkit-linear-gradient(315deg, ${colors.gradientEnd}, ${colors.gradientStart}) 10;
        border-image: -webkit-linear-gradient(315deg, ${colors.gradientEnd}, ${colors.gradientStart}) 10;
      }
      .hr-gradient {
        background-image: linear-gradient(315deg, ${colors.primaryOne}, ${colors.primaryTwo});
      }
      .gradient-start {
        stop-color: ${colors.gradientStart};
      }
      .gradient-end {
        stop-color: ${colors.gradientEnd};
      }
      .picker > div {
        border-color: ${colors.pickerBorder};
      }
      .picker > div > div {
        color: ${colors.pickerFont};
        background: ${colors.pickerBackground};
      }
      .picker > div > div:hover {
        background-color: ${colors.pickerHighlight};
      }
      .picker hr {
        border-top-color: ${colors.pickerBorder};
      }
    `;
  }

  setPageColorStyles () {
    let styles = "";
    let shade = this.getShade();
    let colors = null;
    if (this.theme === SITE.rmg.themes.roses) {
      colors = rmgCOLORS.theme.roses;
    } else if (this.theme === SITE.rmg.themes.shuffle || this.theme === SITE.rmg.themes.monochrome) {
      colors = rmgColorFunctions.generateRmgColors(
        shade, this.theme === SITE.rmg.themes.monochrome
      );
    }
    const pickerColors = rmgColorFunctions.generatePickerColors(shade);
    styles = this.generateColorStyles({...colors, ...pickerColors});
    dom.setInnerContent(dot(SELECTORS.class.mech.randColorStyle), styles);
  }
}

---
---

const SITE = {
  author: {{ site.rmg.author | jsonify}},
  rmg: {{ site.rmg | jsonify }},
  title: {{ site.title | jsonify }}
};

const SELECTORS = {
  class: {
    chota: {
      hideSm: "hide-sm",
      hideXs: "hide-xs",
      isHidden: "is-hidden",
    },
    mech: {
      bylineName: "byline-name",
      headerTitle: "header-title",
      menuLinks: "menu-links",
      menuSpindown: "menu-spindown",
      overlay: "overlay",
      picker: "picker",
      randFontLink: "rand-font-link",
      randColorStyle: "rand-color-style",
      randFontStyle: "rand-font-style",
      storyImage: "story-content img",
    }
  },
  element: {
    body: "body",
    head: "head",
    link: "a",
  },
};

const COLOR_QUERY_PARAM = "palette";


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function dot(value) {
  return `.${value}`;
}


function getCurrentPaletteSlug() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has(COLOR_QUERY_PARAM)) {
    const palette = urlParams.get(COLOR_QUERY_PARAM);
    if (SITE.rmg.palettes.available.includes(palette)) {
      return palette;
    } else {
      return SITE.rmg.palettes.default;
    }
  } else {
    return SITE.rmg.palettes.default;
  }
}


function setCurrentPaletteSlug(palette) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  urlParams.set(COLOR_QUERY_PARAM, palette)
  history.pushState(null, null, "?"+urlParams.toString());
}

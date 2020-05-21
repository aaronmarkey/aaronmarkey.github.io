const dom = {
  appendNodes(selector, nodes) {
    const element = document.querySelector(selector);
    nodes.forEach(node => element.appendChild(node));
  },
  addClasses(selector, classList) {
    const element = document.querySelector(selector);
    classList.forEach(el => element.classList.add(el));
  },
  deleteElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  },
  removeClasses(selector, classList) {
    const element = document.querySelector(selector);
    classList.forEach(el => element.classList.remove(el));
  },
  setInnerContent(selector, newContent) {
    const element = document.querySelector(selector);
    element.innerHTML = newContent;
  },
};

class Page {
  getRandomizedByLine() {
    const firstIndex = randomInt(0, SITE.author.name.first.length - 1);
    const lastIndex = randomInt(0, SITE.author.name.last.length - 1);
    return `${SITE.author.name.first[firstIndex]} ${SITE.author.name.last[lastIndex]}`;
  }

  menuToggle() {
    const hideClasses = [SELECTORS.class.chota.hideSm, SELECTORS.class.chota.hideXs];
    const spindown = document.querySelector(dot(SELECTORS.class.mech.menuSpindown));
    const links = document.querySelector(dot(SELECTORS.class.mech.menuLinks));

    spindown.addEventListener("click", el => {
      if (links.classList.contains(hideClasses[0])) {
        dom.removeClasses(dot(SELECTORS.class.mech.menuLinks), hideClasses);
      } else {
        dom.addClasses(dot(SELECTORS.class.mech.menuLinks), hideClasses);
      }
    });
  }

  storyImageClick() {
    const images = document.querySelectorAll(dot(SELECTORS.class.mech.storyImage));
    const overlay = document.querySelector(dot(SELECTORS.class.mech.overlay));
    const body = document.querySelector(SELECTORS.element.body);

    images.forEach(element => {
      element.addEventListener("click", el => {
        const img = document.createElement("img");
        img.src = el.target.src;
        img.alt = el.target.alt;
        overlay.appendChild(img);
        overlay.classList.remove(SELECTORS.class.chota.isHidden);
      });
    });
  }

  overlayClick() {
    const overlay = document.querySelector(dot(SELECTORS.class.mech.overlay));
    const body = document.querySelector(SELECTORS.element.body);

    overlay.addEventListener("click", el => {
      overlay.innerHTML = "";
      overlay.classList.add(SELECTORS.class.chota.isHidden);
    });
  }

  initialize() {
    dom.setInnerContent(dot(SELECTORS.class.mech.bylineName), this.getRandomizedByLine());
    this.menuToggle();
    this.storyImageClick();
    this.overlayClick();
  }
}

const page = new Page();
const rmgEngine = new RmgEngine({
  theme: SITE.rmg.themes[SITE.rmg.defaultTheme],
  fonts: {
    body: null,
    code: null,
    header: null
  }
});
const picker = new ThemePicker({
  options: SITE.rmg.themes,
  active: SITE.rmg.defaultTheme,
  selectedAction: (value, display) => {
    rmgEngine.theme = SITE.rmg.themes[value];
    rmgEngine.setPageColorStyles();
  },
});


page.initialize();
picker.mount(dot(SELECTORS.class.mech.picker));
rmgEngine.initializeFonts();
rmgEngine.setPageColorStyles();

---
---


const SITE = {
  author: {
    name: {
      first: {{ site.author.name.first| jsonify }},
      last: {{ site.author.name.last | jsonify }}
    }
  },
  rmg: {{ site.rmg | jsonify }},
  title: {{ site.title | jsonify }}
};
const SELECTORS = {
  body: "body",
  byLineName: ".by-line__name",
  head: "head",
  headerTitle: ".header-title",
  menuLinks: ".menu-links",
  menuSpindown: ".menu-spindown",
  overlay: ".overlay",
  storyImage: ".story-content img",
};
const CSS_CLASSES = {
  chota: {
    hideSm: "hide-sm",
    hideXs: "hide-xs",
    isHidden: "is-hidden",
  },
  mech: {
    noScroll: "noscroll",
    randFontLink: "rand-font-link",
    randColorStyle: "rand-color-style",
    randFontStyle: "rand-font-style",
  }
};


const dom = {
  addClasses(selector, classList) {
    const element = document.querySelector(selector);
    classList.forEach(el => element.classList.add(el));
  },
  deleteElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach( el => el.remove());
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

function getRandomizedByLine() {
  const firstIndex = Math.floor(
    Math.random() * (SITE.author.name.first.length - 1)
  );
  const lastIndex = Math.floor(
    Math.random() * (SITE.author.name.last.length - 1)
  );

  return `${SITE.author.name.first[firstIndex]} ${SITE.author.name.last[lastIndex]}`;
};

function menuToggle() {
  const hideClasses = [CSS_CLASSES.chota.hideSm, CSS_CLASSES.chota.hideXs];
  const spindown = document.querySelector(SELECTORS.menuSpindown);
  const links = document.querySelector(SELECTORS.menuLinks);

  spindown.addEventListener("click", el => {
    if (links.classList.contains(hideClasses[0])) {
      dom.removeClasses(SELECTORS.menuLinks, hideClasses);
    } else {
      dom.addClasses(SELECTORS.menuLinks, hideClasses);
    }
  });
};

function storyImageClick() {
  const images = document.querySelectorAll(SELECTORS.storyImage);
  const overlay = document.querySelector(SELECTORS.overlay);
  const body = document.querySelector(SELECTORS.body);

  images.forEach(element => {
    element.addEventListener("click", el => {
      imgHtml = `<img src="${el.target.src}" alt="${el.target.alt}">`;
      overlay.innerHTML = imgHtml;
      overlay.classList.remove(CSS_CLASSES.chota.isHidden);
      body.classList.add(CSS_CLASSES.mech.noScroll);
    });
  });
};

function overlayClick() {
  const overlay = document.querySelector(SELECTORS.overlay);
  const body = document.querySelector(SELECTORS.body);

  overlay.addEventListener("click", el => {
    overlay.innerHTML = "";
    overlay.classList.add(CSS_CLASSES.chota.isHidden);
    body.classList.remove(CSS_CLASSES.mech.noScroll);
  });
};



// Fonts -- Start
const rmgFONTS = {
  families: {
    body: [
      "Roboto", "Open Sans",
      "Lato", "Montserrat",
      "Quattrocento", "Muli",
      "Playfair Display", "Crimson Text",
      "Bitter", "Josefin Sans",
      "Arvo", "Varela Round",
      "Source Serif Pro", "Questrial",
      "Tinos", "Monda",
      "Nanum Myeongjo", "Sanchez",
      "Frank Ruhl Libre", "Prata",
      "Glegoo", "IBM Plex Sans",
      "Kreon", "Alice",
      "Antic Slab", "Anaheim",
      "Ovo", "Biryani"
    ],
    code: [
      "Roboto Mono", "Source Code Pro",
      "Anonymous Pro", "Cutive Mono",
      "Overpass Mono", "Nova Mono"
    ],
    header: [
      "Roboto", "Charm",
      "ZCOOL XiaoWei", "Open Sans",
      "Lato", "Montserrat",
      "Thasadith", "Roboto Condensed",
      "Oswald", "Aleo",
      "Source Sans Pro", "Raleway",
      "PT Sans", "Merriweather",
      "Sarabun", "Slabo 27px",
      "Roboto Slab", "Noto Sans",
      "Poppins", "Ubuntu",
      "Major Mono Display", "Open Sans Condensed",
      "Roboto Mono", "Playfair Display",
      "PT Serif", "Lora",
      "Muli", "Staatliches",
      "Mukta", "PT Sans Narrow",
      "Titillium Web", "Arimo",
      "Nunito", "Fira Sans",
      "Nanum Gothic", "Noto Serif",
      "ZCOOL QingKe HuangYou", "Work Sans",
      "Dosis", "Rubik",
      "Quicksand", "Inconsolata",
      "Noto Sans KR", "Hind",
      "Crimson Text", "Oxygen",
      "Lobster", "Noto Serif TC",
      "Noto Serif SC", "Libre Baskerville",
      "B612", "Bitter",
      "Libre Franklin", "Indie Flower",
      "Josefin Sans", "Anton",
      "Cabin", "Fjalla One",
      "B612 Mono", "Exo 2",
      "Nunito Sans", "Arvo",
      "Encode Sans Condensed", "ZCOOL KuaiLe",
      "Noto Sans JP", "Hind Siliguri",
      "Varela Round", "Karla",
      "Pacifico", "Abel",
      "Shadows Into Light", "Yanone Kaffeesatz",
      "Righteous", "Dancing Script",
      "Merriweather Sans", "Source Serif Pro",
      "Kanit", "Abril Fatface",
      "Exo", "Bree Serif",
      "Acme", "Comfortaa",
      "Asap", "Ubuntu Condensed",
      "Cairo", "Amatic SC",
      "Catamaran", "Signika",
      "EB Garamond", "Questrial",
      "Teko", "Heebo",
      "Archivo Narrow", "Permanent Marker",
      "Play", "Noto Sans TC",
      "Source Code Pro", "Crete Round",
      "Maven Pro", "Hind Madurai",
      "Cuprum", "Gloria Hallelujah",
      "Francois One", "Fira Sans Condensed",
      "PT Sans Caption", "Viga",
      "Rokkitt", "Assistant",
      "Alegreya", "Domine",
      "Patua One", "Courgette",
      "Rajdhani", "Prompt",
      "Cinzel", "Vollkorn",
      "Satisfy", "Istok Web",
      "Ropa Sans", "Alegreya Sans",
      "Old Standard TT", "Special Elite",
      "ABeeZee", "Cantarell",
      "Concert One", "Gochi Hand",
      "Amiri", "Cardo",
      "Kaushan Script", "Barlow",
      "Orbitron", "Caveat",
      "Great Vibes", "Quattrocento Sans",
      "Cookie", "Tinos",
      "Noticia Text", "News Cycle",
      "Hammersmith One", "Arapey",
      "Signika Negative", "Cormorant Garamond",
      "Barlow Condensed", "Merienda",
      "Poiret One", "Alfa Slab One",
      "Lobster Two", "Pathway Gothic One",
      "Fredoka One", "Monda",
      "Nanum Myeongjo", "Russo One",
      "Hind Guntur", "Kalam",
      "Tangerine", "Do Hyeon",
      "Archivo Black", "Noto Sans SC",
      "BenchNine", "Tenor Sans",
      "Passion One", "Chivo",
      "Volkhov", "Ultra",
      "Playfair Display SC", "Pontano Sans",
      "Marck Script", "Cabin Condensed",
      "Sigmar One", "Fira Sans Extra Condensed",
      "Philosopher", "Sacramento",
      "Handlee", "M PLUS 1p",
      "Overpass", "Josefin Slab",
      "Monoton", "Boogaloo",
      "Gudea", "Luckiest Guy",
      "Didact Gothic", "Quattrocento",
      "IBM Plex Sans", "Yantramanav",
      "Khand", "Changa",
      "Sorts Mill Goudy", "Armata",
      "Martel", "Bangers",
      "Tajawal", "Sawarabi Mincho",
      "Iceberg", "Zilla Slab",
      "Ruda", "Hind Vadodara",
      "Neucha", "Lalezar",
      "El Messiri", "Patrick Hand",
      "Unica One", "Pragati Narrow",
      "Vidaloka", "Neuton",
      "Prata", "Economica",
      "Taviraj", "Press Start 2P",
      "Yrsa", "Sanchez",
      "Carter One", "Averia Libre",
      "Hanalei Fill", "Audiowide",
      "Adamina", "Advent Pro",
      "Barlow Semi Condensed", "Shrikhand",
      "Alice", "Paytone One",
      "Architects Daughter", "Enriqueta",
      "Frank Ruhl Libre", "Bad Script",
      "Yellowtail", "PT Serif Caption",
      "Montserrat Alternates", "Amaranth",
      "Gentium Basic", "PT Mono",
      "Gentium Book Basic", "Khula",
      "Antic Slab", "Prosto One",
      "Shadows Into Light Two", "Arbutus Slab",
      "Glegoo", "Sarala",
      "Jura", "K2D",
      "Grand Hotel", "Julius Sans One",
      "Kreon", "Playball",
      "Scada", "Oleo Script",
      "Rock Salt", "Covered By Your Grace",
      "Ubuntu Mono", "Damion",
      "Pridi", "Actor",
      "Fugaz One", "Karma",
      "Sintony", "Average",
      "Alegreya Sans SC", "Electrolize",
      "Bai Jamjuree", "Niramit",
      "Mali", "Krub",
      "KoHo", "Kodchasan",
      "Fahkwang", "Homemade Apple",
      "Saira Extra Condensed", "Marmelad",
      "Michroma", "Lusitana",
      "Baloo", "Mitr",
      "Jaldi", "Chakra Petch",
      "Bungee", "Allura",
      "Parisienne", "Oranienbaum",
      "Nothing You Could Do", "Allerta Stencil",
      "Varela", "Anaheim",
      "Unna", "Chewy",
      "Forum", "Happy Monkey",
      "Reenie Beanie", "Molengo",
      "Cormorant", "Sawarabi Gothic",
      "Cantata One", "Black Ops One",
      "Archivo", "Bevan",
      "Saira", "Ovo",
      "Alex Brush", "Nanum Gothic Coding",
      "Coustard", "Rochester",
      "VT323", "Pangolin",
      "Scheherazade", "Niconne",
      "Spinnaker", "Nobile",
      "Rambla", "Allerta",
      "Pinyon Script", "Fredericka the Great",
      "Charmonman", "Srisakdi",
      "Leckerli One", "Quantico",
      "Saira Semi Condensed", "Nanum Pen Script",
      "Syncopate", "Reem Kufi",
      "Rancho", "Space Mono",
      "Lustria", "Rasa",
      "Italianno", "Cabin Sketch",
      "Marcellus", "Arsenal",
      "Aldrich", "Mr Dafoe",
      "IBM Plex Serif", "Lilita One",
      "Magra", "Kameron",
      "Caveat Brush", "Coda",
      "Alef", "Overlock",
      "Fauna One", "Gothic A1",
      "Itim", "Palanquin",
      "Biryani", "Basic",
      "Antic", "Days One",
      "Carrois Gothic", "Squada One",
      "Coming Soon", "Radley",
      "Changa One", "Share",
      "Slabo 13px", "Contrail One",
      "Bowlby One SC", "Carme",
      "Berkshire Swash", "Cousine",
      "Sue Ellen Francisco", "Just Another Hand",
      "Titan One", "Bungee Inline",
      "Noto Serif JP", "Noto Serif KR",
      "Yeseva One", "Mukta Vaani",
      "Caudex", "Candal",
      "Aclonica", "Lateef",
      "Abhaya Libre", "Buenard",
      "Spectral", "IM Fell Double Pica",
      "Martel Sans", "Padauk",
      "Rufina", "Six Caps",
      "Lekton", "Voltaire",
      "Eczar", "Anonymous Pro",
      "Wendy One", "Racing Sans One",
      "Limelight", "Mada",
      "Petit Formal Script", "Share Tech Mono",
      "Yesteryear", "Kurale",
      "Oxygen Mono", "Secular One",
      "M PLUS Rounded 1c", "Marcellus SC",
      "Nanum Brush Script", "Cinzel Decorative",
      "Marvel", "Sirin Stencil",
      "Alegreya SC", "Saira Condensed",
      "Aladin", "Rosario",
      "Arima Madurai", "Metrophobic",
      "Norican", "Annie Use Your Telescope",
      "Nixie One", "Jockey One",
      "Ceviche One", "Maitree",
      "Londrina Solid", "Pattaya",
      "Copse", "Baloo Bhaina",
      "Freckle Face", "Markazi Text",
      "Gruppo", "Telex",
      "Skranji", "Encode Sans",
      "Shojumaru", "Raleway Dots",
      "Goudy Bookletter 1911", "Andada",
      "Belleza", "Schoolbell",
      "Average Sans", "Doppio One",
      "Corben", "Tauri",
      "Calligraffitti", "Homenaje",
      "Mountains of Christmas", "Love Ya Like A Sister",
      "Bubblegum Sans", "Risque",
      "Puritan", "Kelly Slab",
      "Judson", "Cutive",
      "Bentham", "Sumana",
      "Life Savers", "Allan",
      "Mukta Malar", "Herr Von Muellerhoff",
      "Notable", "Carrois Gothic SC",
      "Gilda Display", "Asap Condensed",
      "Balthazar", "Duru Sans",
      "Emilys Candy", "Graduate",
      "Kristi", "Trirong",
      "Cutive Mono", "Halant",
      "Faster One", "Fira Mono",
      "Suravaram", "Palanquin Dark",
      "The Girl Next Door", "Delius",
      "IBM Plex Mono", "Capriola",
      "Arizonia", "Inder",
      "Averia Serif Libre", "Amethysta",
      "Aref Ruqaa", "Chelsea Market",
      "Baloo Bhaijaan", "Vesper Libre",
      "Cambo", "Trocchi",
      "Mr De Haviland", "Lemonada",
      "Cormorant SC", "Mouse Memoirs",
      "Amiko", "IBM Plex Sans Condensed",
      "Merienda One", "Andika",
      "Mate", "Federo",
      "Poly", "Rammetto One",
      "Rozha One", "Pompiere",
      "Cambay", "Cormorant Upright",
      "Oregano", "Knewave",
      "Rouge Script", "Gabriela",
      "Kadwa", "Proza Libre",
      "Sedgwick Ave", "Laila",
      "Artifika", "Seaweed Script",
      "Qwigley", "Gravitas One",
      "Montez", "Rye",
      "Metamorphous", "Give You Glory",
      "Kosugi", "Alike",
      "Athiti", "Short Stack",
      "Uncial Antiqua", "Clicker Script",
      "Bowlby One", "Cormorant Infant",
      "Holtwood One SC", "Quando",
      "Prociono", "Expletus Sans",
      "Chonburi", "Strait",
      "Convergence", "Sniglet",
      "Fanwood Text", "Iceland",
      "Fondamento", "Vast Shadow",
      "Sarpanch", "Denk One",
      "Suranna", "Lily Script One",
      "Ranga", "Sunflower",
      "IM Fell English", "Podkova",
      "Crafty Girls", "Elsie",
      "Cedarville Cursive", "Baumans",
      "Wire One", "Mako",
      "Sofia", "NTR",
      "Mirza", "Spicy Rice",
      "Brawler", "Harmattan",
      "Crushed", "Sriracha",
      "Faustina", "Patrick Hand SC",
      "Gurajada", "UnifrakturMaguntia",
      "Walter Turncoat", "IM Fell DW Pica",
      "Over the Rainbow", "Fontdiner Swanky",
      "Bilbo Swash Caps", "Belgrano",
      "Imprima", "Della Respira",
      "Euphoria Script", "Loved by the King",
      "Tulpen One", "Oleo Script Swash Caps",
      "Frijole", "Zeyada",
      "Waiting for the Sunrise", "Pavanam",
      "Meddon", "Megrim",
      "Port Lligat Slab", "Aguafina Script",
      "Salsa", "Ledger",
      "La Belle Aurore", "Just Me Again Down Here",
      "Medula One", "Rubik Mono One",
      "Ramabhadra", "Cherry Swash",
      "McLaren", "Amita",
      "Tienne", "Baloo Paaji",
      "Shanti", "Delius Swash Caps",
      "Dekko", "Lemon",
      "Suez One", "Ruslan Display",
      "Sansita", "Gafata",
      "Nosifer", "Spirax",
      "Montserrat Subrayada", "Katibeh",
      "Averia Sans Libre", "Wallpoet",
      "Dawning of a New Day", "Mallanna",
      "Share Tech", "Nova Round",
      "Stardos Stencil", "Vampiro One",
      "Orienta", "Nova Square",
      "Codystar", "Finger Paint",
      "Bellefair", "Alike Angular",
      "Coda Caption", "Galada",
      "Quintessential", "Miriam Libre",
      "Unkempt", "Atma",
      "Fjord One", "Milonga",
      "Spectral SC", "Voces",
      "Nova Mono", "Germania One",
      "Habibi", "IM Fell English SC",
      "Bungee Shade", "Headland One",
      "Sail", "Arya",
      "Scope One", "Black Han Sans",
      "Encode Sans Semi Condensed", "Yatra One",
      "Londrina Outline", "BioRhyme",
      "Rakkas", "Cantora One",
      "Kosugi Maru", "Kranky",
      "Chicle", "Mandali",
      "Overpass Mono", "Krona One",
      "David Libre", "Geo",
      "Vibur", "Engagement",
      "Baloo Tamma", "Slackey",
      "Pirata One", "Cherry Cream Soda",
      "Baloo Chettan", "Encode Sans Semi Expanded",
      "Dynalight", "Mate SC",
      "Peralta", "Nova Slim",
      "Fenix", "Sura",
      "Amarante", "Creepster",
      "Cagliostro", "Kite One",
      "Numans", "Rationale",
      "Mrs Saint Delafield", "Kotta One",
      "League Script", "Timmana",
      "Condiment", "Chela One",
      "Antic Didone", "Mukta Mahee",
      "Dorsa", "Poller One",
      "Mystery Quest", "Paprika",
      "Farsan", "Nova Flat",
      "Chau Philomene One", "Stoke",
      "Baloo Bhai", "IM Fell French Canon",
      "Rosarivo", "Simonetta",
      "Sarina", "Baloo Thambi",
      "Asul", "Englebert",
      "Mogra", "Delius Unicase",
      "Buda", "Stint Ultra Expanded",
      "Stalemate", "Ribeye",
      "Bubbler One", "Text Me One",
      "Maiden Orange", "Petrona",
      "Flamenco", "Underdog",
      "Coiny", "Joti One",
      "Stint Ultra Condensed", "Encode Sans Expanded",
      "Junge", "Ruluko",
      "Esteban", "East Sea Dokdo",
      "UnifrakturCook", "Port Lligat Sans",
      "Mina", "Princess Sofia",
      "Autour One", "Trade Winds",
      "Wellfleet", "IM Fell French Canon SC",
      "Gaegu", "Inknut Antiqua",
      "Sancreek", "Trykker",
      "Ranchers", "Plaster",
      "Lovers Quarrel", "Swanky and Moo Moo",
      "Eater", "Sonsie One",
      "Stylish", "Black And White Picture",
      "Meera Inimai", "Almendra",
      "Henny Penny", "Jua",
      "Kirang Haerang", "Eagle Lake",
      "New Rocker", "Gugi",
      "Poor Story", "Gamja Flower",
      "Song Myung", "Dokdo",
      "Cute Font", "Hi Melody",
      "Yeon Sung", "Overlock SC",
      "Fresca", "Averia Gruesa Libre",
      "Diplomata SC", "Linden Hill",
      "Donegal One", "Purple Purse",
      "Italiana", "Croissant One",
      "Inika", "Manuale",
      "Glass Antiqua", "Elsie Swash Caps",
      "Revalia", "Galindo",
      "Ramaraja", "Julee",
      "Molle", "Ruge Boogie",
      "Chango", "Marko One",
      "Rhodium Libre", "Redressed",
      "Oldenburg", "Fascinate Inline",
      "Flavors", "IM Fell Great Primer",
      "Ravi Prakash", "Offside",
      "Akronim", "Bilbo",
      "Cormorant Unicase", "Barrio",
      "Sree Krushnadevaraya", "Combo",
      "Monofett", "Snippet",
      "Kavoon", "MedievalSharp",
      "Miltonian Tattoo", "Ruthie",
      "Jim Nightshade", "Diplomata",
      "Griffy", "Asset",
      "IM Fell DW Pica SC", "Keania One",
      "Kumar One", "Monsieur La Doulaise",
      "Smythe", "Dr Sugiyama",
      "Baloo Tammudu", "Tillana",
      "Rum Raisin", "Lancelot",
      "Irish Grover", "Modak",
      "Sahitya", "Montaga",
      "Mrs Sheppards", "Bigshot One",
      "Margarine", "Modern Antiqua",
      "Caesar Dressing", "Devonshire",
      "Metal Mania", "Jacques Francois Shadow",
      "Galdeano", "Jomhuria",
      "Chathura", "Meie Script",
      "IM Fell Great Primer SC", "Baloo Da",
      "Atomic Age", "Kavivanar",
      "Sunshiney", "Bahiana",
      "Seymour One", "Asar",
      "Ribeye Marrow", "Miniver",
      "Felipa", "Macondo",
      "Vollkorn SC", "Snowburst One",
      "Ewert", "Original Surfer",
      "Zilla Slab Highlight", "IM Fell Double Pica SC",
      "Trochut", "Astloch",
      "Goblin One", "Kenia",
      "Nova Script", "Arbutus",
      "Piedra", "Warnes",
      "Libre Barcode 128", "Romanesco",
      "Almendra Display", "Unlock",
      "Nova Cut", "Miss Fajardose",
      "Bigelow Rules", "Almendra SC",
      "Miltonian", "Jolly Lodger",
      "Nova Oval", "Bonbon",
      "Smokum", "Londrina Shadow",
      "Tenali Ramakrishna", "Bungee Outline",
      "Passero One", "Sedgwick Ave Display",
      "Jacques Francois", "Butterfly Kids",
      "Lakki Reddy", "Libre Barcode 39 Extended Text",
      "Libre Barcode 39 Extended", "Geostar Fill",
      "Gorditas", "Fascinate",
      "Bungee Hairline", "Sofadi One",
      "Libre Barcode 39 Text", "Libre Barcode 39",
      "Libre Barcode 128 Text", "Gidugu",
      "Supermercado One", "Sevillana",
      "Stalinist One", "Aubrey",
      "Macondo Swash Caps", "Geostar",
      "Erica One", "Federant",
      "Peddana", "Fruktur",
      "Londrina Sketch", "Butcherman",
      "Mr Bedfort", "Emblema One",
      "Hanalei", "Dhurjati",
      "Kumar One Outline", "BioRhyme Expanded"
    ],
  },
};
const rmgFontFunctions = {
  get (fontList) {
    const index = Math.floor(Math.random() * fontList.length);
    return fontList[index];
  },
  getLink (name, text) {
    let url = `https://fonts.googleapis.com/css?family=${name.replace(' ', '+')}`;
    if (text) {
      url += `&text=${text}`;
    }
    return url;
  },
  getNode (link) {
    const node = document.createElement("link");
    node.class = CSS_CLASSES.mech.randFontLink;
    node.href = link;
    node.rel = "stylesheet";
    return node;
  },
  getNodeFromFont (font, text) {
    const link = this.getLink(font, text);
    return this.getNode(link);
  },
};
// Fonts -- End


// Colors -- Start
const rmgCOLORS = {
  theme: {
    red: {
      background: "#ffe6f7",
      codeBackground: "#ffcccc",
      codeColor: "#990066",
      gradientStart: "#cc0000",
      gradientEnd: "#ff66cc",
      primaryOne: "#800000",
      primaryTwo: "#990066"
    }
  },
  shade: {
    light: {
      background: {
        level: "lightest",
        interval: 120
      },
      codeBackground: {
        level: "lightest",
        intervel: 180
      },
      codeColor: {
        level: "darkest",
        interval: 180
      },
      gradient: {
        level: "light",
        interval: 90
      },
      primary: {
        level: "medium",
        interval: 90
      }
    },
    dark: {
      background: {
        level: "darkest",
        interval: 90
      },
      codeBackground: {
        level: "darkest",
        intervel: 90
      },
      codeColor: {
        level: "lighter",
        interval: 180
      },
      gradient: {
        level: "lighter",
        interval: 90
      },
      primary: {
        level: "lighter",
        interval: 90
      }
    }
  }
};
const rmgColorFunctions = {
  randomRbg(min, max) {
    const red = Math.floor(Math.random() * (max - min + 1)) + min;
    const blue = Math.floor(Math.random() * (max - min + 1)) + min;
    const green = Math.floor(Math.random() * (max - min + 1)) + min;
    return [red, blue, green];
  },
  rgbCss(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
  },
  /**
   * Generate a random hue.
   *
   * interval: number
   *   A minimal distance, in degrees the two hues should be apart on the HSL
   *   color wheel.
   * seed: number
   *   Some number the resulting hue cant be within 'interval' of.
   */
  randomHue (interval, seed) {
    const circle = 360;
    let hue = Math.floor(Math.random() * circle + 1);

    if (seed) {
      const maxDistance = circle - interval;
      while (Math.abs(hue - seed) < interval || Math.abs(hue - seed) > maxDistance) {
        hue = Math.floor(Math.random() * circle + 1);
      }
    }
    return hue;
  },
  /**
   * Generate an array of hue, sat, val to represent a color.
   *
   * hue: int
   *   The hue part of HSL.
   * level: string
   *   'light', 'medium', or 'dark'. Determines general shade of the color.
   *   If none is provided shade will be random.
   */
  hsl (hue, level) {
    let satMax = 100
    let satMin = 40

    let valMax = 0
    let valMin = 0
    switch (level) {
      case 'darkest':
        valMax = 15
        valMin = 8
        break
      case 'medium':
        valMax = 55
        valMin = 25
        break
      case 'light':
        valMax = 70
        valMin = 30
        break
      case 'lighter':
        valMax = 65
        valMin = 85
        break
      case 'lightest':
        valMax = 99
        valMin = 95
        break
      default:
        valMax = 100
        valMin = 0
    }

    const sat = Math.floor(Math.random() * (satMax - satMin + 1)) + satMin
    const val = Math.floor(Math.random() * (valMax - valMin + 1)) + valMin
    return [hue, sat, val]
  },
  /**
   * Helper function to turn an array of hue, sat,val numbers into a CSS
   * readable hsl function string.
   */
  hslCss (hsl) {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  },
  generateRmgColors (shade) {
    const source = rmgCOLORS.shade[shade];

    const backgroundHue = this.randomHue(source.background.interval);
    const codeBackgroundHue = this.randomHue(source.codeBackground.interval, backgroundHue);
    const backgroundHsl = this.hsl(backgroundHue, source.background.level);
    const codeBackgroundHsl = this.hsl(codeBackgroundHue, source.codeBackground.level);

    const codeColorHue = this.randomHue(source.codeColor.interval, codeBackgroundHue);
    const codeColorHsl = this.hsl(codeColorHue, source.codeColor.level);

    const gradStartHue = this.randomHue(source.gradient.interval);
    const gradEndHue = this.randomHue(source.gradient.interval, gradStartHue);
    const gradStartHsl = this.hsl(gradStartHue, source.gradient.level);
    const gradEndHsl = this.hsl(gradEndHue, source.gradient.level);

    const primaryOneHue = this.randomHue(source.primary.interval);
    const primaryTwoHue = this.randomHue(source.primary.interval, primaryOneHue);
    const primaryOneHsl = this.hsl(primaryOneHue, source.primary.level);
    const primaryTwoHsl = this.hsl(primaryTwoHue, source.primary.level);

    const colors = {
      background: this.hslCss(backgroundHsl),
      codeBackground: this.hslCss(codeBackgroundHsl),
      codeColor: this.hslCss(codeColorHsl),
      gradientStart: this.hslCss(gradStartHsl),
      gradientEnd: this.hslCss(gradEndHsl),
      primaryOne: this.hslCss(primaryOneHsl),
      primaryTwo: this.hslCss(primaryTwoHsl)
    };
    console.log(colors);
    return colors;
  }
};
// Colors -- End


// RMG -- Start
const rmgDom = {
  injectFontNodes (nodes) {
    const head = document.querySelector(SELECTORS.head);
    nodes.forEach(node => head.appendChild(node));
  }
};
const rmgStore = {
  fonts: {
    body: null,
    code: null,
    header: null,
  },
  colors: {
    theme: SITE.rmg.defaultTheme
  },
  setTheme (theme) {
    self.colors.theme = theme;
  },
  setFonts () {
    this.fonts.body = rmgFontFunctions.get(rmgFONTS.families.body);
    this.fonts.code = rmgFontFunctions.get(rmgFONTS.families.code);
    this.fonts.header = this.fonts.body;
    while (this.fonts.header === this.fonts.body) {
      this.fonts.header = rmgFontFunctions.get(rmgFONTS.families.body);
    }
  }
};
const rmgEngine = {
  setTitleFonts () {
    const headerTitle = document.querySelector(SELECTORS.headerTitle);
    const siteTitle = SITE.title.split("");
    var fonts = [];
    var nodes = [];

    siteTitle.forEach(char => {
      const font = rmgFontFunctions.get(rmgFONTS.families.header);
      fonts.push(font);
      nodes.push(rmgFontFunctions.getNodeFromFont(font, char));
    });
    rmgDom.injectFontNodes(nodes);

    var spans = [];
    nodes.forEach((node, index) => {
      const span = document.createElement("span");
      span.style = `font-family: ${fonts[index]};`;
      span.innerHTML = siteTitle[index];
      spans.push(span.outerHTML);
    });
    const html = spans.join("");
    headerTitle.innerHTML = html;
  },
  injectFontLinkElements (fonts) {
    const nodes = [
      rmgFontFunctions.getNodeFromFont(fonts.body, null),
      rmgFontFunctions.getNodeFromFont(fonts.code, null),
      rmgFontFunctions.getNodeFromFont(fonts.header, null),
    ];
    rmgDom.injectFontNodes(nodes);
  },
  setPageFontStyles (fonts) {
    const styles = `
    body {
      font-family: ${fonts.body};
    }
    code {
      font-family: ${fonts.code};
    }
    .story h1,
    .story h2,
    .story h3,
    .story h4,
    .story h5,
    .story h6 {
      font-family: ${fonts.header};
    }
    `;
    dom.setInnerContent(`.${CSS_CLASSES.mech.randFontStyle}`, styles);
  },
  generateColorStyles (colors) {
    return `
      body {
        background: ${colors.background};
      }
      .story {
        color: ${colors.primaryOne};
      }
      .story blockquote {
        border-left: 0.25em solid ${colors.primaryOne};
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
    `;
  },
  setPageColorStyles (theme) {
    var styles = "";
    if (SITE.rmg.themes.colors.includes(theme)) {
      styles = this.generateColorStyles(rmgCOLORS.theme[theme]);
    } else if (theme === SITE.rmg.themes.special.rmg) {
      const shade = (Math.floor(Math.random() * 10) % 2 === 0) ? "dark" : "light";
      const colors = rmgColorFunctions.generateRmgColors(shade);
      styles = this.generateColorStyles(colors);
    } else if (theme === SITE.rmg.themes.special.none) {
      styles = "";
    }
    dom.setInnerContent(`.${CSS_CLASSES.mech.randColorStyle}`, styles);
  }
};
// RMG -- End


dom.setInnerContent(SELECTORS.byLineName, getRandomizedByLine());
menuToggle();
storyImageClick();
overlayClick();

rmgStore.setFonts();
rmgEngine.injectFontLinkElements(rmgStore.fonts);
rmgEngine.setPageFontStyles(rmgStore.fonts);
rmgEngine.setTitleFonts();
rmgEngine.setPageColorStyles(rmgStore.colors.theme);

from someperson import (
    Author,
    BlueSky,
    Configuration,
    Link,
    Palette,
    Theme,
    Twitter,
)
from someperson.plugins import MarkdownPlugin, SeoPlugin, ThemePlugin

################################
# Theme - Start
################################
SOME_PERSON = Configuration(
    author=Author(
        first_names=[
            "Aaron",
            "A-a-ron",
            "Erin",
            "Aron",
            "Arin",
            "Airin",
        ],
        last_names=[
            "Markey",
            "Marque",
            "Marky",
            "Markee",
            "Makey",
            "Marke",
        ],
        blue_sky=BlueSky(username="aaronmarkey.com"),
        twitter=Twitter(username=""),
    ),
    description="Some person named Aaron Markey. I write about current events, books, writing, and F-tier philosophy.",
    theme=Theme(
        palettes=[
            Palette(
                id="hyper",
                icon="🌠",
                name="Orbit",
                emojis=[
                    "🌑",
                    "🌕",
                    "🛸",
                    "🌓",
                    "🌗",
                    "🌙",
                    "🪐",
                    "⭐",
                    "☀️",
                    "🌟",
                    "🚀",
                    "🛰️",
                    "🌎",
                    "🖖",
                    "👾",
                    "☄️",
                ],
            ),
            Palette(
                id="october",
                icon="🌅",
                name="October",
                emojis=[
                    "🍂",
                    "🌾",
                    "🌸",
                    "🌺",
                    "🌼",
                    "🍄",
                    "🪷",
                    "🏵️",
                    "🍁",
                    "🌷",
                    "🪻",
                    "🌲",
                    "🌳",
                    "🌵",
                    "🌿",
                    "🍀",
                ],
            ),
            Palette(
                id="roses",
                icon="💟",
                name="Oxygen",
                emojis=[
                    "💜",
                    "💛",
                    "💘",
                    "💝",
                    "💖",
                    "❤️‍🔥",
                    "💗",
                    "💓",
                    "❤️",
                    "🧡",
                    "💚",
                    "💙",
                    "🤎",
                    "🩵",
                    "🖤",
                    "🤍",
                ],
            ),
            Palette(
                id="octal",
                icon="💾",
                name="Octal",
                emojis=[
                    "💿",
                    "📀",
                    "🖥️",
                    "🖱️",
                    "⌨️",
                    "📱",
                    "♾️",
                    "📟",
                    "💽",
                    "🎚️",
                    "📠",
                    "📺",
                    "📡",
                    "🌐",
                    "🔗",
                    "🖲️",
                ],
            ),
        ],
        default_palette_id="hyper",
    ),
    menu=[
        Link(title="Home", href="/"),
        Link(title="Writings", href="https://aaronmarkey.substack.com"),
        Link(title="Archive", href="/blog"),
    ],
    plugins=[ThemePlugin(), MarkdownPlugin(youtube_use_lite=True), SeoPlugin()],
)
################################
# Theme - End
################################

################################
# General - Start
################################
DEFAULT_LANG = "en"
EXTRA_PATH_METADATA = {
    "extra/CNAME": {"path": "CNAME"},
    "extra/favicon.ico": {"path": "favicon.ico"},
}
LOCALE = ("en_US",)
OUTPUT_PATH = "output/"
OUTPUT_SOURCES = False
SITENAME = "Some Person"
SITEURL = "https://aaronmarkey.com"
STATIC_PATHS = [
    "extra",
]
SUMMARY_MAX_LENGTH = 30
TIMEZONE = "America/Denver"
################################
# General - End
################################

################################
# RSS/Atom Feeds - Start
################################
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
CATEGORY_FEED_ATOM = None
FEED_ALL_ATOM = "feeds/index.atom.xml"
FEED_DOMAIN = SITEURL
TRANSLATION_FEED_ATOM = None
################################
# RSS/Atom Feeds - End
################################

################################
# URL, Output, & Pathing - Start
################################
ARTICLE_URL = "blog/{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
ARCHIVES_SAVE_AS = ""
ARTICLE_SAVE_AS = "blog/{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
AUTHOR_URL = ""
AUTHORS_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
CATEGORY_URL = ""
CATEGORY_SAVE_AS = ""
DIRECT_TEMPLATES = ["index", "blog", "authors", "categories", "tags", "archives"]
PAGE_URL = "{slug}.html"
PAGE_SAVE_AS = "{slug}.html"
PATH = "content"
TAG_URL = "blog/stuff/{slug}.html"
TAG_SAVE_AS = "blog/stuff/{slug}.html"
TAGS_SAVE_AS = ""
################################
# URL, Output, & Pathing - End
################################

################################
# Pagination - Start
################################
DEFAULT_PAGINATION = 5
PAGINATION_PATTERNS = (
    (1, "{name}{extension}", "{name}{extension}"),
    (2, "{base_name}/page/{number}{extension}", "{base_name}/page/{number}{extension}"),
)
PAGINATED_TEMPLATES = {"index": None, "blog": None, "tag": None, "category": None, "author": None}
################################
# Pagination - End
################################

################################
# Plugins- Start
################################
PLUGINS = [
    "pelican.plugins.sitemap",
    "pelican.plugins.yaml_metadata",
    "someperson",
]

# pelican.plugins.sitemap
SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.5, "indexes": 0.5, "pages": 0.5},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}
################################
# Plugins- End
################################

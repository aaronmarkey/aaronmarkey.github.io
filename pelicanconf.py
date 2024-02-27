from someperson import (
    Author,
    Link,
    Palette,
    SomePersonConfig,
    Theme,
    Twitter,
)
from someperson.plugins.markdown import MarkdownPlugin
from someperson.plugins.seo import SeoPlugin
from someperson.plugins.theme import ThemePlugin

################################
# Theme - Start
################################
SOME_PERSON = SomePersonConfig(
    author=Author(
        first_names=[
            "aaron",
            "a-a-ron",
            "erin",
            "aron",
            "arin",
            "airin",
        ],
        last_names=[
            "markey",
            "marque",
            "marky",
            "markee",
            "makey",
            "marke",
        ],
        twitter=Twitter(username="heressomeperson"),
    ),
    description="some person named aaron markey. I write and complain about things.",
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
        ],
        default_palette_id="roses",
    ),
    menu=[Link(title="home", href="/"), Link(title="about", href="/about")],
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
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
    },
    "output_format": "html5",
}
OUTPUT_PATH = "output/"
OUTPUT_SOURCES = False
SITENAME = "some person"
SITEURL = "https://someperson.me"
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
ARTICLE_URL = "{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
ARCHIVES_SAVE_AS = ""
ARTICLE_SAVE_AS = "{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
AUTHOR_URL = ""
AUTHORS_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
CATEGORY_URL = ""
CATEGORY_SAVE_AS = ""
PAGE_URL = "{slug}.html"
PAGE_SAVE_AS = "{slug}.html"
PATH = "content"
TAG_URL = "stuff/{slug}.html"
TAG_SAVE_AS = "stuff/{slug}.html"
TAGS_SAVE_AS = ""
################################
# URL, Output, & Pathing - End
################################

################################
# Pagination - Start
################################
DEFAULT_PAGINATION = 20
PAGINATION_PATTERNS = (
    (1, "{name}{extension}", "{name}{extension}"),
    (2, "{base_name}/page/{number}{extension}", "{base_name}/page/{number}{extension}"),
)
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

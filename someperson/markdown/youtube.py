import re
from urllib.parse import parse_qsl, urlsplit
from xml.etree.ElementTree import Element

from markdown import Extension, Markdown
from markdown.inlinepatterns import LinkInlineProcessor

IMAGE_LINK_RE = r"\@\["


class YoutubeInlineProcessor(LinkInlineProcessor):
    def __init__(self, pattern: str, md: Markdown | None = None, config: dict | None = None):
        self.config = config or {}
        super().__init__(pattern, md)

    def _wrap(self, el: Element) -> Element:
        el.set("class", self.config.get("player_class"))

        parent = Element("div")
        parent.set("class", self.config.get("container_class"))
        parent.append(el)

        return parent

    def _video_id(self, src: str) -> str:
        try:
            query = dict(parse_qsl(urlsplit(src).query))
            return query["v"]
        except Exception as e:  # noqa: BLE001
            msg = "Cannot derive video ID from link."
            raise ValueError(msg) from e

    def _generic_link(self, href: str, title: str) -> Element:
        el = Element("a")
        el.text = f"YouTube video: {title}"

        el.set("href", href)
        el.set("title", title)

        return el

    def _lite_frame(self, video_id: str, title: str) -> Element:
        el = Element("lite-youtube")
        el.set("videoid", video_id)
        el.set("videotitle", title)
        el.set("autoload", "autoload")
        el.set("posterloading", "eager")

        return self._wrap(el)

    def _regular_frame(self, video_id: str, title: str) -> Element:
        src = f"https://www.youtube.com/embed/{video_id}"

        el = Element("iframe")
        el.set("src", src)
        el.set("title", title)
        el.set("frameborder", "0")
        el.set(
            "allow",
            "accelerometer; clipboard-write; fullscreen; encrypted-media; gyroscope; picture-in-picture; web-share",
        )
        el.set("allowfullscreen", "")

        return self._wrap(el)

    def handleMatch(self, m: re.Match[str], data: str) -> tuple[Element | None, int | None, int | None]:  # noqa: N802
        text, index, handled = self.getText(data, m.end(0))
        if not handled:
            return None, None, None

        src, _, index, handled = self.getLink(data, index)
        if not handled:
            return None, None, None

        el: Element | None
        title = self.unescape(text)
        try:
            video_id = self._video_id(src)
        except ValueError:
            el = self._generic_link(src, title)
        else:
            el = (
                self._lite_frame(video_id, title)
                if self.config.get("use_lite")
                else self._regular_frame(video_id, title)
            )

        return el, m.start(0), index


class YouTubeExtension(Extension):
    def __init__(self, **kwargs) -> None:
        self.config = {
            "use_lite": [False, "Use the lite-youtube JS library to lazy load YT links"],
            "container_class": ["video-container", "CSS class added to the container div of the video."],
            "player_class": ["video-player", "CSS class added to the video player element itself."],
        }
        super().__init__(**kwargs)

    def extendMarkdown(self, md):  # noqa: N802
        md.registerExtension(self)
        md.inlinePatterns.register(YoutubeInlineProcessor(IMAGE_LINK_RE, md, self.getConfigs()), "youtube_link", 161)


def makeExtension(**kwargs) -> YouTubeExtension:  # noqa: N802
    return YouTubeExtension(**kwargs)

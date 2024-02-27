import re
from urllib.parse import parse_qsl, urlsplit
from xml.etree.ElementTree import Element

from markdown import Extension, Markdown
from markdown.inlinepatterns import LinkInlineProcessor

IMAGE_LINK_RE = r"\@\["


class YoutubeInlineProcessor(LinkInlineProcessor):

    def __init__(self, pattern: str, md: Markdown | None = None, config: dict = dict()):
        self.config = config
        super().__init__(pattern, md)

    def _video_id(self, src: str) -> str:
        try:
            query = dict(parse_qsl(urlsplit(src).query))
            return query["v"]
        except Exception:
            raise ValueError("Cannot derive video ID from link.")

    def _generic_link(self, href: str, title: str) -> Element:  # noqa: N802
        el = Element("a")
        el.text = f"YouTube video: {title}"

        el.set("href", href)
        el.set("title", title)

        return el

    def _lite_frame(self, video_id: str) -> Element:  # noqa: N802
        el = Element("lite-youtube")
        el.set("videoid", video_id)

        return el

    def _regular_frame(self, video_id: str, title: str) -> Element:  # noqa: N802
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

        parent = Element("div")
        parent.set("class", "video-container")
        parent.append(el)

        return parent

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
            el = self._lite_frame(video_id) if self.config.get("use_lite") else self._regular_frame(video_id, title)

        return el, m.start(0), index


class YouTubeExtension(Extension):

    def __init__(self, **kwargs) -> None:
        self.config = {
            "use_lite": [False, "Use the lite-youtube JS library to lazy load YT links"]
        }
        super().__init__(**kwargs)

    def extendMarkdown(self, md):  # noqa: N802
        md.registerExtension(self)
        md.inlinePatterns.register(YoutubeInlineProcessor(IMAGE_LINK_RE, md, self.getConfigs()), "youtube_link", 161)


def makeExtension(**kwargs) -> YouTubeExtension:  # noqa: N802
    return YouTubeExtension(**kwargs)

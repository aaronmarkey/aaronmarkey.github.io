import re
from xml.etree.ElementTree import Element

from markdown import Extension
from markdown.inlinepatterns import LinkInlineProcessor

IMAGE_LINK_RE = r"\@\["


class YoutubeInlineProcessor(LinkInlineProcessor):
    def handleMatch(self, m: re.Match[str], data: str) -> tuple[Element | None, int | None, int | None]:  # noqa: N802
        text, index, handled = self.getText(data, m.end(0))
        if not handled:
            return None, None, None

        src, _, index, handled = self.getLink(data, index)
        if not handled:
            return None, None, None

        el = Element("iframe")
        el.set("src", src)
        title = self.unescape(text)
        if title is not None:
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

        return parent, m.start(0), index


class YouTubeExtension(Extension):
    def extendMarkdown(self, md):  # noqa: N802
        md.registerExtension(self)
        md.inlinePatterns.register(YoutubeInlineProcessor(IMAGE_LINK_RE, md), "youtube_link", 161)


def makeExtension(**kwargs) -> YouTubeExtension:  # noqa: N802
    return YouTubeExtension(**kwargs)

from typing import ClassVar

from pelican import Pelican

from someperson.plugins.base import Plugin, PluginHandler


class MarkdownPluginHandler(PluginHandler):
    def sig_initialized(self, app: Pelican) -> bool:
        if self.config.youtube:
            app.settings["MARKDOWN"]["extension_configs"]["someperson.markdown.youtube"] = {"use_lite": self.config.youtube_use_lite}


class MarkdownPlugin(Plugin):
    handler: ClassVar[type[PluginHandler]] = MarkdownPluginHandler
    youtube: bool = True
    youtube_use_lite: bool = False

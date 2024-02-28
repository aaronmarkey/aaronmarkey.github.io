from typing import ClassVar

from pelican import Pelican

from someperson.plugins.base import Plugin, PluginHandler


class MarkdownPluginHandler(PluginHandler):
    def sig_initialized(self, app: Pelican) -> bool:
        if self.config.youtube:
            app.settings["MARKDOWN"]["extension_configs"]["someperson.markdown.youtube"] = {
                key.split("_", 1)[1]: value
                for key, value in self.config.model_dump().items()
                if key.startswith("youtube_")
            }


class MarkdownPlugin(Plugin):
    handler: ClassVar[type[PluginHandler]] = MarkdownPluginHandler
    youtube: bool = True
    youtube_use_lite: bool = False
    youtube_container_class: str = "container_class"
    youtube_player_class: str = "player_class"

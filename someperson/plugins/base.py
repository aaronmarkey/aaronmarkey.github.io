from typing import TYPE_CHECKING, Any, ClassVar

from pydantic import BaseModel

if TYPE_CHECKING:
    from someperson import SomePersonConfig


class PluginHandler:
    def __init__(self, config: "Plugin") -> None:
        self._pelican_settings = None
        self.theme_config: "SomePersonConfig" | None = None
        self.config: "Plugin" = config

    def get_pelican_setting(self, name: str) -> Any | None:
        return self._pelican_settings.get(name, None)

    def connect(self, pelican_settings, theme_config: "SomePersonConfig", config: "Plugin") -> None:
        self.config = type(self.config)(**{**self.config.model_dump(), **config.model_dump()})
        self.theme_config = theme_config
        self._pelican_settings = pelican_settings


class Plugin(BaseModel):
    handler: ClassVar[type[PluginHandler]] = PluginHandler
    enabled: bool = True

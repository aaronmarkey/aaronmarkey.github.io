from typing import TYPE_CHECKING, Any, ClassVar

from blinker import NamedSignal
from pydantic import BaseModel

from someperson.utils import Settings, get_signal_name

if TYPE_CHECKING:
    from someperson.configuration import Configuration


class PluginHandler:
    def __init__(self, config: "Plugin", pelican_config: Settings, framework_config: "Configuration") -> None:
        self.pelican_config = pelican_config
        self.framework_config = framework_config
        self.config = config

    def get_pelican_setting(self, name: str) -> Any | None:
        return self.pelican_config.get(name, None)

    @staticmethod
    def receiver_name(signal: NamedSignal) -> str:
        name = get_signal_name(signal)
        return f"signal_{name}"


class Plugin(BaseModel):
    handler: ClassVar[type[PluginHandler]] = PluginHandler
    enabled: bool = True

from collections.abc import Sequence
from typing import TYPE_CHECKING

from blinker import NamedSignal
from pelican import Pelican

if TYPE_CHECKING:
    from someperson.configuration import Configuration

from someperson.plugins.base import PluginHandler
from someperson.utils import Settings, get_signal_name


class Framework:
    @staticmethod
    def receiver_name(signal: NamedSignal) -> str:
        name = get_signal_name(signal)
        return f"_receiver_for_{name}"

    def __init__(self, *, supported_signals: Sequence[NamedSignal], settings_key: str) -> None:
        self._settings_key = settings_key
        self._supported_signals: dict[str, NamedSignal] = {
            get_signal_name(signal): signal for signal in supported_signals
        }
        self.framework_config: Configuration | None = None
        self.pelican_config: Settings | None = None
        self.plugins: list[PluginHandler] = []

        for signal in self._supported_signals.values():
            setattr(self, Framework.receiver_name(signal), self._receiver_factory(signal))

    def configure(self) -> None:
        self._supported_signals["initialized"].connect(self._signal_initialized)
        for signal in self._supported_signals.values():
            if method := getattr(self, Framework.receiver_name(signal), None):
                signal.connect(method)

    def _signal_initialized(self, app: Pelican) -> None:
        self.pelican_config = app.settings
        self.framework_config = app.settings.get(self._settings_key)
        for plugin in self.framework_config.plugins:
            handler = plugin.handler(plugin, self.pelican_config, self.framework_config)
            self.plugins.append(handler)

    def _receiver_factory(self, signal: NamedSignal):
        def receiver(*args, **kwargs) -> None:
            for handler in self.plugins:
                if (method := getattr(handler, PluginHandler.receiver_name(signal), None)) and handler.config.enabled:
                    method(*args, **kwargs)

        return receiver

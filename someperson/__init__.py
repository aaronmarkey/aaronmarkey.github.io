from functools import cached_property
from secrets import choice

from pelican import Pelican, signals
from pydantic import BaseModel

from someperson.plugins.base import Plugin, PluginHandler
from someperson.plugins.seo import SeoPlugin
from someperson.plugins.theme import ThemePlugin


class SocialAccount(BaseModel):
    username: str
    link_format: str

    @property
    def link(self) -> str:
        return self.link_format.format(username=self.username)


class Twitter(SocialAccount):
    link_format: str = "https://twitter.com/{username}"


class Author(BaseModel):
    first_names: list[str]
    last_names: list[str]
    twitter: Twitter

    @property
    def name_parts(self) -> tuple[str, str]:
        return self.first_names[0] or "", self.last_names[0] or ""

    @property
    def name(self) -> str:
        first, last = self.name_parts
        return f"{first} {last}".strip()

    @property
    def rand_name_parts(self) -> tuple[str, str]:
        return choice(self.first_names) or "", choice(self.last_names[0]) or ""

    @property
    def names(self) -> dict[str, list[str]]:
        return {"first": self.first_names, "last": self.last_names}


class Palette(BaseModel):
    id: str
    icon: str
    name: str

    @property
    def serialized(self) -> dict[str, str]:
        return self.model_dump()


class Theme(BaseModel):
    emojis: list[str]
    palettes: list[Palette]
    default_palette_id: str
    hash: str = ""

    @cached_property
    def palette(self) -> Palette:
        palettes = {p.id: p for p in self.palettes}
        if default := palettes.get(self.default_palette_id):
            return default
        err = f"No palette for default ID '{self.default_palette_id}'."
        raise ValueError(err)

    @property
    def rand_emoji(self) -> str:
        return choice(self.emojis) or ""


class SomePersonConfig(BaseModel):
    author: Author
    description: str
    theme: Theme
    plugins: list[Plugin]


class SomePerson:

    _supported_plugins: tuple[type[Plugin], ...] = (
        ThemePlugin,
        SeoPlugin
    )
    _supported_signals: tuple[str, ...] = (
        "initialized",
        "content_written",
        "generator_init"
    )

    def __init__(
        self,
        *,
        pelican_signal=signals,
        settings_key: str = "SOME_PERSON",
    ) -> None:
        self.settings_key = settings_key
        self.signals = pelican_signal

        self.theme_config: SomePersonConfig | None = None
        self._pelican_settings = None

        def receiver(signal_name: str, handler: PluginHandler):
            def _reciever(*args, **kwargs):
                if (method := getattr(handler, f"sig_{signal_name}", None)) and handler.config.enabled:
                    method(*args, **kwargs)
            return _reciever

        self._handlers: dict[str, PluginHandler] = {}
        for plugin_cls in self._supported_plugins:
            plugin = plugin_cls()
            hcls = plugin_cls.handler
            self._handlers[plugin_cls.__name__] = hcls(plugin)

            for signal_name in self._supported_signals:
                setattr(
                    self,
                    f"_r_{hcls.__name__}_{signal_name}",
                    receiver(signal_name, self._handlers[plugin_cls.__name__])
                )

    def _r_initialized(self, app: Pelican) -> bool:
        self.theme_config = app.settings.get(self.settings_key)
        self._pelican_settings = app.settings
        for plugin in self.theme_config.plugins:
            self._handlers[type(plugin).__name__].connect(self._pelican_settings, self.theme_config, plugin)

    def register(self) -> None:
        self.signals.initialized.connect(self._r_initialized)
        for handler in self._handlers.values():
            for signal_name in self._supported_signals:
                if (
                    (method := getattr(self, f"_r_{type(handler).__name__}_{signal_name}", None))
                    and (signal := getattr(self.signals, signal_name, None))
                ):
                    signal.connect(method)


some_person = SomePerson()


def register() -> None:
    some_person.register()

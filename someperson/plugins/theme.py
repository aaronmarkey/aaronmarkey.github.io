import json
from pathlib import Path
from typing import ClassVar

from pelican import Pelican

from someperson.plugins.base import Plugin, PluginHandler
from someperson.utils import PACKAGE_DIR


class ThemePluginHandler(PluginHandler):
    def _get_static_hash(self) -> str:
        filename = self.config.theme_json_filename
        path = PACKAGE_DIR.joinpath("theme/static").joinpath(filename)
        hash_ = ""
        try:
            with Path.open(path, "r") as fh:
                data = json.loads(fh.read())
                hash_ = data.get("hash", "")
        except (OSError, json.JSONDecodeError):
            pass
        return hash_

    def sig_initialized(self, app: Pelican) -> bool:
        theme_path = PACKAGE_DIR.joinpath("theme")
        app.settings["AUTHOR"] = self.theme_config.author.name

        # Both THEME and app.theme need to be set for Pelican to autoreload things correctly.
        app.settings["THEME"] = theme_path
        app.theme = theme_path

    def sig_generator_init(self, _) -> bool:
        self.theme_config.theme.hash = self._get_static_hash()


class ThemePlugin(Plugin):
    handler: ClassVar[type[PluginHandler]] = ThemePluginHandler
    theme_json_filename: str = "main.json"

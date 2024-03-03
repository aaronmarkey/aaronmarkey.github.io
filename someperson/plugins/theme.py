import json
from pathlib import Path
from typing import ClassVar

from pelican import Pelican

from someperson.exceptions import SomePersonError
from someperson.plugins.base import Plugin, PluginHandler
from someperson.utils import PACKAGE_DIR


class ThemePluginHandler(PluginHandler):
    def _get_frontend_manifest_path(self) -> Path:
        filename = self.config.theme_json_filename
        return PACKAGE_DIR.joinpath("theme/static").joinpath(filename)

    def _get_static_hash(self) -> str:
        hash_ = ""
        try:
            with Path.open(self._get_frontend_manifest_path(), "r") as fh:
                data = json.loads(fh.read())
                hash_ = data.get("hash", "")
        except (OSError, json.JSONDecodeError):
            pass
        return hash_

    def _set_pelican_stuff(self, app: Pelican) -> None:
        theme_path = PACKAGE_DIR.joinpath("theme")
        app.settings["AUTHOR"] = self.framework_config.author.name

        # Both THEME and app.theme need to be set for Pelican to autoreload things correctly.
        app.settings["THEME"] = theme_path
        app.theme = theme_path

    def signal_initialized(self, app: Pelican) -> None:
        if not self._get_frontend_manifest_path().exists():
            err = "Front end manifest is not available."
            raise SomePersonError(err)

        self._set_pelican_stuff(app)

    def signal_generator_init(self, _) -> None:
        self.framework_config.theme.hash = self._get_static_hash()


class ThemePlugin(Plugin):
    handler: ClassVar[type[PluginHandler]] = ThemePluginHandler
    theme_json_filename: str = "main.json"

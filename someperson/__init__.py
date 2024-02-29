from pelican.plugins.signals import content_written, finalized, generator_init, initialized

from someperson.configuration import (  # noqa: F401
    Author,
    Configuration,
    Link,
    Palette,
    Theme,
    Twitter,
)
from someperson.framework import Framework

framework = Framework(
    supported_signals=(
        initialized,
        content_written,
        generator_init,
        finalized,
    ),
    settings_key="SOME_PERSON",
)


def register() -> None:
    framework.configure()

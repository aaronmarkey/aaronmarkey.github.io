from pathlib import Path
from typing import Any

from blinker import NamedSignal

PACKAGE_DIR = Path(__file__).parent

# Remove this once this typing is available in future version of Pelican
# https://github.com/getpelican/pelican/blob/960aee5907aac2a732ac14b97e026374ad1d07de/pelican/settings.py#L27
Settings = dict[str, Any]


def get_signal_name(signal: NamedSignal) -> str:
    return signal.name.split("_", 1)[1] if signal.name.startswith("pelican") else signal.name

from collections import defaultdict
from dataclasses import dataclass
from io import StringIO
from os import linesep
from urllib.parse import urljoin

RULE_TYPE = tuple[tuple[str, tuple[str]], ...]
"""A tuple of tuples. Each tuple contains a string representing the path to a document, """
"""and a sibling tuple of bot names."""


@dataclass
class Robots:
    siteurl: str
    """The fully qualified domain of the website."""

    allow_paths: RULE_TYPE = ()
    """A rule type for allowed bots."""

    disallow_paths: RULE_TYPE = ()
    """A rule type for disallowed bots."""

    sitemap_path: str = ""
    """The URL path part pointing to the site's sitemap file."""

    @property
    def as_str(self) -> str:
        """
        Get the robots file as a string object.

        Returns
        -------
            The _exact_ file contents needed for the robots file, as a string.

        Raises
        ------
            ValueError: Raised if siteurl is not set on this object.

        """
        if not self.siteurl:
            err = "Robots siteurl not set."
            raise ValueError(err)

        string = StringIO()
        if self.sitemap_path:
            sitemap = urljoin(self.siteurl, self.sitemap_path)
            string.write(f"Sitemap: {sitemap}{linesep}")

        rules = defaultdict(list)
        if self.allow_paths:
            for path, bots in self.allow_paths:
                for bot in bots:
                    rules[bot].append(("Allow", path))
        if self.disallow_paths:
            for path, bots in self.disallow_paths:
                for bot in bots:
                    rules[bot].append(("Disallow", path))
        if rules:
            for bot, rule_sets in rules.items():
                string.write(f"{linesep}User-agent: {bot}{linesep}")
                for rule, path in rule_sets:
                    string.write(f"{rule}: {path}{linesep}")
        if string:
            return string.getvalue()
        return ""

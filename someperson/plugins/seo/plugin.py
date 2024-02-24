from pathlib import Path, PurePath
from typing import ClassVar

from bs4 import BeautifulSoup

from someperson.plugins.base import Plugin, PluginHandler
from someperson.plugins.seo.generators import ArticleSchemaGenerator, SeoSocialTagGenerator
from someperson.plugins.seo.robots import Robots
from someperson.plugins.seo.tag_collection import TagCollection


class SeoPluginHandler(PluginHandler):
    def _write_tags_to_html(self, soup: BeautifulSoup, tags: TagCollection) -> None:
        for tag in tags.tags:
            soup.head.append(tag.as_bs_tag(soup.builder))

    def _add_meta_tags(self, path: str, context: dict) -> None:
        with Path.open(path, "r+") as html_file:
            social_generator = SeoSocialTagGenerator()
            schema_generator = ArticleSchemaGenerator()
            html_content = html_file.read()
            soup = BeautifulSoup(html_content, features="html.parser")
            tags = TagCollection()

            author = self.get_pelican_setting("AUTHOR")
            sitedescription = self.theme_config.description
            sitename = self.get_pelican_setting("SITENAME")
            siteurl = self.get_pelican_setting("SITEURL")
            locales = self.get_pelican_setting("LOCALE") or []
            twitter_handle = self.theme_config.author.twitter.username

            if content := context.get("article") or context.get("page"):
                tags = social_generator.for_pelican_content(
                    content,
                    author=author,
                    sitename=sitename,
                    siteurl=siteurl,
                    locales=locales,
                    twitter_handle=twitter_handle,
                ) + schema_generator.for_pelican_content(
                    content, image="", siteurl=siteurl, org_name=sitename, org_logo=""
                )
            else:
                tags = social_generator.for_html(
                    soup,
                    author=author,
                    sitename=sitename,
                    siteurl=siteurl,
                    sitedescription=sitedescription,
                    url=context.get("output_file", ""),
                    locales=locales,
                    twitter_handle=twitter_handle,
                ) + schema_generator.for_html(
                    soup,
                    author=author,
                    siteurl=siteurl,
                    url=context.get("output_file", ""),
                    sitedescription=sitedescription,
                    org_name=sitename,
                    org_logo="",
                )

            if tags:
                self._write_tags_to_html(soup, tags)
                html_file.seek(0)
                html_file.write(str(soup))
                html_file.truncate()

    def _write_robots(self) -> None:
        siteurl = self.get_pelican_setting("SITEURL")
        robots_path = "robots.txt"
        sitemap_path = self.config.sitemap_path
        allow = self.config.robots_allow
        disallow = self.config.robots_disallow
        output_path = self.get_pelican_setting("OUTPUT_PATH")

        robots = Robots(siteurl=siteurl, sitemap_path=sitemap_path, allow_paths=allow, disallow_paths=disallow)

        with Path.open(PurePath(output_path).joinpath(robots_path), "w+") as fh:
            fh.write(robots.as_str)

    def sig_content_written(self, path: str, context: dict) -> bool:
        if self.config.enable_metatags:
            self._add_meta_tags(path, context)
        if self.config.enabled_robots:
            self._write_robots()
        return True


class SeoPlugin(Plugin):
    handler: ClassVar[type[PluginHandler]] = SeoPluginHandler
    enable_metatags: bool = True
    enabled_robots: bool = True
    robots_allow: tuple[tuple[str, str], ...] = (("/", "*"),)
    robots_disallow: tuple[tuple[str, str], ...] = ()
    sitemap_path: str = "sitemap.xml"

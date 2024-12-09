import json
import os
from datetime import datetime
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from pelican.contents import Article, Content, Page

from someperson.plugins.common import format_date_for_publish, strip_tags
from someperson.plugins.seo.tag_collection import Tag, TagCollection


def get_content_description(content: Content) -> str:
    if summary := content.metadata.get("summary", None):
        return summary

    description = strip_tags(content.summary)
    return description.replace(os.linesep, " ")


class SeoSocialTagGenerator:
    def get_open_graph_tags(
        self,
        *,
        title: str,
        sitename: str,
        siteurl: str,
        url: str,
        locales: list[str],
        type_: type[Content] | None,
        description: str,
    ) -> TagCollection:
        tags = TagCollection()

        # Title
        tags.append(Tag(name="meta", aproperty="og:title", acontent=title))

        # Locale
        if len(locales) > 0:
            tags.append(Tag(name="meta", aproperty="og:locale", acontent=locales[0]))

        # URL
        tags.append(Tag(name="meta", aproperty="og:url", acontent=urljoin(siteurl, url)))

        # Type
        ctype = {Article: "article", Page: "page"}.get(type_) or "website"
        if ctype:
            tags.append(Tag(name="meta", aproperty="og:type", acontent=ctype))

        # Site Name
        tags.append(Tag(name="meta", aproperty="og:site_name", acontent=sitename))

        # Description
        tags.append(Tag(name="meta", aproperty="og:description", acontent=description))

        return tags

    def get_twitter_tags(self, *, title: str, twitter_handle: str) -> TagCollection:
        tags = TagCollection()

        if handle := twitter_handle:
            # Card
            tags.append(Tag(name="meta", aname="twitter:card", acontent="summary"))

            # Title
            if title := title.strip():
                tags.append(Tag(name="meta", aproperty="twitter:title", acontent=title))

            # Site and Creator Handles
            handle = handle if handle[0] == "@" else f"@{handle}"
            tags.append(Tag(name="meta", aname="twitter:site", acontent=handle))
            tags.append(Tag(name="meta", aname="twitter:creator", acontent=handle))

        return tags

    def get_generic_tags(
        self, *, author: str, description: str, siteurl: str, url: str, date: datetime | None
    ) -> TagCollection:
        tags = TagCollection()

        # Author
        tags.append(Tag(name="meta", aname="author", acontent=author))

        # Description
        if desc := description.strip():
            tags.append(Tag(name="meta", aname="description", acontent=desc))

        # Canonical URL
        if url := url.strip():
            tags.append(Tag(name="link", arel="canonical", ahref=urljoin(siteurl, url)))

        # Publish Time
        if date:
            tags.append(Tag(name="meta", aproperty="article:published_time", acontent=format_date_for_publish(date)))

        return tags

    def for_pelican_content(
        self, content: Content, *, author: str, sitename: str, siteurl: str, locales: list[str], twitter_handle: str
    ) -> TagCollection:
        url = content.metadata.get("save_as", content.url)
        desc = get_content_description(content)
        date = content.metadata.get("date")
        title = content.title
        type_ = type(content)

        return (
            self.get_open_graph_tags(
                title=title, sitename=sitename, siteurl=siteurl, url=url, locales=locales, type_=type_, description=desc
            )
            + self.get_twitter_tags(title=title, twitter_handle=twitter_handle)
            + self.get_generic_tags(author=author, description=desc, siteurl=siteurl, url=url, date=date)
        )

    def for_html(
        self,
        soup: BeautifulSoup,
        *,
        author: str,
        sitename: str,
        siteurl: str,
        sitedescription: str,
        url: str,
        locales: list[str],
        twitter_handle: str,
    ) -> TagCollection:
        title = ""
        if st := soup.find("title"):
            title = st.string

        return (
            self.get_open_graph_tags(
                title=title,
                sitename=sitename,
                siteurl=siteurl,
                url=url,
                locales=locales,
                type_=None,
                description=sitedescription,
            )
            + self.get_twitter_tags(title=title, twitter_handle=twitter_handle)
            + self.get_generic_tags(author=author, description=sitedescription, siteurl=siteurl, url=url, date=None)
        )


class ArticleSchemaGenerator:
    def _generate(
        self,
        *,
        type_: str,
        author: str,
        title: str,
        description: str,
        image: str,
        date: datetime | None,
        org_name: str,
        org_logo: str,
        siteurl: str,
        url: str,
    ) -> Tag:
        schema = {
            "@context": "https://schema.org",
            "@type": type_,
        }

        # Author
        if author:
            schema["author"] = {"@type": "Person", "name": author}

        # Headline
        if title:
            schema["headline"] = title

        # Description
        if description:
            schema["description"] = description

        # Image
        if image:
            schema["image"] = image

        # Date
        if date:
            schema["datePublished"] = format_date_for_publish(date)

        # Publisher
        if org_name:
            schema["publisher"] = {"@type": "Organization", "name": org_name}

            if org_logo:
                schema["publisher"]["logo"] = {"@type": "ImageObject", "url": org_logo}

        # URL
        if url:
            schema["url"] = urljoin(siteurl, url)

        return Tag(name="script", atype="application/ld+json", vcontent=json.dumps(schema, separators=(",", ":")))

    def for_pelican_content(
        self, content: Content, *, image: str, siteurl: str, org_name: str, org_logo: str
    ) -> TagCollection:
        type_ = {
            Article: "Article",
        }.get(type(content)) or "WebPage"
        author = content.author.name.strip()
        title = content.title.strip()
        description = get_content_description(content)
        image = image.strip()
        date = content.metadata.get("date")
        name = org_name.strip()
        logo = org_logo.strip()
        url = content.metadata.get("save_as", content.url).strip()

        tags = TagCollection()
        tags.append(
            self._generate(
                type_=type_,
                author=author,
                title=title,
                description=description,
                image=image,
                date=date,
                org_name=name,
                org_logo=logo,
                siteurl=siteurl,
                url=url,
            )
        )
        return tags

    def for_html(
        self,
        soup: BeautifulSoup,
        *,
        author: str,
        siteurl: str,
        url: str,
        sitedescription: str,
        org_name: str,
        org_logo: str,
    ) -> TagCollection:
        type_ = "WebPage"
        title = ""
        if st := soup.find("title"):
            title = st.string

        name = org_name.strip()
        logo = org_logo.strip()

        tags = TagCollection()
        tags.append(
            self._generate(
                type_=type_,
                author=author,
                title=title,
                description=sitedescription,
                image="",
                date=None,
                org_name=name,
                org_logo=logo,
                siteurl=siteurl,
                url=url,
            )
        )
        return tags

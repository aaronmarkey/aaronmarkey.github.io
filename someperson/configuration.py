from functools import cached_property

from pydantic import BaseModel

from someperson.plugins.base import Plugin


class StaticManifest(BaseModel):
    hash: str
    youtube_use_list: bool


class SocialAccount(BaseModel):
    username: str
    link_format: str

    @property
    def link(self) -> str:
        return self.link_format.format(username=self.username)


class Link(BaseModel):
    title: str
    href: str


class Author(BaseModel):
    first_names: list[str]
    last_names: list[str]
    socials: list[SocialAccount]

    @property
    def names(self) -> dict[str, list[str]]:
        return {"first": self.first_names, "last": self.last_names}


class Palette(BaseModel):
    id: str
    icon: str
    name: str
    emojis: list[str] = []

    @property
    def serialized(self) -> dict[str, str]:
        return self.model_dump()


class Theme(BaseModel):
    palettes: list[Palette]
    default_palette_id: str
    hash: str = ""

    @cached_property
    def default_palette(self) -> Palette:
        palettes = {p.id: p for p in self.palettes}
        if default := palettes.get(self.default_palette_id):
            return default
        err = f"No palette for default ID '{self.default_palette_id}'."
        raise ValueError(err)


class Configuration(BaseModel):
    author: Author
    description: str
    theme: Theme
    menu: list[Link] = []
    plugins: list[Plugin]

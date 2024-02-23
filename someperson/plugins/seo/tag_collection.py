from dataclasses import asdict, dataclass

from bs4 import NavigableString
from bs4 import Tag as BTag
from bs4.builder import TreeBuilder


@dataclass
class Tag:
    name: str
    aname: str | None = None
    acontent: str | None = None
    ahref: str | None = None
    aproperty: str | None = None
    arel: str | None = None
    atype: str | None = None
    vcontent: str | None = None

    @property
    def name_and_properties(self) -> tuple[str, dict[str, str]]:
        properties = {key[1:]: value for key, value in asdict(self).items() if value is not None and key[0] == "a"}
        return self.name, properties

    def as_bs_tag(self, builder: TreeBuilder) -> BTag:
        name, properties = self.name_and_properties
        tag = BTag(builder=builder, name=name, attrs=properties)
        if self.vcontent:
            tag.insert(0, NavigableString(self.vcontent))
        return tag


class TagCollection:

    def __init__(self) -> None:
        self.tags: list[Tag] = []

    def __bool__(self) -> bool:
        return len(self.tags) > 0

    def __add__(self, other: "TagCollection") -> "TagCollection":
        if not isinstance(other, self.__class__):
            err = "TagCollection can only be added to other TagCollection objects."
            raise TypeError(err)
        nc = self.__class__()
        nc.tags = self.tags + other.tags
        return nc

    def append(self, tag: Tag) -> None:
        self.tags.append(tag)

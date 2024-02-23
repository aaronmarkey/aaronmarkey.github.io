from datetime import UTC, datetime
from html.parser import HTMLParser
from io import StringIO


class HtmlStripper(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.text = StringIO()

    def handle_data(self, data):
        self.text.write(data)

    def get_data(self) -> str:
        return self.text.getvalue()


def strip_tags(html: str) -> str:
    s = HtmlStripper()
    s.feed(html)
    return s.get_data()


def format_date_for_publish(date: datetime):
    date = date.replace(microsecond=0)
    if date.tzinfo is None:
        date = date.replace(tzinfo=UTC)
    return date.isoformat()

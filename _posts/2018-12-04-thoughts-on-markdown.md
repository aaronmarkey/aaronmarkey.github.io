---
layout: post
title: Some Thoughts on Markdown
date: 2018-12-04T01:28:34

---

[John Gruber](https://daringfireball.net)'s [Markdown](https://daringfireball.net/projects/markdown/)
text markup is one of those invisible parts of the web most of us don't think
about. It powers some of the most well known web services like
[GitHub](https://github.com), [Trello](https://trello.com), and
[Bear](https://bear.app); it's something I've spent five years obsessing over.

I have many opinions on it stemming from my job as a software developer and
the many side projects (web services, word processors, iOS apps..) I've built
around it.

## A Short History

Markdown was created in 2004 by John Gruber of Daring Fireball. While starting
his career as a technology critic, John wrote a small Perl script to make HTML
content easier to read and write. Essentially what Markdown allowed
him to do was add simple markup to a text document that could be easily
converted into HTML for a webpage.

Examples:

* `*Italics*` -> `<em>Italics</em>`
* `**Bold**` -> `<strong>Bold</strong>`
* `[DuckDuckGo](https://duckduckgo.com)` ->
`<a href="https://duckduckgo.com">DuckDuckGo</a>`

## The Good Parts of Markdown

Since its conception, Markdown has taken the writing and software programming
worlds by storm. There are libraries available for it in every programming
language. Plugins for every major publishing platform (WordPress, Ghost, etc.),
and has become the defacto standard for writing software documentation.

On a technical level, Markdown is very fast at parsing and rendering HTML, easy
to implement, and is conceptually easy to extend.

Many people have since altered, forked, and augmented Markdown. There are
many [flavors](https://github.com/commonmark/commonmark/wiki/markdown-flavors)
of Markdown, each one has it's own additions and special sauce.

Which lead me to the bad parts of Markdown...

## The Bad Parts of Markdown

First and foremost, the Markdown ecosystem is a wild west of differing
standards and markup syntax. Meaning nearly every service that uses Markdown
forces its users to learn its special nuances. (This sounds small, but try using
GitHub with Jira everyday). This problem isn't terrible in most cases. Every
flavor of Markdown I've come across supports the basic Markdown syntax, but most
extend it past John's initial design.

Some flavors support video links, some defining image sizes, some text underline
and strikethrough. Which sounds great!

Until it's not and you *need* to rely on consistency. Say you're using Trello's
Markdown and copy your text to a service that doesn't use Trello Markdown? Well
you may be out of luck.

Try it, paste some [Trello Markdown](https://help.trello.com/article/821-using-markdown-in-trello)
into a [Vanilla Markdown](https://daringfireball.net/projects/markdown/dingus)
converter:

Some Trello Markdown: `~~crossed out~~`

The many flavors presents an issue for developers as well. Many of these
forks don't have much coverage in third-party language libraries. Want to parse
or render Trello Markdown in Closure? Good Luck.

## But..

Markdown is an imperfect perfection. I will always think of it fondly and John
has single-handedly reshaped how information is created and shared on the
internet. So I guess it can get a pass.

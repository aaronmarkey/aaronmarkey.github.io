---
layout: post
title: JavaScript, From an Idiot's Perspective
date: 2018-12-10T13:53:27
---

I've made no attempt at hiding my [absolute][1] [distain][2] for JavaScript
throughout my career. It has many infuriating [idiosyncratic gotchas'][3]
(`NaN === NaN is false`?) it forces its users to learn, and nothing in the
language is concrete (class v. prototype function, optional semicolons, etc.).
JavaScript draws out the worse in developers by allowing them to make
functional, pretty looking interfaces with relatively little effort or thought.

Not only this, but JS has some of the most widely recognized (and hated)
libraries in the programming world. These libraries, though they are widely
criticized both within the JS community and out, are used everywhere in the web.
Every company I've ever worked for, every major UI framework, and even massive
corporations like Google use these libraries.

Specifically, the JS world has been plagued by jQuery for the better part of
12 years. I'd wager jQuery is responsible for more unmaintainable code bases
and software bugs than any other source. Ever. But the reasons for using jQuery
are obvious. When jQuery came to consume the web, doing basic DOM manipulation
with JavaScript was a nightmare. JavaScript was an immature dynamic page
manipulator at best. So jQuery came along and everybody latched on it. And now
every web developer from 2006 to 2106 will have to deal with maintaining and
writing it.

But I digress, JavaScript is the focus here. So what else do I hate about JS?
How about that every time a dev needs to write a decently complex bit of code
they have to [check][6] to see which browsers support their code? Or how about that JS
only "kind of" supports major programming paradigms like try/except, functional
programing, or class inheritance. JS is a language forever stuck in a loop of
catchup with every other good idea that's out there.

But what is it that *really* sucks about JS? It's toolchain. The numerous and
ever-growing list of terrible design decisions made by ECMA-402, Mozilla, and
Google has built an entire language, ecosystem, and industry for building and
understanding the JS toolchain. From transpiling to frameworks, the JS toolchain
is vast and convoluted. Honestly, understanding the ins and outs of the C
compiler is easier than jumping into the JS toolchain world.

Want to build a dynamic site that works in 2018? Better learn how to use one of
50 frameworks, Webpack, Babel, and ES6. Best learn what transpiling is
and what the differences between Webpack, Gulp, and Babel are. Need to use an
external library? Well choose between one of ~3 package managers. What are the
differences? Who knows just go with NPM because...? What's Node.js? Why does it
power everything? What's jQuery? It powers the whole web... but it's bad?

On top of that, in order to use any of that stuff, you should probably spend
~80 hours learning the basics of Webpack, NPM, Yarn, and ESLinter config files.
All of this is *just to get started* with web development in 2018.

Again this is all from the perspective of an idiot.

I've been working with ES6, Vue, Webpack, Bootstrap, Babel, Electron, NPM, Node,
and about 20 other JS related things since beginning work on mechanicalog
again earlier this year. All of this to force myself to learn
to work in an ecosystem that every fiber of my professional being hates.

And I have to say, JavaScript itself it a relatively nice language to work in.
But I'll continue to let `vue-cli` manage the toolchain disaster and rant
endlessly about JavaScript.

---

Some other things to think about.

Go ahead and open basically any webpage and look at the number of JS files
loaded into your browser. Here's [Polygon][5]
(297 JavaScript files for one page.):
![Polygon is a shitshow.][4]

Terrible scoping:
```
function lookAtMeMichael(name) {
    if(name === 'Jackie') {
        var h = 'Hello'
        console.log(h + ' ' + name)
    }
    return h  // h is still visible? Why?
}
```

[TypeScript][7] exists solely to get past the insane shitstorm that is JS
typing. 'strings' are `string's but not Strings. What? Why?



[1]: https://twitter.com/mechanicamarkey/status/1034188202821787649
[2]: https://twitter.com/mechanicamarkey/status/866716811856928768
[3]: https://johnkpaul.com/empirejs "John K. Paul's 'JavaScript The Real Bad Parts'"
[4]: https://s3.us-east-2.amazonaws.com/media.mechanicalog.com/stories/20181210-polygon.png
[5]: https://polygon.com "Long at the length of that console scrollbar..."
[6]: https://caniuse.com/
[7]: https://www.typescriptlang.org/

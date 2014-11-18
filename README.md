# d3-panel

> Plot data right in Chrome DevTools panel

[![Build status][d3-panel-ci-image] ][d3-panel-ci-url]
[![dependencies][d3-panel-dependencies-image] ][d3-panel-dependencies-url]
[![devdependencies][d3-panel-devdependencies-image] ][d3-panel-devdependencies-url]

This is a Chrome extension that creates new DevTools panel "d3-panel" with [d3][d3]
library (and a few utility wrappers for convenience). You can then send data to be plotted
and explored from the browser console. For example, if you are debugging a page and have a sequence
of numbers in a variable, you can plot a bar chart.

![d3-panel][d3 panel screenshot]

You can send data to the d3-panel using `window.postMessage(data, '*');` command or by running
a code snippet [d3-panel-api][d3-panel code snippet]. Read how to use code snippets [here][code snippets].

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/d3-panel/issues) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[d3-panel-ci-image]: https://travis-ci.org/bahmutov/d3-panel.png?branch=master
[d3-panel-ci-url]: https://travis-ci.org/bahmutov/d3-panel
[d3-panel-dependencies-image]: https://david-dm.org/bahmutov/d3-panel.png
[d3-panel-dependencies-url]: https://david-dm.org/bahmutov/d3-panel
[d3-panel-devdependencies-image]: https://david-dm.org/bahmutov/d3-panel/dev-status.png
[d3-panel-devdependencies-url]: https://david-dm.org/bahmutov/d3-panel#info=devDependencies
[d3]: http://d3js.org/
[d3 panel screenshot]: d3-panel.png
[d3-panel code snippet]: d3-panel-api-code-snippet.js
[code snippets]: http://bahmutov.calepin.co/chrome-devtools-code-snippets.html

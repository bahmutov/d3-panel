/*
  Top level browser console API for sending data to d3-panel
  Should be run as a code snippet

  How to use Chrome DevTools code snippets:
    http://bahmutov.calepin.co/chrome-devtools-code-snippets.html
  See examples of code snippets:
    https://github.com/bahmutov/code-snippets

  author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
*/
(function initD3PanelAPI(root) {

  var api = {
    clear: function () {
      root.postMessage('clear', '*');
    },
    text: function (msg) {
      root.postMessage(String(msg), '*');
    },
    bar: function () {
      if (arguments.length === 1 && Array.isArray(arguments[0])) {
        root.postMessage(arguments[0], '*');
      } else {
        root.postMessage(Array.prototype.slice.call(arguments, 0), '*');
      }
    }
  }

  root.d3panel = api;
}(window));

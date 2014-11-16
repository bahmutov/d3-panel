var port = chrome.runtime.connect({
  name: 'color-pusher-content'
});

port.onMessage.addListener(function (message) {
  applyCss(message);
});

function applyCss(selectorCss) {
  Object.keys(selectorCss).forEach(function (selector) {
    var css = selectorCss[selector];
    $(selector).css(css);
  });
}


var port = chrome.runtime.connect({
  name: 'd3-panel-content'
});

port.onMessage.addListener(function (message) {
  console.log('message from d3-panel to content', message);
});

window.addEventListener('message', function(event) {
  if (event.source != window) {
    return;
  }

  console.log('Message from window to d3-panel', event.data);
  port.postMessage(event.data);
}, false);

document.d3Panel = function d3Panel() {
  console.log('d3Panel called');
};

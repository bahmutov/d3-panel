var port = chrome.runtime.connect({
  name: 'd3-panel-content'
});

port.onMessage.addListener(function (message) {
  console.log('message from d3-panel to content', message);
});
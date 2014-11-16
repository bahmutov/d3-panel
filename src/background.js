var d3PanelContentPort;

chrome.extension.onConnect.addListener(function (port) {
  console.log('connection', port);

  if (port.name != 'd3-panel' &&
    port.name != 'd3-panel-content') {
    return;
  }

  if (port.name === 'd3-panel-content') {
    d3PanelContentPort = port;
  } else {
    port.onMessage.addListener(function (message) {
      console.log('got message from panel', message);
      if (d3PanelContentPort) {
        d3PanelContentPort.postMessage(message);
      }
    });
  }
});

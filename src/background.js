// page port communicates to the script injected into the page
// panel port communicates with the devtools d3-panel
var pagePort, panelPort;

chrome.extension.onConnect.addListener(function (port) {
  console.log('background.js connection on port', port.name);
  var buffer = [];

  if (port.name != 'd3-panel' &&
    port.name != 'd3-panel-content') {
    return;
  }
  if (pagePort && panelPort) {
    return;
  }

  if (port.name === 'd3-panel-content' && !pagePort) {
    pagePort = port;
    pagePort.onMessage.addListener(function (message) {
      console.log('message from page to d3-panel background', message);
      if (panelPort) {
        panelPort.postMessage(message);
      } else {
        buffer.push(message);
      }
    });
  }

  if (port.name === 'd3-panel' && !panelPort) {
    panelPort = port;

    if (buffer.length) {
      buffer.forEach(panelPort.postMessage);
      buffer = [];
    }

    panelPort.onMessage.addListener(function (message) {
      console.log('got message from d3-panel to background', message);
      if (pagePort) {
        pagePort.postMessage(message);
      }
    });
  }

});

/*
var lastTabId = -1;
function sendMessage(msg) {
  var currentTab = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(currentTab, function (tabs) {
    lastTabId = tabs[0].id;
    console.log('sending msg to', tabs[0]);
    chrome.tabs.sendMessage(lastTabId, msg);
  });
}
*/

var colorPusherContentPort;

chrome.extension.onConnect.addListener(function (port) {
  console.log('connection', port);

  if (port.name != 'color-pusher' &&
    port.name != 'color-pusher-content') {
    return;
  }

  if (port.name === 'color-pusher-content') {
    colorPusherContentPort = port;
  } else {
    port.onMessage.addListener(function (message) {
      console.log('got message from panel', message);
      if (colorPusherContentPort) {
        colorPusherContentPort.postMessage(message);
      }
    });
  }
});

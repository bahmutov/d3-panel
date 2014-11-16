function d3Panel(panel) {
  var _window;

  var port = chrome.runtime.connect({
    name: 'd3-panel'
  });

  port.onMessage.addListener(function (message) {
    console.log('devtools got message from background page', message);
  });

  panel.onShown.addListener(function once(panelWindow) {
    panel.onShown.removeListener(once);
    _window = panelWindow;

    _window.respond = function (name, data) {
      console.log('got message from panel', name, data);
      /*
      if (name === 'apply-colors') {
        port.postMessage(data);
      }*/
    };
  });
}
chrome.devtools.panels.create('d3-panel', 'icons/panel-icon.png',
  'panel/index.html', d3Panel);

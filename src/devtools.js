chrome.devtools.panels.create('color-pusher', 'icons/panel-icon.png',
  'panel/index.html', colorPusherPanel);

function colorPusherPanel(panel) {
    var _window;

    var port = chrome.runtime.connect({
      name: 'color-pusher'
    });

    port.onMessage.addListener(function (message) {
      console.log('devtools got message from background page', message);
    });

    panel.onShown.addListener(function once(panelWindow) {
      panel.onShown.removeListener(once);
      _window = panelWindow;

      _window.respond = function (name, data) {
        console.log('got message from panel', name, data);
        if (name === 'apply-colors') {
          port.postMessage(data);
        }
      };
    });
  }

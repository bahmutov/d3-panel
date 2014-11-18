function d3Panel(panel) {
  var _window, document, d3, d3panel;

  function appendText(txt) {
    if (!d3panel) {
      return;
    }

    var p = d3panel.append('p');
    p.html(txt);
  }

  function appendBarChart(numbers) {
    d3panel.append('div').attr('class', 'chart')
      .selectAll('div')
        .data(numbers)
      .enter().append('div')
        .style('width', function(d) { return d * 10 + 'px'; })
        .text(function(d) { return d; });
  }

  function isNumber(x) {
    return typeof x === 'number';
  }

  function isArrayOfNumbers(n) {
    return Array.isArray(n) &&
      n.every(isNumber);
  }

  function clear() {
    d3panel.html('');
  }

  var port = chrome.runtime.connect({
    name: 'd3-panel'
  });

  port.onMessage.addListener(function (message) {
    console.log('devtools got message from background page', message);
    if (typeof message === 'string') {
      if (message === 'clear') {
        clear();
      } else {
        appendText(message);
      }
    } else if (isArrayOfNumbers(message)) {
      appendBarChart(message);
    }
  });

  // TODO: buffer messages received before the window is shown
  panel.onShown.addListener(function once(panelWindow) {
    panel.onShown.removeListener(once);
    _window = panelWindow;
    document = panelWindow.document;
    d3 = panelWindow.d3;
    d3panel = d3.select(document.body).select('#d3Panel');
    // TODO: assert window and document

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

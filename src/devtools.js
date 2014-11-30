function d3Panel(panel) {
  var d3, d3panel;

  // append text to the panel
  function appendText(txt) {
    if (!d3panel) {
      return;
    }
    var p = d3panel.append('p');
    p.html(txt);
  }

  function values(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }

  // bar chart code taken from
  // http://bost.ocks.org/mike/bar/
  function appendBarChart(numbers) {
    d3panel.append('div').attr('class', 'chart')
      .selectAll('div')
        .data(numbers)
      .enter().append('div')
        .style('width', function(d) { return d * 10 + 'px'; })
        .text(function(d) { return d; });
  }

  function appendObjectBarChart(obj) {
    var keys = Object.keys(obj);
    var numbers = values(obj);
    d3panel.append('div').attr('class', 'chart')
      .selectAll('div')
        .data(numbers)
      .enter().append('div')
        .style('width', function(d) { return d * 10 + 'px'; })
        .text(function(d, k) { return keys[k] + ': ' + d; });
  }

  function isNumber(x) {
    return typeof x === 'number';
  }

  function isArrayOfNumbers(n) {
    return Array.isArray(n) &&
      n.every(isNumber);
  }

  function isObjectOfNumbers(o) {
    return isArrayOfNumbers(values(o));
  }

  // remove everything from the d3 panel
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
    } else if (isObjectOfNumbers(message)) {
      appendObjectBarChart(message);
    }
  });

  // TODO: buffer messages received before the window is shown
  panel.onShown.addListener(function once(panelWindow) {
    panel.onShown.removeListener(once);
    d3 = panelWindow.d3;
    d3panel = d3
      .select(panelWindow.document.body)
      .select('#d3Panel');
    // TODO: assert window and document
  });
}
chrome.devtools.panels.create('d3-panel', 'icons/panel-icon.png',
  'panel/index.html', d3Panel);

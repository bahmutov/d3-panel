module.exports = {
  destination_dir: 'dist',

  app_files: {
    js: ['src/background.js',
      'src/devtools.js',
      'src/content-script/d3-panel-injected-into-page.js',
      'src/panel/d3-panel.js'
    ],
    html: [ 'src/devtools.html', 'src/panel/index.html' ]
  },

  vendor_files: {
    js: [
    ],
    css: [
    ],
    assets: [
    ],
    map: [
    ]
  }
};

module.exports = {
  destination_dir: 'dist',

  app_files: {
    js: ['src/background.js',
      'src/devtools.js',
      'src/content-script/color-pusher-injected-into-page.js',
      'src/panel/color-pusher-panel.js'
    ],
    html: [ 'src/devtools.html', 'src/panel/index.html' ],
    css: 'src/panel/color-pusher-panel.css'
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

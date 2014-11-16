#!/bin/sh

rm color-pusher-chrome-packed-extension.zip

mkdir color-pusher-chrome-packed-extension

cp -r background.js content-script \
      devtools.html devtools.js icons \
      manifest.json panel \
      color-pusher-chrome-packed-extension

zip -r color-pusher-chrome-packed-extension.zip color-pusher-chrome-packed-extension

#rm -r packed-extension

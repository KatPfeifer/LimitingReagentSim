importScripts("/educational-phaser-game-template/devprecache-manifest.5ada922517218680fb1a8c2ca84a37b7.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/**
 * You should only modify this, if you know what you are doing.
 * This phaser template is using workbox (https://developers.google.com/web/tools/workbox/)
 * to precache all assets.
 * It uses the InjectManifest function from 'workbox-webpack-plugin' inside
 * webpack/webpack.common.js
 */
workbox.precaching.precacheAndRoute(__precacheManifest)


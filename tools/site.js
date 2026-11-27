'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
const siteFiles = ['index.html', 'styles.css', 'script.js', 'wedding.js', '.nojekyll'];
const audioTypes = {
  '.aac': 'audio/aac', '.flac': 'audio/flac', '.m4a': 'audio/mp4', '.mp3': 'audio/mpeg',
  '.oga': 'audio/ogg', '.ogg': 'audio/ogg', '.opus': 'audio/ogg', '.wav': 'audio/wav',
};
const contentTypes = Object.assign({
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt',
}, audioTypes);

function playlistScript() {
  const tracks = fs.readdirSync(assets)
    .filter((name) => audioTypes[path.extname(name).toLowerCase()] && fs.lstatSync(path.join(assets, name)).isFile())
    .sort((first, second) => first.localeCompare(second, 'en', { numeric: true, sensitivity: 'base' }) || first.localeCompare(second, 'en'))
    .map((name) => 'assets/' + encodeURIComponent(name));
  return 'window.weddingPlaylist = ' + JSON.stringify(tracks) + ';\n';
}

function buildSite(output) {
  fs.mkdirSync(output, { recursive: true });
  for (const file of siteFiles) fs.copyFileSync(path.join(root, file), path.join(output, file));
  fs.cpSync(assets, path.join(output, 'assets'), {
    recursive: true,
    filter: (source) => !fs.lstatSync(source).isSymbolicLink(),
  });
  fs.writeFileSync(path.join(output, 'playlist.js'), playlistScript());
  console.log('Built site at ' + output);
}

function previewSite(port) {
  http.createServer((request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(url.parse(request.url).pathname);
    } catch (error) {
      response.statusCode = 400;
      response.end();
      return;
    }

    // The same preview works from the root and from a GitHub Pages-style project path.
    const relative = pathname.replace(/^\/pre-wedding(?=\/|$)/, '').replace(/^\//, '') || 'index.html';
    response.setHeader('Cache-Control', 'no-store');
    if (relative === 'playlist.js') {
      response.setHeader('Content-Type', contentTypes['.js']);
      response.end(playlistScript());
      return;
    }

    const file = path.resolve(root, relative);
    if (!siteFiles.includes(relative) && !file.startsWith(assets + path.sep)) {
      response.statusCode = 404;
      response.end();
      return;
    }

    fs.stat(file, (error, info) => {
      if (error || !info.isFile()) {
        response.statusCode = 404;
        response.end();
        return;
      }
      response.writeHead(200, {
        'Content-Type': contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': info.size,
      });
      if (request.method === 'HEAD') response.end();
      else fs.createReadStream(file).on('error', () => response.destroy()).pipe(response);
    });
  }).listen(port, '127.0.0.1', () => {
    console.log('Preview at http://127.0.0.1:' + port + '/pre-wedding/');
  });
}

if (process.argv[2] === 'build') {
  buildSite(path.resolve(process.argv[3] || path.join(root, 'dist')));
} else {
  previewSite(Number(process.argv[3]) || 8767);
}

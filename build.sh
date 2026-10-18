#!/bin/sh
# Builds the demo site from the sibling repository ../ingetrazo-web into
# ./ingetrazo and ./ext (GitHub Pages serves this repository's root).
set -e
here=$(cd "$(dirname "$0")" && pwd)
cd "$here/../ingetrazo-web" && npm run build && npm run build:example-ext
cd "$here"
rm -rf ingetrazo boulder ext source
cp -R ../ingetrazo-web/dist ingetrazo
mkdir -p ext
cp ../ingetrazo-web/examples/extension-stairs/dist/stairs.js ext/
cp ../ingetrazo-web/docs/screenshots/en.png img-ingetrazo.png
mkdir -p source
git -C ../ingetrazo-web archive --format=zip -o "$here/source/ingetrazo-web.zip" HEAD
cp ../ingetrazo-web/public/favicon.svg favicon.svg
touch .nojekyll
echo "built: $(git -C ../ingetrazo-web rev-parse --short HEAD)"

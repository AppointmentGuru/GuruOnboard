#!/bin/bash -ex
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

cat docs/static/js/manifest.*.js docs/static/js/vendor.*.js docs/static/js/app.*.js > docs/js.${1:-$branch}.js
cat docs/static/css/app.*.css > docs/css.${1:-$branch}.css

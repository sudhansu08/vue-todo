#!/usr/bin/env sh

# abort on errors
set -e

# build
npx nuxi build

# navigate into the build output directory
cd .output/public

git init
git checkout -b master_nuxt
git add -A
git commit -m 'deploy'

git push -f git@github.com:sudhansu08/vue-todo.git master_nuxt:gh-pages

cd -
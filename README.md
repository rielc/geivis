# geivis

a webbased visualization of schoolbooks for the Georg-Eckert-Institut

## prerequisites

__jspm__
- `npm install jspm -g`
- `npm install jspm-server -g`

__node version__
- `nvm use v6.9.1`


## setup

- `cd microsite`
- `jspm install`
- `jspm-server`

## deploy

- `cd microsite`
- `jspm bundle-sfx index` for build.js standalone
- upload content of microsite to server
-- without jspm_packages, node_modules, sass, config.js/rb, index.js, package.json, index.html
-- rename deploy.html to index.html

## hotreloading

put `export let __hotReload = true` in the js to enable hot reloading


## update data

```
cd scripts
npm i
node crawler.js
node masseur.js
```

this will generate a new ../data/data.csv which you have to copy into microsite/data

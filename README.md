# geivis

a webbased visualization of schoolbooks for the Georg-Eckert-Institut

## setup

- `cd microsite`
- `npm install jspm -g`
- `npm install jspm-server -g`
- `jspm init`
- `jspm-server`

## build

`jspm bundle-sfx index` for build.js standalone

## hotreloading

put `export let __hotReload = true` in the js to enable hot reloading

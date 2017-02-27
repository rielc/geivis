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

## build

`jspm bundle-sfx index` for build.js standalone

## hotreloading

put `export let __hotReload = true` in the js to enable hot reloading

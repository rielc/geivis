# geivis

a webbased visualization of schoolbooks for the Georg-Eckert-Institut

## setup

- `npm install jspm -g`
- `npm install jspm-server -g`
- `cd vis`
- `jspm init`
- `cd ..`
- `jspm-server`

## build

`jspm bundle index --inject `

## hotreloading

put `export let __hotReload = true` in the js to enable hot reloading

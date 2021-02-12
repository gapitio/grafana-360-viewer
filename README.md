# Bundler

Bundler to make developing code easier and scalable.

## Table of contents

- [Bundler](#bundler)
  - [Table of contents](#table-of-contents)
  - [Contains](#contains)
  - [Usage](#usage)
  - [Dev site](#dev-site)

## Contains

- [Svelte](https://svelte.dev/)
- [Sass](https://sass-lang.com/)
- [rollup.js](https://rollupjs.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [SVGO](https://github.com/svg/svgo)
- Local development server to run the code live in the browser.

## Usage

First you have to install the required dependencies

```bash
npm install
```

Then you start the development script

```bash
npm run dev
```

Go to <http://localhost:5000>. Change some code in `App.svelte` and the website will update.

When the code is ready to be uploaded to Grafana, start the build script

```bash
npm run build
```

Then go to `/dist` and copy the content of `panel-options.json` to the panels `Import/export` option.

## Dev site

`src/dev-site` is a folder where most of the configuration for the dev website is.

To add custom series go to `src/dev-site/data.ts` and add createSeries() in series.

Window has been used to get global variables like data, customProperties, ETC.

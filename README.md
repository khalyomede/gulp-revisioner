# gulp-revisioner

Creates a query string based cache busting manifest to invalidate the cache of files on the browser.

[![Build Status](https://travis-ci.com/khalyomede/gulp-revisioner.svg?branch=main)](https://travis-ci.com/khalyomede/gulp-revisioner) [![Maintainability](https://api.codeclimate.com/v1/badges/25062de656526aeac91c/maintainability)](https://codeclimate.com/github/khalyomede/gulp-revisioner/maintainability) [![TODOs](https://img.shields.io/endpoint?url=https://api.tickgit.com/badge?repo=github.com/khalyomede/gulp-revisioner)](https://www.tickgit.com/browse?repo=github.com/khalyomede/gulp-revisioner)

## Summary

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)

## About

I created this plugin because the other plugin I tried would not allow me to customize the path of the revisioned files like [laravel-mix](https://github.com/jeffreyway/laravel-mix) does. In fact, the behavior of this library has been inspired by laravel-mix, so if you were used to this library, you should feel at home using gulp-revisioner.

_This library does not provide a way to actually fetch the revisioned path from the manifest, it only focus on writing the manifest._

## Features

- Creates a JSON manifest file with a query string appended to the path of your assets to cache bust (à la Laravel Mix)
- Can override or keep the manifest file to your need
- Can customize both the path to write the manifest and the manifest file
- Does not alter the file name, so you can still browse on the original file name by browsing with the original path
- 0 dependencies

## Installation

In your root folder, install the plugin:

```bash
npm install --save-dev gulp-revisioner
```

```bash
yarn add --dev gulp-revisionner
```

## Examples

- [1. Write a manifest file](#1-write-a-manifest-file)
- [2. Customize the base path](#2-customize-the-base-path)
- [3. Customize the name and the folder to write the manifest file](#3-customize-the-name-and-the-folder-to-write-the-manifest-file)
- [4. Always override the manifest file with the new content](4-always-override-the-manifest-file-with-the-new-content)
- [5. Customize the indent size of the written asset file](#5-customize-the-indent-size-of-the-written-asset-file)

### 1. Write a manifest file

In this example, we will write a manifest in the root folder, for every of us sass files. This implies you have the following folder structure:

```
.
├── assets/
│   └── sass/
│       ├── main.sass
│       ├── analytics.sass
│       └── ...
└── gulpfile.js
```

```js
// gulpfile.js
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const revisioner = require("gulp-revisioner");

const build = () =>
  src("assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(revisioner())
    .pipe(dest("public/css"));

module.exports = { build };
```

This will write a new `manifest.json` file at the root of your folder.

```
.
├── assets/
│   └── sass/
│       ├── main.sass
│       ├── analytics.sass
│       └── ...
├── gulpfile.js
└── manifest.json
```

With the following content (hash are not exact representatives):

```json
{
  "/main.css": "/main.sass?id=935c3dffe0d4cf58c02286e38c4ad5a3",
  "/analytics.css": "/analytics.css?id=ece3f8d68e5129c17013540b7122ab30"
}
```

### 2. Customize the base path

In this example, we will prepend a custom base path to the revisioned paths. This is handy is you know all your files live in a specific folder at the root of your web app (like `/css`).

```js
// gulpfile.js
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const revisioner = require("gulp-revisioner");

const build = () =>
  src("assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      revisioner({
        baseUrl: "css",
      })
    )
    .pipe(dest("public/css"));

module.exports = { build };
```

You can use `css`, `css/` or `/css` interchangeably, this will not change the following content in the manifest file.

```json
{
  "/css/main.css": "/css/main.sass?id=935c3dffe0d4cf58c02286e38c4ad5a3",
  "/css/analytics.css": "/css/analytics.css?id=ece3f8d68e5129c17013540b7122ab30"
}
```

### 3. Customize the name and the folder to write the manifest file

In this example, we will change the base name of the manifest file as well as the directory.

```js
// gulpfile.js
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const revisioner = require("gulp-revisioner");

const build = () =>
  src("assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      revisioner({
        manifestName: "my-manifest.json",
        manifestDirectory: "public",
      })
    )
    .pipe(dest("public/css"));
```

This will write the file at `public/my-manifest.json`.

### 4. Always override the manifest file with the new content

By default, this plugin will add any new revision key-value pais in the manifest file without removing the old ones.

However, if you change the location of a file, and you run again your build, you will notice the old and new revisioned paths will coexist in the manifest file.

In this example, we will make sure the manifest file always contain the latest revisioned paths.

```js
// gulpfile.js
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const revisioner = require("gulp-revisioner");

const build = () =>
  src("assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      revisioner({
        eraseBeforeWriting: true,
      })
    )
    .pipe(dest("public/css"));
```

### 5. Customize the indent size of the written asset file

In this example, we will customize how many spaces to use when writting the asset file (useful if you need to follow your code conventions).

By default, the indent size is set to 2.

```js
// gulpfile.js
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const revisioner = require("gulp-revisioner");

const build = () =>
  src("assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      revisioner({
        indentSize: 4,
      })
    )
    .pipe(dest("public/css"));
```

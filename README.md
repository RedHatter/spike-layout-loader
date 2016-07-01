# Layout Loader
Wraps markdown files in a jade layout.

## How it works
Layout loader works by extending the layout of your choice and injecting the markdown in a `:marked` filter. See below.

```jade
extends ${layout}

block ${block}
  :marked
    ${content}
```

## Installation
Load it in `app.js` like so:

```javascript
module.exports = {
  posthtml: (ctx) => {
    return {
      defaults: [
        jade({ filename: ctx.resourcePath })
      ]
    }
  },
  matchers: {
    html: '**/*.(md|jade)',
  },
  module: {
    preLoaders: [
      { test: /\.md$/, loader: 'layout-loader', layout: 'my-layout' }
    ]
  },
}
```

## Configuration
Layout loader has two configuration options.

1. The layout to extend. Defaults to *markdown*.
2. The block to override. Defaults to *content*.

Options can ether be a string or a function returning a string (called with the file path). Layout loader will check the following locations for configuration:

1. A property call `options` on the loader object.
2. The loader object its self.

### Examples
The following are valid configurations.

```javascript
preLoaders: [
  { test: /\.md$/, loader: 'layout-loader', layout: 'my-layout' }
]
```

```javascript
preLoaders: [
  { test: /\.md$/, loader: 'layout-loader', layout: (path) => 'bingo' }
]
```

```javascript
preLoaders: [
  {
    test: /\.md$/,
    loader: 'layout-loader',
    options: {
      layout: 'layout'
      block: 'text'
    }
  }
]
```

## Using with front matter
Layout Load was primarily built to be used with [spike-front-matter](https://www.npmjs.com/package/spike-front-matter). Here is how to integrate the two.

### Option 1
```javascript
const FrontMatter = require('spike-front-matter')
let fm = new FrontMatter()

module.exports = {
  posthtml: (ctx) => {
    return {
      defaults: [
        jade({ filename: ctx.resourcePath, page: fm.page, site: fm.site}),
      ]
    }
  },
  plugins: [
    fm
  ],
  matchers: {
    html: '**/*.(md|jade)',
  },
  module: {
    preLoaders: [
      { test: /\.md$/, loader: 'layout-loader', options: fm.page, layout: 'default' }
    ]
  }
}
```

### Option 2
```javascript
const FrontMatter = require('spike-front-matter')
let fm = new FrontMatter()

module.exports = {
  posthtml: (ctx) => {
    return {
      defaults: [
        jade({ filename: ctx.resourcePath, page: fm.page, site: fm.site}),
      ]
    }
  },
  plugins: [
    fm
  ],
  matchers: {
    html: '**/*.(md|jade)',
  },
  module: {
    preLoaders: [
      { test: /\.md$/, loader: 'layout-loader', layout: () => fm.page.layout }
    ]
  }
}
```

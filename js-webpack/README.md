# JS : Webpack

Learn from https://webpack.js.org/guides/getting-started/

```bash
npm install
```

## Day 1 , [<51ede10>](https://github.com/khanhicetea/learn-n-earn/commit/51ede10678b1d63dc57cea2556cb225c86b27853)

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**Bash**

```bash
$ ./node_modules/.bin/webpack --config webpack.config.js
```

**Learned**

- entry : start point to dive in dependency graph.
- output : output after pack the web modules
	- filename : bundle filename
	- path : dist path


## Day 2

### Import assets , [<07591ed>](https://github.com/khanhicetea/learn-n-earn/commit/07591ed6f8398827e3e1ff22c49b005c262206d8)

- **CSS file** : use `style-loader` and `css-loader`
- **Image file** : use `file-loader`
- **WebFont file** : use `file-loader`
- **Data file** use `json-loader`, `xml-loader` or `csv-loader`

```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
```

### Dynamic output and entry , [<d543b28>](https://github.com/khanhicetea/learn-n-earn/commit/d543b28987f6c9563ed0a967116e1b190c5ea949)

`entry` config can be a dictionary where key is entry name and value is entry file path
`output.filename` could use `[name]` in syntax to generate dynamic output filename

```js
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### HtmlWebpackPlugin

`HtmlWebpackPlugin` by default will generate its own `index.html` file, even though we already have one in the `dist/` folder

```bash
npm install html-webpack-plugin --save-dev
```

### Cleaning /dist folder

To clean up `dist` folder automatically !

```bash
npm install clean-webpack-plugin --save-dev
```

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

...
plugins: [
  new HtmlWebpackPlugin(['dist']),
],
```

### Development

#### Source map , [<4eea0dc>](https://github.com/khanhicetea/learn-n-earn/commit/4eea0dc3e0ffe570c14887cd56a2a5bf6966edc8)

To enable source map for js and css file, use `inline-source-map` option in `devtool` config

```js
...
devtool: 'inline-source-map',
plugins: [
  ...
],
```

> ONLY USE THIS OPTION FOR DEVELOPMENT MODE

#### Development server (watch file changes) , [<a3a2cee>](https://github.com/khanhicetea/learn-n-earn/commit/a3a2cee61c63b42babeee68e183b57254f130388)

- **watch mode** : add option `--watch` to `webpack` cli run command
- **webpack-dev-server** : use npm package `webpack-dev-server` and add `devServer: { contentBase: './dist' }` to webpack config, when start a dev server use another command instead `webpack-dev-server --open`
- **express webpack-dev-middleware** : use [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) as Express middleware

### Ready for production , [<1ddcee3>](https://github.com/khanhicetea/learn-n-earn/commit/1ddcee368dee73a09a577f079d8eec2e6153cb61)

#### Tree shaking

**Tree shaking** is a term commonly used in the JavaScript context for dead-code elimination. It relies on the static structure of **ES2015** module syntax, i.e. `import` and `export`.

```bash
$ npm install --save-dev uglifyjs-webpack-plugin
```

```js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

...
plugins: [
    ...
    new UglifyJSPlugin(),
]
```

> ONLY USE IN PRODUCTION WEBPACK CONFIG

### Setup multi environments , [<a2d0cc9>](https://github.com/khanhicetea/learn-n-earn/commit/a2d0cc98b3e64af02cc735a9d888ed5948e5673f)

```bash
$ npm install --save-dev webpack-merge
```

**webpack.common.js**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    new HtmlWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**webpack.dev.js**

```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    }
});
```

**webpack.prod.js**

```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});
```

**package.json**

```json
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --open --config webpack.dev.js"
  }
```

**Run command**

- `npm run dev` : running dev server with hot reload
- `npm run build` : build production dist

### Specify the Environment

Many libraries will key off the `process.env.NODE_ENV` variable to determine what should be included in the library. We can use webpack's built in `DefinePlugin` to define this variable for all our dependencies

**webpack.prod.js**

```js
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
  ]
});
```

------------------------------------

============ **LET'S PACK THE FUCKING WEB !** ============
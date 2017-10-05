# JS : Webpack

Learn from https://webpack.js.org/guides/getting-started/

```bash
npm install
```

## Day 1

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

### Import assets

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

### Dynamic output and entry

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

To enable source map for js and css file, use `inline-source-map` option in `devtool` config

```js
...
devtool: 'inline-source-map',
plugins: [
  ...
],
```

> ONLY USE THIS FOR DEVELOPMENT MODE

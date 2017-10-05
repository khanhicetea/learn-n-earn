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

To import 

- **CSS file** : use `style-loader` and `css-loader`
- **Image file** : use `file-loader`
- **WebFont file** : use `file-loader`

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
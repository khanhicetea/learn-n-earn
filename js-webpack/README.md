# JS : Webpack

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

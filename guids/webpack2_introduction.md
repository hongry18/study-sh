# Webpack@2 

## 참고자료
[Concepts](https://webpack.js.org/concepts/)

## 웹팩이란
> webpack is a module bundler for modern JavaScript applications. 
웹팩은 최신 자바스크립트 애플리케이션을 위한 모듈 번들러입니다.

## 왜 쓰나요?
웹팩은 의존적인 하나 이상의 js 파일들을 묶어서 하나의 js파일로 만들어주는 번들링 도구입니다. 번들링을 통해 웹 서비스가 호스팅될 때 발생하는 요청의 수를 최소화하고 최적화된 (uglify, minify된) js파일을 통해 트래픽을 줄입니다.

## 설치
`$ npm install -g webpack`

## Entry, Output, Loaders, 그리고 Plugins
### Entry
웹팩은 애플리케이션의 의존성의 그래프를 생성합니다. 그 그래프의 시작점은 *entry point*라고 부릅니다. 웹팩은 이 시작점에서 부터 출발하여 의존성을 추적하고 무엇을 번들링할 지 결정합니다.  

### Output
Bundle 애플리케이션이 있을 곳을 지정합니다.
```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### Loaders
```js
// … in config object
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'}
		]
	}
```
module.rules에 있는 test를 통해서 특정 파일들을 use에 지정된 로더로 불러온다.

### Plugins
```js
// … in config object
	plugins: [
		new Webpack.optimize.UglifyJsPlugin(),
		// and so on ...
	]
```

## Config 파일
본래 option 명령어로 쓰던 것을, 구조화하여 config 파일로 둘 수가 있다.


## Webpack-dev-server
### Installation
`$ npm install --save-dev webpack-server`
### Execute
` webpack-dev-server --open`
### Config
```js
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
	hot: true,
  port: 9000
}
```

## React Hot Module Reload with Webpack@2
[Hot Module Replacement - React](https://webpack.js.org/guides/hmr-react/)
### Installation
```sh
npm install --save-dev webpack webpack-dev-server;
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react;
npm install --save-dev style-loader css-loader;
```

`npm install --save react react-dom react-hot-loader@next`

### Config
.babelrc
```js
{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack understands the native import syntax, and uses it for tree shaking

    "react"
    // Transpile React components to JavaScript
  ],
  "plugins": [
    "react-hot-loader/babel"
    // Enables React code to work with HMR.
  ]
}
```

webpack.config.js
```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
```


### Webpack dev server middleware로 서버에서 사용하기
`$ npm install --save-dev webpack-dev-middleware`

```js
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
```

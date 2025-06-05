## **webpack**

webpack 是一个打包工具。less，saas，typescript，vue，react，模块...
转成 js，css，html，图片，字体，json...，在对应的位置引入打包后的文件
处理文件依赖关系，兼容性问题...

```
npm init -y // 初始化项目 生成 package.json 文件
npm i webpack webpack-cli -S // 生成
npm i webpack webpack-cli -D // 开发依赖安装 webpack，webpack 命令行工具
npx webpack -v // 使用 npx 命令执行局部 webpack
npx webpack // 打包

// 修改入口、出口文件
npx webpack --entry ./src/app.js --output-path ./build

// 配置文件
webpack.config.js
// 修改配置文件
npx webpack --config goudan.js

entry: './src/index.js',//配置入口文件
output: {
    filename: 'main.js', // 配置输出文件名
    // 目录名绝对路径 配置输出文件目录
    path: path.resolve(\_\_dirname, 'dist')
}
// 配置命令 package.json 默认运行局部 不用加 npx
"scripts": {
    "build": "webpack" // 可加参数
},
npm run build //进行打包

npm run build -- --config webpack.config.js // 可以加命令行参数

npm i webpack webpack-cli -g // 全局安装 webpack，webpack 命令行工具
webpack -v
webpack 默认入口文件 src/index.js

项目目录下 webpack 打包
dist 目录下生成 main.js 默认出口文件

在 index.html 中引入打包后的 main.js

css 打包
   css-loader  //根据文件内容解析css语法，拿到内容
   style-loader //将解析好的语法放到页面的style标签中
   npm i css-loader style-loader -D // 开发环境安装
   修改webpack.config

less 打包
   less-loader // 把less文件与项目文件关联起来
   less // 解析less语法为css
   npm i less-loader less -D

saas 打包
   sass-loader // 把sass文件与项目文件关联起来
   node-sass // 解析sass语法为css
   npm i sass-loader node-sass -D

图片资源 打包 // webpack 本身有asset module
    import img1 from './1.jpg' // 引入图片
    type: 'asset/resource'
小的图片资源打包成base64格式
    type: 'asset/inline'
    不在dist里面在html里面

字体等静态文件资源 css已经可以处理

定义打包后图片存放目录，和文件名
    // [name] 源文件的名字 [ext] 源文件的扩展名
    generator:{
        filename:'[name][ext]' // 打包后名字和后缀用原来的
    }

自动清理dist目录 插件plugin
    npm i clean-webpack-plugin -D

自动生成html文件插件
    html-webpack-plugin

定位 控制台输出/报错到源代码位置而不是打包后的文件位置
    mode: 'development',
    devtool: 'inline-source-map'

代码修改后自动打包，而不用手动运行npm run build
watch  "scripts": { // 监听不到文件删减操作,只能监听文件内容
    "watch": "webpack --watch"
}

非服务器环境下，热更新页面， 不用手动刷新页面，自动watch打包后刷新页面
webpack server
    npm i webpack-devp-server -D
    npx webpack server //开启服务热更新
    "scripts": {
        "start": "webpack server" // 通过npm启动，而不必npx
        "start": "webpack server --open" // 热更新后自动打开浏览器服务地址
    }

模块热更新

```

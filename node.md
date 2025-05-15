## **node**

```
npm init //创建一个package.json文件 自定义插入位置 版本作者...
npm init -y // 根据default值快速生成package.json文件
npm 是 nodejs自带的包管理工具
cli 是 command line interface 命令行接口
npm cli 就是通过命令行的方式使用npm 的方式

npm install // 安装包
npm install vue@2.6 // 安装指定版本的vue
npm install vue@2.6 --save // 安装并保存到package.json的dependencies
npm install vue@2.6 --save-dev // 安装并保存到package.json的devDependencies
npm install vue@2.6 -g // 全局安装
npm install vue@latest // 安装最新稳定生产版本
npm install vue@next // 安装最新发布的测试版本
npm uninstall vue // 卸载包
npm uninstall vue -g // 全局卸载
npm uninstall vue --save // 卸载并删除package.json的dependencies
dependencies 存放项目运行、生产环境需要的包版本信息
devDependencies 存放除了项目必要的运行之外在生产环境不需要的包版本信息 eslint vite 测试工具等..
1.2.3
主版本号.次版本号.修订号
 MAJOR.MINOR.PATCH
^	锁定主版本 允许次版本更新
～  锁定主版本和此版本 允许修订号更新
*   安装最新可用版本
Babel 和 Polyfill的区别
Babel 是一个编译器 它可以将ES6代码转换为向后兼容的JS代码
// ES6+ 写法
const sum = (a, b) => a + b;
// 转换后
// ES5 写法
var sum = function(a, b) {
  return a + b;
};

Polyfill 是一个库 它可以在旧的JS环境中提供现代浏览器才有的API
如果旧浏览器不支持 Array.prototype.includes，polyfill 代码会这样补：
if (!Array.prototype.includes) {
  Array.prototype.includes = function(value) {
    return this.indexOf(value) !== -1;
  };
}
✅ Babel 转语法，Polyfill 补功能。 二者通常一起使用，以实现最好的兼容性。
```

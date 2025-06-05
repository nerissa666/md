// import require 引用方式处理

import { A } from './A/A'
const { B } = require('./B/B')
console.log(A())  // Uncaught SyntaxError: Cannot use import statement outside a module (at index.js:3:1)

console.log(B())  // index.js:4 Uncaught ReferenceError: require is not defined

import './C/C'
import './D/D'
import './E/E'
import './F/F'
import './G/G'
import './H/H'

if (module.hot) {
    // 配置只更新修改的模块
    /**
     * 这里的更新就是把这个修改的模块重新执行了一边，页面上出现了重复的内容，应该删除原来的再重新画一遍
     * 没有被accept的模块，在更新的时候不会被重新加载，但是他们自己本身修改会整个页面刷新
    */

    module.hot.accept([
        './G/G',
        './H/H'
    ])
    module.hot.dispose(() => {
        cleanup();
    });

    // import.meta.hot.dispose(() => {
    //     // 清理上一次的副作用，比如 DOM、定时器、事件
    //     cleanup();
    // });
}


好问题！🔍 在 JavaScript 中，**判断变量的类型**是非常常见也是非常关键的操作。这里我总结了几种最常见的判断方法，每种方法都有适合的使用场景 👇

---

## ✅ 1. `typeof` —— 判断**原始类型**

```js
typeof 123; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof BigInt(10); // "bigint"
typeof function () {}; // "function"

typeof null; // ❌ "object"（历史遗留问题）
```

📝 **适合判断原始类型**（除了 `null`）

---

## ✅ 2. `instanceof` —— 判断**对象是否属于某个构造函数**

```js
[] instanceof Array         // true
{} instanceof Object        // true
new Date() instanceof Date  // true
new RegExp() instanceof RegExp // true
```

⚠️ 注意：只能判断**引用类型（对象）**

---

## ✅ 3. `Object.prototype.toString.call()` —— ✅ 精准判断所有类型

```js
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(() => {}); // "[object Function]"
Object.prototype.toString.call(new Date()); // "[object Date]"
```

👑 **最精准、最通用的一种方式**

---

## ✅ 4. `Array.isArray()` —— 判断是否是数组（比 `instanceof` 更稳）

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

⚠️ 为什么不用 `instanceof`？因为多个 iframe 之间创建的数组可能 `instanceof Array` 为 false

---

## ✅ 5. ES6 新特性：`constructor`

```js
let arr = [];
arr.constructor === Array; // true

let num = 123;
num.constructor === Number; // true
```

⚠️ 不推荐用于复杂类型判断，可能会被改写。

---

## 🧠 总结表格：

| 方法                             | 适合判断         | 是否推荐 | 注意事项         |
| -------------------------------- | ---------------- | -------- | ---------------- |
| `typeof`                         | 原始类型         | ✅       | `null` 判断不准  |
| `instanceof`                     | 引用类型（对象） | ✅       | 不适合 iframe    |
| `Object.prototype.toString.call` | ✅ 所有类型      | 💯 强推  | 最精准           |
| `Array.isArray()`                | 是否是数组       | ✅       | 专用方法         |
| `.constructor`                   | 简单对象判断     | ❌       | 可被改写，不安全 |

---

### 🚀 一行函数：封装一个万能的类型判断

```js
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

getType(null); // "Null"
getType([]); // "Array"
getType({}); // "Object"
getType(() => {}); // "Function"
```

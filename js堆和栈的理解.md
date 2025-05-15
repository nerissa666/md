闭包（Closure）是 JS 中超核心的概念之一，不光是面试常考，而且在实际开发中用处超多！

---

## 🧠 一句话解释闭包：

> **闭包就是一个函数可以“记住”它被创建时的作用域，即使它在当前作用域之外执行。**

---

## 🎯 常见使用场景（超级实用）：

---

### 1️⃣ **数据私有化（模拟私有变量）**

```js
function createCounter() {
  let count = 0; // 私有变量
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

✅ **好处**：`count` 不能从外部访问，只能通过 `counter()` 来操作。

---

### 2️⃣ **封装工具函数 / 工厂函数**

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

✅ 使用闭包“记住”传入的参数 `x`，创建一个定制版函数。

---

### 3️⃣ **事件监听器中保存状态**

```js
function bindClick() {
  let clicked = 0;
  document.getElementById("btn").addEventListener("click", function () {
    clicked++;
    console.log("Clicked:", clicked);
  });
}
bindClick();
```

✅ 每次点击后闭包内部的 `clicked` 都会保留状态，像一个小记忆体。

---

### 4️⃣ **定时器、异步任务中保留变量**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// 输出：3 3 3（非预期）

// 改成闭包
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
// 输出：0 1 2（预期）
```

✅ 闭包捕获每次循环的 `i` 值，避免值被后续覆盖。

---

### 5️⃣ **Vue、React 中常见场景：**

- 保存组件局部状态
- 封装自定义 hooks（React）
- 高阶函数处理器（如节流、防抖）
- 利用闭包创建缓存（记忆化）

---

### 6️⃣ **缓存结果，提升性能（记忆化函数）**

```js
function memoizedAdd() {
  const cache = {};

  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 10;
      return cache[n];
    }
  };
}

const add = memoizedAdd();
console.log(add(5)); // 15（计算）
console.log(add(5)); // 15（缓存）
```

✅ 闭包维护一个缓存对象，实现函数结果复用。

---

## ✅ 总结：

| 场景         | 作用                       |
| ------------ | -------------------------- |
| 模拟私有变量 | 封装内部状态，防止外部访问 |
| 工厂函数     | 返回定制函数，记住参数     |
| 保持异步状态 | 防止变量被覆盖             |
| 节流 / 防抖  | 函数内部保存计时器变量     |
| 缓存函数     | 减少重复计算，提高性能     |

`Promise` 有一组非常实用的 **静态方法** 和 **实例方法**，掌握它们就能灵活控制异步流程，搞定大多数异步场景（并发、串行、超时、错误处理等）。pending | fulfilled | rejected

---

## ✅ Promise 的常用方法汇总

| 类型     | 方法                   | 说明                                                |
| -------- | ---------------------- | --------------------------------------------------- |
| 静态方法 | `Promise.resolve()`    | 创建一个立即完成的 Promise                          |
| 静态方法 | `Promise.reject()`     | 创建一个立即拒绝的 Promise                          |
| 静态方法 | `Promise.all()`        | 所有 Promise 成功才成功，有一个失败就失败           |
| 静态方法 | `Promise.race()`       | 谁先结束（成功或失败）就采用谁的结果                |
| 静态方法 | `Promise.allSettled()` | 等所有 Promise 都完成（无论成功失败），返回每个结果 |
| 静态方法 | `Promise.any()`        | 有一个成功就成功，所有都失败才失败                  |
| 实例方法 | `.then()`              | 成功后执行，返回新的 Promise（可链式）              |
| 实例方法 | `.catch()`             | 失败时执行，等同于 `.then(null, error)`             |
| 实例方法 | `.finally()`           | 无论成功或失败，最后一定执行                        |

---

## 🧪 实例方法详解

### `.then(onFulfilled, onRejected)`

```js
fetchData().then(
  (res) => {
    console.log("成功", res);
  },
  (err) => {
    console.log("失败", err);
  }
);
```

### `.catch(onRejected)`

等价于 `.then(null, onRejected)`

```js
fetchData()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

### `.finally(callback)`

无论成功还是失败都会执行

```js
fetchData()
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => console.log("无论如何都执行"));
```

---

## 🚀 静态方法详解

### `Promise.resolve(value)`

快速创建一个成功的 Promise

```js
Promise.resolve("OK").then(console.log); // 输出 OK
```

### `Promise.reject(error)`

快速创建一个失败的 Promise

```js
Promise.reject("出错了").catch(console.error); // 输出 出错了
```

### `Promise.all([p1, p2, ...])`

**并发执行**，所有成功才成功，否则失败

```js
Promise.all([api1(), api2()])
  .then(([res1, res2]) => console.log(res1, res2))
  .catch((err) => console.error("有一个失败就会进来", err));
```

### `Promise.race([p1, p2, ...])`

谁先结束（成功或失败）就采用谁的结果

```js
Promise.race([slowApi(), fastApi()]).then(console.log).catch(console.error);
```

### `Promise.allSettled([p1, p2, ...])`

等待所有都执行完，不管成功失败，每个结果都有状态

```js
Promise.allSettled([api1(), api2(), api3()]).then((results) => {
  results.forEach((r) => console.log(r.status, r.value || r.reason));
});
```

### `Promise.any([p1, p2, ...])`

只要有一个成功就返回那个结果，**全失败才会抛错**

```js
Promise.any([
  Promise.reject("fail"),
  Promise.resolve("success"),
  Promise.reject("fail2"),
]).then(console.log); // 输出 success
```

---

## 💡 总结口诀：

```
.then 处理成功
.catch 处理失败
.finally 必定执行

resolve 就绪值
reject 直接错

all 全部成，才成功
race 谁先来，就赢了
allSettled 无论成败，等所有
any 有一个成功就行
```

---

如果你想看它们在实际项目中的使用方式，比如 loading 状态管理、并发请求、降级方案之类，我也可以继续给你举例！👀

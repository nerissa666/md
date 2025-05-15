---

## 🌟 一图快速预览

```
1. 原型链继承
2. 借用构造函数继承
3. 组合继承（原型链 + 构造函数）
4. 原型式继承
5. 寄生式继承
6. class 类继承（ES6）
```

---

### 1️⃣ 原型链继承（最基础）

```js
function Parent() {
  this.name = "parent";
}
Parent.prototype.sayHi = function () {
  console.log("hi from parent");
};

function Child() {}
Child.prototype = new Parent();

const c = new Child();
c.sayHi(); // ✅ hi from parent
```

🧱 **缺点**：子类实例会共享父类引用属性（如数组、对象）

---

### 2️⃣ 借用构造函数继承（构造继承）

```js
function Parent() {
  this.names = ["Tom", "Jerry"];
}
function Child() {
  Parent.call(this); // 继承属性
}

const c1 = new Child();
const c2 = new Child();
c1.names.push("Spike");
console.log(c2.names); // ✅ ['Tom', 'Jerry']
```

✅ **解决了共享引用属性的问题**  
❌ 无法继承原型方法

---

### 3️⃣ 组合继承（最常用）

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c = new Child("Jack", 18);
c.sayName(); // ✅ Jack
```

✅ 优点：既继承属性，又继承方法  
❌ 缺点：`Parent` 构造函数会执行两次（浪费性能）

---

### 4️⃣ 原型式继承（`Object.create`）

```js
const parent = {
  greet: function () {
    console.log("hello");
  },
};

const child = Object.create(parent);
child.greet(); // ✅ hello
```

✅ 简单灵活  
❌ 仍然存在引用属性共享的问题（和原型链继承一样）

---

### 5️⃣ 寄生式继承（包装 + 扩展）

```js
function createChild(obj) {
  const clone = Object.create(obj);
  clone.sayHi = function () {
    console.log("hi");
  };
  return clone;
}

const parent = { name: "p" };
const child = createChild(parent);
child.sayHi(); // ✅ hi
```

✅ 基于原型式继承 + 增强  
❌ 和原型式一样，引用属性共享问题依旧

---

### 6️⃣ ES6 class 继承（推荐用法）

```js
class Parent {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const c = new Child("Lily", 10);
c.sayHi(); // ✅ Hi, I'm Lily
```

✅ 语法简洁，原型链自动处理  
✅ 可以 super 调用父类方法  
✅ 最推荐在现代开发中使用

---

## 📊 总结对比表

| 方式            | 能继承属性 | 能继承方法 | 是否推荐 | 备注             |
| --------------- | ---------- | ---------- | -------- | ---------------- |
| 原型链继承      | ✅         | ✅         | ❌       | 引用属性共享问题 |
| 构造函数继承    | ✅         | ❌         | ❌       | 无法继承方法     |
| 组合继承        | ✅         | ✅         | ⚠️       | 构造函数执行两次 |
| 原型式继承      | ✅         | ✅         | ❌       | 引用共享问题     |
| 寄生式继承      | ✅         | ✅         | ❌       | 引用共享问题     |
| `class extends` | ✅         | ✅         | ✅       | 推荐用法         |

---

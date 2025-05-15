## 🍱 什么是插槽（slot）？

插槽是父组件向子组件 **传递内容** 的一种方式，用来在组件中留“插口”，让使用者决定里面的内容。

---

## 🧩 基本用法：默认插槽（default slot）

```vue
<!-- 子组件 MyCard.vue -->
<template>
  <div class="card">
    <slot></slot>
    <!-- 插槽位置 -->
  </div>
</template>
```

```vue
<!-- 父组件中使用 -->
<MyCard>
  <p>这是插槽传进来的内容</p>
</MyCard>
```

🔍 **效果**：子组件渲染出 `<p>这是插槽传进来的内容</p>`，插进了 `<slot>` 的位置。

---

## 🏷️ 具名插槽（named slot）

```vue
<!-- 子组件 -->
<template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  <!-- 默认插槽 -->
  <footer><slot name="footer"></slot></footer>
</template>
```

```vue
<!-- 父组件中使用 -->
<MyCard>
  <template #header>
    <h1>我是头部</h1>
  </template>

  <p>我是内容</p>

  <template #footer>
    <small>我是底部</small>
  </template>
</MyCard>
```

🧠 小知识点：

- `#header` 是 `v-slot:header` 的简写。
- 没有加 `#` 的内容，会放到默认插槽。

---

## 💼 作用域插槽（scoped slot）

👉 用于子组件想**把数据传给插槽内容**的场景。

```vue
<!-- 子组件 List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["items"],
};
</script>
```

```vue
<!-- 父组件中使用 -->
<List :items="listData">
  <template #default="{ item }">
    <strong>{{ item.name }}</strong> - {{ item.age }}
  </template>
</List>
```

💡 子组件通过 `slot` 向外暴露数据，父组件通过解构拿到这些值。

---

## ✅ 插槽的总结

| 类型       | 用法                                    | 场景                 |
| ---------- | --------------------------------------- | -------------------- |
| 默认插槽   | `<slot></slot>`                         | 插入一段内容         |
| 具名插槽   | `<slot name="x">` + `#x`                | 插入多个位置         |
| 作用域插槽 | `<slot :prop="x">` + `#default="{ x }"` | 子组件传数据给父插槽 |

---

## 🧠 小贴士

- 插槽里的内容是由**父组件决定的**，但渲染的上下文（数据作用域）也是在父组件。
- 插槽可以嵌套，也可以传递函数、事件等。

---

如果你想我举个完整例子，比如做一个通用 `Card` 组件，里面有 header、body、footer 插槽，我可以马上写一份完整 Vue 文件给你！😎

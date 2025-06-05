EJS（Embedded JavaScript）是一种**模板引擎**，用于在 HTML 中嵌入 JavaScript 代码，常见于 Node.js 项目中。

---

## 🧠 它的核心作用：

> **让你在 HTML 页面中插入变量、流程控制和逻辑代码。**

---

## 📝 常用语法示例

### 1. **插入变量**

```ejs
<p>你好，<%= username %></p>
```

等同于：

```html
<p>你好，张三</p>
<!-- 如果 username = '张三' -->
```

---

### 2. **转义输出（防止 XSS）**

```ejs
<%= variable %>   <!-- 会自动进行 HTML 转义 -->
<%- variable %>   <!-- 不进行转义，直接输出 HTML -->
```

例如：

```ejs
<%= '<script>' %>  <!-- 输出：&lt;script&gt; -->
<%- '<script>' %>  <!-- 输出：<script> -->
```

---

### 3. **JavaScript 语句（控制结构）**

```ejs
<% if (isAdmin) { %>
  <p>欢迎管理员</p>
<% } else { %>
  <p>普通用户</p>
<% } %>
```

---

### 4. **循环**

```ejs
<ul>
<% for(let i = 0; i < list.length; i++) { %>
  <li><%= list[i] %></li>
<% } %>
</ul>
```

---

### 5. **引入模板**

```ejs
<%- include('header') %>
<p>页面主体</p>
<%- include('footer') %>
```

---

## 🔧 使用方式（Node.js 项目中）

1. 安装依赖：

```bash
npm install ejs
```

2. 使用示例（配合 Express）：

```js
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { username: "张三" });
});
```

3. `views/index.ejs`：

```ejs
<h1>欢迎 <%= username %></h1>
```

---

## ✅ 总结

| 语法        | 说明               |
| ----------- | ------------------ |
| `<%= %>`    | 输出变量（转义）   |
| `<%- %>`    | 输出变量（不转义） |
| `<% %>`     | 执行 JS 语句       |
| `include()` | 引入子模板         |

---

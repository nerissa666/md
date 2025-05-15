`<script>` 标签在 HTML 中用于嵌入或引用 JavaScript 代码，它拥有多个属性来控制脚本的行为。除了您已经提到的 `async` 属性外，还有其他几个常用的属性。以下是一些主要的 `<script>` 标签属性：

1. **`src`**：

   - **描述**：指定外部脚本文件的 URL。
   - **用法**：`<script src="path/to/script.js"></script>`

2. **`type`**：

   - **描述**：指定脚本的 MIME 类型。默认情况下，类型是 `text/javascript`，但也可以用于其他脚本类型，如模块脚本（`module`）。
   - **用法**：`<script type="text/javascript"></script>` 或 `<script type="module"></script>`

3. **`defer`**：

   - **描述**：异步加载脚本，但保证脚本在文档解析完毕后执行，且按顺序执行。dom loaded 之前执行
   - **用法**：`<script src="path/to/script.js" defer></script>`

4. **`async`**：

   - **描述**：异步加载脚本，加载完毕后立即执行（不保证顺序）。
   - **用法**：`<script src="path/to/script.js" async></script>`

5. **`charset`**：

   - **描述**：指定脚本使用的字符编码。通常不需要指定，因为默认是 UTF-8。
   - **用法**：`<script src="path/to/script.js" charset="UTF-8"></script>`

6. **`crossorigin`**：

   - **描述**：配置跨域请求的相关设置。可能的值有 `anonymous`（默认值，不发送凭证）和 `use-credentials`（发送凭证）。
   - **用法**：`<script src="https://example.com/script.js" crossorigin="anonymous"></script>`

7. **`integrity`**：

   - **描述**：允许浏览器验证下载的脚本文件是否未被篡改。通常与 `crossorigin` 属性一起使用。
   - **用法**：`<script src="https://example.com/script.js" integrity="sha384-..." crossorigin="anonymous"></script>`

8. **`nomodule`**：
   - **描述**：如果浏览器支持 ES6 模块，则忽略此脚本。用于提供回退脚本给不支持模块的浏览器。
   - **用法**：`<script nomodule src="path/to/legacy-script.js"></script>`

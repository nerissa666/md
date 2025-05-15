在 **VSCode** 中使用 **Markdown Preview Enhanced** 插件预览 Markdown 文件的效果其实很简单。以下是步骤：

### 1. 安装插件

首先确保你已经安装了 **Markdown Preview Enhanced** 插件。如果没有安装，可以按照以下步骤安装：

- 打开 VSCode
- 按下 `Ctrl + P`，输入 `ext install shd101wyy.markdown-preview-enhanced`
- 安装完毕后，插件会自动启用。

### 2. 打开你的 Markdown 文件

- 在 VSCode 中打开一个 `.md` 文件。

### 3. 启动预览

有几种方法可以启动预览：

#### 方法一：快捷键

- 按下 `Ctrl + Shift + V`（Windows/Linux）或 `Cmd + Shift + V`（macOS），这会在编辑器旁边打开预览窗口。

#### 方法二：右键菜单

- 右键点击你的 Markdown 文件标签页，然后选择 `Open Preview` 或 `Open Preview to the Side`，这样也会在旁边打开预览。

#### 方法三：命令面板

- 按 `Ctrl + Shift + P`（Windows/Linux）或 `Cmd + Shift + P`（macOS）打开命令面板，输入 `Markdown Preview Enhanced: Open Preview`，然后选择该命令，预览窗口就会打开。

### 4. 实时预览

当你在编辑 Markdown 文件时，预览窗口会自动更新以显示你修改后的内容。你可以编辑文档并实时查看效果。

### 5. 高级功能

- **数学公式**：支持渲染 LaTeX 数学公式。你只需要使用 `$$` 来包围公式：

  ```markdown
  $$ E = mc^2 $$
  ```

- **Mermaid 图表**：可以插入流程图和其他图表。例如，以下代码会渲染一个简单的流程图：

  ````markdown
  ```mermaid
  graph LR
    A --> B
    B --> C
    C --> A
  ```
  ````

  ```

  ```

- **导出功能**：你可以将 Markdown 文件导出为多种格式，如 PDF、HTML 或 PNG。按下 `Ctrl + Shift + P`，然后输入 `Markdown Preview Enhanced: Export` 来选择导出格式。

### 6. 自定义样式

如果你希望自定义 Markdown 文件的预览样式，你可以：

- 在设置中找到 `Markdown Preview Enhanced: CSS`，然后指定自定义的 CSS 文件来修改预览的样式。

### 7. 切换渲染模式

在预览窗口中，你还可以切换不同的渲染模式。例如，使用 **GitHub 风格的渲染** 或 **默认的渲染样式**，具体设置可以通过插件的设置界面进行。

---

这些操作应该能帮助你快速预览和编辑 Markdown 文件。如果有任何问题或需要进一步的帮助，随时告诉我！

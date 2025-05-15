`provide` 和 `inject` 是 Vue 3 中用于进行跨组件通信的一种方式。它们允许父组件提供数据或方法，子组件通过 `inject` 注入来使用。这种机制特别适用于深层嵌套的组件树，避免了使用 props 和 events 在中间组件间传递数据。

### 工作原理：

- **`provide`**：在父组件中声明，提供一些数据或方法。
- **`inject`**：在子组件中声明，注入父组件通过 `provide` 提供的值。

### 使用场景：

- 用于跨越多层组件进行数据传递。
- 替代 props 和 events，在一些复杂的组件嵌套中避免数据传递的“层层递归”。

### 基本用法

#### 1. 父组件（提供数据）

父组件通过 `provide` 来提供数据或方法，子组件可以通过 `inject` 来访问它。

```vue
<!-- Parent.vue -->
<template>
  <Child />
</template>

<script>
import { provide } from "vue";
import Child from "./Child.vue";

export default {
  components: { Child },
  setup() {
    // 提供数据给子组件
    provide("message", "Hello from Parent!");
  },
};
</script>
```

#### 2. 子组件（注入数据）

子组件通过 `inject` 获取父组件通过 `provide` 提供的数据。

```vue
<!-- Child.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    // 注入父组件提供的数据
    const message = inject("message");

    return { message };
  },
};
</script>
```

在上面的例子中，父组件提供了一个 `message` 数据，子组件通过 `inject` 注入这个数据并显示它。

### 提供和注入方法

`provide` 不仅可以提供数据，也可以提供方法。子组件可以通过 `inject` 注入这些方法。

#### 1. 父组件提供方法

```vue
<!-- Parent.vue -->
<template>
  <Child />
</template>

<script>
import { provide } from "vue";
import Child from "./Child.vue";

export default {
  components: { Child },
  setup() {
    const increment = () => {
      console.log("Incremented!");
    };

    // 提供方法给子组件
    provide("increment", increment);
  },
};
</script>
```

#### 2. 子组件注入并使用方法

```vue
<!-- Child.vue -->
<template>
  <button @click="increment">Increment</button>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    // 注入父组件提供的方法
    const increment = inject("increment");

    return { increment };
  },
};
</script>
```

当你点击按钮时，子组件会调用父组件提供的 `increment` 方法。

### `provide` 和 `inject` 的响应性

Vue 3 中，`provide` 和 `inject` 是响应式的。当父组件的提供的数据发生变化时，子组件也会自动更新，前提是数据本身是响应式的。

```vue
<!-- Parent.vue -->
<template>
  <button @click="count++">Increment count</button>
  <Child />
</template>

<script>
import { ref, provide } from "vue";
import Child from "./Child.vue";

export default {
  components: { Child },
  setup() {
    const count = ref(0);
    // 提供一个响应式的数据
    provide("count", count);

    return { count };
  },
};
</script>
```

```vue
<!-- Child.vue -->
<template>
  <p>Count is: {{ count }}</p>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    // 注入响应式数据
    const count = inject("count");

    return { count };
  },
};
</script>
```

每当父组件中的 `count` 增加时，子组件会自动反应并更新显示。

### 默认值

如果你想要提供一个默认值，当 `inject` 没有找到对应的提供值时，可以传入第二个参数作为默认值。

```vue
<!-- Parent.vue -->
<template>
  <Child />
</template>

<script>
import { provide } from "vue";
import Child from "./Child.vue";

export default {
  components: { Child },
  setup() {
    // 提供数据
    provide("message", "Hello from Parent!");
  },
};
</script>
```

```vue
<!-- Child.vue -->
<template>
  <p>{{ message }}</p>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    // 注入数据，并提供默认值
    const message = inject("message", "Default message");

    return { message };
  },
};
</script>
```

如果父组件没有提供 `message`，那么 `inject` 会使用 `'Default message'` 作为默认值。

### 总结

- `provide` 和 `inject` 是 Vue 3 中用于跨组件传递数据的一种机制。
- 它们解决了通过 props 和事件传递数据时的一些局限，尤其是在深层嵌套的组件中。
- `provide` 用于在父组件中提供数据或方法，`inject` 用于在子组件中注入这些值。
- Vue 3 中的 `provide` 和 `inject` 是响应式的，父组件的数据变化会自动更新子组件。

这种方式不需要通过 props 或事件进行层层传递，因此在复杂的组件树中，它是非常有用的。

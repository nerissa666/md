### 1. **Vue 3 和 Vue 2 的区别**

**Vue 3 与 Vue 2 的主要区别：**

- **Composition API**：Vue 3 的 Composition API，提供了更灵活的组件逻辑复用方式，取代了 Vue 2 中的 Options API。通过 `setup()` 函数组织代码逻辑，使得组件的代码结构更清晰。
- **性能提升**：Vue 3 使用 Proxy 对象进行响应式处理，比 Vue 2 中基于 Object.defineProperty 更高效。
- <strong id="TS">Tree Shaking</strong>：Vue 3 支持 tree shaking，可以减少最终构建包的大小，提升加载速度。
  shaking 条件
  -1. 使用 ES Modules 导入
  -2. vite.config.js 中配置 target: 'esnext', minify: 'esbuild',
  -3. Webpack mode: 'production',import { ref } from 'vue' 的方式按需引入
  ```minimizer: [
      new TerserPlugin({
        extractComments: false,  // 禁止提取注释
      }),
    ],
  ```
- **Teleport**：Vue 3 引入了 Teleport 组件，用于将子组件渲染到 DOM 的其他部分。
-```<Teleport to="body">
  <div class="modal">This is a modal</div>
</Teleport>```
- **Suspense**：Vue 3 支持 Suspense，主要用于异步组件加载的优化。
  -pending、resolve 和 fallback

```<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

**性能提升的原因：**

- Vue 3 使用了 **Proxy** 来实现响应式，而 Vue 2 使用的是 `Object.defineProperty`。Proxy 提供了更细粒度的控制，并且能够更高效地跟踪对象的变化。

---

### 2. **Composition API**

- **Composition API 解决的问题**：Vue 2 的 Options API 会导致在大型项目中，组件的逻辑容易分散，维护性差。Composition API 将相关逻辑组合在一起，提高了代码的可维护性和复用性。

- **`setup()` 函数**：`setup()` 是 Composition API 的核心，它在组件实例创建之前执行，返回的对象可以直接用在模板中。它的主要功能是提供响应式数据和方法的定义。

```javascript
setup() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

- **`reactive` 和 `ref`**：
  - `ref` 用于定义一个响应式的基本数据类型（例如数字、字符串），它返回一个带有 `.value` 属性的对象。
  - `reactive` 用于定义一个响应式的对象或数组，返回一个直接修改对象的引用。
  - ````const formState = reactive({
      name: "",
      home: "",
      des: "",
      logo: "",
    });
    const { home, des, logo } = toRefs(formState);
    const _name = toRef(formState, "name");
    const formRef = ref();```
    ````

---

### 3. **响应式系统**

- **响应式原理**：Vue 3 的响应式系统使用了 `Proxy` 对象。`Proxy` 允许我们拦截对象的读取、写入等操作，从而能在这些操作发生时进行响应。这样 Vue 可以高效地追踪依赖，避免 Vue 2 中基于 `Object.defineProperty` 的局限性。
- **`computed` 的工作方式**：`computed` 会缓存计算结果，直到其依赖的响应式数据发生变化时才会重新计算。它是通过 getter 函数返回值，并依赖 Vue 内部的依赖追踪机制来实现的。

---

### 4. **性能优化**

- **性能优化方法**：

  - 使用 **异步组件**：将不常用的组件延迟加载，减少初次加载的体积。

  ```
  defineAsyncComponent(() => import('../views/MessageView.vue'))
  ```

  - 使用 **`v-if` 和 `v-show`**：根据条件渲染组件，减少不必要的 DOM 操作。
  - 使用 **虚拟滚动** 或 **分页** 来减少渲染的大量 DOM 元素。
  - 使用 **`v-memo`** 优化 \*\*`v-for`用于避免不必要的重新渲染。

  ```
  <li v-for="item in items" :key="item.id" v-memo="[item.value]">
    {{ item.name }} - {{ item.value }}
    <button @click="item.value++">Increase</button>
  </li>
  ```

  - 使用 **`v-once`** 渲染静态内容，避免不必要的更新。
    · 使用 **`v-pre`** 跳过编译，减少不必要的模板解析。

  ```
  <MyComponent v-once></MyComponent>

  ```

- **Tree Shaking**：[^TS] 支持通过 tree shaking 来移除未使用的代码。

- **虚拟 DOM 和真实 DOM 更新机制**：Vue 使用虚拟 DOM 来优化 DOM 操作。每次数据变化时，Vue 会先在内存中创建一个新的虚拟 DOM 树，再与旧的虚拟 DOM 树进行比较，找出差异并更新实际的 DOM。

---

### 5. **Vue Router**

- **路由守卫**：在 Vue 3 中，路由守卫有两种类型：全局守卫和单独路由的守卫。全局守卫可以通过 `router.beforeEach` 等方式定义。

  ```javascript
  const router = createRouter({
    history: createWebHistory(),
    routes: [...],
  });

  router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
      return '/login';
    }
  });
  ```

  **单独路由的守卫**：

  ```
  beforeEnter: (to, from, next) => {
      if (!store.getters.isAdmin) {
        next({ name: '403' });
      } else {
        next();
      }
    },
  ```

- **路由懒加载**：通过动态导入组件来实现按需加载，减少初次页面加载的体积。

  ```
    component: () => import('../views/AdminView.vue')
  ```

- **懒加载**：通过 `defineAsyncComponent` 来实现异步组件加载。

  ```javascript
  const Home = defineAsyncComponent(() => import("./components/Home.vue"));
  ```

---

### 6. **Vuex 和状态管理**

- **Vuex 与 Composition API 下的状态管理的区别**：

  - Vuex 是全局状态管理工具，适用于需要跨多个组件共享的状态。它使用 store 对象来管理状态、变更和派发。

  ```
  store.commit('increment')
  store.dispatch('asyncIncrement')
  const double = computed(() => store.getters.doubleCount)
  ```

  - Composition API 下，你可以使用 `reactive` 或 `ref` 来管理组件内的状态，简化了状态管理的复杂性。

- **Pinia**：Pinia 是 Vue 3 的官方状态管理库，它是 Vuex 的替代品，支持 Composition API，具有更简洁的 API 和更好的 TypeScript 支持。

```
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    asyncIncrement() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
```

*state：存储数据。
*actions：包含修改状态的函数，可以是同步或异步。
\*getters：类似计算属性，返回派生数据。
main.js 中挂载 pinia

```
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .mount('#app')

```

```
  <p>Count: {{ count }}</p>
  <button @click="increment">Increment</button>
  <p>Double Count: {{ doubleCount }}</p>
  import { useCounterStore } from './stores/counter'
  const {count, increment, doubleCount} = useCounterStore()
```

---

### 7. **生命周期钩子**

- **生命周期钩子的作用**：

  - `beforeCreate`：组件实例初始化之后，数据观测和事件配置之前。
  - `created`：组件实例已创建，数据观测和事件配置已经完成。 // 初始化数据 组件创建前请求数据
  - `beforeMount`：组件挂载到 DOM 前。
  - `mounted`：组件已挂载到 DOM。 // mounted 钩子会在组件挂载后触发，适合用于发起 HTTP 请求。
  - `beforeUpdate`：数据更新时触发。
  - `updated`：数据更新后触发。

  **Vue 3 中新增的生命周期钩子**：

  - `onMounted`：替代 Vue 2 中的 `mounted`。 // mounted 钩子会在组件挂载后触发，适合用于发起 HTTP 请求。
  - `onBeforeUpdate`：替代 Vue 2 中的 `beforeUpdate`。
  - 1. 在路由切换时请求数据（beforeRouteEnter）

  ```
  beforeRouteEnter(to, from, next) {
  axios.get('https://api.example.com/data')
    .then(response => {
      next(vm => {
        vm.data = response.data
      })
    })
  }
  ```

---

### 8. **单元测试**

- **Vue 3 单元测试**：你可以使用 Jest 和 Vue Test Utils 来测试 Vue 组件。在测试时，可以模拟用户交互，检查 DOM 更新，验证计算属性等。

```javascript
import { render } from "@testing-library/vue";
import MyComponent from "@/components/MyComponent.vue";

test("renders component", () => {
  const { getByText } = render(MyComponent);
  expect(getByText("Hello World")).toBeInTheDocument();
});
```

---

### 9. **Vue 3 新特性**

- **Suspense**：`Suspense` 允许你等待异步组件的加载完成，而不会阻塞 UI 渲染。这对于在异步加载时显示加载指示器非常有用。
  组件会触发三个事件：pending、resolve 和 fallback

  ```javascript
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  ```

  <Transition> 会在一个元素或组件进入和离开 DOM 时应用动画。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上
  <!-- 由 v-if 所触发的切换
      由 v-show 所触发的切换
      由特殊元素 <component> 切换的动态组件
      改变特殊的 key 属性 -->

  ```
  <button @click="show = !show">Toggle</button>
  <Transition>
  <p v-if="show">hello</p>
  </Transition>
  ```

  <TransitionGroup> 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。

  ```
  <TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
  </TransitionGroup>
  ```

- **Teleport**：`Teleport` 用于将组件渲染到 DOM 的另一个位置，通常用于模态框、提示框等。

  ```javascript
  <Teleport to="body">
    <div class="modal">This is a modal</div>
  </Teleport>
  ```

---

### 10. **错误处理**

- **全局错误捕获**：你可以在 Vue 3 中使用 `app.config.errorHandler` 来全局捕获错误：

```javascript
const app = createApp(App);
app.config.errorHandler = (err, vm, info) => {
  console.error("Global Error Handler:", err);
};
```

---

### 11. **跨组件通信**

- **跨组件通信**：你可以通过 `provide` 和 `inject` 来传递数据，或者使用 Vuex 或 Pinia 进行全局状态管理。

```javascript
// 在父组件中提供数据
provide("someData", someData);

// 在子组件中注入数据
inject("someData");
```

provide 和 inject 不仅可以传递基本类型的数据，还可以传递对象和函数。可以注入响应式数据

```
const user = { name: 'John', age: 30 }
provide('user', user)
```

```
const greet = () => {
 console.log('Hello from parent!')
}
provide('greet', greet)
```

inject 第二个参数可以设置默认值

```
const color = inject('color', 'red')
```

computed filter slot directives

1. 执行主线程代码（同步代码）
2. 清空所有微任务队列（如 Promise.then）
3. 执行一个宏任务（如 setTimeout 回调）
4. 回到第 2 步（清空微任务）
5. 循环往复（事件循环）

promise 和 async/await 的区别
链式调用 .then() ｜ 像同步代码一样 await 等待
多个 .then() 嵌套较多 ｜ 更清晰，适合写复杂异步逻辑
.catch() 捕获异常 ｜ try/catch 捕获异常
Promise 对象 ｜ 返回的是 Promise，但看起来像普通值
老版本 JS 支持 ｜ 新版本 JS 支持

## **补充内容**

```
    <button @click="clickFn(10,$event)">点击</button>
    function clickFn(num, e) {
        console.log(e, '$event是vue内置的事件对象');
      }
```

```
vue2
data里的数据this指向window
methods里的方法this指向vm实例
```

```
    <div id="app">
      <button @click="clickFn(10,$event)">给绑定的事件函数传递事件对象</button>
      <button @click="(e)=>clickFn(e, 10)">给绑定的事件函数传递事件对象</button>
      <button @click="fn,fn">给绑定事件传递多个事件函数</button>
      <input type="button" value="登陆" @click="submit" />
      <input
        type="button"
        value="精准触发 没有任何键按下并且click的时候触发"
        @click.exact="submit"
      />
      <input type="password" @keydown="fn" />
      <input type="password" @keydown.enter.a.v.b.c="fn" />
      <button @keydown.meta.ctrl.shift.alt="fn">系统修饰符</button>
      <button @keydown.alt.a="fn">系统修饰符</button>
      <div @click="parentFn">
        父div
        <div @click.stop.prevent.capture.self.once.passive="clickFn">子div</div>
      </div>
      <p :style="{width: x}">绑定style方式</p>
      <p :style="[style1, style2]">绑定多个对象style方式</p>
      <p class="ss" :class="'ss' + a">绑定class方式--变量</p>
      <p class="ss" :class="`ss${a}`">绑定class方式--字面量</p>
      <p class="ss" :class="['bb', 'cc', a, bool? '': z]">
        绑定class方式--数组
      </p>
      <p class="ss" :class="{bb: true, cc: false}">绑定class方式--对象</p>
      <p class="ss" :class="{a,z}">绑定class方式--对象</p>
      <p>{{fullName}}</p>
      <p>{{fullName2}}</p>
      <button @click="setFullName">设置fullName</button>
      <p>[[fullName]]</p>
      <p>${fullName}</p>
      <span>template里面引入静态资源 用 @/assets/1.png @/代表src位置</span>
      <span>script里面用import 'assets/1.png' 直接引入src下的资源文件</span>
      <p>vue3 配置404页面</p>
      <div>
        { path: "/:pathMatch(.*)", // /: 随便一个name ()正则 .任意内容*任意次数
        }
      </div>
      <p>vue2 配置404页面</p>
      <div>{ path: "*", // 捕获所有路由 }</div>
      <p>router name使用</p>
      <div>
        { path: "/about/me", name: "About", component: about, }
        <router-link :to="{name: 'About'}">关于</router-link>
      </div>
      <p>redirect 写法</p>
      <div>
        { path: "/", redirect: "/about" }, { path: "/", redirect: { name:
        "About" } },
      </div>
      <p>别名 alias route显示正常 不会进行跳转到path操作</p>
      <div>
        单个别名 { path: "/about/me", alias: '/me', name: "About", component:
        about, } 多个别名 { path: "/about/me", alias: ['/me', '/mine'], name:
        "About",
      </div>
      <p>全局路由守卫</p>
      <div>
        <code>
          router.beforeEach((to, from) => { console.log(to, from); return true;
          // 返回false 会阻止导航 })
        </code>
      </div>
      <p>独享守卫</p>
      <div>
        { beforeEnter: (to, from, next) => { console.log(to, from); next();//
        next({name: 'Home'}) }
      </div>
      <p>组件里的路由守卫</p>
      <div>
        ` import { beforeRouteEnter } from "vue-router"; beforeRouteEnter((to,
        from, next) => { next(); }); `
      </div>
      <p>元数据 // meta: { // title: '首页' // },</p>
      <div></div>
    </div>
```

```
    <script>
      let vm = Vue.createApp({
        data() {
          return {
            x: "100px",
            style1: { color: "red" },
            style2: { fontSize: "30px" },
            a: true,
            z: false,
            bool: true,
            firstName: "三",
            lastName: "张",
          };
        },
        // delimiters: ["[[", "]]"],
        delimiters: ["${", "}"], // 改变分隔符
        computed: {
          fullName() {
            //依赖项的变更才会触发重新计算
            return this.lastName + this.firstName;
          },
          fullName2: {
            // 可设置的computed属性
            get() {
              return this.lastName + this.firstName;
            },
            set(val) {
              // 也就是 订阅依赖项目，当依赖项set时会emit fullName2
              const arr = val.split("");
              this.firstName = arr[1];
              this.lastName = arr[0];
            },
          },
        },
        methods: {
          setFullName() {
            // this.fullName = "李四";
            // computed property "fullName" is readonly.
            this.fullName2 = "李四";
          },
          clickFn(num, e) {
            // e.preventDefault(); // 阻止默认行为
            console.log(e, "$event是vue内置的事件对象");
          },
          parentFn(e) {
            e.stopPropagation(); // 阻止冒泡到父元素
          },
          submit() {
            console.log("登陆");
          },
          fn(e) {
            if (e.keyCode === 13) {
              // 回车键的键值
              submit();
            }
            // 随机排序 一会正 一会儿负
            ["ss", "aa", "cc"].sort((a, b) => Math.random() - 0.5);
          },
        },
      }).mount("#app");
    </script>
```

```
<template>
  <keep-alive>
    <component :is="currentComponent" />
  </keep-alive>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')

// 切换组件，比如 currentComponent.value = 'ComponentB'
</script>

```

```
Vue 2 无法检测 新添加的属性：
const obj = { a: 1 }
obj.b = 2 // ❌ Vue 不会追踪 b 的变化
this.$set(obj, 'b', 2)

Vue 2 无法检测到通过索引修改数组元素：
arr[0] = 1 // ❌ Vue 不会追踪数组的变化

如果你替换一个对象的引用，但没有绑定好依赖（比如没有使用它的属性），也可能不会更新。
const obj = { a: 1 }  // 如果模板中没有用到 obj.a，就不会重新渲染

❌ 4. 对象或数组是嵌套的，且深层修改没被 watch 到
const obj = { a: { b: 1 } }

```

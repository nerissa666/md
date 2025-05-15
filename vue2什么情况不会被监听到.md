## **vue2 什么情况数据变化会监听不到**

```
1、对象属性新增、删除属性
原因：Vue 2 初始化时只会对已有的属性做响应式处理。
解决方法：
// 使用 Vue.set
Vue.set(this.obj, 'a', 1);
// 使用 this.$set
this.$set(this.obj, 'a', 1);

2、数组索引
原因：Vue 2 无法检测通过索引直接设置元素或修改数组长度的变化。
解决方法：
// 使用 Vue.set
Vue.set(this.arr, 0, 100);
this.$set(this.arr, 0, 100);

3、直接修改数组长度
this.arr.length = 0; // ❌ 不会触发更新
手动替换整个数组（推荐用 slice/splice 等可检测的方法）
this.arr.splice(0, this.arr.length);

4. 对象属性被替换成新的对象时，原对象的属性不再被监听
this.obj = { newKey: 'value' }; // ✅ 替换后是响应式的，但原有属性不保留
解决方法：

5. 多层嵌套对象未初始化时新增属性
this.obj.a = {};        // ✅ 响应式
this.obj.a.b = 123;     // ❌ 如果 a 是后来加的，b 不响应式
this.$set(this.obj.a, 'b', 123);
```

```
✅ 总结：Vue 2 中这些变动不会自动触发视图更新
| 类型     | 不会响应             | 解决方式                       |
| ------ | ---------------- | -------------------------- |
| 对象新增属性 | `obj.a = 1`      | `Vue.set(obj, 'a', 1)`     |
| 对象删除属性 | `delete obj.a`   | 使用 Vue.delete              |
| 数组索引修改 | `arr[1] = val`   | `Vue.set(arr, 1, val)`     |
| 数组长度修改 | `arr.length = 0` | `arr.splice(...)`          |
| 嵌套新增属性 | `obj.a.b = val`  | `Vue.set(obj.a, 'b', val)` |

```

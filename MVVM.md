## **MVVM**

![MVC 模式](https://124.71.203.87/md/MVVM.png)

**双向数据绑定**

```
    const obj = new Proxy(
        { num: 0 },
        {
          get(target, key) {
            updateDOM(target[key]);
            return Reflect.get(target, key);
          },
          set(target, key, value) {
            Reflect.set(target, key, value);
            updateDOM(obj.num);
            return true;
          },
        }
      );
      updateDOM(obj.num);
      function updateDOM(num) {
        a.value = num;
        b.innerHTML = num;
      }
      a.oninput = function () {
        obj.num = this.value;
      };
```

**MyFrame.js**

```
(
    function () {
        //发布订阅者模式
        const OBSERVER = (
            function () {
                const subscribers = {};
                return {
                    on(key, cb) {
                        !subscribers[key] && (subscribers[key] = []);
                        subscribers[key].push(cb);
                    },
                    emit(key) {
                        subscribers[key] && subscribers[key].forEach(cb => cb());
                    },
                    off() { },
                }
            }
        )()
        const COMPILE = function (exp, ao, ao2 = {}) {
            with (ao) {
                with (ao2) {
                    return eval(exp); // 可以用AST语法树
                }
            }
        }
        const keyList = (() => {
            let init = true
            let list = []
            return {
                init() {
                    return init;
                },
                open() {
                    init = true
                },
                close() {
                    init = false
                },
                get() {
                    return [...new Set(list)];
                },
                push(key) {
                    list.push(key);
                },
                clear() {
                    list = [];
                }
            }
        })()
        // 创建一个frame实例
        class Init {
            constructor(data) {
                this.$data = new Proxy(data, {
                    get(target, key) {
                        if (key !== Symbol.unscopables) {
                            keyList.push(key);
                        }
                        return Reflect.get(target, key);
                    },
                    set(target, key, value) {
                        Reflect.set(target, key, value);
                        OBSERVER.emit(key);
                        return true;
                    }
                })
            }
            compileTextNode(node, text, ao = {}) {
                node.textContent = text.replace(/{{(?!{)(.*?)}}/g, (match, ...res) => {
                    for (let i = 0; i < res.length; i++) {
                        res[i] = res[i].trim();
                        return COMPILE(res[i], this.$data, ao)
                    }
                })
            }

            compileAttribute({ node, name, value }, ao = {}) {
                // m-model  m-bind  m-on  m-for  m-if  m-else  m-show
                // m-bind: :
                if (/^m-bind:(.+)$/.test(name) || /^:(.+)$/.test(name)) {
                    const _value = COMPILE(value, this.$data, ao)
                    node.setAttribute(RegExp.$1, _value);
                    node.removeAttribute(name);
                }
                if (/^m-model$/.test(name)) {
                    const nodeType = node.type
                    const _value = COMPILE(value, this.$data, ao);
                    node.removeAttribute(name);
                    if (nodeType === 'text' || nodeType === 'textarea') {
                        node.value = _value;
                        keyList.init() && // init 是为了区分是初次渲染 还是响应式更新
                            node.addEventListener('input', e => {
                                const type = typeof (_value)
                                this.$data[value] = (e.target.value && type === 'number') ? !isNaN(Number(e.target.value)) ? Number(e.target.value) : e.target.value : e.target.value;
                            });
                    }
                    if (nodeType === 'radio') {
                        node.checked = _value === node.value
                        keyList.init() &&
                            node.addEventListener('change', e => {
                                this.$data[value] = node.value;
                            });

                    }
                    if (nodeType === 'checkbox') {
                        node.checked = _value.includes(node.value);
                        keyList.init() &&
                            node.addEventListener('change', e => {
                                if (node.checked) {
                                    this.$data[value].includes(node.value) ? '' : this.$data[value] = [...this.$data[value], node.value];
                                } else {
                                    this.$data[value].includes(node.value) && (this.$data[value] = this.$data[value].filter(item => item !== node.value));
                                }
                            });
                    }
                    if (nodeType === 'select-one') {
                        node.value = _value;
                        keyList.init() &&
                            node.addEventListener('change', e => {
                                this.$data[value] = node.value;
                            });
                    }
                    if (nodeType === "select-multiple") {
                        //设置options的selected
                        [...node].forEach(option => {
                            option.selected = _value.includes(option.value)
                        })
                        keyList.init() &&
                            node.addEventListener('change', (event) => {
                                const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
                                this.$data[value] = selectedOptions;
                            });
                    }
                }
                if (/^m-for$/.test(name)) {
                    //item in list
                    /^\s*(.+?)\s+in\s+(.+?)\s*$/.test(value)
                    // (item, index) in list
                    // /^(.+?),?\s*(.+?) in (.+)$/.test(value)
                    let reg = /^\((.+?)(,\s*(.+?))?\)$/
                    let attrs = RegExp.$1,
                        trueValue = RegExp.$2;
                    reg.test(attrs)
                    let attr = RegExp.$1.trim(),
                        index = RegExp.$3.trim();
                    let item = COMPILE(attr, this.$data, { [attr]: trueValue.trim() })
                    let list = COMPILE(item, this.$data)
                    const frg = document.createDocumentFragment();
                    list.forEach((ite, i) => {
                        const cloneNode = node.cloneNode(true);
                        cloneNode.removeAttribute('m-for');
                        this.recurrentCompileNode.call(this, cloneNode.childNodes, { [attr]: ite, [index]: i });
                        frg.appendChild(cloneNode);
                    })
                    const parent = node.parentNode;
                    parent.innerHTML = '';
                    parent.appendChild(frg);

                }
                if (/^m-if$/.test(name)) {
                    const _value = COMPILE(value, this.$data, ao);
                    node.removeAttribute(name);
                    if (!!_value) {
                        // 借助虚拟dom记住具体的前后位置以及父节点
                        !node && node.parentNode.appendChild(node);
                    } else {
                        node && node.parentNode.removeChild(node);
                    }
                }
                if (/^m-show$/.test(name)) {
                    //读取this.$data 会触发get对应的List记录
                    const _value = COMPILE(value, this.$data, ao);
                    node.removeAttribute(name);
                    node.style.display = !!_value ? '' : 'none';
                }
                // 读完后遍历该节点用到的所有data 并且订阅对应的更新cb
                const keys = keyList.get();
                keys.forEach(key => {
                    OBSERVER.on(key, this.compileAttribute.bind(this, { node, name, value }, ao));
                })
                keyList.clear();
            }
            recurrentCompileNode(childNodes, ao = {}) {
                childNodes.forEach(node => {
                    if (node.nodeType === 1) { //元素节点
                        // 解析当前递归节点的标签属性
                        const attributes = [...node.attributes];
                        for (let i = 0; i < attributes.length; i++) {
                            const { name, value } = attributes[i];
                            this.compileAttribute.call(this, { node, name, value: value.trim() }, ao);
                        }
                        // 递归解析末梢节点的文本内容
                        if (!node.hasAttribute('m-for')) {
                            this.recurrentCompileNode.call(this, node.childNodes, ao)
                        }
                    }
                    if (node.nodeType === 3) { //文本节点
                        let text = node.textContent;
                        this.compileTextNode.call(this, node, text, ao);
                        const keys = keyList.get();
                        keys.forEach(key => {
                            OBSERVER.on(key, () => {
                                this.compileTextNode.call(this, node, text, ao);
                            });
                        })
                        keyList.clear();
                    }
                });
                return this;
            }
            mount(selector) {
                const el = document.querySelector(selector);
                const childNodes = el.childNodes;
                keyList.open();
                this.recurrentCompileNode.call(this, childNodes);
                keyList.close();
                return this;
            }
        }
        window.MyFrame = {
            createApp(data) {
                return new Init(data);
            }
        };
    }
)()
```

**index.html**

```
    <div id="app">
      {{num}} {{sum}} {{45}}<br />
      {{num + a}} {{4+5}}
      <div :id=" id "></div>
      <span m-bind:id=" id "></span>
      <ul>
        <li>{{num}}</li>
        <li>{{sum}}</li>
        <li>{{a}}</li>
      </ul>
      <input type="text" m-model="a" />
      <textarea m-model="a"></textarea>
      <p m-model:a="a"></p>
      <input type="radio" value="1" m-model="sex" />男
      <input type="radio" value="0" m-model="sex" />女
      <p>{{friuts}}</p>
      <input type="checkbox" value="苹果" m-model="friuts" />苹果
      <input type="checkbox" value="香蕉" m-model="friuts" />香蕉
      <input type="checkbox" value="橘子" m-model="friuts" />橘子
      <input type="checkbox" value="橙子" m-model="friuts" />橙子
      <p>{{week}}</p>
      <select name="" id="" m-model="week">
        <option value="1">周一</option>
        <option value="2">周二</option>
        <option value="3">周三</option>
        <option value="4">周四</option>
        <option value="5">周五</option>
      </select>
      <h6>{{selectMultiple}}</h6>
      <select multiple m-model="selectMultiple">
        <option value="1">周一</option>
        <option value="2">周二</option>
        <option value="3">周三</option>
        <option value="4">周四</option>
        <option value="5">周五</option>
        <option value="6">周六</option>
        <option value="0">周天</option>
      </select>
      <ul>
        <li m-for="(item, index)  in  list"><b>{{index+4}} : </b>{{item+1}}</li>
      </ul>
      <h3 m-if="bool">这是一个标题</h3>
      <h1 m-show="bool">这是一个show</h3>
    </div>
    <script src="./MyFrame.js"></script>
    <script>
      let VM = MyFrame.createApp({
        num: 10,
        sum: "hello world",
        a: 23,
        id: "goudan",
        sex: "0",
        friuts: ["苹果", "香蕉"],
        week: "2",
        bool: true,
        selectMultiple: ["1", "3"],
        list: [1, 2, 3, 4, 5],
      }).mount("#app");
    </script>
```

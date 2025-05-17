(function () {
    const Queue = (function () {
        const symbol = Symbol("queue");
        return class {
            constructor() {
                this[symbol] = [];
                this.ifRun = false
            }
            enqueue(...r) {
                // 入队
                this[symbol].push(...r);
            }
            dequeue() {
                // 出队 返回第一个元素并删除
                if (this[symbol].size === 0) console.warn("队列为空");
                return this[symbol].shift();
            }
            first() {
                // 返回第一个元素
                if (this[symbol].size === 0) console.warn("队列为空");
                return this[symbol][0];
            }
            clear() {
                // 清空队列
                this[symbol] = [];
            }
            size() {
                return this[symbol].length;
            }
        };
    })();
    const queue_map = new Map()

    function parsePx(value) {
        if (typeof value === 'number') {
            return `${value}px`
        } else if (typeof value === 'string' && !isNaN(Number(value))) {
            return `${parseInt(value)}px`
        } else {
            return value
        }
    }
    class Init {
        /**
         * 返回的$方法需要做什么呢 他应该是个什么类型呢
         * 1、他通过.方法调用，那么他应该是个对象，至少是返回一个对象
         * 2、他可以在任何地方/组件中调用，且相互独立互不影响，所以他不能是个固定内存地址的对象，至少每次返回一个新对象
         * 3、那么只是个空对象就可以吗，他每次返回带有 固定的 $解决方法特性属性、方法，什么情况可以实现呢
         * 4、new 方法
         * 5、所以他的原型应该是个class
         * 6、那他有哪些固定的属性、方法。需要实现什么功能，并分别有哪些特性呢
         * 7、参照现有的jquery用法。在动画队列里：
         *      a：$('#wrap') $('.app') 获取dom 的NodeList
         *      b：$('#wrap').animate({"width": "100px", "height": "100px"}, 1000) 添加动画需要 style对象 和 time
         *      c：$('#wrap').css("width") 单个属性获取属性值；$('#wrap').css("width", "100px") 多个属性设置属性值;  $('#wrap').css("width", 100) 通过数字设置
         * 8、document只能针对单个dom处理，而$需要把用list作为整体处理，所以需要把拿到的nodelist遍历出来分别绑定 改变样式的方法
         *      each
         * 9、处理接收数字还是字符串的方法 ‘100px’ 和 数字100 应该怎么处理
         * 10、将animate分解为 transition来实现的方法
         * 11、怎么处理transition执行异步但是出队是同步的问题，需要等待上一个transition执行完，才执行下一个dequeue或者说下一个对话，或者是下一个才dequeue
         */
        constructor(selector) {
            if (selector[0] instanceof Node) { // 选择器selector 可以接收dom对象
                this.elements = [selector]
            } else {
                this.elements = document.querySelectorAll(selector) // 拿到的是个NodeList
            }
            // 将获取到的元素通过index添加到当前实例 ？为什么不直接用数组呢。因为通过new方法创建 返回的是个对象，所以只能模拟NodeList需要的属性特征
            this.elements.forEach((item, index) => {
                this[index] = item
            })
            this.length = this.elements.length // 变成一个类数组
        }

        each(fn) {
            for (let i = 0; i < this.length; i++) {
                fn.call(this[i], this, i) // 给nodelist的每个dom都执行同一个修改样式的方法，实现批量修改样式
            }
        }
        css(options, value) {
            if (!value && typeof options === 'string') {
                return window.getComputedStyle(this[0])[options] // obj不判断了 只能是属性
            }
            // $("#wrap").css({
            //     width: "300px",
            //     height: "300px",
            // });
            this.each(function () {
                if (typeof options === 'object') {
                    for (let key in options) {
                        this.style[key] = parsePx(options[key])
                    }
                    return
                }
                this.style[options] = parsePx(value)
            })
        }

        animate(style, time = 300) {
            this.each(function ($this, i) {
                // 一个dom一个queue
                let queue = queue_map.has(this) ? queue_map.get(this) : new Queue()
                queue_map.set(this, queue)
                // transition: width 2s
                queue.enqueue((res) => { // res 接收then方法
                    // $可以接收一个dom对象，返回一个$对象
                    const tProperty = window.getComputedStyle(this).transition
                    $this.css('transition', tProperty + ' ' + time + 'ms')
                    $this.css(style)
                    void this.offsetWidth // 重新计算宽度 触发重绘
                    this.addEventListener('transitionend', () => {
                        res()
                    }, { once: true })
                })

                if (!queue.ifRun) {
                    $this.runQueue(queue)
                }
            })
            return this
        }
        runQueue(queue) {
            if (queue.ifRun) return
            queue.ifRun = true
            // 循环出队
            new Promise(queue.dequeue()).then(() => {
                /**
                 * 因为出队的内容在入队就执行了，所以为了鉴权按照Queue的出队顺序执行，
                 * 需要定义一个执行状态，来控制出队顺序，只有dequeue方法时才能放行
                 * */
                queue.ifRun = false
                if (queue.size()) {
                    this.runQueue(queue)
                }
            })
        }

    }
    window.$ = window.jQuery = function (selector) {
        return new Init(selector)
    }
})()


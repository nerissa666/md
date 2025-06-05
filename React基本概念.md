## **React 基本概念**

** React VS Vue**

|              | React                                      | Vue                                                                |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------ |
| 组件化方式   | 组件包含状态和行为，所有组件共享一个状态树 | 每个组件都有自己的状态和行为，并且可以很容易将数据和行为绑定在一起 |
| 数据驱动方式 | 单项数据流                                 | 双向数据绑定                                                       |
| 模板语法     | JSX，all in js                             | Template、js、css，支持指令                                        |
| 生命周期     | 初始化、更新、卸载                         | 创建、挂载、更新、销毁                                             |
| 状态管理方式 | Redux、Mobx、zustand                       | Vuex、Pinia                                                        |
| 性能优化方式 | React.memo、shouldComponentUpdate          | keep-alive、v-if                                                   |

** React hooks 实现生命周期**

| 生命周期方法             | Hooks 组件                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| constructor              | useState                                                                                                            |
| getDerivedStateFromProps | useEffect 手动对比 props， 配合 useState 里面 update 函数                                                           |
| shouldComponentUpdate    | React.memo                                                                                                          |
| render                   | 函数本身 函数被执行后的返回值，也就是 return 的内容                                                                 |
| componentDidMount        | useEffect 第二个参数为[]，表示只在函数第一次执行的时候执行，没有 dependcy，就不会触发重新执行，直到卸载，再次初始化 |
| componentDidUpdate       | useEffect 配合 useRef                                                                                               |
| componentDidCatch        | 无                                                                                                                  |
| getDerivedStateFromError | 无                                                                                                                  |

```
constructor() {
    this.state = {
        count: 0,
    };
}
this.setState({ count: this.state.count + 1 });

let [count, setCount] = useState(0);
setCount(count + 1);
```

```
// getDerivedStateFromProps 是一个静态生命周期方法，用于在组件接收新props时候更新内部state

static getDerivedStateFromProps(nextProps, prevState) {
  // 返回一个对象来更新 state，或者返回 null 表示不更新
  if (nextProps.value !== prevState.prevValue) {
    return {
      currentValue: nextProps.value,
      prevValue: nextProps.value
    };
  }
  return null;
}

const MyComponent = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]); // 当依赖项数组 value更新时候，也就是组件接收新的props时候，才更新内部state

  return <div>{currentValue}</div>;
};

```

```
// shouldComponentUpdate 返回true 和 false来决定该组件是否重新渲染 当返回false时，组件不会重新渲染

 shouldComponentUpdate(nextProps, nextState) {
    // 只有当 count 变化时才重新渲染
    return nextProps.count !== this.props.count;
  }

// React.memo 是一个高阶组件（Higher Order Component）包裹函数组件，自动对函数的props做浅层比较，决定是否重新渲染。也可以自定义比较函数

const MyComponent = React.memo((props) => {
  return <div>{props.value}</div>;
});

const MyComponent = React.memo(function ({ count }) {
  return <div>{count}</div>;
}, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count; // 返回 true 不重新渲染 自定义比较函数，可以写深比较
});

```

```
// useRef 作用是创建一个可变的引用对象，他在组件的整个生命周期中保持不变的引用地址，常用于：获取dom元素，保存可变值，而不会出发组件重新渲染，记录上一次的值，类似于componentDidUpdate的 prevProps/prevState

function PreviousValueDemo({ value }) {
  const prevValue = useRef();

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div>
      <p>当前值: {value}</p>
      <p>上一个值: {prevValue.current}</p>
    </div>
  );
}

<PreviousValueDemo value={3} />
```

```
/**
* useEffect 和 useRef 搭配使用 用于访问dom或保存跨渲染周期的可变值，实现某些副作用逻辑，比如：
* 初始化只执行一次的逻辑（如设置监听器）
* 判断是否是组件第一次渲染
* 存储上一次的值或某些外部引用（如定时器）
*/

import {useEffect, useRef} from 'react'
function FocusInput(){
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus() // 组件挂载后自动聚焦
  },[]) // 不写dependency array， 每次组件render后都触发

  return <input ref={inputRef} type="text"/>
}

function example(){
  const isFirstRender = useRef(true) // 初始化
  useEffect(()=>{
    if(isFirstRender.current) {
      console.log('第一次渲染')
      isFirstRender.current = false
      return
    }
    console.log('更新渲染')
  })
}

function PreviousValue ({value}:{value:number}) {
  const prevValue = useRef<number>(0)
  useEffect(()=>{
    prevValue.current = value
  }, [value])
  return (
    <div>value:{ value }</div>
    <div>prevValue:{prevValue.current}</div>
  )
}

function Timer (){
  const timeRef = useRef<NodeJS.Timeout>()
  useEffect(()=>{
    timeRef.current = setInterval(()=>{
      console.log('hello')
    })
    return ()=>{
      clearInterval(timeRef.current)
    }
  },[])
}
```

```
/** // useMemo 是一个类高阶函数，接收函数，返回函数； React.memo是高阶组件，接收组件，返回组件
* useMemo 用于缓存计算结果，避免每次渲染时都重新计算，提升性能。类似于vue的computed， 如果dependencies没有变化，跳过重新计算，返回上一次的值
* 昂贵的计算，排序、筛选、数学计算等
* 避免每次渲染都新建引用对象，（如传给子组件的props）
* 搭配React.memo,避免子组件不必要的渲染
*/

const memoizedValue = useMemo(()=>{
  // 复杂的计算过程
  return computedResult
}, [dependencies])

function ExpensiveComputed({count}:{count:number}) {
  const computedValue = useMemo(()=>{
    console.log('计算中...')
    let sum = 0
    for (let i=0;i<1e7;i++) {
      sum += i
    }
    return sum + count
  },[count])
  return <div>computedValue:{computedValue}</div>
}

const Child = React.memo(({data}:{data:{value:number}})=>{
  return <div>{data.value}</div>
})

function Parent({count}:{count:number}){
  // 如果不memorized，每次都会传入一个新对象，React.memo 默认浅比较，Child总会重新渲染
  const memorizedData = useMemo(()=>{value: count},[count])
  return <Child data={memorizedData}
}

/**
* 不要过度使用useMemo，只有在性能问题时才能使用
* 它不是为了避免函数运行，而是为了避免不必要的重复计算
* 如果依赖项总是变化（如非memo的对象或函数），就无法缓存
*/

```

```
/**
* useCallback 用于缓存函数的引用地址，避免函数在每次组件渲染时都重新创建，常用于：
* 传递函数给子组件，（配合React.memo使用）
* 用于需要函数作为依赖项数组的时候，避免因为函数引用地址变了而触发更新
*/

const memoizedCallback = useCallback(()=>{
  // 函数体
},[dependencies]) // 只有当依赖项发生变化时，useCallback才会返回新的函数，否则返回上一次缓存的函数引用

const Child = React.memo(({onClick}:{onClick:()=>void})=>{
  console.log('Child render')
  return <button onClick={onClick}>click me </button>
})

function Parent(){
  const [count,setCount] = useState(0)
  const handleClick = useCallback(()=>{
    console.log('clicked')
  },[]) // 组件挂载时创建一次
  return (
    <div>
      <Child onClick={handleClick}/>
      <button onClick={()=>setCount(count++)}>+1</button> //用useCallback 父组件更新子组件就不会更新了
    </div>
  )
}

function SearchComponent({query}:{query:string}){
  const fetchData = useCallback(()=>
    console.log('fetching for query...',query)
    // fetch logic
  }, [query])
  useEffect(()=>{
    fetchData() // 只有query变化时才会触发
  },[fetchData]) // 如果不使用useCallback，每次组件渲染的时候，fetchData都是新函数，useEffect就会被触发
  return <div>SearchQuery:{query}</div>
}

// 不要为所有的函数使用useCallback，会增加代码复杂度，甚至可能导致性能下降
// 一般只在函数作为props传递给子组件、或者依赖项很敏感的useEffect时使用
```

```
// useReducer 用于管理复杂组件状态，非常适合替代多个useState;就是React内置的轻量版Redux，把状态更新逻辑集中管理在一个reducer函数里

const [state, dispatch] = useReducer(reducer,initialState)
/**
* state 当前状态
* dispatch(action) 发送action来改变状态
* reducer(state,action) 返回新的状态
*/

// 计数器
import {useReducer} from 'react'
const initialState = {count: 0}
function reducer(state,action) {
  switch(action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'decrement':
      return{
        count: state.count - 1
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}
function Counter(){
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={()=>dispatch({type:'increment'})}>+1</button>
      <button onClick={()=>dispatch({type:'decrement'})}>-1</button>
      <button onClick={()=>dispatch({type:'reset'})}>重置</button>
    </div>
  )
}

// 表单状态管理
```

```
// setState 是异步还是同步
 react 18 之后：setState都会表现为异步（即批处理）
 之前：
    在Promise的状态更新、js原生事件、setTimeout、setInterval..中是同步的，
    在react的合成事件中，是异步的。
```

```
PureComponent 和 Component的区别:
  component需要手动实现shouldComponentUpdate，PureComponent通过浅比较默认实现了shouldComponentUpdate方法
```

```
React 事件和原生事件的执行顺序:
  为什么要有合成事件：
    在传统事件里，不同的浏览器需要兼容不同的写法，在合成事件中，React提供统一的事件对象，磨平了浏览器的兼容差异性
    React通过顶层事件监听的形式，通过事件委托的方式来统一管理所有事件，可以在事件上区分事件优先级，优化用户体验
  事件委托：
    事件委托的意思就是，可以通过给父元素绑定事件委托，通过事件对象的taeget属性可以获取到当前触发阶段的dom元素，来进行统一管理
    写原生dom循环渲染的时候，要给每个子元素都添加dom事件，最简单的方式就是通过事件委托在父元素做一次委托，通过target属性判断区分做不同的操作
  事件监听：
    主要用到了addEventListener和removeEventlistener
    最新React18事件执行顺序： 合成事件，事件委托到根节点document， 捕获阶段到子节点，冒泡节点再到根节点
      父 capture → 子 capture → 子 bubble → 父 bubble ；事件总是先 capture（从外到内），再 bubble（从内到外）
      如果同时监听了 React 和原生 DOM 事件：React 事件 -> 原生事件
        原因：React 事件是统一绑定在 document 的冒泡阶段之前，所以会先触发 React 的监听器。
```

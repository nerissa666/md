## **TypeScript**

```
// 全局安装
npm install -g typescript
tsc --version
tsc --init // 生成tsconfig.json
// 局部安装
npm install typescript
npx tsc --version
// 编译
tsc hello.ts
// 运行
node hello.js
// 安装 编译+运行
npm i ts-node -g
// 编译+运行
ts-node hello.ts

/**
* @param
* @return
*
 */
```

```
// ts类型推断
let x = 10
x+='1'
```

```
// ts静态类型
let a: number = 1;
let b: string = "hello";
let c: boolean = true;
let d: any = "world";
let e: void = undefined;
let f: null = null;
let g: undefined = undefined;

// 数组类型
let f1: Array<number> = [1, 2, 3];
let f2: number[] = [1, 2, 3];

let p: any[] = ["张三", 25];
p[1] = "22";
console.log(p);

// 元祖类型 数组第一位固定放字符串，第二位固定放数字
let z: [string, number] = ["张三", 25];
// z[1] = '22'

// 对象
let obj: { name: string; age: number } = {
  name: "张三",
  age: 25,
};
// 定义类型接口
interface Person {
  name: string;
  age: number;
}
let obj2: Person = {
  name: "张三",
  age: 25,
};

// 枚举类型
enum SEX {
  MALE,
  FEMALE,
}
/**
 *  枚举类型默认从0开始，依次递增
 *  枚举类型是普通对象，键名只能是 string｜number
 *  枚举类型可以双向取值，用属性值得到属性名，用属性名得到属性值
 */

console.log(SEX.MALE);
console.log(SEX.FEMALE);
console.log(SEX[0]);
console.log(SEX[1]);
/*
 * 枚举类型可以手动赋值，以第一个为基数递增
 * 枚举类型第一个值如果是数字，后面的枚举值会自动递增
 * 如果给第二个赋值 之前的按初始值，之后的按当前递增
 * 如果给第二赋值不是数字，后面必须赋值，之前按默认初始值0递增
 */
enum CORLOR {
  RED,
  GREEN = 100,
  BLUE,
}
console.log(CORLOR.RED);
console.log(CORLOR.GREEN);
console.log(CORLOR.BLUE);

enum COLOR2 {
  RED,
  GREEN = "green",
  BLUE = "blue",
}
console.log(COLOR2.RED);
console.log(COLOR2.GREEN);
console.log(COLOR2.BLUE);

// 函数类型
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2);

function sum2([a, b]: [number, number]) {
  return a + b;
}
function sum3([a, b = 10]: number[]) {
  return a + b;
}
function sum4([a, b]: Array<number>) {
  return a + b;
}
interface Sum {
  (x: number, y: number): number;
}
function sum5({ a, b }): Sum {
  return a + b;
}
function sum6(a: number, b: number, ...c: number[]): number {
  return a * b + c.reduce((x: number, y: number) => x + y);
}
interface Sum2 {
  (a: number, b: number): number;
}
const sum7 = (a, b): Sum2 => {
  return a + b;
};
const sum8 = (a: number): number => a;
const fu: Sum2 = (a, b) => a + b;
const fn: (a: number, b: number) => number = (x, y) => x + y;
interface Person2 {
  a: number;
  b: number;
}
interface fnType {
  (p: Person2): string;
}
let fn2 = (p: Person2) => p.a + p.b + "";
let fn3: fnType = (p) => p.a + p.b + "";
console.log(fn2({ a: 1, b: 2 }));
console.log(fn(2, 3));
console.log(sum7(2, 3));
sum2([1, 2]);
sum3([1]);
sum6(1, 2, 3, 4, 5);

// interface
interface Person3 {
  name: string;
  age?: number; // 可选属性 可有可无
  id: number | string; // 联合类型 所有可以的类型
  [propName: string]: any; // 任意属性 ke扩展属性
  say(a: number): string; // 方法
  fn?: fnType;
}
let p1: Person3 = {
  name: "张三",
  age: 25,
  id: "123456",
  status: "ok",
  sex: "male",
  say() {
    return "hello";
  },
};
let p2: Person3 = {
  name: "张三",
  id: 1,
  111: 222,
  say() {
    return "hello";
  },
};
let id: number | string = 1;
id = "123456";

// 函数返回值 void 代表无返回值 never 代表永远不会有返回值
let ac = void 2; // undefined
console.log(ac);

let ab = function (): never {
  // 跑错之后永远不会return
  throw new Error("error");
};
// console.log(ab());
let ad = function (): void {
  console.log(111);
};
console.log(ad());

interface T extends Person {
  sex: string;
  status: string;
}

// 联合类型
interface A {
  name: string;
}
interface B {
  age: number;
}
type C = A | B;
let we: C = {
  name: "张三",
  age: 25,
};
interface D {
  readonly name: string;
  age: number;
}
let wd2: D = {
  name: "张三",
  age: 25,
};
// wd2.name = "李四";
// enum 扩展枚举
// enum 不能直接继承或扩展，使用联合类型进行“逻辑上的扩展”
enum Status {
  Pending = "Pending",
  Approved = "Approved",
}
enum Status2 {
  name = "Pending",
  age = "Approved",
}
// 合并为一个联合类型
type Status3 = Status | Status2;
function handleStatus(status: Status3) {
  console.log(status);
}
handleStatus(Status.Pending);
//使用常量对象代替 enum 并支持扩展
//使用对象字面量 + as const
const BaseStatus = {
  Pending: "Pending",
  Approved: "Approved",
} as const;
const Status4 = {
  ...BaseStatus,
  Rejected: "Rejected",
};
type Status5 = (typeof BaseStatus)[keyof typeof BaseStatus];
function handleStatus2(status: Status5) {
  console.log(status);
}
handleStatus2(BaseStatus.Pending);

// 字面量类型 string｜number｜boolean｜bigint｜symbol
let df: "ok" = "ok";
let er: 20 = 20;
let ert: true = true;
let oo: "男" | "女" = "男";

// type 定义类型别名
// 联合类型 ｜
type SNB = string | number | boolean;
let ewr: SNB = 1;
interface Person4 {
  name: string;
  age: number;
}
interface Person5 {
  sex: string;
  status: number;
}
type Person6 = Person4 | Person5;
let per9: Person6 = {
  name: "张三",
  age: 25,
  sex: "string",
  status: 9,
};
console.log(per9);
// & 交叉类型
type SNB2 = string & number; // 基础类型不能交叉
// let ewr2: SNB2 = 1;
// let arr: number[]&string[] = [1,2,"3"];
// let arr: number[]｜string[] = [1,2,"3"];
type Person7 = Person4 & Person5;
let per10: Person7 = {
  name: "张三",
  age: 25,
  sex: "string",
  status: 9,
};
console.log(per10);

// any 类型 告诉typescript 忽略类型检查
let et: any = "32r23";
let et2: number = 1;
// et2 = et;
et = et2;
console.log(et2, et);

// unknown 类型 安全any
let wert: unknown = "32r23";
let wert2: number = 1;
// wert2 = wert; // 不能将类型“unknown”分配给类型“number”。

// 类型断言 <类型>值 或者 值 as 类型
wert = 1111;
wert2 = wert as number;
wert = true;
let zz = <number>wert; // 类型断言会当前导致类型丢失，但是可以赋值给number
console.log(zz);
wert = 222;
//使用类型判断更安全的使用 类型断言
if (typeof wert === "number") {
  //   wert2 = wert as number;
  wert2 = <number>wert;
}
console.log(wert2, wert);
wert = wert2; // 但是any类型可以赋值给unknown
// console.log(wert2, wert);
interface Person8 {
  name: string;
}
// 判断key isin object
let objqw: Person8 = {
  name: "张三",
};
// 判断key是否存在
if ("name" in objqw) {
  console.log(obj["name"]);
}
// 使用 instanceof 判断对象类型
console.log(objqw instanceof Object); // true
// 使用 Object.prototype.toString.call() 获取对象类型
console.log(Object.prototype.toString.call(objqw)); // [object Object]
// 在TypeScript中，可以使用类型断言来确认类型
console.log((objqw as Person8).name); // 张三

// 怎么获得interface 定义的具体类型
interface ss {
  name: string;
  age: number;

  type: "ss";
  [prop: string]: any; // 索引签名，允许任意属性名和值类型 [propName: string]
}
let ss1: unknown = {
  name: "张三",
  age: 25,

  type: "ss",
};
// 类型断言前判断类型
if ((ss1 as ss).type === "ss") {
  let ss2: ss = <ss>ss1;
  console.log(ss2);
}
// 泛型
// 把类型的定义推迟到使用时，在调用时传入具体类型
function fne<T>(a: T): T {
  // 三个T都表示同一种类型
  return a;
}
fne(1);
fne("1");
fne(true);

function fne2<A>(a: A) {
  return a;
}
fne2(1); // 推断为number
fne2<string>("1"); // 指定为string
fne2<boolean>(true);
// console.log(fne2<string>(true));
function fmn<X, Y>(a: X, b: Y) {
  return [a, b];
}
fmn<string, number>("1", 2);

// 泛型继承
interface L {
  length: number;
}
function ddf<T extends L>(a: T) {
  return a.length;
}
ddf(["123", "234"]);
// 泛型推断关系
// 元泛型 入参类型推断 出参类型推断
function ddf3<T>(a: T[]): T {
  return a[0];
}
ddf3<string>(["123", "234"]);
ddf3(["123", "234"]);

// 函数类型定义
let fnwd: (a: number) => number = (a) => a + 1;
interface fnsdd {
  (a: number): number;
}
let fjs: fnsdd = (a) => a + 1;
let ergs: <T>(a: T) => T = (a) => a;
interface FH {
  <T>(a: T): T;
}
let ertwde: FH = (a) => a;
console.log(ertwde("evev"));
```

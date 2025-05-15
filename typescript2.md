## **typescript**

```
    // 实例的常量属性
      class A {
        a = 1; // 实例的属性
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.z = 10; // 实例的常量属性
        }
        sum() {
          return this.x + this.y;
        }
        // class 的静态属性
        static s = 10; // 静态属性
        static b(x, y) {
          return x + y;
        }
      }
      let a = new A(1, 2);
      console.log(a);
      console.log(A.s, A.b(1, 2));
      A.z = "123"; // 静态属性不可以被实例继承
      console.log(A.z);
```

```
    class A {
    // 实例的类型申明
    x: number;
    y: number;
    type: string = "A"; // 静态的类型申明
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    sum() {
        return this.x + this.y;
    }
    static ss: string = "B"; // 静态的类型申明
    static b(): string {
        return "B";
    }
    }
    let a = new A(1, 2);

    //class 继承
    class Persion {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    say() {
        console.log(this.name + " " + this.age);
    }
    }
    class Teacher extends Persion {
    id: number | string;
    constructor(name: string, age: number, id: number | string) {
        super(name, age);
        this.id = id;
    }
    print() {
        console.log(this.name + " " + this.age + " " + this.id);
    }
    }
    let t = new Teacher("张三", 20, "1");
    console.log(t);

    // 抽象类
    abstract class Animal {
    // 抽象类不能被实例化
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    //   say() {
    //     console.log("say...");
    //   }
    abstract say(): void; // 抽象方法，子类必须实现该方法
    }
    class Dog extends Animal {
    say() {
        console.log("汪汪汪");
    }
    }
    let d = new Dog("旺财", 2);
    d.say();
    class Cat extends Animal {
    say() {
        console.log("喵喵喵");
    }
    }
    let c = new Cat("小花", 2);
    c.say();
    // let an = new Animal("小花", 2);
    // an.say();

    // (function(){
    //     class Animal{

    //     }
    //     class Dog extends Animal{

    //     }
    //     class Cat extends Animal{

    //     }
    //     window.Dog = Dog;
    //     window.Cat = Cat;
    // })()

    // implemets 接口
    interface P {
    name: string;
    readonly age: number;
    say(): void;
    }
    class PersionS implements P {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    say() {
        console.log(this.name + " " + this.age);
    }
    }

    /**
    * public 公共属性 wr 可读可写 默认为public
    * private 私有属性 外部不可读写 需要通过set get 方法实现 class 内部可写 class 外部不可写 只能自己使用 继承自他的子类不可用
    * protected 保护属性 class 内部、子类中可用
    */
    type Sex = "男" | "女"; // 联合类型 // 字面量类型
    class Person {
    public name: string; // 公共属性
    private _age: number; // 私有属性  不能通过.方法修改
    protected _sex: Sex; // 保护属性 class内部、子类中可用
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this._age = age;
        this._sex = sex;
    }
    set age(value: number) {
        // 私有属性 通过set方法修改 起个别名识别age
        if (value > 0) {
        this._age = value;
        }
    }
    get age() {
        // 通过get方法获取私有属性
        return this._age;
    }
    set sex(value: Sex) {
        this._sex = value;
    }
    get sex() {
        return this._sex;
    }
    say() {
        console.log(this.name + " " + this.age);
    }
    }
    let p = new Person("张三", 20, "男");
    // p.age = 21;
    // console.log(p.age);
    p.age = 21;
    console.log(p, p.age);
    console.log(p, p.sex);
    class TeacherS extends Person {
    sayName() {
        // console.log(this.name + " " + this._age); // 私有属性 子类不可用
        console.log(this.name + " " + this._sex); // 保护属性 子类可用
    }
    }
    let tS = new TeacherS("李四", 21, "男");
    tS.sayName();
```

```
    // tsconfig.json
    {
        include: [
            // * 代表所有文件 ** 代表所有目录
            "src/**/*.ts",// 编译哪些文件 src 目录下的 /**/所有层的 所有ts文件
            "./*.ts", // 编译哪些文件 项目根目录下 所有ts文件
            './*', // 编译当前目录下所有文件
        ],
        "exclude": ["./*.js", "./01.ts"], // 排除哪些编译文件
        "target": "ESNext", // 编译成什么js版本
        "outDir": "./dist/js", // 编译结果的输出目录
        "outFile": "./dist/js/bundle.js", // 将编译结果输出到一个文件中
        "allowJs": true, // 是否允许编译当前的js文件
        "checkJs": false, // 是否以ts类型检查规范检查要编译的js文件
        "removeComments": true, // 是否移除注释
        "noEmit": false, // 是否不生产编译后的文件
        "noEmitOnError":true, // 当编译报错时是否不生成编译文件
        "alwaysStrict": false, // 是否开启严格模式
        "noImplicitAny": true, // 是否不允许隐式any类型
    }
```

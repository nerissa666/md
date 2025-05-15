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
}
let zz = new A(1, 2);
console.log('js文件被编译了');
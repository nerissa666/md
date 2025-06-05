import './G.css'
let div = document.createElement('div')
div.classList.add('c1')
// console.log('666' + d)
console.log('ppp')
console.log(999) // console的增加减少 webpack server监听不到，包括注释 如果扩展名是大写的话

div.onclick = function () {
    console.log('111')
}
let textarea = document.createElement('textarea')
console.log('222')
document.body.appendChild(textarea)
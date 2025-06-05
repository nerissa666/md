import img1 from './1.jpg'
import './E.css'
function fn() {
    // let img = new Image('./1.jpg')
    let img = new Image()
    // img.src = './1.jpg'
    img.src = img1
    document.body.appendChild(img)
    let div = document.createElement('div')
    div.classList.add('dachui')

    document.body.appendChild(div)
    let div2 = document.createElement('div')
    div2.classList.add('font')
    div2.innerHTML = 'hello webpack222'
    document.body.appendChild(div2)
    console.log('hello webpack')
    console.log('000')
}
fn()
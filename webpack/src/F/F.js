import './F.css'
import imgSrc from './1.jpg';
const img = new Image();
img.src = imgSrc
document.body.appendChild(img);

const div = document.createElement('div')
div.innerHTML = 'Hello 1111'
div.classList.add('font-1')
document.body.appendChild(div)
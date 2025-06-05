import './C.css'  // You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file
function fn() {
    const div = document.createElement('div')
    div.innerHTML = 'hello webpack'
    div.classList.add('wrap')
    document.body.appendChild(div)
}
fn()
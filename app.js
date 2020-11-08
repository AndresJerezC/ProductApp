class Product {

  constructor(name, price, year) {
    this.name = name
    this.price = price
    this.year = year
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById('product-list')
    const element = document.createElement('div')
    element.innerHTML = `
      <div class= card text-center mb-4>
        <div class = card-body>
          <strong>Product Name</strong>: ${product.name}
          <strong>Product Price</strong>: ${product.price}
          <strong>Product Year</strong>: ${product.year}
          <a href=# class= 'btn btn-danger' name= 'delete'>Delete</a>
        </div>
      </div>`
    element.setAttribute('name', product.name)
    productList.appendChild(element)
    this.resetForm()
    this.showMessage(`Product ${product.name} added succesfully`, 'secondary')
  }

  resetForm() {
    document.getElementById('product-form').reset()
  }

  deleteProduct(element) {

    if (element.name === 'delete') {
      const padre = element.parentElement.parentElement.parentElement
      padre.remove()
      this.showMessage(`Product ${padre.getAttribute('name')} Deleted Succesfully`, 'secondary')
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement('div')
    div.className = `alert alert-${cssClass} mt-2`
    div.appendChild(document.createTextNode(message))
    //show in DOM
    const container = document.querySelector('.container')
    const app = document.querySelector('#app')
    container.insertBefore(div, app)
    setTimeout(() =>
      document.querySelector('.alert').remove(), 3000)
  }
}

//DOM Events

const uiGlobal = new UI()
document.getElementById('product-form').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value
  const year = document.getElementById('year').value
  const price = document.getElementById('price').value

  const product = new Product(name, price, year)
  //const MyUI = new UI()
  if (name === '' || price === '') {
    return uiGlobal.showMessage('Complete fields please', 'danger')
  }
  uiGlobal.addProduct(product)
  e.preventDefault()
})

document.getElementById('product-list').addEventListener('click', function (e) {
  uiGlobal.deleteProduct(e.target)
})
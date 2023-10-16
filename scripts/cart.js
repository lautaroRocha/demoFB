import { getBooks } from "./firebaseServices.js";

const main = document.querySelector('main');
const CART_COUNT = document.querySelector('#cart-count')
const cartBtn = document.querySelector('#cart-btn')
//añado un export, porque voy a consumir este arreglo en otros módulos
export const BOOKS = [];
//cart.selected ----> un array conteniendo a los libros seleccionados
//cart.total -----> precio total de todos los libros seleccionados
const CART = {selected: [], total: 0};
const cartItems = document.querySelector('#cart-items')
const cartTotalValue = document.querySelector('#cart-value')
const aside = document.querySelector('aside')
const closeCartBtn = document.querySelector('#close-cart')

///esta funcion recibe como parámetro un objeto representando un libro. 
export const drawCard = (obj) => {
    //desestructura sus propiedades
    const {name, release, cover, author, price} = obj
    //crea el elemento card
    let bookCard = document.createElement('div')
    //y todos sus hijos
    let bookTitle = document.createElement('h2')
    let bookAuthor = document.createElement('span')
    let bookRelease = document.createElement('span')
    let bookPrice = document.createElement('span')
    let bookCover = document.createElement('img')
    let addButton = document.createElement('button')
    ///setea la clase de card, y agrega el contenido a sus hijos
    bookCard.classList.add('book-card')
    bookTitle.textContent = name;
    bookAuthor.textContent = author
    bookRelease.textContent = release
    bookPrice.textContent = "$ " + price
    addButton.textContent = 'ADD TO CART'
    addButton.onclick = () => addToCart(obj)
    bookCover.setAttribute('src', cover)
    ///añade los hijos a card
    bookCard.appendChild(bookTitle)
    bookCard.appendChild(bookAuthor)
    bookCard.appendChild(bookCover)
    bookCard.appendChild(bookRelease)
    bookCard.appendChild(bookPrice)
    bookCard.appendChild(addButton)
    ///añade card a la página 
    main.appendChild(bookCard)
}

//envia el objeto al carrito
const addToCart = (obj) => {
    CART.selected.push(obj)
    updateCount()
    updateTotalPrice();
    const itemName = document.createElement('span')
    const itemPrice = document.createElement('span')
    itemName.textContent = obj.name
    itemPrice.textContent = obj.price
    cartItems.appendChild(itemName)
    cartItems.appendChild(itemPrice)
    cartTotalValue.textContent = `VALOR TOTAL DE COMPRA: $${CART.total}`
}

const updateCount = () => {
    //muestra en el dom el total de productos en el carriot
    CART_COUNT.textContent = CART.selected.length
}

const updateTotalPrice = () => {
    //guarda en CART.total la suma de precios de todos los libros del carrito
    const {selected, total} = CART;
    let currentTotal = total
    ///Si selected es length = 0, el total es 0, sino usamos el método reduce para ir sumando todos los precios al total actual del carrto
    CART.total = selected.length > 0 ? selected.reduce((acc, cur)=> acc + cur.price, currentTotal) : 0
}

///si estamos en la página de admin, evitamos setear ests eventos, porque generarían errores al no encontrar los elementos a los que se agregan los eventos.
if(!window.location.pathname.includes('admin')) {
    cartBtn.onclick = () => {
        aside.classList.toggle('closed')
    }
    closeCartBtn.onclick = () => {
        aside.classList.toggle('closed')
    }
    window.onload = getBooks()
}

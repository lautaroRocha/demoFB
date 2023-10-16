import { getBooks } from "./firebaseServices.js";

const main = document.querySelector('main');
const CART_COUNT = document.querySelector('#cart')
export const BOOKS = [];
const CART = {selected: [], total: 0};
const cartItems = document.querySelector('#cart-items')
const cartTotalValue = document.querySelector('#cart-value')
const aside = document.querySelector('aside')
const closeCartBtn = document.querySelector('#close-cart')


export const drawCard = (obj) => {
    const {name, release, cover, price} = obj
    let bookCard = document.createElement('div')
    let bookTitle = document.createElement('h2')
    let bookRelease = document.createElement('span')
    let bookCover = document.createElement('img')
    let addButton = document.createElement('button')
    bookCard.classList.add('book-card')
    bookTitle.textContent = name;
    bookRelease.textContent = release
    addButton.textContent = 'ADD TO CART'
    addButton.onclick = () => addToCart(obj)
    bookCover.setAttribute('src', cover)
    bookCard.appendChild(bookTitle)
    bookCard.appendChild(bookCover)
    bookCard.appendChild(bookRelease)
    bookCard.appendChild(addButton)
    main.appendChild(bookCard)
}

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
    CART_COUNT.textContent = CART.selected.length
}

const updateTotalPrice = () => {
    const {selected, total} = CART;
    let currentTotal = total
    CART.total = selected.length > 0 ? selected.reduce((acc, cur)=> acc + cur.price, currentTotal) : 0
    console.log(CART.total)
}

if(!window.location.pathname.includes('admin')) {
    CART_COUNT.onclick = () => {
        aside.classList.toggle('closed')
    }
    closeCartBtn.onclick = () => {
        aside.classList.toggle('closed')
    }
    window.onload = getBooks()
}

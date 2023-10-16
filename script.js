
const firebaseConfig = {
    apiKey: "AIzaSyDdkaiyeoFc5Sh3UCBvyh2Cu6otWDYXeLU",
    authDomain: "demofirebase-d8b73.firebaseapp.com",
    projectId: "demofirebase-d8b73",
    storageBucket: "demofirebase-d8b73.appspot.com",
    messagingSenderId: "436962488392",
    appId: "1:436962488392:web:bc36e96d4da6294e18287d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const storage = firebase.storage().ref()
const covers = storage.child('covers')
const body = document.querySelector('main');
const CART_COUNT = document.querySelector('#cart')
const BOOKS = [];
const CART = {selected: [], total: 0};
const newBookData= document.querySelector('#new-book')
const aside = document.querySelector('aside')
const closeCartBtn = document.querySelector('#close-cart')
const cartItems = document.querySelector('#cart-items')
const cartTotalValue = document.querySelector('#cart-value')
//get books
db.collection("books")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            drawCard(doc.data())
            BOOKS.push(doc.data())
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

//draw cards
const drawCard = (obj) => {
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
    body.appendChild(bookCard)
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


const uploadPicture = async(file) => {
    const coverRef = covers.child(file.name)
    let coverName;
    await coverRef.put(file)
        .then( async() => {
            console.log('cover uploaded')
            coverName = await coverRef.getDownloadURL()
        })
        .catch(e => console.error('Something went wrong: ' + e))
    return coverName
}

const uploadBook = async (e) => {
    e.preventDefault();
    const data = new FormData(newBookData)
    const newBook = {}
    newBook.name = data.get('title')
    newBook.price = parseFloat(data.get('price'))
    newBook.release = data.get('release')
    newBook.cover = await uploadPicture(data.get('cover'))
    db.collection('books').doc().set(newBook)
        .then( () => console.log('book uploaded'))
        .catch((e)=>console.error('Something went erong:  ' + e))
}

let btn = document.querySelector('#post-btn')

btn.onclick = (e) => uploadBook(e)

CART_COUNT.onclick = () => {
    aside.classList.toggle('closed')
}
closeCartBtn.onclick = () => {
    aside.classList.toggle('closed')
}
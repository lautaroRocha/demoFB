import { uploadBook, getBooks, deleteBook } from "./firebaseServices.js"
import { BOOKS } from "./cart.js"

const postBtn = document.querySelector('#post-btn')
const newBookData = document.querySelector('#new-book')
const bookToDelete = document.querySelector('#book-to-delete')
const list = document.querySelector('select')
const deleteBtn = document.querySelector('#delete-btn')

postBtn.onclick = (e) => uploadBook(e, newBookData)

const populateOptions = () => {
    setTimeout(()=>{
        BOOKS.forEach( (book) => {
            const {name} = book
            const newOption = document.createElement('option')
            newOption.value = name
            newOption.textContent = name
            list.appendChild(newOption)
        })
    }, 5000)
}

getBooks()
populateOptions()
deleteBtn.onclick = (e) => deleteBook(e, bookToDelete.value)

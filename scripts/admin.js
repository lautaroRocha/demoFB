//importa los servicios (o sea, las funciones que interactuan con la base de datos y el almacenamiento)
import { uploadBook, getBooks, deleteBook } from "./firebaseServices.js"
import { BOOKS } from "./cart.js"

///selecciono todos los elemetos del DOM que voy a manipular
const postBtn = document.querySelector('#post-btn')
const newBookData = document.querySelector('#new-book')
const bookToDelete = document.querySelector('#book-to-delete')
const list = document.querySelector('select')
const deleteBtn = document.querySelector('#delete-btn')

postBtn.onclick = (e) => uploadBook(e, newBookData)


//5 segundos después de ser invocada, esta función recorre todos los libros y por cada uno crea un elemnto option y lo añade al elemento select. Los 5 segundos de espera nos aseguran que para cuando se llame a este método, los libros ya van a haber sido fetcheados. La implementación no es perfecta, pero funciona.
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

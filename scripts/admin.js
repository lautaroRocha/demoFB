import { uploadBook } from "./firebaseServices.js"

let btn = document.querySelector('#post-btn')
const newBookData= document.querySelector('#new-book')


btn.onclick = (e) => uploadBook(e, newBookData)
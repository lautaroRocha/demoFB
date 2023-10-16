import { db, covers } from "./firebaseConfig.js"
import { BOOKS, drawCard } from "./cart.js"

export const getBooks = () => {
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
        })
}

const uploadPicture = async (file) => {
    const coverRef = covers.child(file.name)
    let coverName;
    await coverRef.put(file)
        .then(async () => {
            console.log('cover uploaded')
            coverName = await coverRef.getDownloadURL()
        })
        .catch(e => console.error('Something went wrong: ' + e))
    return coverName
}

export const uploadBook = async (e, form) => {
    e.preventDefault();
    const data = new FormData(form)
    const newBook = {}
    newBook.name = data.get('title')
    newBook.price = parseFloat(data.get('price'))
    newBook.release = data.get('release')
    newBook.cover = await uploadPicture(data.get('cover'))
    db.collection('books').doc().set(newBook)
        .then(() => console.log('book uploaded'))
        .catch((e) => console.error('Something went erong:  ' + e))
}
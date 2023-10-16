import { db, covers } from "./firebaseConfig.js"
import { BOOKS, drawCard } from "./cart.js"


export const getBooks = () => {
    //busco todo dentro de la collecion 'books'
    db.collection("books")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //por cada documento encontrado, lo envío al array BOOKS. si NO estoy en admin, lo dibujo en el dom
                window.location.pathname.includes('admin') ? null : drawCard(doc.data())
                BOOKS.push(doc.data())
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
}

const uploadPicture = async (file) => {
    //creo una referencia dentro de covers con el nombre del archivo
    const coverRef = covers.child(file.name)
    let coverName;
    //voy a intentar subirlo, y retornar el link de descarga
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
    //uso todo el formulario para crear un objeto FormData (ver MDN)
    const data = new FormData(form)
    //este objeto vacío va a ser el nuevo libro
    const newBook = {}
    //asigno valores
    newBook.name = data.get('title')
    newBook.price = parseFloat(data.get('price'))
    newBook.release = data.get('release')
    //asigno el valor de cover al link de descarga de la imagen
    newBook.cover = await uploadPicture(data.get('cover'))
    db.collection('books').doc().set(newBook)
        .then(() => console.log('book uploaded'))
        .catch((e) => console.error('Something went erong:  ' + e))
}




export const deleteBook = async (e, bookName) => {
    e.preventDefault();
    try {
        //intento hacer una consulta por un libro cuyo 'name' sea igual al pasado por parámetro
        const querySnapshot = await db.collection('books').where('name', '==', bookName).get();
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            await doc.ref.delete();
            console.log('Document successfully deleted!');
            getBooks()
        } else {
            console.log('No matching documents found.');
        }
    } catch (error) {
        console.error('Error deleting document: ', error);
    }
};
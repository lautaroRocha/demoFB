//configuración de firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdkaiyeoFc5Sh3UCBvyh2Cu6otWDYXeLU",
    authDomain: "demofirebase-d8b73.firebaseapp.com",
    projectId: "demofirebase-d8b73",
    storageBucket: "demofirebase-d8b73.appspot.com",
    messagingSenderId: "436962488392",
    appId: "1:436962488392:web:bc36e96d4da6294e18287d"
};
//se inicializa la app
const firebaseApp = firebase.initializeApp(firebaseConfig)
//referencias a la base de datos, y a la colleción covers dentro del servicio storage
export const db = firebase.firestore();
const storage = firebase.storage().ref()
export const covers = storage.child('covers')



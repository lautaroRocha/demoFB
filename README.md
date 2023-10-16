# DemoFirebase Bookstore

[ONLINE DEMO](https://lautarorocha.github.io/demoFB/)

Esta es una webapp escrita con HTML, CSS y JS vanilla, que simula un carrito de compras de una librería. Usa Firebase (serviocios Firestore y Storage) para guardar y recuperar la data de los libros.
<br>
Se usaron ES6Modules para dividir la lógica en módulos separados
<br>
 
 ### Funcionamiento

 La aplicación nos permite elegir libros, añadirlos al carrito y simular la compra. Además cuenta con un panel de admin en la ruta /admin.html que permite añadir o eliminar libros. 


### Estructura 
|Archivo   | Función  |
|---|---|
| firebaseConfig.js | Tiene la configuración de firebase y la referencia los servicios (base de datos y storage) |   
| firebaseServices.js  | Exporta las funciones que interactuan con firebase|   
| cart.js  |  Importa servicios de firebase para generar toda la lógica relacionada al carrito (mostrar libros, seleccionarlos, calcular precio, etc) |
| admin.js  | Recupera los valores en los formularios de la pagina de admin para agregar o eliminar libros a la base de datos  |

### Mejoras

Esta app podría incorporar las siguientes mejoras: <br>
- Implementar autorización en la ruta del admin
- Juntar información del cliente al momento de realizar la compra
- Guardar en una colección todos los pedidos
- Enviar un mail al admin notificando el pedido de compra



### Credenciales 

Esta app fue realizada para ofrecer un ejemplo a lxs miembros de los distintos grupos a los que ofrezco apoyo técnico en sus proyectos grupales de fin de curso. Solicitar las credenciales por mail o whatsapp a Lautaro Rocha.

### Explicaciones

En la rama *expl* hay comentarios en los archivos de Javascript para ayudar a su comprensión.
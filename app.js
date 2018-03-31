//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD8j25MNXGICGabCjhv-4_mGA7qkNzKcsc",
    authDomain: "asdasdasdasd-9752c.firebaseapp.com",
    projectId: "asdasdasdasd-9752c"
});  
       
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

  function registrar(){
      var email = document.getElementById('email_register').value;
      var contrasena = document.getElementById('contrasena_register').value;
      var name = document.getElementById('name').value;

      firebase.auth().createUserWithEmailAndPassword(email, contrasena)
      .then(function(){
          verficar()
      })

      db.collection("users").add({
          name: name,
          email: email
      })
     
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById('email_register').value = '';
          document.getElementById('contrasena_register').value = '';

      })

      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
        });

    
  }

  function verficar(){
      var user = firebase.auth().currentUser;  
      user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Enviando correo...');
        // location.reload(true);
 
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      }); 
  }

function guardar(){
    var nombre = document.getElementById('num_soat').value;
    var estado = $('#estado').find(":selected").text();
    var persona = $('#contenido').find(":selected").text();
    var email = $('#contenido').val();
     
    db.collection("soat").add({
        nombre: nombre,
        estado: estado,
        persona: persona,
        email: email
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        // document.getElementById('num_soat').value = '';
        // document.getElementById('estado').value = '';
        // document.getElementById('persona').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tabla_ = document.getElementById('tabla');
db.collection("soat").onSnapshot((querySnapshot) => {
    tabla_.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla_.innerHTML += `
        <tr>
      
        <td>${doc.data().nombre}</td>
        <td>${doc.data().estado}</td>
        <td>${doc.data().persona}</td>
 
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().estado}','${doc.data().persona}')">Editar</button></td>
        </tr>
        `
    });
});



//Leer documentos
var tabla = document.getElementById('listarUsuario');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().email}`);
        tabla.innerHTML += `
        <tr>
      
        <td>${doc.data().name}</td>
        <td>${doc.data().email}</td>
 
        <td><button class="btn btn-danger" onclick="eliminaruser('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().estado}','${doc.data().persona}')">Editar</button></td>
        </tr>
        `
    });
});


//Leer documentos
var contenido = document.getElementById('contenido');
db.collection("users").onSnapshot((querySnapshot) => {
    contenido.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().email}`);
        contenido.innerHTML += `$("#contenido").append("<option value='${doc.data().email}' >${doc.data().name}</option>"); `
    });
});


//borrar documentos
function eliminar(id){
    db.collection("soat").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
//borrar documentos
function eliminaruser(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//editar documentos
    // function editar(id,nombre,apellido,fecha){

    //     document.getElementById('num_soat').value = nombre;
    //     document.getElementById('estado').text = nombre;
    //     document.getElementById('contenido').value = nombre;
       

    //     // var nombre = document.getElementById('num_soat').value;
    //     // var estado = $('#estado').find(":selected").text();
        
    //     // var persona = $('#contenido').find(":selected").text();

    //     // var email = $('#contenido').val();


    //     var boton = document.getElementById('boton');
    //     boton.innerHTML = 'Editar';

    //     boton.onclick = function(){
    //         var washingtonRef = db.collection("soat").doc(id);
    //         // Set the "capital" field of the city 'DC'

    //         var nombre = document.getElementById('num_soat').value;
    //         var apellido = document.getElementById('estado').value;
    //         var fecha = document.getElementById('contenido').value;

    //         return washingtonRef.update({
    //              nombre: nombre,
    //             estado: estado,
    //             persona: persona,
    //             email: email
    //         })
    //         .then(function() {
    //             console.log("Document successfully updated!");
    //             boton.innerHTML = 'Guardar';
    //             document.getElementById('num_soat').value = '';
    //             document.getElementById('estado').value = '';
    //             document.getElementById('contenido').value = '';
    //         })
    //         .catch(function(error) {
    //             // The document probably doesn't exist.
    //             console.error("Error updating document: ", error);
    //         });
    //     }
// }




function observador(){
// .orderByChild("email").equalTo(user.email)
    

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            console.log('existe usuario activo '+user.email)
            // aparece(user);
            // User is signed in.
            var displayName = user.displayName;

            var email = user.email;

            document.getElementById("usuario").innerHTML = "Hola "+user.email;
            // var URLactual = window.location;
            var URLactual = window.location;
            // var url_redi = 'http://localhost/SoatRicardo/Acceso/menu.html';
            // if (URLactual != url_redi) {
            //     location.href= url_redi;
            // }

            console.log('*****************');
            console.log(user.emailVerified)
            console.log('*****************');

            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
           // location.href ="http://localhost/SoatRicardo/Curso%20Firebase/APP_1/menu.html";
          // ...
        } else {
          // User is signed out.
          console.log('no existe usuario activo')

          document.getElementById("usuario").innerHTML = "Hola Anónimo";

          var URLactual = window.location;
          var url_redi = 'http://localhost/SoatRicardo/Curso%20Firebase/CRUD%20Firebase/login.html';
          if (URLactual != url_redi) {
              location.href= url_redi;
          }

          // ...
        }
      });
}
observador();























var maxHeight = 400;

$(function(){

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item    
        $list
            .show()
            .css({
                paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
        if (multiplier > 1) {
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
                });
        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });  
    
});





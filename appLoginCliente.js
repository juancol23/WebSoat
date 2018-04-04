

function ingreso_cliente(){
    
    var email2 = document.getElementById('emailLogin').value;
    var contrasena2 = document.getElementById('contrasenaLogin').value;
    
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}


 


function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario activo '+user.email)
          // User is signed in.
          var displayName = user.displayName;
            
          var email = user.email;

          // document.getElementById("usuario").innerHTML = "Bienvenido "+user.email;
          // var URLactual = window.location;
          var URLactual = window.location.href;
          let url_condition = URLactual.substr(0,17);



          var url_redi_local = 'http://localhost/WebSoat/menuCliente.html';
          var url_redi_remote = 'https://juanvaldemar.github.io/WebSoat/menuCliente.html';

 
         if(url_condition == "http://localhost/"){
           console.log("Test"); 
           location.href= url_redi_local;
         }else{
          console.log("Producción")
          location.href= url_redi_remote;
         }

 
          if (URLactual == url_redi) {
              // location.href= url_redi;
          }

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

          // document.getElementById("usuario").innerHTML = "Hola Anónimo";

          var URLactual = window.location;
          var url_redi = 'https://juanvaldemar.github.io/WebSoat/';
          if (URLactual != url_redi) {
              // location.href= url_redi;
          }

          // ...
        }
      });
}
observador();


function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Sin Sesión...')
    })
    .catch(function(error){
        console.log(error)
    })
}



 
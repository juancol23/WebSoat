function registrar(){
    var email = document.getElementById('email_register').value;
    var contrasena = document.getElementById('contrasena_register').value;
    var name = document.getElementById('name').value;
    var firebaseRef = firebase.database().ref().child("users").push();
    firebaseRef.child("email").set(email);
    firebaseRef.child("name").set(name);
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verficar()
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

function ingreso(){
    
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    
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

function dataregistro(){

    var user = firebase.auth().currentUser;  
    var num_soat = document.getElementById('num_soat').value;
    // var estado = document.getElementById('estado').value;
    // var persona = document.getElementById('persona').value;
    var estado = $('#estado').find(":selected").text();
    var persona = $('#contenido').find(":selected").text();
    var firebaseRef = firebase.database().ref().child("soat").push();

    firebaseRef.child("num_soat").set(num_soat);
    firebaseRef.child("estado").set(estado);
    firebaseRef.child("persona").set(persona);
    firebaseRef.child("user").set(user.uid);
 
 
          location.reload(true);
    
    

 
    observador();
}

function observador(){
     var rootRef = firebase.database().ref().child("users");
     rootRef.on("child_added",snap => {
        var email = snap.child("email").val();
        var name = snap.child("name").val();
            // document.getElementById("usuario").innerHTML = "Hola "+email;
            // $("#contenido").append("<br/>"+num_soat);
            $("#contenido").append("<option value='"+email+"' >'"+name+"'</option>");
            $("#listarUsuario").append("<tr><td>"+email+"</td><td>"+name+"</td></tr>");
            
            // JSON.parse( JSON.stringify(ObjectToSave ) )
     }) 
      var rootRefSoat = firebase.database().ref().child("soat");
          rootRefSoat.on("child_added",snap => {
          var email = snap.child("persona").val();
          var estado = snap.child("estado").val();
          var num_soat = snap.child("num_soat").val();
              // document.getElementById("contenido").innerHTML = "Hola "+estado;
              // $("#contenido").append("<br/>"+num_soat);
              // $("#todo").append("<div>'"+email+"'</div><br/><div>'"+estado+"'</div><br/><div>'"+num_soat+"'</div><br/>");
              $("#todo").append("<tr><td>"+email+"</td><td>"+estado+"</td><td>"+num_soat+"</td></tr>");
                

              // JSON.parse( JSON.stringify(ObjectToSave ) )
       }) 
      

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario activo '+user.email)
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
            
          var email = user.email;

          document.getElementById("usuario").innerHTML = "Hola "+user.email;
          // var URLactual = window.location;
          var URLactual = window.location;
          var url_redi = 'http://localhost/SoatRicardo/Curso%20Firebase/CRUD%20Firebase/menu.html';
          if (URLactual != url_redi) {
              location.href= url_redi;
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

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
        contenido.innerHTML = `
        <p>Bienvenido!</p>
        <button onclick="cerrar()">Cerrar sesión</button> 
        `;
    } 
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
    })
    .catch(function(error){
        console.log(error)
    })
}

function verficar(){
    var user = firebase.auth().currentUser;  
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('Enviando correo...');
      location.reload(true);
      
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    }); 
}
 
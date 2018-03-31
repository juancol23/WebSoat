



















 var URLactual = window.location.href;
 let url_condition = URLactual.substr(0,17);



 var url_redi_local = 'http://localhost/WebSoat/';
 var url_redi_remote = 'https://juanvaldemar.github.io/WebSoat/';


 console.log(URLactual); 


 function cerrar(){
     firebase.auth().signOut()
     .then(function(){
         console.log('Saliendo...')
         if(url_condition == "http://localhost/"){
           console.log("Test"); 
           location.href= url_redi_local;
         }else{
          console.log("Producción")
          location.href= url_redi_remote;
         }
     })
     .catch(function(error){
         console.log(error)
     })
 }




function addUser(){


	if(url_condition == "http://localhost/"){
	  console.log("Test"); 
	  location.href= url_redi_local+"addUser.html";
	}else{
	 console.log("Producción")
	 location.href= url_redi_remote+"addUser.html";
	}


}function addSoat(){


	if(url_condition == "http://localhost/"){
	  console.log("Test"); 
	  location.href= url_redi_local+"addSoat.html";
	}else{
	 console.log("Producción")
	  location.href= url_redi_remote+"addSoat.html";
	}


}function ListarSoat(){

	if(url_condition == "http://localhost/"){
	  console.log("Test"); 
	  location.href= url_redi_local+"listarSoat.html";
	}else{
	 console.log("Producción")
	 location.href= url_redi_remote+"listarSoat.html";
	}



}

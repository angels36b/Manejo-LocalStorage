//variables

const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//event listener
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);
  //cuando el documento esta listo
  document.addEventListener('DOMcontentLoaded', ()=>{
      tweets = JSON.parse(localStorage.getItem('tweets')) || [];
      console.log(tweets);
  });

}

//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //textoarea lugar donde escribe el usuario
  const tweet = document.querySelector("#tweet").value;
  //validacion
  if (tweet === "") {
    mostrarError("No puede ir vacio");
    return; //evita que se ejecute mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };
  //a;adir al arreglo de los tweets
  tweets = [...tweets, tweetObj];
  //luego de a;adir el arreglo se crea el HTML
  crearHTML();
}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement(`p`);
  mensajeError.textContentt = error;
  mensajeError.classList.add("error");

  //insertar en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {

    liampiarHTML();

    if (tweets.length > 0) {
    tweets.forEach((tweet) => {

      //agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'X';
//a;ADIR LA FUNCION DE ELIMINAR
      btnEliminar.onclick = () =>  
      {
      borrarTweet(tweet.id);
      }


      //crear el HTML.
      const li = document.createElement("li");

      //a;adir el texto
      li.innerText = tweet.texto;

      //asignar el boton
      li.appendChild(btnEliminar);
      //insertar en el html
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();

}

//Agrega los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('texto', JSON.stringify(tweets));
}


//limpiar el html
function liampiarHTML(){
    while (listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
 tweets = tweets.filter(tweet => tweet.id !== id);
 crearHTML();
}
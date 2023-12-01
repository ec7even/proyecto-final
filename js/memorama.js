const totalCartas = 24; // Número total de cartas en el juego 
const cartasDisponibles = ['A', 'K', 'Q', 'J', '1', '2','3','4']; //Arreglo que contiene los valores de las cartas disponibles para el juego 
let cartas = []; // Arreglo que contiene los elementos de las cartas del juego.
let cartasSeleccionadas = []; // Arreglo para almacenar temporalmente las cartas seleccionadas por el jugador.
let valoresUtilizados = []; // Arreglo para almacenar los valores de las cartas que ya han sido utilizados.
let movimientoActual = 0; // Variable que lleva la cuenta del número de movimientos realizados por el jugador.
let intentosActuales = 0; // Variable que lleva la cuenta del número total de intentos realizados por el jugador.

// Cadena de texto que representa la estructura HTML de una carta. Esta plantilla se clona más adelante para crear cada carta en el juego.
let plantillaCarta = '<div class="carta"><div class="reverso"></div><div class="cara"></div></div>';

// Esta función se activa cuando se hace clic en una carta. Verifica si el número actual de movimientos (movimientoActual) es menor que 2.
function activar(e) {
   if (movimientoActual < 2) {
      
      if ((!cartasSeleccionadas[0] || cartasSeleccionadas[0] !== e.target) && !e.target.classList.contains('activa') ) {
         e.target.classList.add('activa');
         cartasSeleccionadas.push(e.target);

         if (++movimientoActual == 2) {

            intentosActuales++;
            document.querySelector('#estadisticas').innerHTML = intentosActuales + ' intentos';

            if (cartasSeleccionadas[0].querySelectorAll('.cara')[0].innerHTML == cartasSeleccionadas[1].querySelectorAll('.cara')[0].innerHTML) {
               cartasSeleccionadas = [];
               movimientoActual = 0;
            }
            else {
               setTimeout(() => {
                  cartasSeleccionadas[0].classList.remove('activa');
                  cartasSeleccionadas[1].classList.remove('activa');
                  cartasSeleccionadas = [];
                  movimientoActual = 0;
               }, 600);
            }
         }
      }
   }
}

function valorAleatorio() {
   // Genera un número aleatorio y lo redondea hacia abajo con Math.floor
   let rnd = Math.floor(Math.random() * totalCartas * 0.5);
   // Filtra los valores utilizados para encontrar los elementos que son iguales a rnd
   let valores = valoresUtilizados.filter(valor => valor === rnd);
   if (valores.length < 2) {
      valoresUtilizados.push(rnd);
   }
   else {
      // Si hay 2 o más elementos iguales a rnd, llama a la función valorAleatorio
      // Esto significa que se genera un nuevo número aleatorio hasta que se cumpla la condición anterior
      valorAleatorio();
   }
}

function obtenerValorCara(valor) {
   let rtn = valor;
   if (valor < cartasDisponibles.length) {
      rtn = cartasDisponibles[valor];
   }
   return rtn;
}

for (let i=0; i < totalCartas; i++) {
   let div = document.createElement('div');
   div.innerHTML = plantillaCarta;
   cartas.push(div);
   document.querySelector('#juego').append(cartas[i]);
   valorAleatorio();
   cartas[i].querySelectorAll('.cara')[0].innerHTML = obtenerValorCara(valoresUtilizados[i]);
   cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activar);
}

const musicaJuego = document.getElementById('musicaJuego');
const botonMusica = document.getElementById('botonMusica');

// Función para activar/desactivar la música
function activarMusica() {
    if (musicaJuego.paused) {
        musicaJuego.play();
    } else {
        musicaJuego.pause();
    }
}

// Agrega un event listener al botón
botonMusica.addEventListener('click', activarMusica);

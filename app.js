// document = puente entre HTML y JS
// Con querrySelector obtengo una etiqueta en forma de objeto para trabajar en JS
/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del numero secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10';
*/

let numeroSecreto = 0;
let intentos = 0;
let numeroMax = 5;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    //alert('Click desde el boton');
    //let numeroDelUsuario = document.getElementById('valorUsuario').value; 
    //console.log(numeroDelUsuario);
    //console.log(typeof(numeroDelUsuario));
    //console.log(numeroSecreto);
    //console.log(typeof(numeroSecreto));
    // triple igual es para comprobar que es mismo tipo de dato y mismo dato
    //console.log(numeroDelUsuario === numeroSecreto);
    //console.log(intentos);
    let numeroDelUsuario = parseInt(document.getElementById('valorUsuario').value); 
    if (numeroDelUsuario === numeroSecreto){
        asignarTextoElemento('p',`¡Acertaste en ${intentos} ${(intentos == 1) ? 'intento':'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // NO ACERTO
        if (numeroSecreto < numeroDelUsuario) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor')
        }
    }
    intentos++;
    limpiarCaja();
    return;
}

function generaNumeroSecreto() {
    // Si el numero generado esta en la lista, se hace algo
    // Si no, me comporto como lo he estado haciendo.
    let numeroGenerado = Math.floor(Math.random()*numeroMax)+1;
    
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == numeroMax) {
        return asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generaNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCaja() {
    /*let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';*/
    document.querySelector('#valorUsuario').value = '';
    return;
}

function condicionesIniciales(){
    numeroSecreto = generaNumeroSecreto();
    intentos = 1;
    //console.log('numeroSecreto'+numeroSecreto);
    //console.log('intentos'+intentos)
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMax}`);
    limpiarCaja();
}

function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();
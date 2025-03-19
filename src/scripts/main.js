const pantalla = document.querySelector('#pantalla');
const botones = document.querySelectorAll('.btn');

let entradaActual = '';
let expresion = '';

function actualizarPantalla(valor) {
    pantalla.textContent = valor;
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (boton.id === 'limpiar') {
            entradaActual = '';
            expresion = '';
            actualizarPantalla('0');
        } else if (boton.id === 'borrar') {
            entradaActual = entradaActual.slice(0, -1);
            expresion = expresion.slice(0, -1);
            actualizarPantalla(expresion || '0');
        } else if (boton.id === 'punto') {
            if (!entradaActual.includes('.')) {
                entradaActual += '.';
                expresion += '.';
                actualizarPantalla(expresion);
            }
        } else if (boton.id === 'igual') {
            try {
                const resultado = eval(expresion);
                actualizarPantalla(`${expresion} = ${resultado}`);
                entradaActual = resultado.toString();
                expresion = resultado.toString();
            } catch (error) {
                actualizarPantalla('Error');
                entradaActual = '';
                expresion = '';
            }
        } else if (['sumar', 'restar', 'multiplicar', 'dividir'].includes(boton.id)) {
            const operadores = {
                'sumar': '+',
                'restar': '-',
                'multiplicar': '*',
                'dividir': '/'
            };
            const simboloOperador = operadores[boton.id];
            expresion += ` ${simboloOperador} `;
            entradaActual = '';
            actualizarPantalla(expresion);
        } else {
            entradaActual += valor;
            expresion += valor;
            actualizarPantalla(expresion);
        }
    });
});

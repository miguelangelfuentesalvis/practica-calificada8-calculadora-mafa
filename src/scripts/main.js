const pantalla = document.querySelector('#pantalla');
const botones = document.querySelectorAll('.btn');

let entradaActual = '';
let expresion = '';
let ultimaEntradaFueOperador = false;

function actualizarPantalla(valor) {
    pantalla.textContent = valor;
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;
        const operadores = {
            'sumar': '+',
            'restar': '-',
            'multiplicar': '*',
            'dividir': '/'
        };

        if (boton.id === 'limpiar') {
            entradaActual = '';
            expresion = '';
            ultimaEntradaFueOperador = false;
            actualizarPantalla('0');
        } else if (boton.id === 'borrar') {
            if (expresion.length > 0) {
                expresion = expresion.trim().slice(0, -1);
                entradaActual = entradaActual.slice(0, -1);
                if (/[+\-*/]$/.test(expresion)) {
                    ultimaEntradaFueOperador = true;
                } else {
                    ultimaEntradaFueOperador = false;
                }
                actualizarPantalla(expresion || '0');
            }
        } else if (boton.id === 'punto') {
            if (!entradaActual.includes('.')) {
                entradaActual += '.';
                expresion += '.';
                ultimaEntradaFueOperador = false;
                actualizarPantalla(expresion);
            }
        } else if (boton.id === 'igual') {
            try {
                if (ultimaEntradaFueOperador) return;
                const resultado = eval(expresion);
                actualizarPantalla(`${resultado}`);
                entradaActual = resultado.toString();
                expresion = resultado.toString();
                ultimaEntradaFueOperador = false;
            } catch (error) {
                actualizarPantalla('Error');
                entradaActual = '';
                expresion = '';
                ultimaEntradaFueOperador = false;
            }
        } else if (['sumar', 'restar', 'multiplicar', 'dividir'].includes(boton.id)) {
            if (ultimaEntradaFueOperador) {
                expresion = expresion.trim().slice(0, -1) + operadores[boton.id];
            } else {
                expresion += ` ${operadores[boton.id]} `;
            }
            entradaActual = '';
            ultimaEntradaFueOperador = true;
            actualizarPantalla(expresion);
        } else {
            entradaActual += valor;
            expresion += valor;
            ultimaEntradaFueOperador = false;
            actualizarPantalla(expresion);
        }
    });
});



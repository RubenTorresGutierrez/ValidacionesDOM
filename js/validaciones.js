/**  validaciones.js
    Script para validar un formulario
    @author Rubén Torres <rtorresgutierrez.guadalupe@fundacionloyola.net>
    @license GPL v3 2021
**/
'use strict'

window.onload = iniciar;

function iniciar(){

    //FORM
    let formulario = document.forms[0];
    formulario.onsubmit = validar;

    //SELECT
    let select = document.getElementById('sComunidad');
    select.onchange = selectProvincia;

}

function validar(evento){

    //
    evento.preventDefault();

    //Eliminar mensajes de error si existen
    if(document.getElementsByClassName('mensajeerror')){
        let elementos = document.getElementsByClassName('mensajeerror');
        let inputs = document.getElementsByTagName('input');
        let selects = document.getElementsByTagName('select');

        for(let i = 0; i < elementos.length; i++)
            if(elementos[i]){
                elementos[i].remove();
                i--;
            }
        for(let i = 0; i < inputs.length; i++)
            inputs[i].style.borderColor = '#ccc';
        for(let i = 0; i < selects.length; i++)
            selects[i].style.borderColor = '#ccc';
    }

    //Comprobar Aceptación de la Política de privacidad
    if(!document.getElementById('iPolitica').checked){
        document.getElementById('iPolitica').style.borderColor = 'red';
        crearMensaje('Debe aceptar la Política de Privacidad.', 8);
    }

    //Comprobar Nombre
    if(document.getElementById('iNombre').value.length < 3){
        document.getElementById('iNombre').style.borderColor = 'red';
        crearMensaje('Introduzca un nombre superior a 2 caracteres.', 0);
    }

    //Comprobar Apellidos
    let palabras = document.getElementById('iApellidos').value.split(' ');
    if(palabras.length < 2){
        document.getElementById('iApellidos').style.borderColor = 'red';
        crearMensaje('Introduzca dos apellidos.', 1);
    }

    //Comprobar NIF
    if(!comprobarNif()){
        document.getElementById('iNIF').style.borderColor = 'red';
        crearMensaje('Introduzca un NIF válido.', 4);
    }

    //Comprobar Asturiano y brócoli
    if(document.getElementById('rSi').checked && document.getElementById('sComunidad').value === '3'){
        document.getElementById('sComunidad').style.borderColor = 'red';
        crearMensaje('A mi no me engañas, todos sabemos que a los Asturianos no les gusta el brócoli.', 7);
    }

}

function crearMensaje(mensaje, posicion){

    let p = document.createElement('p');
    let texto = document.createTextNode('* ' + mensaje);

    p.appendChild(texto);
    p.classList.add('mensajeerror');

    document.getElementsByClassName('col-75')[posicion].appendChild(p);


}

function comprobarNif(){
    
    const letrasnif = "TRWAGMYFPDXBNJZSQVHLCKE";
    let nif = document.getElementById('iNIF').value;
    let numero = parseInt(nif.substring(0,8))%23;
    let letra = nif.charAt(8);
    
    if(letra == letrasnif.charAt(numero))
        return true;
    return false;
    
}

function selectProvincia(){

    if(document.getElementById('sComunidad').value == 11){

        //DIV class=row
        let row = document.createElement('div');
        row.classList.add('row');
        row.id = 'provincias';
        document.forms[0].insertBefore(row, document.getElementsByClassName('row')[7]);

        //DIV class=col-25
        let col25 = document.createElement('div');
        col25.classList.add('col-25');
        row.appendChild(col25);

        //DIV class=col-75
        let col75 = document.createElement('div');
        col75.classList.add('col-75');
        row.appendChild(col75);

        //LABEL
        let label = document.createElement('label');
        let textolabel = document.createTextNode('Província');
        label.htmlFor = 'sProvincia';
        label.appendChild(textolabel);
        col25.appendChild(label);

        //SELECT
        let select = document.createElement('select');
        select.id = 'sProvincia';
        col75.appendChild(select);

        //OPTION
        let option = [];
        let textoselect = [];
        textoselect.push(document.createTextNode('-- Seleccionar Província --'));
        textoselect.push(document.createTextNode('Badajoz'));
        textoselect.push(document.createTextNode('Cáceres'));
        for(let i = 0; i < 3; i++){
            option.push(document.createElement('option'));
            option[i].value = i;
            option[i].appendChild(textoselect[i]);
            select.appendChild(option[i]);
        }

    }else 
        if(document.getElementById('provincias'))
            document.getElementById('provincias').remove();

}
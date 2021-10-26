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

    console.log('Estoy validando');

    //Comprobar Aceptación de la Política de privacidad
    if(document.getElementById('iPolitica').checked)
        return false;

    //Comprobar campo Nombre
    if(document.getElementById('iNombre').length < 2)
        return false;
    
    //evento.preventDefault();

}

function selectProvincia(){

    if(document.getElementById('sComunidad').value == 11){
        //DIV class=row
        let row = document.createElement('div');
        row.classList.add('row');
        row.id = 'provincias';
        //document.forms[0].appendChild(row);
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
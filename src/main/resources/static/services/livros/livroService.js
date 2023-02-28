import{renderMenuLateral}from "../menuLateral/menuLateralService.js"

window.onload = function(){
    renderMenuLateral()
}

document.querySelector('.btnAdicionar').addEventListener('click',btnAdicionarClick);

function btnAdicionarClick(){
   window.open('/cadastroLivro', '_self');
}
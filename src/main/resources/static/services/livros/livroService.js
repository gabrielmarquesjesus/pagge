import { renderMenuLateral } from "../menuLateral/menuLateralService.js"

var telaAtual = window.location.pathname;

if (telaAtual == "/livros") {
    window.onload = function () {
        renderMenuLateral();
    }
    document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);

    function btnAdicionarClick() {
        window.open('/cadastroLivro', '_self');
    }
    
    //verica a tela que o usuario está vendo
}else if (telaAtual == "/cadastroLivro") { 
    document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);

    function btnFecharClick() {
         window.open('/livros', '_self');
    }
}
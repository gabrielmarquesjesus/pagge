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
} else if (telaAtual == "/cadastroLivro") {
    document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);
    document.querySelector('.bntSalvar').addEventListener('click', salvarLivro);

    function btnFecharClick(evento) {
        window.open('/livros', '_self');
    };

    function salvarLivro(evento) {
        evento.preventDefault();

        const livro = {
            "id": document.querySelector("#id").value,
            "titulo": document.querySelector("#titulo").value,
            "autor": document.querySelector("#autor").value,
            "editora": document.querySelector("#editora").value,
            "paginas": document.querySelector("#pagina").value,
            "genero": document.querySelector("#genero").value,
            "isbn": document.querySelector("#isbn").value,
            "status": document.querySelector("#status").value,
            "observacao": document.querySelector("#observacao").value
        };

        var requisicao = new XMLHttpRequest();
        
        requisicao.open("post", "/livro/save");
        requisicao.setRequestHeader('Content-Type', 'application/json');
        
        requisicao.send(JSON.stringify(livro).toString());

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    window.open('/livros', '_self');
                } else {
                    alert("Erro ao salvar o livro. Por favor, entre em contato com o suporte.")
                }
            }
        }


    }
}
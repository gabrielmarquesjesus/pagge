import { renderMenuLateral } from "../menuLateral/menuLateralService.js"
import { getApi } from "../utils/Api.js";

var telaAtual = window.location.pathname;

if (telaAtual.includes("/livros")) {
    window.onload = function () {
        renderMenuLateral();
        var tabelaLivro = document.querySelector('.tabela');

        document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);
        for(let i = 0; i <tabelaLivro.rows.length-1; i++){
            var linha = tabelaLivro.rows[i+1];
            linha.addEventListener('dblclick', editarLivro);
        }
    }

    function btnAdicionarClick() {
        window.open('/cadastroLivro/""', '_self');
    }

    function editarLivro(evento){
        var linhaSelecionada = evento.currentTarget;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;

        window.open('/cadastroLivro/'+codigo, '_self');
        var requisicao = new XMLHttpRequest();
        
        requisicao.open("get", "/livro/findById/"+codigo);
        requisicao.setRequestHeader('Content-Type', 'application/json');
        
        requisicao.send(codigo);

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                } else {
                    alert("Erro ao salvar o livro. Por favor, entre em contato com o suporte.")
                }
            }
        }

    }

    //verica a tela que o usuario está vendo
} else if (telaAtual.includes("/cadastroLivro")) {

    window.onload = function (win) {
        var api = getApi(win);
        if(api.parametros != "" && api.parametros != null){
            carregarFormulario(api.parametros);
        }
        document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);
        document.querySelector('.bntSalvar').addEventListener('click', salvarLivro);
    }

    function btnFecharClick(evento) {
        window.open('/livros', '_self');
    };

    function carregarFormulario(){

    }

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
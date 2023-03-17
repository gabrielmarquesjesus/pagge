import { renderMenuLateral } from "../menuLateral/menuLateralService.js"
import { getApi } from "../utils/Api.js";

var telaAtual = window.location.pathname;

//verica a tela que o usuario está vendo
if (telaAtual.includes("/livros")) {
    window.onload = function () {
        renderMenuLateral();
        var tabelaLivro = document.querySelector('.tabela');

        //Local onde se adiciona os eventos da tela
        document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);
        for (let i = 0; i < tabelaLivro.rows.length - 1; i++) {
            var linha = tabelaLivro.rows[i + 1];
            linha.addEventListener('dblclick', editarLivro);
            linha.querySelector('.deleteColuna').addEventListener('click', deletarLivro);
        }//Adiciona evento a cada linha da tabela
    }

    function btnAdicionarClick() {
        window.open('/cadastroLivro/novo', '_self');
    }

    function editarLivro(evento) {
        var linhaSelecionada = evento.currentTarget;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;
        window.open('/cadastroLivro/' + codigo, '_self');
    }

    function deletarLivro(evento){
        var linhaSelecionada = evento.currentTarget.parentElement;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;

        if(confirm("Deseja excluir o livro "+codigo+"? ")){
            var requisicao = new XMLHttpRequest();
            requisicao.open("delete", "/livro/delete/" + codigo);
            requisicao.setRequestHeader('Content-Type', 'application/json');
            requisicao.send();
    
            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        window.open('/livros', '_self');
                    }
                }
            }
        }


    }

} else if (telaAtual.includes("/cadastroLivro")) {

    window.onload = function (win) {

        //Verifica se a url do Cadastro de Livros possui ID ou se é um novo cadastro
        var api = getApi(win);
        if (api.parametros != "novo") {
            //Caso tenha ID, vai chamar o método abaixo passando o ID como parametro
            carregarFormulario(api.parametros);
        }

        //Local onde se adiciona os eventos da tela
        document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);
        document.querySelector('.bntSalvar').addEventListener('click', salvarLivro);
    }

    function btnFecharClick(evento) {
        window.open('/livros', '_self');
    };

    function carregarFormulario(livroId) {

        //Faz um findById no banco para buscar os dados do livro
        var requisicao = new XMLHttpRequest();
        requisicao.open("get", "/livro/findById/" + livroId);
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Dados dos Livro vindos do banco de dados
                    var livro = JSON.parse(requisicao.responseText);

                    //Preenche o formulário com os dados do livro
                    document.querySelector("#id").value = livro.id;
                    document.querySelector("#titulo").value = livro.titulo;
                    document.querySelector("#autor").value = livro.autor;
                    document.querySelector("#editora").value = livro.editora;
                    document.querySelector("#pagina").value = livro.paginas;
                    document.querySelector("#genero").value = livro.genero;
                    document.querySelector("#isbn").value = livro.isbn;
                    document.querySelector("#status").value = livro.status;
                    document.querySelector("#observacao").value = livro.observacao;
                }
            }
        }
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
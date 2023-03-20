import { renderMenuLateral } from "../menuLateral/menuLateralService.js"
import { getApi } from "../utils/Api.js";
import { getFormValue } from "../utils/Utils.js";

var telaAtual = window.location.pathname;

//verica a tela que o usuario está vendo
if (telaAtual.includes("/livros")) {
    window.onload = function () {
        renderMenuLateral();
        var tabelaLivro = document.querySelector('.tabela');

        //Local onde se adiciona os eventos da tela
        document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);
        document.querySelector('.btnPesquisa').addEventListener('click', pesquisaLivros);
        pesquisaLivros();
    }

    //Abre o cadastro de livro com a url "novo"
    function btnAdicionarClick() {
        window.open('/cadastroLivro/novo', '_self');
    }

    //Abre o cadastro de livro com o código do livro na url
    function editarLivro(evento) {
        var linhaSelecionada = evento.currentTarget;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;
        window.open('/cadastroLivro/' + codigo, '_self');
    }

    //Método para buscar os livros no banco de acordo com filtro
    function pesquisaLivros(evento) {
        if (evento)
            evento.preventDefault();

        //Filtro (Pode ser que seja vazio, nesse caso vai buscar todos os livros)
        const jsonData = {
            "id": getFormValue("#codigo"),
            "titulo": getFormValue("#titulo"),
            "autor": getFormValue("#autor"),
            "editora": getFormValue("#editora"),
            "genero": getFormValue("#genero"),
            "isbn": getFormValue("#isbn"),
            "status": getFormValue("#status"),
        };

        var requisicao = new XMLHttpRequest();
        requisicao.open("get", "/livro/findAllFilter?jsonData=" + encodeURIComponent(JSON.stringify(jsonData)));
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Ao receber a lista de livros (result), ele passa ela para o método criaTabela
                    var result = JSON.parse(requisicao.responseText);
                    criaTabela(result);
                }
            }
        }

    }

    //Método que cria a tabela HTML do livro
    function criaTabela(livroList) {
        var corpoTabelaLivro = document.querySelector('.corpoTabelaLivro');
        var linhas = corpoTabelaLivro.querySelectorAll('.linhaLivro');
        for (var linha of linhas) {
            corpoTabelaLivro.removeChild(linha);
        }

        for (var livro of livroList) {
            var novaLinha = document.createElement('tr');
            novaLinha.addEventListener('dblclick', editarLivro);
            novaLinha.classList.add('linhaLivro');

            var codigoCell = document.createElement('td');
            codigoCell.style.textAlign = 'center';
            codigoCell.style.fontWeight = 'bold';
            codigoCell.classList.add('codigoColuna');
            codigoCell.innerText = livro.id;

            var tituloCell = document.createElement('td');
            tituloCell.innerText = livro.titulo;;

            var autorCell = document.createElement('td');
            autorCell.innerText = livro.autor;;
            var editoraCell = document.createElement('td');
            editoraCell.innerText = livro.editora;;
            var generoCell = document.createElement('td');
            generoCell.innerText = livro.genero;;

            var paginasCell = document.createElement('td');
            paginasCell.style.textAlign = 'right';
            paginasCell.innerText = livro.paginas;

            var statusCell = document.createElement('td');
            statusCell.style.textAlign = 'center';
            statusCell.innerText = livro.status == 0 ? 'Disponível' : 'Indisponível';

            var deleteCell = document.createElement('td');
            deleteCell.innerText = "x";
            deleteCell.classList.add('deleteColuna');
            deleteCell.style.textAlign = 'center';
            deleteCell.style.fontWeight = 'bold';
            deleteCell.addEventListener('click', deletarLivro);

            novaLinha.appendChild(codigoCell);
            novaLinha.appendChild(tituloCell);
            novaLinha.appendChild(autorCell);
            novaLinha.appendChild(editoraCell);
            novaLinha.appendChild(generoCell);
            novaLinha.appendChild(paginasCell);
            novaLinha.appendChild(statusCell);
            novaLinha.appendChild(deleteCell);

            corpoTabelaLivro.appendChild(novaLinha);
        }

    }

    function deletarLivro(evento) {
        var linhaSelecionada = evento.currentTarget.parentElement;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;

        if (confirm("Deseja excluir o livro " + codigo + "? ")) {
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
        document.querySelector('.btnBuscaIsbn').addEventListener('click', buscarLivroPorIsbn);
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
                    
                    const url = 'https://www.googleapis.com/books/v1/volumes?q=';

                    requisicao.open("get", url + livro.isbn);
                    requisicao.setRequestHeader('Content-Type', 'application/json');
                    requisicao.send();

                    requisicao.onreadystatechange = function () {
                        if (requisicao.readyState == 4) {
                            if (requisicao.status == 200) {
                                var listaLivro = JSON.parse(requisicao.responseText);
                                var livroInfo = listaLivro.items[0].volumeInfo;

                                try {
                                    document.querySelector(".imgLivroSrc").src = livroInfo.imageLinks.smallThumbnail;
                                    document.querySelector(".livroVazio").style.backgroundColor = 'white';
                                } catch (error) {
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    function salvarLivro(evento) {
        evento.preventDefault();

        const livro = {
            "id": getFormValue("#id"),
            "titulo": getFormValue("#titulo"),
            "autor": getFormValue("#autor"),
            "editora": getFormValue("#editora"),
            "paginas": getFormValue("#pagina"),
            "genero": getFormValue("#genero"),
            "isbn": getFormValue("#isbn"),
            "status": getFormValue("#status"),
            "observacao": getFormValue("#observacao")
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

    function buscarLivroPorIsbn(evento) {
        evento.preventDefault();
        var isbn = document.querySelector('#isbn').value;

        if (isbn != "" && isbn != null) {
            const url = 'https://www.googleapis.com/books/v1/volumes?q=';

            var requisicao = new XMLHttpRequest();

            requisicao.open('GET', url + isbn);
            requisicao.send();

            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        var listaLivro = JSON.parse(requisicao.responseText);
                        var livroInfo = listaLivro.items[0].volumeInfo;

                        document.querySelector("#titulo").value = livroInfo.title;
                        document.querySelector("#autor").value = livroInfo.authors[0];
                        document.querySelector("#editora").value = livroInfo.publisher;
                        document.querySelector("#pagina").value = livroInfo.pageCount;
                        document.querySelector("#genero").value = livroInfo.categories[0];

                        try {
                            document.querySelector(".imgLivroSrc").src = livroInfo.imageLinks.smallThumbnail;
                            document.querySelector(".livroVazio").style.backgroundColor = 'white';
                        } catch (error) {
                        }
                    }
                }
            }
        }

    }
}
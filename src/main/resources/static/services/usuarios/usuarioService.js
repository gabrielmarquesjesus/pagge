import { renderMenuLateral } from "../menuLateral/menuLateralService.js"
import { getApi } from "../utils/Api.js";
import { getFormValue } from "../utils/Utils.js";

var telaAtual = window.location.pathname;

//verica a tela que o usuario está vendo
if (telaAtual.includes("/usuarios")) {
    window.onload = function () {
        renderMenuLateral();
        var tabelaUsuario = document.querySelector('.tabela');

        //Local onde se adiciona os eventos da tela
        document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);
        document.querySelector('.btnPesquisa').addEventListener('click', pesquisaUsuarios);
        //pesquisaUsuarios();
    }

    //Abre o cadastro de usuario com a url "novo"
    async function btnAdicionarClick() {
        window.open('/cadastroUsuario/novo', '_self');

    }

    //Abre o cadastro de usuario com o código do usuario na url
    function editarUsuario(evento) {
        var linhaSelecionada = evento.currentTarget;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;
        window.open('/cadastroUsuario/' + codigo, '_self');
    }

    //Método para buscar os usuarios no banco de acordo com filtro
    function pesquisaUsuarios(evento) {
        if (evento)
            evento.preventDefault();

        //Filtro (Pode ser que seja vazio, nesse caso vai buscar todos os usuarios)
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
        requisicao.open("get", "/usuario/findAllFilter?jsonData=" + encodeURIComponent(JSON.stringify(jsonData)));
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Ao receber a lista de usuarios (result), ele passa ela para o método criaTabela
                    var result = JSON.parse(requisicao.responseText);
                    criaTabela(result);
                }
            }
        }

    }

    //Método que cria a tabela HTML do usuario
    function criaTabela(usuarioList) {

        var corpoTabelaUsuario = document.querySelector('.corpoTabelaUsuario');
        var linhas = corpoTabelaUsuario.querySelectorAll('.linhaUsuario');
        for (var linha of linhas) {
            corpoTabelaUsuario.removeChild(linha);
        }

        for (var usuario of usuarioList) {
            var novaLinha = document.createElement('tr');
            novaLinha.addEventListener('dblclick', editarUsuario);
            novaLinha.classList.add('linhaUsuario');

            var codigoCell = document.createElement('td');
            codigoCell.style.textAlign = 'center';
            codigoCell.style.fontWeight = 'bold';
            codigoCell.classList.add('codigoColuna');
            codigoCell.innerText = usuario.id;

            var nomeCell = document.createElement('td');
            nomeCell.innerText = usuario.nome;

            var cpfCell = document.createElement('td');
            cpfCell.innerText = usuario.cpf;

            var emailCell = document.createElement('td');
            emailCell.innerText = usuario.email;

            var telefoneCell = document.createElement('td');
            telefoneCell.innerText = usuario.telefone;

            var statusEmprestimoCell = document.createElement('td');
            statusEmprestimoCell.innerText = usuario.paginas;

            var deleteCell = document.createElement('td');
            deleteCell.innerText = "x";
            deleteCell.classList.add('deleteColuna');
            deleteCell.style.textAlign = 'center';
            deleteCell.style.fontWeight = 'bold';
            deleteCell.addEventListener('click', deletarUsuario);

            novaLinha.appendChild(codigoCell);
            novaLinha.appendChild(nomeCell);
            novaLinha.appendChild(cpfCell);
            novaLinha.appendChild(emailCell);
            novaLinha.appendChild(telefoneCell);
            novaLinha.appendChild(statusEmprestimoCell);
            novaLinha.appendChild(deleteCell);

            corpoTabelaUsuario.appendChild(novaLinha);
        }

    }

    function deletarUsuario(evento) {
        var linhaSelecionada = evento.currentTarget.parentElement;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;

        if (confirm("Deseja excluir o usuario " + codigo + "? ")) {
            var requisicao = new XMLHttpRequest();
            requisicao.open("delete", "/usuario/delete/" + codigo);
            requisicao.setRequestHeader('Content-Type', 'application/json');
            requisicao.send();

            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        window.open('/usuarios', '_self');
                    }
                }
            }
        }


    }

} else if (telaAtual.includes("/cadastroUsuario")) {

    window.onload = function (win) {

        //Verifica se a url do Cadastro de Usuarios possui ID ou se é um novo cadastro
        var api = getApi(win);
        if (api.parametros != "novo") {
            //Caso tenha ID, vai chamar o método abaixo passando o ID como parametro
            carregarFormulario(api.parametros);
        }

        //Local onde se adiciona os eventos da tela
        document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);
        document.querySelector('.bntSalvar').addEventListener('click', salvarUsuario);
        document.querySelector('.btnBuscaIsbn').addEventListener('click', buscarUsuarioPorIsbn);
    }

    function btnFecharClick(evento) {
        window.open('/usuarios', '_self');
    };

    function carregarFormulario(usuarioId) {

        //Faz um findById no banco para buscar os dados do usuario
        var requisicao = new XMLHttpRequest();
        requisicao.open("get", "/usuario/findById/" + usuarioId);
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Dados dos Usuario vindos do banco de dados
                    var usuario = JSON.parse(requisicao.responseText);

                    //Preenche o formulário com os dados do usuario
                    document.querySelector("#id").value = usuario.id;
                    document.querySelector("#titulo").value = usuario.titulo;
                    document.querySelector("#autor").value = usuario.autor;
                    document.querySelector("#editora").value = usuario.editora;
                    document.querySelector("#pagina").value = usuario.paginas;
                    document.querySelector("#genero").value = usuario.genero;
                    document.querySelector("#isbn").value = usuario.isbn;
                    document.querySelector("#status").value = usuario.status;
                    document.querySelector("#observacao").value = usuario.observacao;

                    const url = 'https://www.googleapis.com/books/v1/volumes?q=';

                    requisicao.open("get", url + usuario.isbn);
                    requisicao.setRequestHeader('Content-Type', 'application/json');
                    requisicao.send();

                    requisicao.onreadystatechange = function () {
                        if (requisicao.readyState == 4) {
                            if (requisicao.status == 200) {
                                var listaUsuario = JSON.parse(requisicao.responseText);
                                var usuarioInfo = listaUsuario.items[0].volumeInfo;

                                try {
                                    document.querySelector(".imgUsuarioSrc").src = usuarioInfo.imageLinks.smallThumbnail;
                                    document.querySelector(".usuarioVazio").style.backgroundColor = 'white';
                                } catch (error) {
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    function salvarUsuario(evento) {
        evento.preventDefault();

        const usuario = {
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

        requisicao.open("post", "/usuario/save");
        requisicao.setRequestHeader('Content-Type', 'application/json');

        requisicao.send(JSON.stringify(usuario).toString());

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    window.open('/usuarios', '_self');
                } else {
                    alert("Erro ao salvar o usuario. Por favor, entre em contato com o suporte.")
                }
            }
        }

    }

    function buscarUsuarioPorIsbn(evento) {
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
                        var listaUsuario = JSON.parse(requisicao.responseText);
                        var usuarioInfo = listaUsuario.items[0].volumeInfo;

                        document.querySelector("#titulo").value = usuarioInfo.title;
                        document.querySelector("#autor").value = usuarioInfo.authors[0];
                        document.querySelector("#editora").value = usuarioInfo.publisher;
                        document.querySelector("#pagina").value = usuarioInfo.pageCount;
                        document.querySelector("#genero").value = usuarioInfo.categories[0];

                        try {
                            document.querySelector(".imgUsuarioSrc").src = usuarioInfo.imageLinks.smallThumbnail;
                            document.querySelector(".usuarioVazio").style.backgroundColor = 'white';
                        } catch (error) {
                        }
                    }
                }
            }
        }

    }
}
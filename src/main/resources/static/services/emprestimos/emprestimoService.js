import { renderMenuLateral } from "../menuLateral/menuLateralService.js"
import { getApi } from "../utils/Api.js";
import { getFormValue } from "../utils/Utils.js";

var telaAtual = window.location.pathname;

//verica a tela que o emprestimo está vendo
if (telaAtual.includes("/emprestimos")) {
    window.onload = function () {
        renderMenuLateral();
        var tabelaEmprestimo = document.querySelector('.tabela');

        //Local onde se adiciona os eventos da tela
        document.querySelector('.btnAdicionar').addEventListener('click', btnAdicionarClick);
        document.querySelector('.btnPesquisa').addEventListener('click', pesquisaEmprestimos);
        pesquisaEmprestimos();
    }

    //Abre o cadastro de emprestimo com a url "novo"
    async function btnAdicionarClick() {
        evento.preventDefault();
        window.open('/cadastroEmprestimo/novo', '_self');

    }

    //Abre o cadastro de emprestimo com o código do emprestimo na url
    function editarEmprestimo(evento) {
        var linhaSelecionada = evento.currentTarget;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;
        window.open('/cadastroEmprestimo/' + codigo, '_self');
    }

    //Método para buscar os emprestimos no banco de acordo com filtro
    function pesquisaEmprestimos(evento) {
        if (evento)
            evento.preventDefault();

        //Filtro (Pode ser que seja vazio, nesse caso vai buscar todos os emprestimos)
        const jsonData = {
            "id": getFormValue("#codigo"),
            "nome": getFormValue("#nome"),
            "statusEmprestimo": getFormValue("#statusEmprestimo"),
            "email": getFormValue("#email"),
            "telefone": getFormValue("#telefone"),
            "cpf": getFormValue("#cpf"),
            "email": getFormValue("#email"),
        };

        var requisicao = new XMLHttpRequest();
        //requisicao.open("get", "/emprestimo/findAllFilter?jsonData=" + encodeURIComponent(JSON.stringify(jsonData)));
        requisicao.open("get", "/emprestimo/findAll");
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Ao receber a lista de emprestimos (result), ele passa ela para o método criaTabela
                    var result = JSON.parse(requisicao.responseText);
                    criaTabela(result);
                }
            }
        }

    }

    //Método que cria a tabela HTML do emprestimo
    function criaTabela(emprestimoList) {

        var corpoTabelaEmprestimo = document.querySelector('.corpoTabelaEmprestimo');
        var linhas = corpoTabelaEmprestimo.querySelectorAll('.linhaEmprestimo');
        for (var linha of linhas) {
            corpoTabelaEmprestimo.removeChild(linha);
        }

        for (var emprestimo of emprestimoList) {
            var novaLinha = document.createElement('tr');
            novaLinha.addEventListener('dblclick', editarEmprestimo);
            novaLinha.classList.add('linhaEmprestimo');

            var codigoCell = document.createElement('td');
            codigoCell.style.textAlign = 'center';
            codigoCell.style.fontWeight = 'bold';
            codigoCell.classList.add('codigoColuna');
            codigoCell.innerText = emprestimo.id;

            var usuarioCell = document.createElement('td');
            usuarioCell.innerText = emprestimo.usuarioId + " - " + emprestimo.usuarioNome;

            var prazoDevolucaoCell = document.createElement('td');
            prazoDevolucaoCell.innerText = emprestimo.prazoDevolucao;

            var dataEmprestimoCell = document.createElement('td');
            dataEmprestimoCell.innerText = emprestimo.dataEmprestimo;

            var dataDevolucaoCell = document.createElement('td');
            dataDevolucaoCell.innerText = emprestimo.dataDevolucao;

            var statusCell = document.createElement('td');
            statusCell.innerText = emprestimo.status;

            var deleteCell = document.createElement('td');
            deleteCell.innerText = "x";
            deleteCell.classList.add('deleteColuna');
            deleteCell.style.textAlign = 'center';
            deleteCell.style.fontWeight = 'bold';
            deleteCell.addEventListener('click', deletarEmprestimo);

            novaLinha.appendChild(codigoCell);
            novaLinha.appendChild(usuarioCell);
            novaLinha.appendChild(prazoDevolucaoCell);
            novaLinha.appendChild(dataEmprestimoCell);
            novaLinha.appendChild(dataDevolucaoCell);
            novaLinha.appendChild(statusCell);
            novaLinha.appendChild(deleteCell);

            corpoTabelaEmprestimo.appendChild(novaLinha);
        }

    }

    function deletarEmprestimo(evento) {
        var linhaSelecionada = evento.currentTarget.parentElement;
        var codigo = linhaSelecionada.querySelector('.codigoColuna').innerText;

        if (confirm("Deseja excluir o emprestimo " + codigo + "? ")) {
            var requisicao = new XMLHttpRequest();
            requisicao.open("delete", "/emprestimo/delete/" + codigo);
            requisicao.setRequestHeader('Content-Type', 'application/json');
            requisicao.send();

            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        window.open('/emprestimos', '_self');
                    }
                }
            }
        }


    }

} else if (telaAtual.includes("/cadastroEmprestimo")) {

    window.onload = function (win) {

        //Verifica se a url do Cadastro de Emprestimos possui ID ou se é um novo cadastro
        var api = getApi(win);
        if (api.parametros != "novo") {
            //Caso tenha ID, vai chamar o método abaixo passando o ID como parametro
            carregarFormulario(api.parametros);
        }

        //Local onde se adiciona os eventos da tela
        document.querySelector('.bntFechar').addEventListener('click', btnFecharClick);
        document.querySelector('.bntSalvar').addEventListener('click', salvarEmprestimo);

        document.querySelector('#codigoUsuario').addEventListener('change', buscaUsuarioByCodigo);
        document.querySelector('#codigoLivro1').addEventListener('change', buscaLivroByCodigo);
        document.querySelector('#codigoLivro2').addEventListener('change', buscaLivroByCodigo);
    }

    function btnFecharClick(evento) {
        window.open('/emprestimos', '_self');
    };

    function carregarFormulario(emprestimoId) {

        //Faz um findById no banco para buscar os dados do emprestimo
        var requisicao = new XMLHttpRequest();
        requisicao.open("get", "/emprestimo/findById/" + emprestimoId);
        requisicao.setRequestHeader('Content-Type', 'application/json');
        requisicao.send();

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    //Dados dos Emprestimo vindos do banco de dados
                    var emprestimo = JSON.parse(requisicao.responseText);
                    var livroList = emprestimo.livroList;

                    //Preenche o formulário com os dados do emprestimo

                    document.querySelector("#id").value = emprestimo.id;
                    document.querySelector("#codigoUsuario").value = emprestimo.usuarioId;
                    document.querySelector("#nomeUsuario").value = emprestimo.usuarioNome;
                    document.querySelector("#prazoDevolucao").value = emprestimo.prazoDevolucao;
                    document.querySelector("#dataEmprestimo").value = emprestimo.dataEmprestimo;
                    document.querySelector("#dataDevolucao").value = emprestimo.dataDevolucao;
                    document.querySelector("#status").value = emprestimo.status;

                    document.querySelector("#codigoLivro1").value = livroList[0].id;
                    document.querySelector("#tituloLivro1").value = livroList[0].titulo;

                    document.querySelector("#codigoLivro2").value = livroList[1].id;
                    document.querySelector("#tituloLivro2").value = livroList[1].titulo;

                    document.querySelector("#observacao").value = emprestimo.observacao;

                }
            }
        }
    }

    function salvarEmprestimo(evento) {
        evento.preventDefault();

        const emprestimo = {
            "id": getFormValue("#id"),
            "usuarioId": getFormValue("#codigoUsuario"),
            "prazoDevolucao": getFormValue("#prazoDevolucao"),
            "dataEmprestimo": getFormValue("#dataEmprestimo"),
            "dataDevolucao": getFormValue("#dataDevolucao"),
            "status": getFormValue("#status"),
            "observacao": getFormValue("#observacao"),
            "livroList": [
                {
                    "id": getFormValue("#codigoLivro1")
                },
                {
                    "id": getFormValue("#codigoLivro2")
                }
            ]
        };

        var requisicao = new XMLHttpRequest();

        requisicao.open("post", "/emprestimo/save");
        requisicao.setRequestHeader('Content-Type', 'application/json');

        requisicao.send(JSON.stringify(emprestimo).toString());

        requisicao.onreadystatechange = function () {
            if (requisicao.readyState == 4) {
                if (requisicao.status == 200) {
                    window.open('/emprestimos', '_self');
                } else {
                    alert("Erro ao salvar o emprestimo. Por favor, entre em contato com o suporte.")
                }
            }
        }

    };

    function buscaUsuarioByCodigo() {
        var codigo = getFormValue('#codigoUsuario');

        if (codigo != "" && codigo != null) {
            var requisicao = new XMLHttpRequest();
            requisicao.open("get", "/usuario/findById/" + codigo);
            requisicao.setRequestHeader('Content-Type', 'application/json');
            requisicao.send();

            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        //Dados dos Emprestimo vindos do banco de dados
                        var usuario = JSON.parse(requisicao.responseText);
                        document.querySelector('#nomeUsuario').value = usuario.nome;
                        
                    } else {
                        alert("Usuário não encontrado!")
                        document.querySelector('#nomeUsuario').value = "";
                    }
                }
            }
        }

    };

    function buscaLivroByCodigo(evento) {
        var index = evento.srcElement.id.split('Livro')[1];

        var codigoLivroId = "#codigoLivro" + index;
        var tituloLivroId = "#tituloLivro" + index;

        var codigoLivro = getFormValue(codigoLivroId);

        if (codigoLivro != "" && codigoLivro != null) {
            var requisicao = new XMLHttpRequest();
            requisicao.open("get", "/livro/findById/" + codigoLivro);
            requisicao.setRequestHeader('Content-Type', 'application/json');
            requisicao.send();

            requisicao.onreadystatechange = function () {
                if (requisicao.readyState == 4) {
                    if (requisicao.status == 200) {
                        //Dados dos Emprestimo vindos do banco de dados
                        var livro = JSON.parse(requisicao.responseText);
                        document.querySelector(tituloLivroId).value = livro.titulo;
                    } else {
                        alert("Livro não encontrado!")
                        document.querySelector(tituloLivroId).value = "";
                    }
                }
            }
        }
    }
}
package com.senai.pagge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
* Classe java responsável por endereçar cada tela do sistema para que 
* seja possível navegar entre elas
*/

@Controller
public class NavigateController {

    @GetMapping(value = "/menuLateral") // Ao fazer uma requisição para a url: localhost:8080/menuLateral ...
    public String menu() {
        return "componentes/menuLateral"; // irá retornar o arquivo menuLateral.html
    }

    @GetMapping(value = "/home") // Ao fazer uma requisição para a url: localhost:8080/home ...
    public String navigateHome() {
        return "index"; // irá retornar o arquivo index.html
    }

    @GetMapping(value ="/livros")
    public String navigateLivroGrid(){
        return "grid/livro/livroGrid"; 
    }
    
    @GetMapping(value ="/cadastroLivro/{livroJson}")
    public String navigateLivroForm(@PathVariable String livroJson){
        return "form/livro/livroForm"; 
    }

    @GetMapping(value ="/usuarios")
    public String navigateUsuarioGrid(){
        return "grid/usuario/usuarioGrid"; 
    }
    
    @GetMapping(value ="/cadastroUsuario/{usuarioJson}")
    public String navigateUsuarioForm(@PathVariable String usuarioJson){
        return "form/usuario/usuarioForm"; 
    }

    @GetMapping(value ="/emprestimos")
    public String navigateEmprestimoGrid(){
        return "grid/emprestimo/emprestimoGrid"; 
    }
    
    @GetMapping(value ="/cadastroEmprestimo/{emprestimoJson}")
    public String navigateEmprestimoForm(@PathVariable String emprestimoJson){
        return "form/emprestimo/emprestimoForm"; 
    }
}

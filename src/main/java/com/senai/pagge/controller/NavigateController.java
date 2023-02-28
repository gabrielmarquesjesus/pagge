package com.senai.pagge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
    
    @GetMapping(value ="/cadastroLivro")
    public String navigateLivroForm(){
        return "form/livro/livroForm"; 
    }
}

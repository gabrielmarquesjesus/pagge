package com.senai.pagge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.senai.pagge.entities.Livro;
import com.senai.pagge.services.LivroService;

/*
* Classe java responsável por endereçar cada tela do sistema para que 
* seja possível navegar entre elas
*/

@Controller
public class NavigateController {

    @Autowired
    private LivroService livroService;

    @GetMapping(value = "/menuLateral") // Ao fazer uma requisição para a url: localhost:8080/menuLateral ...
    public String menu() {
        return "componentes/menuLateral"; // irá retornar o arquivo menuLateral.html
    }

    @GetMapping(value = "/home") // Ao fazer uma requisição para a url: localhost:8080/home ...
    public String navigateHome() {
        return "index"; // irá retornar o arquivo index.html
    }

    @GetMapping(value ="/livros")
    public String navigateLivroGrid(Model model){
        List<Livro> livroList = livroService.findAll();
        model.addAttribute("livroList", livroList);
        return "grid/livro/livroGrid"; 
    }
    
    @GetMapping(value ="/cadastroLivro/{livroJson}")
    public String navigateLivroForm(@PathVariable String livroJson){
        System.out.println(livroJson);
        return "form/livro/livroForm"; 
    }
}

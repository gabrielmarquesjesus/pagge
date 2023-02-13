package com.senai.pagge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/*
* Classe java responsável por endereçar cada tela do sistema para que 
* seja possível navegar entre elas
*/

@Controller
public class NavigateController {

    @GetMapping("/home") // Ao fazer uma requisição para a url: localhost:8080/home ...
    public String navigateHome() {
        return "index"; // irá retornar o arquivo index.html
    }
}

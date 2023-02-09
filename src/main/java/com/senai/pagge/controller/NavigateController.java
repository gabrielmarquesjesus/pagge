package com.senai.pagge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavigateController {
    @GetMapping("/home")
    public String home(){
        return "index";
    }

    @GetMapping("/usuarios")
    public String usuario(){
        return "grid/usuario/usuarioGrid";
    }
}

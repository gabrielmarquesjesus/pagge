package com.senai.pagge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.pagge.entities.Livro;
import com.senai.pagge.services.LivroService;

@RestController
@RequestMapping("/livro")
public class LivroController {
    @Autowired
    private LivroService livroService;

    @PostMapping(value = "/save")
    public void save(Livro livro) {
        livroService.save(livro);
    }
}

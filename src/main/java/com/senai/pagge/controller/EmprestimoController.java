package com.senai.pagge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.senai.pagge.entities.Emprestimo;
import com.senai.pagge.services.EmprestimoService;

@RestController
@RequestMapping("/emprestimo")
public class EmprestimoController {
    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void save(@RequestBody String jsonData) throws JsonMappingException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Emprestimo emprestimo = objectMapper.readValue(jsonData, Emprestimo.class);
        emprestimoService.save(emprestimo);
    }

    @GetMapping(value = "/findById/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Emprestimo findById(@PathVariable Long id){
        return emprestimoService.findById(id);
    }

    @DeleteMapping(value = "/delete/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable Long id){
        emprestimoService.delete(id);
    }

    @GetMapping(value = "/findAll", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Emprestimo> findAll() {
        List<Emprestimo> emprestimoList = emprestimoService.findAll(); 
        return emprestimoList;
    }

    @GetMapping(value = "/findAllFilter", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Emprestimo> findAllFilter(@RequestParam(name = "jsonData") String jsonData) throws JsonMappingException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Emprestimo emprestimoFilter = objectMapper.readValue(jsonData, Emprestimo.class);
        return emprestimoService.findAllFilter(emprestimoFilter);
    }
}

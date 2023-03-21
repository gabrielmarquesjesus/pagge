package com.senai.pagge.entities;
import java.util.List;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
// (nullable = false)indica se pode ser nulo ou não na criação da coluna
// @Nonnull para evitar que valores nulos sejam inseridos no banco
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Nonnull
    @Column(nullable = false)
    private Long tipo;

    @Nonnull
    @Column(nullable = false,length = 150)
    private String endereco;
    
    @Nonnull
    @Column(nullable = false,length = 60)
    private String nome;

    @Nonnull
    @Column(nullable = false,unique=true,length = 15)
    private String cpf;

    @Nonnull
    @Column(nullable = false,length = 11)
    private String telefone;

    @Nonnull
    @Column(nullable = false)
    private String email;
    
    @Column(length = 200)
    private String observacao;

    @Nonnull  
    @Column(nullable = false) 
    private Long statusEmprestimo;

    @OneToMany(mappedBy = "usuario")
    private List<Emprestimo> emprestimoList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTipo() {
        return tipo;
    }

    public void setTipo(Long tipo) {
        this.tipo = tipo;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Long getStatusEmprestimo() {
        return statusEmprestimo;
    }

    public void setStatusEmprestimo(Long statusEmprestimo) {
        this.statusEmprestimo = statusEmprestimo;
    }

    public List<Emprestimo> getEmprestimoList() {
        return emprestimoList;
    }

    public void setEmprestimoList(List<Emprestimo> emprestimoList) {
        this.emprestimoList = emprestimoList;
    }



}

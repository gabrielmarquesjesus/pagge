package com.senai.pagge.entities;
import java.util.List;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
// (nullable = false)indica se pode ser nulo ou não na criação da coluna
// @Nonnull para evitar que valores nulos sejam inseridos no banco
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    private long id;

    @Nonnull
    @Column(nullable = false)
    private int tipo;

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
    private int statusEmprestimo;

    @OneToMany(mappedBy = "usuario")
    private List<Emprestimo> emprestimoList;

//getters and setters

    public List<Emprestimo> getEmprestimoList() {
        return emprestimoList;
    }


    public void setEmprestimoList(List<Emprestimo> emprestimoList) {
        this.emprestimoList = emprestimoList;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }


    public int getTipo() {
        return tipo;
    }


    public String getEndereco() {
        return endereco;
    }


    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }


    public String getTelefone() {
        return telefone;
    }


    public String getObservacao() {
        return observacao;
    }


    public void setId(long id) {
        this.id = id;
    }


    public void setTipo(int tipo) {
        this.tipo = tipo;
    }


    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }


    public void setNome(String nome) {
        this.nome = nome;
    }


    public void setCpf(String cpf) {
        this.cpf = cpf;
    }


    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

}

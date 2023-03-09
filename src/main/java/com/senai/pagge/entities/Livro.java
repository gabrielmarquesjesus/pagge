package com.senai.pagge.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "livro")
public class Livro {

    @Id
    private long id;

    @Nonnull
    @Column(nullable = false,length = 40)
    private String titulo;

    @Nonnull
    @Column(nullable = false,length = 40)
    private String autor;

    @Nonnull
    @Column(nullable = false,length = 40)
    private String editora;

    @Nonnull
    @Column(nullable = false,length = 40)
    private String genero;

    @Nonnull
    @Column(length = 200)
    private String observacao;

    @Nonnull
    @Column
    private int paginas;

    @Nonnull
    @Column(nullable = false,length = 13)
    private String isbn;

    @Nonnull
    @Column(nullable = false)
    private int status;

    @ManyToOne
    @JoinColumn(name="emprestimo_id")
    private Emprestimo emprestimo;

    //getters and setters


    public Emprestimo getEmprestimo() {
        return emprestimo;
    }

    public void setEmprestimo(Emprestimo emprestimo) {
        this.emprestimo = emprestimo;
    }

    public long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getEditora() {
        return editora;
    }

    public String getGenero() {
        return genero;
    }

    public String getObservacao() {
        return observacao;
    }

    public int getPaginas() {
        return paginas;
    }

    public String getIsbn() {
        return isbn;
    }

    public int getStatus() {
        return status;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setEditora(String editora) {
        this.editora = editora;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public void setPaginas(int paginas) {
        this.paginas = paginas;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

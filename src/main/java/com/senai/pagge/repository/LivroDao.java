package com.senai.pagge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.senai.pagge.entities.Livro;
//Dao é a camada de acesso ao banco de dados.
@Repository
public interface LivroDao extends JpaRepository<Livro,Long > {
    
    
}

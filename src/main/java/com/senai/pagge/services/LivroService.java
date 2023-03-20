package com.senai.pagge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.senai.pagge.entities.Livro;
import com.senai.pagge.repository.LivroDao;
//Camada que possue a logica de programação.
@Service
public class LivroService implements BaseService<Livro>  {
    @Autowired
    private LivroDao livroDao;

    @Override
    public void save(Livro e) {
        livroDao.save(e);
    }

    @Override
    public Livro findById(Long id) {
        return livroDao.findById(id).get();
    }

    @Override
    public List<Livro> findAll() {
        return livroDao.findAll();
    }

    public List<Livro> findAllFilter(Livro livroFilter) {
        Example<Livro> example = Example.of(livroFilter);
        return livroDao.findAll(example, Sort.by(Direction.ASC, "id"));
    }

    @Override
    public void update(Livro e) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(long id) {
        livroDao.deleteById(id);
    }


    
}

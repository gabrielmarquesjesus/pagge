package com.senai.pagge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.senai.pagge.entities.Livro;
import com.senai.pagge.repository.LivroDao;

public class LivroService implements BaseService<Livro>  {
    @Autowired
    private LivroDao livroDao;

    @Override
    public void save(Livro e) {
        livroDao.save(e);
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public Livro findById(Long id) {
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<Livro> findAll() {
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public void update(Livro e) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(long id) {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }


    
}

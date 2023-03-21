package com.senai.pagge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.senai.pagge.entities.Usuario;
import com.senai.pagge.repository.UsuarioDao;
//Camada que possue a logica de programação.
@Service
public class UsuarioService implements BaseService<Usuario>  {
    @Autowired
    private UsuarioDao usuarioDao;

    @Override
    public void save(Usuario e) {
        usuarioDao.save(e);
    }

    @Override
    public Usuario findById(Long id) {
        return usuarioDao.findById(id).get();
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioDao.findAll();
    }

    public List<Usuario> findAllFilter(Usuario usuarioFilter) {
        Example<Usuario> example = Example.of(usuarioFilter);
        return usuarioDao.findAll(example, Sort.by(Direction.ASC, "id"));
    }

    @Override
    public void update(Usuario e) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(long id) {
        usuarioDao.deleteById(id);
    }


    
}

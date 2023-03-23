package com.senai.pagge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.senai.pagge.entities.Emprestimo;
import com.senai.pagge.entities.Livro;
import com.senai.pagge.repository.EmprestimoDao;
//Camada que possue a logica de programação.
@Service
public class EmprestimoService implements BaseService<Emprestimo>  {
    @Autowired
    private EmprestimoDao emprestimoDao;

    @Autowired
    private LivroService livroService;

    @Override
    public void save(Emprestimo e) {
        emprestimoDao.save(e);

        if(e.getLivroList() != null && !e.getLivroList().isEmpty()){
            for(Livro livro : e.getLivroList()){
                Livro livroAtualizar = livroService.findById(livro.getId());
                livroAtualizar.setEmprestimo(e);
                livroService.save(livroAtualizar);
            }
        }

    }

    @Override
    public Emprestimo findById(Long id) {
        Emprestimo emprestimo = emprestimoDao.findById(id).get();
        emprestimo.setUsuarioId(emprestimo.getUsuario().getId());
        emprestimo.setUsuarioNome(emprestimo.getUsuario().getNome());
        return emprestimo;
    }

    @Override
    public List<Emprestimo> findAll() {
        List<Emprestimo> emprestimoList = emprestimoDao.findAll();
        for(Emprestimo emp : emprestimoList){
            emp.setUsuarioId(emp.getUsuario().getId());
            emp.setUsuarioNome(emp.getUsuario().getNome());
        }
        return emprestimoList;
    }

    public List<Emprestimo> findAllFilter(Emprestimo emprestimoFilter) {
        Example<Emprestimo> example = Example.of(emprestimoFilter);
        return emprestimoDao.findAll(example, Sort.by(Direction.ASC, "id"));
    }

    @Override
    public void update(Emprestimo e) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(long id) {
        emprestimoDao.deleteById(id);
    }


    
}

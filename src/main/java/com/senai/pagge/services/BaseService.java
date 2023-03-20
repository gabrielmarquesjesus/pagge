package com.senai.pagge.services;

import java.util.List;

public interface BaseService<E> {
    public void save(E e);
    public E findById(Long id);
    public List<E> findAll();
    public void update(E e);
    public void delete(long id);
}

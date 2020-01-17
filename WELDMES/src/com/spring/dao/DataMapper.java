package com.spring.dao;

import java.util.List;

import com.spring.model.Data;

public interface DataMapper {

	List<Data> findAll();
}

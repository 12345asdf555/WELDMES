package com.spring.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dao.DataMapper;
import com.spring.model.Data;
import com.spring.service.DataService;

@Service
@Transactional  //此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class DataServiceImpl implements DataService {
	
	@Resource
	private DataMapper mapper;

	public List<Data> findAll() {
		List<Data> findAllList = mapper.findAll();
		return findAllList;
	}
}

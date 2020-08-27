package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.PersonMapper;
import com.spring.model.Person;
import com.spring.page.Page;
import com.spring.service.PersonService;

@Service
@Transactional
public class PersonServiceImpl implements PersonService{

	@Resource
	private PersonMapper mapper;
	
	@Override
	public List<Person> findAll(Page page, BigInteger parent, String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		List<Person> findAllList = mapper.findAll(parent,str);
		return findAllList;
	}

	@Override
	public List<Person> findLeve(int type) {
		return mapper.findLeve(type);
	}

	@Override
	public void save(Person welder) {
		mapper.save(welder);
	}

	@Override
	public void catsave(Person welder) {
		mapper.catsave(welder);
	}
	
	@Override
	public Person findById(BigInteger fid) {
		return mapper.findById(fid);
	}

	@Override
	public void update(Person welder) {
		mapper.update(welder);
	}

	@Override
	public void catupdate(Person welder) {
		mapper.catupdate(welder);
	}
	
	@Override
	public void delete(BigInteger fid) {
		mapper.delete(fid);
	}

	@Override
	public void catdelete(BigInteger fid) {
		mapper.catdelete(fid);
	}
	
	@Override
	public List<Person> dic() {
		return mapper.dic();
	}

	@Override
	public List<Person> ins() {
		return mapper.ins();
	}

	@Override
	public int getUsernameCount(String welderno) {
		return mapper.getUsernameCount(welderno);
	}

	@Override
	public List<Person> getWelder() {
		return mapper.findAll(null, null);
	}

	@Override
	public List<Person> findAll(BigInteger parent) {
		return mapper.findAll(parent, null);
	}
	@Override
	public List<Person> getcatAllWelder(String str) {
		return mapper.findAll(null,str);
	}
}
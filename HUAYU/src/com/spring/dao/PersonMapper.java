package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Person;

public interface PersonMapper {

	List<Person> findAll(@Param("parent")BigInteger parent,@Param("str")String str);
	List<Person> findLeve(int type);
	List<Person> dic();
	List<Person> ins();
	void save(Person welder);
	void catsave(Person welder);
	Person findById(BigInteger fid);
	int getUsernameCount(@Param("welderno")String welderno);
	void update(Person welder);
	void catupdate(Person welder);
	void delete(BigInteger fid);
	void catdelete(BigInteger fid);
}
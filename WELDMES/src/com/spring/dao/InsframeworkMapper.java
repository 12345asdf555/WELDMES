package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.dto.WeldDto;
import com.spring.model.Insframework;

import tk.mybatis.mapper.common.Mapper;

public interface InsframeworkMapper extends Mapper<Insframework>{
	List<Insframework> getInsframeworkAll(@Param("parent")BigInteger parent,@Param("str")String str,@Param("dto")WeldDto dto);
	
	List<Insframework> getInsframework(@Param("parent")BigInteger parent);
	
	BigInteger getInsframeworkByName(@Param("name")String name);
	
	Insframework getInsfAllById(@Param("id")BigInteger id);
	
	int getInsframeworkNameCount(@Param("name")String name);
	
	String getInsframeworkById(@Param("id")BigInteger id);
	
	BigInteger getParentById(@Param("id")BigInteger id);
	
	void addInsframework(Insframework ins);
	
	void editInsframework(Insframework ins);
	
	void deleteInsframework(@Param("id")BigInteger id);
	
	List<Insframework> getConmpany(@Param("value1")BigInteger value1);
	
	List<Insframework> getCause(@Param("id")BigInteger id,@Param("value2")BigInteger value2);
	
	Insframework getParent(@Param("id")BigInteger id);
	
	List<Insframework> getInsByType(@Param("type") int type,@Param("parent")BigInteger parent);
	
	int getUserInsfType(@Param("uid")BigInteger uid);
	
	BigInteger  getUserInsfId(@Param("uid")BigInteger uid);
	
	int getTypeById(@Param("id")BigInteger id);
	
	Insframework getBloc();
	
	List<Insframework> getInsIdByParent(@Param("parent")BigInteger parent,@Param("type")int type);
	
	List<Insframework> getInsByUserid(@Param("uid")BigInteger uid);
	
	Insframework getInsById(@Param("id")BigInteger id);
	
	List<Insframework> getInsAll(@Param("type")int type,@Param("parent")BigInteger parent);
}

package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Gather;

import tk.mybatis.mapper.common.Mapper;

public interface GatherMapper extends Mapper<Gather>{
	List<Gather> getGatherAll(@Param("str")String str,@Param("parent")BigInteger parent);
	
	List<Gather> getGatherByInsfid(@Param("insfid")BigInteger insfid);
	
	BigInteger getGatherByNo(@Param("gatherno")String gatherno);
	
	int getGatherNoCount(@Param("gatherno")String gatherno,@Param("item")BigInteger item);
	
	Gather getGatherById(@Param("id")BigInteger id);
	
	void addGather(Gather ins);
	
	void editGather(Gather ins);
	
	void deleteGather(@Param("id")BigInteger id);
	
	int getGatherNoByItemCount(@Param("gatherno")String gatherno,@Param("itemid")String itemid);
}

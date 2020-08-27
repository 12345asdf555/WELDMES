package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Dictionarys;

import tk.mybatis.mapper.common.Mapper;

public interface DictionaryMapper extends Mapper<Dictionarys> {
	List<Dictionarys> getDictionaryAll(@Param("str")String str);
	
	List<Dictionarys> getDictionaryType();
	
	void addDictionary(Dictionarys d);
	
	void editDictionary(Dictionarys d);
	
	int getDictionaryMaxValue(int typeid);
	
	Dictionarys getDictionaryByFid(int id);
	
	void deleteDictionary(int id);
	
	BigInteger getDictionaryByValue(@Param("value")int value);
	
	List<Dictionarys> getDictionaryValue(@Param("typeid")int typeid);
	
	List<Dictionarys> getDicValueByValue(@Param("typeid")int typeid,@Param("value")int value);
	
	int getvaluebyname(@Param("typeid")int typeid,@Param("valuename")String valuename);
	
	String getDicValueByType(@Param("typeid")int typeid,@Param("value")int value);
	
	List<Dictionarys> getModelOfManu(@Param("num")int num);
	
}

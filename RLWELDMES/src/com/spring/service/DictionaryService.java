package com.spring.service;

import java.util.List;
import com.spring.model.*;
import com.spring.page.Page;

public interface DictionaryService {
	/**
	 * 分页获取字典信息
	 * @param page
	 * @param str
	 * @return
	 */
	List<Dictionarys> getAllDictionary(Page page,String str);
	
    void addDictionary(Dictionarys d);
	
	void editDictionary(Dictionarys d);
	
	int getDictionaryMaxValue(int typeid);
	
	Dictionarys getDictionaryByFid(int id);
	
	void deleteDictionary(int id);
	
	/**
	 * 获取字典值及值名称
	 * @param typeid 类型id
	 * @return
	 */
	List<Dictionarys> getDictionaryValue(int typeid);
	
	/**
	 * 根据类型值及字典值获取字典值及值名称
	 * @param typeid 类型值
	 * @param value 字典值
	 * @return
	 */
	List<Dictionarys> getDicValueByValue(int typeid,int value);
	
	/**
	 * 根据值名称获取值
	 * @param valuename 值名称
	 * @return
	 */
	int getvaluebyname(int typeid,String valuename);

	/**
	 * 根据value（字典值）获取值名称
	 * @param value
	 * @return
	 */
	String getDicValueByType(int typeid,int value);
	
	/**
	 * 获取字典表的所有字典
	 * @return
	 */
	List<Dictionarys> getDictionaryType();

	/**
	 * 获取厂商下面的焊机型号
	 * @param str
	 * @return
	 */
	List<Dictionarys> getModelOfManu(int num);
}

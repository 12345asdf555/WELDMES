package com.spring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.DictionaryMapper;
import com.spring.model.Dictionarys;
import com.spring.page.Page;
import com.spring.service.DictionaryService;


@Service
@Transactional
public class DictionaryServiceImpl implements DictionaryService {

	@Autowired
	private DictionaryMapper dictionaryMapper;
	@Override
	public List<Dictionarys> getAllDictionary(Page page, String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return dictionaryMapper.getDictionaryAll(str);
	}
	@Override
	public void addDictionary(Dictionarys d) {
		int value= dictionaryMapper.getDictionaryMaxValue(d.getTypeid());
		d.setValue(value+1);
		dictionaryMapper.addDictionary(d);
	}
	@Override
	public void editDictionary(Dictionarys d) {
		dictionaryMapper.editDictionary(d);
		
	}
	@Override
	public int getDictionaryMaxValue(int typeid) {
	    int id=dictionaryMapper.getDictionaryMaxValue(typeid);
		return id;
	}
	@Override
	public Dictionarys getDictionaryByFid(int id) {
		Dictionarys dic=dictionaryMapper.getDictionaryByFid(id);
		return dic;
	}
	@Override
	public void deleteDictionary(int id) {
		dictionaryMapper.deleteDictionary(id);
	}
	
	@Override
	public List<Dictionarys> getDictionaryValue(int typeid) {
		return dictionaryMapper.getDictionaryValue(typeid);
	}
	@Override
	public List<Dictionarys> getDicValueByValue(int typeid, int value) {
		return dictionaryMapper.getDicValueByValue(typeid, value);
	}
	@Override
	public int getvaluebyname(int typeid,String valuename) {
		return dictionaryMapper.getvaluebyname(typeid,valuename);
	}
	@Override
	public String getDicValueByType(int typeid,int value) {
		return dictionaryMapper.getDicValueByType(typeid,value);
	}
	@Override
	public List<Dictionarys> getDictionaryType() {
		return dictionaryMapper.getDictionaryType();
	}
	@Override
	public List<Dictionarys> getModelOfManu(int num) {
		// TODO Auto-generated method stub
		return dictionaryMapper.getModelOfManu(num);
	}
}

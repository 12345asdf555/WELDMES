package com.spring.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.ResourceMapper;
import com.spring.model.Resources;
import com.spring.page.Page;
import com.spring.service.ResourceService;



@Service
@Transactional  //此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class ResourceServiceImpl implements ResourceService {
	
	@Resource
	private ResourceMapper mapper;

	public boolean delete(int id) {
		
		return mapper.delete(id);
	}

	public List<Resources> findAll(Page page,String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		List<Resources> findAllList = mapper.findAll(str);
		return findAllList;
	}
	
	public List<String> getResourcesByAuthName(String authName) {
		return mapper.getResourcesByAuthName(authName);
	}
	
	public int getResourcenameCount(String resourceName) {
		return mapper.getResourcenameCount(resourceName);
	}

	public Resources findById(Integer id) {

		Resources resource = mapper.findById(id);
		return resource;
	}

	public void save(Resources resource) {

		mapper.save(resource);
	}

	public boolean update(Resources resource) {

		return mapper.update(resource);
	}

	@Override
	public List<String> getAuthByRes(String url) {

		return mapper.getAuthByRes(url);
	}

	@Override
	public List<Resources> getResourceByUserid(int id) {
		return mapper.getResourceByUserid(id);
	}

	@Override
	public List<String> getAuthName(int id) {
		return mapper.getAuthName(id);
	}

	@Override
	public List<Resources> getResourceByAdmin() {
		return mapper.getResourceByAdmin();
	}

}
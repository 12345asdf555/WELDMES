package com.spring.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.AuthorityMapper;
import com.spring.model.Authority;
import com.spring.page.Page;
import com.spring.service.AuthorityService;

@Service
@Transactional  //此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class AuthorityServiceImpl implements AuthorityService {
	
	@Resource
	private AuthorityMapper mapper;

	public boolean delete(int id) {
		
		return mapper.delete(id);
	}
	
	public boolean delete1(int id) {
		
		return mapper.delete1(id);
	}
	
	public boolean delete2(int id) {
		
		return mapper.delete2(id);
	}
	
	public boolean deleteResource(int id) {
		
		return mapper.deleteResource(id);
	}

	public List<Authority> findAll(Page page,String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		List<Authority> findAllList = mapper.findAll(str);
		return findAllList;
	}
	
	public List<Authority> findAllResource() {
		List<Authority> findAllResourceList = mapper.findAllResource();
		return findAllResourceList;
	}
	
	public List<Authority> getAllAuthoritys() {
		return mapper.getAllAuthoritys();
	}
	
	public List<Authority> findResource(Integer id) {
		
		return mapper.findResource(id);
	}

	public Authority findById(Integer id) {

		Authority authority = mapper.findById(id);
		
		return authority;
	}
	
	public int getAuthoritynameCount(String authorityName) {
		return mapper.getAuthoritynameCount(authorityName);
	}

	public String findByResourceId(Integer id) {
		
		return mapper.findByResourceId(id);
	}
	
	public String updateAuthorityResource(Integer id) {
		
		return mapper.updateAuthorityResource(id);
	}
	
	public void save(Authority authority) {

		mapper.save(authority);
	}
	
	public void saveResource(Authority authority) {

		mapper.saveResource(authority);
	}

	public boolean update(Authority authority) {

		return mapper.update(authority);
	}
	
	public int findAuthId(String authName){
		
		return mapper.findAuthId(authName);
	}

}
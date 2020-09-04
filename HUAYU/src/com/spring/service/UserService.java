package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.model.User;
import com.spring.page.Page;

public interface UserService {
	void save(User user);
	void saveRole(User user);
	boolean update(User user);
	boolean delete(int id);
	boolean deleteRole(int id);
	User findById(Integer id);
	String findByRoleId(Integer id);
	int findByName(String name);
	List<User> findAll(Page page, BigInteger parent,String str);
	List<User> findRole(Integer id);
	List<User> findAllRole();
	String updateUserRole(Integer findByRoleId);
	int getUsernameCount(String userName);
	User LoadUser(String userName);
	List<String> getAuthoritiesByUsername(String userName);
	List<User> getIns(BigInteger parent);
	User getUserInsframework(BigInteger id);
	List<User> getInsUser(int ins);
	
	/**
	 * ��ȡ���ز˵�
	 * @return
	 */
	List<User> getHiddenMenu();
}
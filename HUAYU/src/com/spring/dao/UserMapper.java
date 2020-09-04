package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.User;

public interface UserMapper {
	void save(User user);
	void saveRole(User user);
	boolean update(User user);
	boolean delete(int id);
	boolean deleteRole(int id);
	User findById(Integer id);
	int findByName(String name);
	String findByRoleId(Integer id);
	List<User> findAll(@Param("parent")BigInteger parent,@Param("str")String str);
	int getUsernameCount(@Param("userName")String userName);
	List<User> findRole(Integer id);
	List<User> findAllRole();
	String updateUserRole(Integer findByRoleId);
	User LoadUser(String userName);
	List<String> getAuthoritiesByUsername(String userName);
	List<User> getIns(@Param("parent") BigInteger parent);
	User getUserInsframework(@Param("id")BigInteger id);
	List<User> getInsUser(int ins);
	
	List<User> getHiddenMenu();
}
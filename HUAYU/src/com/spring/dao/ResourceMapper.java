package com.spring.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Resources;


public interface ResourceMapper {
	void save(Resources resource);
	boolean update(Resources resource);
	boolean delete(int id);
	Resources findById(Integer id);
	List<Resources> findAll(@Param("str")String str);
	int getResourcenameCount(@Param("resourceName")String resourceName);
	List<String> getResourcesByAuthName(String authName);
	List<String> getAuthByRes(String url);
	List<Resources> getResourceByUserid(@Param("id")int id);
	List<String> getAuthName(@Param("id")int id);
	List<Resources> getResourceByAdmin();
}
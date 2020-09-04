package com.spring.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Email;
import com.spring.model.Gather;

import tk.mybatis.mapper.common.Mapper;

public interface EmailMapper extends Mapper<Gather>{
	List<Email> getEmailAll(@Param("str")String str);
	
	int getEmailAddressCount(@Param("femailaddress")String femailaddress);
	
	boolean addEmail(Email email);
	
	boolean editEmail(Email email);
	
	boolean deleteEmail(@Param("femailaddress")String femailaddress);
	
}

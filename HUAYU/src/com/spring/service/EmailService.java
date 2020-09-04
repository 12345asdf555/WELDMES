package com.spring.service;

import java.util.List;

import com.spring.model.Email;
import com.spring.page.Page;

public interface EmailService {
	/**
	 * 获取所有邮件信息
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getEmailAll(Page page,String str);
	
	/**
	 * 判断邮件地址是否存在
	 * @param femailaddress 邮件地址
	 * @return
	 */
	int getEmailAddressCount(String femailaddress);
	
	/**
	 * 新增邮件
	 * @param email
	 * @return
	 */
	boolean addEmail(Email email);
	
	/**
	 * 修改邮件
	 * @param email
	 * @return
	 */
	boolean editEmail(Email email);
	
	/**
	 * 删除邮件
	 * @param femailaddress
	 * @return
	 */
	boolean deleteEmail(String femailaddress);
}

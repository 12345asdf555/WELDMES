package com.spring.service;

import java.math.BigInteger;
import java.util.List;
import com.spring.model.SupplierMessage;
import com.spring.page.Page;

public interface SupplierMessageService {
	
	/**
	 * 查询供应商信息并分页
	 * @param page
	 * @param parent
	 * @param str
	 * @return
	 */
	List<SupplierMessage> selectSupplierList(Page page,BigInteger parent,String str);

}

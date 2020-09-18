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
	
	/**
	 * 新增
	 * @param supplier
	 * @return
	 */
	int addSupplierMessage(SupplierMessage supplier);
	
	/**
	 * 修改
	 * @param supplier
	 * @return
	 */
	int updateSupplierMessage(SupplierMessage supplier);
	
	/**
	 * 删除
	 * @param supplier
	 * @return
	 */
	int deleteSupplierMessage(Integer supplierId);

	/**
	 * 供应商列表
	 * @return
	 */
	List<SupplierMessage> selectSupplierAll();
}

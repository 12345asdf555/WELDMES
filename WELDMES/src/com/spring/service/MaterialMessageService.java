package com.spring.service;

import java.math.BigInteger;
import java.util.List;
import com.spring.model.MaterialMessage;
import com.spring.page.Page;

public interface MaterialMessageService {

	/**
	 * 查询物料分页
	 * @param page
	 * @param parent
	 * @param str
	 * @return
	 */
	List<MaterialMessage> selectMaterialList(Page page,BigInteger parent,String str);
	
	/**
	 * 物料父级列表
	 */
	List<MaterialMessage> selectMaterialTree();
	
	/**
	 * 根据id查询一条物料信息
	 * @param materialId
	 * @return
	 */
	MaterialMessage findMaterialById(BigInteger materialId);
}

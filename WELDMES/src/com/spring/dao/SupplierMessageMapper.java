package com.spring.dao;

import java.math.BigInteger;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.spring.model.SupplierMessage;
import tk.mybatis.mapper.common.Mapper;

public interface SupplierMessageMapper extends Mapper<SupplierMessage> {

	List<SupplierMessage> selectSupplierList(@Param("parent") BigInteger parent,@Param("str") String str);
	
	int addSupplierMessage(SupplierMessage supplier);
	
	int updateSupplierMessage(SupplierMessage supplier);
	
	int deleteSupplierMessage(Integer supplierId);
	
	List<SupplierMessage> selectSupplierAll();
}

package com.spring.dao;

import java.math.BigInteger;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.spring.model.MaterialMessage;
import tk.mybatis.mapper.common.Mapper;

public interface MaterialMessageMapper extends Mapper<MaterialMessage> {

	List<MaterialMessage> selectMaterialList(@Param("parent") BigInteger parent,@Param("str") String str);
	
	List<MaterialMessage> selectMaterialTree();
	
	MaterialMessage findMaterialById(BigInteger materialId);
}

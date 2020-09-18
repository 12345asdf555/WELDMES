package com.spring.dao;

import java.math.BigInteger;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.spring.model.MaterialStatistics;
import com.spring.page.Page;

import tk.mybatis.mapper.common.Mapper;

public interface MaterialStatisticsMapper extends Mapper<MaterialStatistics> {

	List<MaterialStatistics> selectMaterialStatisticsList(@Param("parent") BigInteger parent,@Param("str") String str);
	
	List<MaterialStatistics> selectMaterialRecordList(@Param("parent") String parent,@Param("str") String str);
	
	List<MaterialStatistics> selectMaterialTree();
	
	MaterialStatistics findMaterialById(BigInteger materialId);
	
	int deleteMaterialById(BigInteger materialId);
	
	int addMaterialStatistics(MaterialStatistics material);
	
	int updateMaterialById(MaterialStatistics material);
	
	int saveMaterialRecord(MaterialStatistics material);
}

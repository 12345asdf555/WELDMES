package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.MaterialStatistics;
import com.spring.page.Page;

public interface MaterialStatisticsService {

	/**
	 * 查询物料统计列表分页
	 * @param page
	 * @param parent
	 * @param str
	 * @return
	 */
	List<MaterialStatistics> selectMaterialStatisticsList(Page page,BigInteger parent,String str);
	
	/**
	 * 查询物料出入库记录分页
	 * @param page
	 * @param parent
	 * @param str
	 * @return
	 */
	List<MaterialStatistics> selectMaterialRecordList(Page page,String parent,String str);
	
	/**
	 * 物料父级列表
	 */
	List<MaterialStatistics> selectMaterialTree();
	
	/**
	 * 根据id查询一条物料信息
	 * @param materialId
	 * @return
	 */
	MaterialStatistics findMaterialById(BigInteger materialId);
	
	/**
	 * 删除
	 * @param materialId
	 * @return
	 */
	int deleteMaterialById(BigInteger materialId);
	
	/**
	 * 修改
	 * @param material
	 * @return
	 */
	int updateMaterialById(MaterialStatistics material);
	
	/**
	 * 新增
	 * @param material
	 * @return
	 */
	int addMaterialStatistics(MaterialStatistics material);
	
	/**
	 * 生成物料出入库记录
	 * @param material
	 * @return
	 */
	int saveMaterialRecord(MaterialStatistics material);
}

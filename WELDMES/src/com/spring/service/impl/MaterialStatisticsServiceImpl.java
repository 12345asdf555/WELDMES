package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.MaterialStatisticsMapper;
import com.spring.model.MaterialStatistics;
import com.spring.page.Page;
import com.spring.service.MaterialStatisticsService;

@Service
@Transactional
public class MaterialStatisticsServiceImpl implements MaterialStatisticsService{

	@Autowired
	private MaterialStatisticsMapper msm;
	
	@Override
	public List<MaterialStatistics> selectMaterialStatisticsList(Page page, BigInteger parent, String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return msm.selectMaterialStatisticsList(parent, str);
	}

	@Override
	public List<MaterialStatistics> selectMaterialTree() {
		return msm.selectMaterialTree();
	}

	@Override
	public MaterialStatistics findMaterialById(BigInteger materialId) {
		return msm.findMaterialById(materialId);
	}

	@Override
	public int deleteMaterialById(BigInteger materialId) {
		return msm.deleteMaterialById(materialId);
	}

	@Override
	public int updateMaterialById(MaterialStatistics material) {
		return msm.updateMaterialById(material);
	}

	@Override
	public int addMaterialStatistics(MaterialStatistics material) {
		return msm.addMaterialStatistics(material);
	}

	@Override
	public int saveMaterialRecord(MaterialStatistics material) {
		return msm.saveMaterialRecord(material);
	}

	@Override
	public List<MaterialStatistics> selectMaterialRecordList(Page page, String parent, String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return msm.selectMaterialRecordList(parent, str);
	}

}

package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.MaterialMessageMapper;
import com.spring.model.MaterialMessage;
import com.spring.page.Page;
import com.spring.service.MaterialMessageService;

@Service
@Transactional
public class MaterialMessageServiceImpl implements MaterialMessageService{

	@Autowired
	private MaterialMessageMapper materialMessageMappper;
	
	@Override
	public List<MaterialMessage> selectMaterialList(Page page,BigInteger parent,String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return materialMessageMappper.selectMaterialList(parent, str);
	}

	@Override
	public List<MaterialMessage> selectMaterialTree() {
		return materialMessageMappper.selectMaterialTree();
	}

	@Override
	public MaterialMessage findMaterialById(BigInteger materialId) {
		return materialMessageMappper.findMaterialById(materialId);
	}

}

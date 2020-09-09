package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.SupplierMessageMapper;
import com.spring.model.SupplierMessage;
import com.spring.page.Page;
import com.spring.service.SupplierMessageService;

@Service
@Transactional
public class SupplierMessageServiceImpl implements SupplierMessageService{

	@Autowired
	private SupplierMessageMapper supplierMapper;

	@Override
	public List<SupplierMessage> selectSupplierList(Page page, BigInteger parent, String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return supplierMapper.selectSupplierList(parent, str);
	}
	
}

package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.WeldedJunctionMapper;
import com.spring.dto.WeldDto;
import com.spring.model.WeldedJunction;
import com.spring.page.Page;
import com.spring.service.WeldedJunctionService;

@Service
@Transactional
public class WeldedJunctionServiceImpl implements WeldedJunctionService{
	@Autowired
	private WeldedJunctionMapper wjm;

	@Override
	public List<WeldedJunction> getWeldedJunctionAll(Page page,BigInteger parent, String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return wjm.getWeldedJunctionAll(parent,str);
	}

	@Override
	public int getWeldedjunctionByNo(String wjno) {
		return wjm.getWeldedjunctionByNo(wjno);
	}

	@Override
	public boolean addJunction(WeldedJunction wj) {
		return wjm.addJunction(wj);
	}

	@Override
	public boolean updateJunction(WeldedJunction wj) {
		return wjm.updateJunction(wj);
	}

	@Override
	public boolean deleteJunction(BigInteger id) {
		return wjm.deleteJunction(id);
	}

	@Override
	public WeldedJunction getWeldedJunctionById(BigInteger id) {
		return wjm.getWeldedJunctionById(id);
	}
	
	@Override
	public List<WeldedJunction> getJMByWelder(Page page, WeldDto dto, BigInteger welderid, String machine) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return wjm.getJMByWelder(dto,welderid,machine);
	}

	@Override
	public List<WeldedJunction> getJunctionByWelder(Page page, String welder, WeldDto dto) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return wjm.getJunctionByWelder(welder, dto);
	}

	@Override
	public String getFirsttime(WeldDto dto, BigInteger machineid, String welderid, String junid) {
		return wjm.getFirsttime(dto,machineid,welderid,junid);
	}

	@Override
	public String getLasttime(WeldDto dto, BigInteger machineid, String welderid, String junid) {
		return wjm.getLasttime(dto,machineid,welderid,junid);
	}

	@Override
	public List<WeldedJunction> getWeldedJunction(BigInteger str) {
		return wjm.getWeldedJunctionAll(str,null);
	}

}

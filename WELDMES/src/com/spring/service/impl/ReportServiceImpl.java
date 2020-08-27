package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.ReportMapper;
import com.spring.dto.WeldDto;
import com.spring.model.Report;
import com.spring.page.Page;
import com.spring.service.ReportService;

@Service
@Transactional  //此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class ReportServiceImpl implements ReportService{

	@Resource
	private ReportMapper mapper;
	
	@Override
	public BigInteger getWpsid(BigInteger machid) {
		return mapper.getWpsid(machid);
	}

	@Override
	public Report getWps(BigInteger wpsid) {
		return mapper.getWps(wpsid);
	}

	@Override
	public Report getSyspara() {
		return mapper.getSyspara();
	}

	@Override
	public List<Report> findAllWelder(Page page,WeldDto dto,BigInteger itemid) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return mapper.findAllWelder(dto,itemid);
	}

	@Override
	public List<Report> getAndroidData(WeldDto dto) {
		return mapper.getAndroidData(dto);
	}
	
	public long getWeldingTime(WeldDto dto, BigInteger machid,String weldid) {
		return mapper.getWeldingTime(dto, machid,weldid);
	}

	@Override
	public long getOnTime(WeldDto dto, BigInteger machid) {
		return mapper.getOnTime(dto, machid);
	}

	@Override
	public long getRealEle(WeldDto dto, BigInteger machid) {
		return mapper.getRealEle(dto, machid);
	}

	@Override
	public long getRealVol(WeldDto dto, BigInteger machid) {
		return mapper.getRealVol(dto, machid);
	}

	@Override
	public List<Report> findMachine(String weldid) {
		return mapper.findMachine(weldid);
	}

	@Override
	public long getHjTime(BigInteger machid, String time) {
		return mapper.getHjTime(machid, time);
	}

	@Override
	public long getZxTime(BigInteger machid, String time) {
		return mapper.getZxTime(machid, time);
	}

	@Override
	public String getFirstTime(BigInteger machid, String time) {
		return mapper.getFirstTime(machid, time);
	}

	@Override
	public List<Report> getAllPara(BigInteger parent, String str, String time) {
		return mapper.getAllPara(parent, str, time);
	}

	@Override
	public List<Report> historyData(Page page,WeldDto dto,String fid,BigInteger mach,String welderid) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		// TODO Auto-generated method stub
		return mapper.historyData(dto,fid,mach,welderid);
	}
	
}

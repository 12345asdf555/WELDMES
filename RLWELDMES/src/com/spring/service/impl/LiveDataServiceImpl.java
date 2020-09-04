package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.LiveDataMapper;
import com.spring.dao.WeldedJunctionMapper;
import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.model.LiveData;
import com.spring.model.MyUser;
import com.spring.model.WeldedJunction;
import com.spring.page.Page;
import com.spring.service.LiveDataService;

@Service
@Transactional
public class LiveDataServiceImpl implements LiveDataService {
	@Autowired
	HttpServletRequest request ;
	
	@Autowired
	private LiveDataMapper live;
	@Autowired
	private WeldedJunctionMapper wm;

	@Override
	public List<ModelDto> getCompanyhour(WeldDto dto, BigInteger parent,String insftype) {
		return live.getCompanyhour(dto, parent,insftype);
	}

	@Override
	public List<ModelDto> getJunctionHous(Page page,WeldDto dto) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return live.getJunctionHous(dto);
	}
	@Override
	public List<LiveData> getAllInsf(BigInteger parent,int type) {
		return live.getAllInsf(parent,type);
	}

	@Override
	public List<ModelDto> getAllTime(Page page,WeldDto dto) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return live.getAllTime(dto);
	}

	@Override
	public List<ModelDto> getCompanyOverproof(WeldDto dto,BigInteger parent,String insftype) {
		return live.getCompanyOverproof(dto,parent,insftype);
	}

	@Override
	public List<ModelDto> getcompanyOvertime(WeldDto dto, String num,BigInteger parent,String typeid) {
		return live.getcompanyOvertime(dto, num,parent,typeid);
	}

	@Override
	public List<ModelDto> getCompanyLoads(WeldDto dto,BigInteger parent,String insftype) {
		return live.getCompanyLoads(dto,parent,insftype);
	}
	
	@Override
	public List<LiveData> getMachine(BigInteger parent) {
		return live.getMachine(parent);
	}
	
	@Override
	public List<ModelDto> getCompanyNoLoads(WeldDto dto,BigInteger parent,String insftype) {
		return live.getCompanyNoLoads(dto,parent,insftype);
	}
	
	@Override
	public List<ModelDto> getCompanyIdle(WeldDto dto,BigInteger parent) {
		return live.getCompanyIdle(dto,parent);
	}

	@Override
	public int getMachineCount(BigInteger id) {
		return live.getMachineCount(id);
	}

	@Override
	public List<ModelDto> getCompanyUse(Page page, WeldDto dto, BigInteger parent) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return live.getCompanyUse(dto, parent);
	}
	
	@Override
	public BigInteger getUserId(HttpServletRequest request){
		try{
			//获取用户id
			Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if(obj==null){
				request.setAttribute("afreshLogin", "您的Session已过期，请重新登录！");
				return null;
			}
			MyUser myuser = (MyUser)obj;
			BigInteger uid = new BigInteger(myuser.getId()+"");
			return uid;
		}catch(Exception e){
			request.setAttribute("afreshLogin", "您的Session已过期，请重新登录！");
			return null;
		}
	}
	

	@Override
	public List<ModelDto> getAllTimes(WeldDto dto) {
		return live.getAllTime(dto);
	}

	@Override
	public List<LiveData> getBlocChildren() {
		return live.getBlocChildren();
	}

	@Override
	public List<ModelDto> companyEfficiency(Page page, BigInteger parent, WeldDto dto,String insftype) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return live.companyEfficiency(dto, parent,insftype);
	}

	@Override
	public List<ModelDto> getEfficiencyChartNum(WeldDto dto, BigInteger parent) {
		return live.getEfficiencyChartNum(dto, parent);
	}

	@Override
	public List<ModelDto> getEfficiencyChart(WeldDto dto, BigInteger parent, int minnum, int avgnum) {
		return live.getEfficiencyChart(dto, parent, minnum, avgnum);
	}

	@Override
	public WeldedJunction getWeldedJunctionById(BigInteger id) {
		return wm.getWeldedJunctionById(id);
	}

	@Override
	public List<ModelDto> getHousClassify(Page page, BigInteger parent, String searchStr) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return live.getHousClassify(parent,searchStr);
	}

	@Override
	public BigInteger getDyneByJunctionno(String str) {
		return live.getDyneByJunctionno(str);
	}

	@Override
	public List<ModelDto> getLiveMachineCount(WeldDto dto, BigInteger parent,String insftype) {
		return live.getLiveMachineCount(dto, parent,insftype);
	}

	@Override
	public List<ModelDto> getBlocMachineCount(WeldDto dto, BigInteger parent) {
		return live.getBlocMachineCount(dto, parent);
	}

	@Override
	public BigInteger getCountByTime(BigInteger parent, String time, BigInteger mid) {
		return live.getCountByTime(parent, time, mid);
	}

	@Override
	public List<ModelDto> getWeldingmachineList(WeldDto dto) {
		return live.getWeldingmachineList(dto);
	}

	@Override
	public List<ModelDto> getWelderList(WeldDto dto) {
		return live.getWelderList(dto);
	}

	@Override
	public List<LiveData> getAllInsf(Page page, BigInteger parent, int type) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return live.getAllInsf(parent, type);
	}

}

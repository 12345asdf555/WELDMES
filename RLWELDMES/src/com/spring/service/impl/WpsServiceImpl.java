package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.WpsMapper;
import com.spring.dto.WeldDto;
import com.spring.model.Wps;
import com.spring.page.Page;
import com.spring.service.WpsService;

@Service
@Transactional
public class WpsServiceImpl implements WpsService{

	@Resource
	private WpsMapper mapper;
	public List<Wps> findAll(Page page, BigInteger parent, String str) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return mapper.findAll(parent,str);
	}

	public void save(Wps wps) {
		// TODO Auto-generated method stub
		mapper.save(wps);
	}
	
	public int getUsernameCount(String fWPSNum) {
		return mapper.getUsernameCount(fWPSNum);
	}

	public Wps findById(BigInteger fid) {
		return mapper.findById(fid);
	}

	public void update(Wps wps) {
		mapper.update(wps);
		
	}

	public void delete(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.delete(fid);
	}

	@Override
	public void give(Wps wps) {
		// TODO Auto-generated method stub
		mapper.give(wps);
	}

	@Override
	public BigInteger findByUid(long uid) {
		// TODO Auto-generated method stub
		return mapper.findByUid(uid);
	}

	@Override
	public List<Wps> findHistory(Page page, BigInteger parent) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return mapper.findHistory(parent);
	}

	@Override
	public String findIpById(BigInteger fid) {
		// TODO Auto-generated method stub
		return mapper.findIpById(fid);
	}

	@Override
	public void deleteHistory(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteHistory(fid);
	}

	@Override
	public List<Wps> findAllSpe(BigInteger machine, BigInteger chanel) {
		// TODO Auto-generated method stub
		return mapper.findAllSpe(machine, chanel);
	}
	
	@Override
	public List<Wps> findSpe(BigInteger machine, String chanel) {
		// TODO Auto-generated method stub
		return mapper.findSpe(machine, chanel);
	}

	@Override
	public Wps findSpeById(BigInteger fid) {
		// TODO Auto-generated method stub
		return mapper.findSpeById(fid);
	}

	@Override
	public int findCount(BigInteger machine, String chanel) {
		// TODO Auto-generated method stub
		return mapper.findCount(machine, chanel);
	}

	@Override
	public void saveSpe(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveSpe(wps);
	}

	@Override
	public void updateSpe(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateSpe(wps);
	}

	public List<Wps> AllSpe(BigInteger machine,String ch) {
		// TODO Auto-generated method stub
		return mapper.AllSpe(machine,ch);
	}

	@Override
	public List<Wps> getFnsDetail(BigInteger machine, String chanel) {
		// TODO Auto-generated method stub
		return mapper.getFnsDetail(machine, chanel);
	}

	@Override
	public List<Wps> getFnsJobList(BigInteger machine) {
		// TODO Auto-generated method stub
		return mapper.getFnsJobList(machine);
	}

	@Override
	public void addJob(Wps wps) {
		// TODO Auto-generated method stub
		mapper.addJob(wps);
	}

	@Override
	public void updateJob(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateJob(wps);
	}

	@Override
	public void deleteJob(String machine, String chanel) {
		// TODO Auto-generated method stub
		mapper.deleteJob(machine, chanel);
	}
	@Override
	public void saveSpc(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveSpc(wps);
	}

	@Override
	public void updateSpc(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateSpc(wps);
	}
	
	@Override
	public void saveOtcspc(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveOtcspc(wps);
	}
	
	@Override
	public void updateOtcspc(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateOtcspc(wps);
	}
	@Override
	public List<Wps> findOtcspc(BigInteger machine, BigInteger chanel) {
		// TODO Auto-generated method stub
		return mapper.findOtcspc(machine, chanel);
	}
	@Override
	public List<Wps> findAllSperl(BigInteger machine, BigInteger chanel) {
		// TODO Auto-generated method stub
		return mapper.findAllSperl(machine, chanel);
	}
	@Override
	public void saveSperl(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveSperl(wps);
	}
	@Override
	public void updateSperl(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateSperl(wps);
	}
	@Override
	public void saveSperlmw(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveSperlmw(wps);
	}
	@Override
	public void updateSperlmw(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateSperlmw(wps);
	}

	@Override
	public List<Wps> findSperl(BigInteger machine, String ch) {
		// TODO Auto-generated method stub
		return mapper.findSperl(machine, ch);
	}
	
	@Override
	public List<Wps> getWpslibList(Page page, String search) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return mapper.getWpslibList(search);
	}
	
	@Override
	public List<Wps> getWpslibStatus() {
		// TODO Auto-generated method stub
		return mapper.getWpslibStatus();
	}
	
	@Override
	public void saveWpslib(Wps wps) {
		// TODO Auto-generated method stub
		mapper.saveWpslib(wps);
	}

	@Override
	public void updateWpslib(Wps wps) {
		// TODO Auto-generated method stub
		mapper.updateWpslib(wps);
	}

	@Override
	public void deleteWpslib(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteWpslib(fid);
	}
	
	@Override
	public void deleteWpsBelongLib(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteWpsBelongLib(fid);
	}
	
	@Override
	public List<Wps> getMainwpsList(Page page,BigInteger parent) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		// TODO Auto-generated method stub
		return mapper.getMainwpsList(parent);
	}
	
	@Override
	public void deleteMainWps(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteMainWps(fid);
	}
	
	@Override
	public boolean saveOtcWpsHistory(Wps wps) {
		// TODO Auto-generated method stub
		return mapper.saveOtcWpsHistory(wps);
	}
	
	@Override
	public List<Wps> getWpslibMachineHistoryList(Page page, String machineNum, String wpslibName, WeldDto dto) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return mapper.getWpslibMachineHistoryList(machineNum, wpslibName, dto);
	}

	@Override
	public Wps getRlDetail(String id) {
		// TODO Auto-generated method stub
		return mapper.getRlDetail(id);
	}
}

package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.WeldingMachineMapper;
import com.spring.dao.WeldingMaintenanceMapper;
import com.spring.model.MaintenanceRecord;
import com.spring.model.WeldingMachine;
import com.spring.model.WeldingMaintenance;
import com.spring.page.Page;
import com.spring.service.MaintainService;

@Service
@Transactional
public class MaintainServiceImpl implements MaintainService {
	@Autowired
	private WeldingMaintenanceMapper wmm;
	@Autowired
	private WeldingMachineMapper wm;
	
	@Override
	public List<WeldingMaintenance> getWeldingMaintenanceAllPage(Page page,BigInteger parent,BigInteger wid, String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return wmm.getWeldingMaintenanceAll(parent,wid,str);
	}

	@Override
	public List<WeldingMaintenance> getWeldingMaintenanceAll(BigInteger parent,String str) {
		return wmm.getWeldingMaintenanceAll(parent,null,str);
	}

	@Override
	public void addMaintian(WeldingMaintenance w, MaintenanceRecord mr,BigInteger wid) {
		wmm.addMaintenanceRecord(mr);
		BigInteger mid = mr.getId();
		w.getMaintenance().setId(mid);
		wmm.addWeldingMaintenance(w);
		if(mr.getEndTime()!=""||mr.getEndTime()!=null){
			//修焊机状态为维护中
			wm.editstatus(wid,33);
		}
	}

	@Override
	public List<WeldingMachine> getEquipmentno(BigInteger parent) {
		return wm.getEquipmentno(parent);
	}

	@Override
	public void updateEndtime(BigInteger wid) {
		wmm.updateEndtime(wid);
	}

	@Override
	public void updateMaintenanceRecord(MaintenanceRecord mr) {
		wmm.updateMaintenanceRecord(mr);
	}

	@Override
	public void deleteMaintenanceRecord(BigInteger mid) {
		wmm.deleteMaintenanceRecord(mid);
	}

	@Override
	public void deleteWeldingMaintenance(BigInteger wid) {
		wmm.deleteWeldingMaintenance(wid);		
	}

	@Override
	public List<WeldingMaintenance> getMaintainByWeldingMachinId(BigInteger wid) {
		return wmm.getMaintainByWeldingMachinId(wid);
	}

	@Override
	public WeldingMaintenance getWeldingMaintenanceById(BigInteger wid) {
		return wmm.getWeldingMaintenanceById(wid);
	}

	@Override
	public List<WeldingMaintenance> getEndtime(BigInteger wid) {
		return wmm.getEndtime(wid);
	}

	@Override
	public void editstatus(BigInteger wid, int status) {
		wm.editstatus(wid, status);
	}

}

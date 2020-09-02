package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.EquipmentAppointmentMapper;
import com.spring.model.EquipmentAppointment;
import com.spring.page.Page;
import com.spring.service.EquipmentAppointmentService;

@Service
@Transactional
public class EquipmentAppointmentServiceImpl implements EquipmentAppointmentService {

	@Autowired
	private EquipmentAppointmentMapper eam;
	
	@Override
	public List<EquipmentAppointment> getEquipmentAppointmentAll(Page page, BigInteger parent, String str) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return eam.getEquipmentAppointmentAll(parent, str);
	}

	
	@Override
	public int addEquipmentAppointment(EquipmentAppointment equipmentAppointment) {
		return eam.addEquipmentAppointment(equipmentAppointment);
	}


	@Override
	public EquipmentAppointment getEquipmentForFmachineId(BigInteger fmachineId) {
		return eam.getEquipmentForFmachineId(fmachineId);
	}


	@Override
	public int editEquipmentAppointment(EquipmentAppointment equipmentAppointment) {
		return eam.editEquipmentAppointment(equipmentAppointment);
	}


	@Override
	public List<EquipmentAppointment> getEquipmentAuditAll(Page page, BigInteger parent, String str) {
		return eam.getEquipmentAuditAll(parent, str);
	}


	@Override
	public EquipmentAppointment getEquipmentForId(BigInteger id) {
		return eam.getEquipmentForId(id);
	}


	@Override
	public void updateMachineStatusForId(BigInteger id) {
		eam.updateMachineStatusForId(id);		
	}

}

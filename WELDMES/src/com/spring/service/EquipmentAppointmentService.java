package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.EquipmentAppointment;
import com.spring.page.Page;

public interface EquipmentAppointmentService {

	/**
	 * 查询焊机设备分页
	 */
	List<EquipmentAppointment> getEquipmentAppointmentAll(Page page,BigInteger parent,String str);
	
	/**
	 * 查询焊机设备审核分页
	 */
	List<EquipmentAppointment> getEquipmentAuditAll(Page page,BigInteger parent,String str);
	
	int addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	int editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	/**
	 * 根据焊机id查询预约列表最新的一条数据
	 * @param fmachineId
	 * @return
	 */
	EquipmentAppointment getEquipmentForFmachineId(BigInteger fmachineId);
	
	//根据主键id查询一条记录
	EquipmentAppointment getEquipmentForId(BigInteger id);
	
	//根据id修改焊机状态
	void updateMachineStatusForId(BigInteger id);
}

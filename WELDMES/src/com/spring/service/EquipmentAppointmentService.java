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
	
	void addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	void editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	/**
	 * 根据焊机id查询预约列表最新的一条数据
	 * @param fmachineId
	 * @return
	 */
	EquipmentAppointment getEquipmentForFmachineId(BigInteger fmachineId);
	
	
}

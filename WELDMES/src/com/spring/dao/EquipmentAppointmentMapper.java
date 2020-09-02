package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.EquipmentAppointment;

import tk.mybatis.mapper.common.Mapper;

public interface EquipmentAppointmentMapper extends Mapper<EquipmentAppointment>{

	
	List<EquipmentAppointment> getEquipmentAppointmentAll(@Param("parent") BigInteger parent,@Param("str") String str);
	
	List<EquipmentAppointment> getEquipmentAuditAll(@Param("parent") BigInteger parent,@Param("str") String str);
	
	int addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	int editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	EquipmentAppointment getEquipmentForFmachineId(@Param("fmachineId") BigInteger fmachineId);
	
	EquipmentAppointment getEquipmentForId(BigInteger id);
	
	void updateMachineStatusForId(BigInteger id);
}

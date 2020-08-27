package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.EquipmentAppointment;

import tk.mybatis.mapper.common.Mapper;

public interface EquipmentAppointmentMapper extends Mapper<EquipmentAppointment>{

	
	List<EquipmentAppointment> getEquipmentAppointmentAll(@Param("parent") BigInteger parent,@Param("str") String str);
	
	void addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	void editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	EquipmentAppointment getEquipmentForFmachineId(@Param("fmachineId") BigInteger fmachineId);
}

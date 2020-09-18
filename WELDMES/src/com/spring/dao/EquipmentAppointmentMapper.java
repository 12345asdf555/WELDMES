package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.EquipmentAppointment;

import tk.mybatis.mapper.common.Mapper;

public interface EquipmentAppointmentMapper extends Mapper<EquipmentAppointment>{

	//焊机预约列表
	List<EquipmentAppointment> getEquipmentAppointmentAll(@Param("parent") BigInteger parent,@Param("str") String str);
	
	//审核列表
	List<EquipmentAppointment> getEquipmentAuditAll(@Param("parent") BigInteger parent,@Param("str") String str);
	
	int addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	int editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	EquipmentAppointment getEquipmentForId(BigInteger id);
	
	void updateMachineStatusForId(BigInteger id);
	
	//焊机的详细预约信息
	List<EquipmentAppointment> getEquipmentListForFmachineId(BigInteger fmachineId);
	
	int countEquipmentByFmachineId(BigInteger fmachineId);
}

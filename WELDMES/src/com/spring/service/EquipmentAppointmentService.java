package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.EquipmentAppointment;
import com.spring.page.Page;

public interface EquipmentAppointmentService {

	/**
	 * 查询焊机设备预约分页
	 */
	List<EquipmentAppointment> getEquipmentAppointmentAll(Page page,BigInteger parent,String str);
	
	/**
	 * 查询焊机设备审核分页
	 */
	List<EquipmentAppointment> getEquipmentAuditAll(Page page,BigInteger parent,String str);
	
	/**
	 * 新增
	 * @param equipmentAppointment
	 * @return
	 */
	int addEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	/**
	 * 修改
	 * @param equipmentAppointment
	 * @return
	 */
	int editEquipmentAppointment(EquipmentAppointment equipmentAppointment);
	
	
	//根据主键id查询一条记录
	EquipmentAppointment getEquipmentForId(BigInteger id);
	
	//根据id修改焊机状态
	void updateMachineStatusForId(BigInteger id);
	
	/**
	 * 根据焊机id查询焊机预约列表
	 * @param fmachineId
	 * @return
	 */
	List<EquipmentAppointment> getEquipmentListForFmachineId(BigInteger fmachineId);
	
	/**
	 * 统计焊机的预约数量
	 * @param fmachineId
	 * @return
	 */
	int countEquipmentByFmachineId(BigInteger fmachineId);
}

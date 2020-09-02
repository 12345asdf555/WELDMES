package com.erdangjiade.spring.security.tool;

import java.math.BigInteger;
import org.springframework.beans.factory.annotation.Autowired;
import com.spring.model.EquipmentAppointment;
import com.spring.service.EquipmentAppointmentService;

public class Beeper implements Comparable<Beeper>, Runnable {
	private BigInteger id;
	private long startTime;
	@Autowired
	private EquipmentAppointmentService eas;
	
	@Override
	public int compareTo(Beeper o) {
		return this.startTime > o.startTime?-1:1;
	}
	
	@Override
	public void run() {
		try {
			/**
			 * 1.判断设备审核状态，如果通过，修改焊机状态:使用中
			 * 2.待审核：修改审核状态：审核不通过（审核超时）
			 */
			//System.out.println("主键id："+id+",焊机状态修改开始：================"+sdf.format(new Date(System.currentTimeMillis())));
			EquipmentAppointment equipmentAppointment = eas.getEquipmentForId(id);
			int check_status = equipmentAppointment.getCheckStatus();
			if (check_status == 2) {
				eas.updateMachineStatusForId(id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public Beeper(BigInteger id, long startTime) {
		super();
		this.id = id;
		this.startTime = startTime;
	}

}

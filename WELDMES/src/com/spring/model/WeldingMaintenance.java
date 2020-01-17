package com.spring.model;

import java.math.BigInteger;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;

/**
 * 焊机维修
 * @author gpyf16
 *
 */
@Component
public class WeldingMaintenance {
	private BigInteger id;
	private String back;
	@Transient
	private WeldingMachine welding;
	@Transient
	private MaintenanceRecord maintenance;
	
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getBack() {
		return back;
	}
	public void setBack(String back) {
		this.back = back;
	}
	public WeldingMachine getWelding() {
		return welding;
	}
	public void setWelding(WeldingMachine welding) {
		this.welding = welding;
	}
	public MaintenanceRecord getMaintenance() {
		return maintenance;
	}
	public void setMaintenance(MaintenanceRecord maintenance) {
		this.maintenance = maintenance;
	}
	
	
}

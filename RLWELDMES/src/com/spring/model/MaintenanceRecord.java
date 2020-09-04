package com.spring.model;

import java.math.BigInteger;

/**
 * 维修记录
 * @author gpyf16
 *
 */
public class MaintenanceRecord {
	private BigInteger id;
	private String viceman;
	private String desc;
	private String startTime;
	private String endTime;
	private int typeId;
	//导入时用来暂存值
	private String typename;
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getViceman() {
		return viceman;
	}
	public void setViceman(String viceman) {
		this.viceman = viceman;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
}

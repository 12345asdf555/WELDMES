package com.spring.model;

import java.math.BigInteger;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Component
public class LiveData {
	private BigInteger id;
	private double electricity;
	private double voltage;
	private double rateofflow;
	private int status;
	private String uploadDateTime;
	private String weldTime;
	@Transient
	private WeldingMachine machine;
	@Transient
	private  Person welder;
	@Transient
	private WeldedJunction junction;
	//报表所需的额外字段
	private BigInteger hous;//用来获取工时的总值
	private BigInteger dyne;//用来获取达因的总值
	private BigInteger fid;//组织机构id
	private String fname;//组织机构name
	private String externalDiameter;//外径
	private String wallThickness;//璧厚
	private String material;//材质
	private String nextexternaldiameter;//下游外径
	private BigInteger itemid;//项目id
	private String overproof;//工艺超标总值
	private String jidgather;
	
	public String getJidgather() {
		return jidgather;
	}
	public void setJidgather(String jidgather) {
		this.jidgather = jidgather;
	}
	public String getOverproof() {
		return overproof;
	}
	public void setOverproof(String overproof) {
		this.overproof = overproof;
	}
	public BigInteger getItemid() {
		return itemid;
	}
	public void setItemid(BigInteger itemid) {
		this.itemid = itemid;
	}
	public String getExternalDiameter() {
		return externalDiameter;
	}
	public void setExternalDiameter(String externalDiameter) {
		this.externalDiameter = externalDiameter;
	}
	public String getWallThickness() {
		return wallThickness;
	}
	public void setWallThickness(String wallThickness) {
		this.wallThickness = wallThickness;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getNextexternaldiameter() {
		return nextexternaldiameter;
	}
	public void setNextexternaldiameter(String nextexternaldiameter) {
		this.nextexternaldiameter = nextexternaldiameter;
	}
	public BigInteger getFid() {
		return fid;
	}
	public void setFid(BigInteger fid) {
		this.fid = fid;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public BigInteger getHous() {
		return hous;
	}
	public void setHous(BigInteger hous) {
		this.hous = hous;
	}
	public BigInteger getDyne() {
		return dyne;
	}
	public void setDyne(BigInteger dyne) {
		this.dyne = dyne;
	}
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public double getElectricity() {
		return electricity;
	}
	public void setElectricity(double electricity) {
		this.electricity = electricity;
	}
	public double getVoltage() {
		return voltage;
	}
	public void setVoltage(double voltage) {
		this.voltage = voltage;
	}
	public double getRateofflow() {
		return rateofflow;
	}
	public void setRateofflow(double rateofflow) {
		this.rateofflow = rateofflow;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getUploadDateTime() {
		return uploadDateTime;
	}
	public void setUploadDateTime(String uploadDateTime) {
		this.uploadDateTime = uploadDateTime;
	}
	public String getWeldTime() {
		return weldTime;
	}
	public void setWeldTime(String weldTime) {
		this.weldTime = weldTime;
	}
	public WeldingMachine getMachine() {
		return machine;
	}
	public void setMachine(WeldingMachine machine) {
		this.machine = machine;
	}
	public Person getWelder() {
		return welder;
	}
	public void setWelder(Person welder) {
		this.welder = welder;
	}
	public WeldedJunction getJunction() {
		return junction;
	}
	public void setJunction(WeldedJunction junction) {
		this.junction = junction;
	}
	
}

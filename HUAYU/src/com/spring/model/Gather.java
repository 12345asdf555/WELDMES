package com.spring.model;

import java.math.BigInteger;

public class Gather {
	private BigInteger id;
	private String gatherNo;
	private String status;
	private String protocol;
	private String ipurl;
	private String macurl;
	private String leavetime;
	private BigInteger itemid;
	private String itemname;
	private BigInteger creater;
	private BigInteger updater;
	
	public BigInteger getCreater() {
		return creater;
	}
	public void setCreater(BigInteger creater) {
		this.creater = creater;
	}
	public BigInteger getUpdater() {
		return updater;
	}
	public void setUpdater(BigInteger updater) {
		this.updater = updater;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public BigInteger getItemid() {
		return itemid;
	}
	public void setItemid(BigInteger itemid) {
		this.itemid = itemid;
	}
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getGatherNo() {
		return gatherNo;
	}
	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getProtocol() {
		return protocol;
	}
	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}
	public String getIpurl() {
		return ipurl;
	}
	public void setIpurl(String ipurl) {
		this.ipurl = ipurl;
	}
	public String getMacurl() {
		return macurl;
	}
	public void setMacurl(String macurl) {
		this.macurl = macurl;
	}
	public String getLeavetime() {
		return leavetime;
	}
	public void setLeavetime(String leavetime) {
		this.leavetime = leavetime;
	}
	
}

package com.spring.model;

/**
 * 用户
 *
 *
 */
public class Resources {
	private int id;
	private String resourceName;
	private String resourceType;
	private String resourceAddress;
	private String resourceDesc;
	private int status;
	private String statusname;
	public Resources(){
		super();
	}
	
	public String getStatusname() {
		return statusname;
	}

	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public String getResourceAddress() {
		return resourceAddress;
	}
	public void setResourceAddress(String resourceAddress) {
		this.resourceAddress = resourceAddress;
	}
	public String getResourceDesc() {
		return resourceDesc;
	}
	public void setResourceDesc(String resourceDesc) {
		this.resourceDesc = resourceDesc;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Resources(int id, String resourceName, String resourceType, String resourceAddress,String resourceDesc,int status) {
		super();
		this.id = id;
		this.resourceName = resourceName;
		this.resourceType = resourceType;
		this.resourceAddress = resourceAddress;
		this.resourceDesc = resourceDesc;
		this.status = status;
	}
}
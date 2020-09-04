package com.spring.model;

/**
 * 用户
 * 
 *
 */
public class Authority {
	private int id;
	private int resourceId;
	private String roleName;
	private String authorityName;
	private String authorityDesc;
	private int status;
	private String resourceName;
	private String statusname;
	public Authority(){
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
	public int getResourceId(){
		return resourceId;
	}
	public void setResourceId(int resourceId){
		this.resourceId = resourceId;
	}
	public String getAuthorityName() {
		return authorityName;
	}
	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getAuthorityDesc() {
		return authorityDesc;
	}
	public void setAuthorityDesc(String authorityDesc) {
		this.authorityDesc = authorityDesc;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public Authority(int id,int resourceId, String authorityName, String resourceName,int status,String roleName,String authorityDesc) {
		super();
		this.id = id;
		this.resourceId = resourceId;
		this.roleName = roleName;
		this.authorityName = authorityName;
		this.authorityDesc = authorityDesc;
		this.resourceName = resourceName;
		this.status = status;
	}
}
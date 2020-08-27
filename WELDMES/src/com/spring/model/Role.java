package com.spring.model;

/**

 */
public class Role {

	private int id;
	private int roleId;
	private int userId;
	private int authorityId;
	private int authoritiesId;
	private String userName;
	private String roleName;
	private String roleDesc;
	private int roleStatus;
	private String authorityName;
	private String authorityDesc;
	private String resourceName;
	private int enabled;
	private String statusname;
	
	public Role(){
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
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getUserId(){
		return userId;
	}
	public void setUserId(int userId){
		this.userId = userId;
	}
	public int getAuthorityId() {
		return authorityId;
	}
	public void setAuthorityId(int authorityId) {
		this.authorityId = authorityId;
	}
	public int getAuthoritiesId() {
		return authoritiesId;
	}
	public void setAuthoritiesId(int authoritiesId) {
		this.authoritiesId = authoritiesId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getRoleDesc() {
		return roleDesc;
	}
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}
	public int getRoleStatus() {
		return roleStatus;
	}
	public void setRoleStatus(int roleStatus) {
		this.roleStatus = roleStatus;
	}
	public String getAuthorityName() {
		return authorityName;
	}
	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}
	public String getAuthorityDesc() {
		return authorityDesc;
	}
	public void setAuthorityDesc(String authorityDesc) {
		this.authorityDesc = authorityDesc;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public Role(int id, int userId, String roleName,String userName,String roleDesc,int roleStatus,String authorityName,String resourceName,int enabled, int roleId, int authorityId, int authoritiesId) {
		super();
		this.id = id;
		this.roleId = roleId;
		this.userId = userId;
		this.authorityId = authorityId;
		this.userName = userName;
		this.roleName = roleName;
		this.roleDesc = roleDesc;
		this.roleStatus = roleStatus;
		this.authorityName = authorityName;
		this.authoritiesId = authoritiesId;
		this.resourceName = resourceName;
		this.enabled = enabled;
	}
}
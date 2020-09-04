package com.spring.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

/**
 * ”√ªß
 * @author Administrator
 *
 */
public class User{
	private int id;
	private long insid;
	private int roleId;
	private String userName;
	private String menuName;
	private String userPassword;
	private String userLoginName;
	private String userPhone;
	private String userEmail;
	private long userInsframework;
	private String userPosition;
	private int status;
	private String roleName;
	private String authorityName;
	private String insname;
	Collection<GrantedAuthority> auths;
	private String statusname;
	public User(){
		super();
	}
	
	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Collection<GrantedAuthority> getAuths() {
		return auths;
	}

	public void setAuths(Collection<GrantedAuthority> auths) {
		this.auths = auths;
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
	public long getInsid() {
		return insid;
	}
	public void setInsid(long insid) {
		this.insid = insid;
	}
	public int getRoleId(){
		return roleId;
	}
	public void setRoleId(int roleId){
		this.roleId = roleId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserLoginName() {
		return userLoginName;
	}
	public void setUserLoginName(String userLoginName) {
		this.userLoginName = userLoginName;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public long getUserInsframework() {
		return userInsframework;
	}
	public void setUserInsframework(long userInsframework) {
		this.userInsframework = userInsframework;
	}
	public String getUserPosition() {
		return userPosition;
	}
	public void setUserPosition(String userPosition) {
		this.userPosition = userPosition;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getAuthorityName() {
		return authorityName;
	}
	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}
	public String getInsname() {
		return insname;
	}
	public void setInsname(String insname) {
		this.insname = insname;
	}
	public User(int id, int roleId, String userName, String userPassword, String userLoginName,String userPhone,String userEmail,long userInsframework,String userPosition,int status,String roleName,String authorityName) {
		super();
		this.id = id;
		this.roleId = roleId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userLoginName = userLoginName;
		this.userPhone = userPhone;
		this.userEmail = userEmail;
		this.userInsframework = userInsframework;
		this.userPosition = userPosition;
		this.status = status;
		this.roleName = roleName;
		this.authorityName = authorityName;
	}
}
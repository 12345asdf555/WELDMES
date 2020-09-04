package com.spring.model;

import java.math.BigInteger;

public class Email {
	private BigInteger fid;
	private String femailname;
	private String femailaddress;
	private String 	femailtype;
	public BigInteger getFid() {
		return fid;
	}
	public void setFid(BigInteger fid) {
		this.fid = fid;
	}
	public String getFemailname() {
		return femailname;
	}
	public void setFemailname(String femailname) {
		this.femailname = femailname;
	}
	public String getFemailaddress() {
		return femailaddress;
	}
	public void setFemailaddress(String femailaddress) {
		this.femailaddress = femailaddress;
	}
	public String getFemailtype() {
		return femailtype;
	}
	public void setFemailtype(String femailtype) {
		this.femailtype = femailtype;
	}
	
}

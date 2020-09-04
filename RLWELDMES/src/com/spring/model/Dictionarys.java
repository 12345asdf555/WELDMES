package com.spring.model;

import java.math.BigInteger;

/**
 * 字典
 * @author gpyf16
 *
 */
public class Dictionarys {
	private BigInteger id;
	private int typeid;
	private int value;
	private String valueName;
	private String back;
	
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public int getTypeid() {
		return typeid;
	}
	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getValueName() {
		return valueName;
	}
	public void setValueName(String valueName) {
		this.valueName = valueName;
	}
	public String getBack() {
		return back;
	}
	public void setBack(String back) {
		this.back = back;
	}
	
	
	
}

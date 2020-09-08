package com.spring.model;

import java.math.BigDecimal;
import java.math.BigInteger;

import org.springframework.stereotype.Component;

@Component
public class MaterialMessage {

	private BigInteger materialId;		//物料id
	private String code;
	private String name;
	private int materialType;
	private String location;
	private String inventory;
	private int inventoryChangeType;
	private String changeAddress;
	private int changeNumber;
	private String changeOrder;
	private int putGetStorageType;
	private String changeTime;
	private String unit;
	private BigDecimal univalence;
	private BigDecimal totalPrices;
	private BigInteger parentId;
	private int supplierId;
	private BigInteger creator;
	private String createTime;
	private BigInteger mender;
	
	private String materialTypeName;  		//物料类型
	private String putGetStorageTypeName;	//物料入出库类型
	
	private int supplierMessageId;	//供应商id
	private String supplierCode;
	private String supplierName;
	private String address;
	private String phone;
	private String contacts;
	private String remark;
	private BigInteger supplierCreator;
	private String supplierCreateTime;
	
	public BigInteger getMaterialId() {
		return materialId;
	}
	public void setMaterialId(BigInteger materialId) {
		this.materialId = materialId;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getMaterialType() {
		return materialType;
	}
	public void setMaterialType(int materialType) {
		this.materialType = materialType;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getInventory() {
		return inventory;
	}
	public void setInventory(String inventory) {
		this.inventory = inventory;
	}
	public int getInventoryChangeType() {
		return inventoryChangeType;
	}
	public void setInventoryChangeType(int inventoryChangeType) {
		this.inventoryChangeType = inventoryChangeType;
	}
	public String getChangeAddress() {
		return changeAddress;
	}
	public void setChangeAddress(String changeAddress) {
		this.changeAddress = changeAddress;
	}
	public int getChangeNumber() {
		return changeNumber;
	}
	public void setChangeNumber(int changeNumber) {
		this.changeNumber = changeNumber;
	}
	public String getChangeOrder() {
		return changeOrder;
	}
	public void setChangeOrder(String changeOrder) {
		this.changeOrder = changeOrder;
	}
	public int getPutGetStorageType() {
		return putGetStorageType;
	}
	public void setPutGetStorageType(int putGetStorageType) {
		this.putGetStorageType = putGetStorageType;
	}
	public String getChangeTime() {
		return changeTime;
	}
	public void setChangeTime(String changeTime) {
		this.changeTime = changeTime;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public BigDecimal getUnivalence() {
		return univalence;
	}
	public void setUnivalence(BigDecimal univalence) {
		this.univalence = univalence;
	}
	public BigDecimal getTotalPrices() {
		return totalPrices;
	}
	public void setTotalPrices(BigDecimal totalPrices) {
		this.totalPrices = totalPrices;
	}
	public BigInteger getParentId() {
		return parentId;
	}
	public void setParentId(BigInteger parentId) {
		this.parentId = parentId;
	}
	public int getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}
	public BigInteger getCreator() {
		return creator;
	}
	public void setCreator(BigInteger creator) {
		this.creator = creator;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public BigInteger getMender() {
		return mender;
	}
	public void setMender(BigInteger mender) {
		this.mender = mender;
	}
	public String getMaterialTypeName() {
		return materialTypeName;
	}
	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}
	public String getPutGetStorageTypeName() {
		return putGetStorageTypeName;
	}
	public void setPutGetStorageTypeName(String putGetStorageTypeName) {
		this.putGetStorageTypeName = putGetStorageTypeName;
	}
	public int getSupplierMessageId() {
		return supplierMessageId;
	}
	public void setSupplierMessageId(int supplierMessageId) {
		this.supplierMessageId = supplierMessageId;
	}
	public String getSupplierCode() {
		return supplierCode;
	}
	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public BigInteger getSupplierCreator() {
		return supplierCreator;
	}
	public void setSupplierCreator(BigInteger supplierCreator) {
		this.supplierCreator = supplierCreator;
	}
	public String getSupplierCreateTime() {
		return supplierCreateTime;
	}
	public void setSupplierCreateTime(String supplierCreateTime) {
		this.supplierCreateTime = supplierCreateTime;
	}
	
	
}

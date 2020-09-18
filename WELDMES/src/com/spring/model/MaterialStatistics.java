package com.spring.model;

import java.math.BigDecimal;
import java.math.BigInteger;

import org.springframework.stereotype.Component;
/**
 * 物料管理实体类
 * @author zhushanlong
 */
@Component
public class MaterialStatistics {

	/**
	 * 物料统计表
	 */
	private BigInteger materialStatisticsId;	//主键id
	private String code;
	private String name;
	private int materialType;
	private String location;
	private BigDecimal inventory;
	private String unit;
	private BigDecimal totalPrices;
	private BigInteger parentId;
	private int supplierId;
	private BigInteger creator;
	private String createTime;
	private BigInteger mender;
	private String updateTime;
	
	private String materialTypeName;	//类型：字典名称
	
	/**
	 * 物料出入库记录表
	 */
	private BigInteger materialRecordId;
	private String recordCode;
	private int type;
	private BigDecimal number;
	private String recordDatetime;
	private String orderNumber;
	private int recordSupplierId;
	private BigDecimal univalence;
	private BigDecimal recordTotalPrices;
	private BigInteger recordCreator;
	private String recordCreateTime;
	
	
	public BigInteger getMaterialStatisticsId() {
		return materialStatisticsId;
	}
	public void setMaterialStatisticsId(BigInteger materialStatisticsId) {
		this.materialStatisticsId = materialStatisticsId;
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
	public BigDecimal getInventory() {
		return inventory;
	}
	public void setInventory(BigDecimal inventory) {
		this.inventory = inventory;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
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
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getMaterialTypeName() {
		return materialTypeName;
	}
	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}
	public BigInteger getMaterialRecordId() {
		return materialRecordId;
	}
	public void setMaterialRecordId(BigInteger materialRecordId) {
		this.materialRecordId = materialRecordId;
	}
	public String getRecordCode() {
		return recordCode;
	}
	public void setRecordCode(String recordCode) {
		this.recordCode = recordCode;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public BigDecimal getNumber() {
		return number;
	}
	public void setNumber(BigDecimal number) {
		this.number = number;
	}
	public String getRecordDatetime() {
		return recordDatetime;
	}
	public void setRecordDatetime(String recordDatetime) {
		this.recordDatetime = recordDatetime;
	}
	public String getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	public int getRecordSupplierId() {
		return recordSupplierId;
	}
	public void setRecordSupplierId(int recordSupplierId) {
		this.recordSupplierId = recordSupplierId;
	}
	public BigDecimal getUnivalence() {
		return univalence;
	}
	public void setUnivalence(BigDecimal univalence) {
		this.univalence = univalence;
	}
	public BigDecimal getRecordTotalPrices() {
		return recordTotalPrices;
	}
	public void setRecordTotalPrices(BigDecimal recordTotalPrices) {
		this.recordTotalPrices = recordTotalPrices;
	}
	public BigInteger getRecordCreator() {
		return recordCreator;
	}
	public void setRecordCreator(BigInteger recordCreator) {
		this.recordCreator = recordCreator;
	}
	public String getRecordCreateTime() {
		return recordCreateTime;
	}
	public void setRecordCreateTime(String recordCreateTime) {
		this.recordCreateTime = recordCreateTime;
	}
	
}

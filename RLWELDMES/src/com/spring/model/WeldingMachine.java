package com.spring.model;

import java.math.BigInteger;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;

/**
 * 焊机
 * @author gpyf16
 *
 */
@Component
public class WeldingMachine {
	private BigInteger id;
	private String ip;
	private String equipmentNo;
	private String position;
	private int isnetworking;
	private String fmachingname;
	private String joinTime;
	private int typeId;
	private int statusId;
	private String model;
	private String modelname;
	private BigInteger creater;
	private BigInteger updater;
	private int mvalueid;
	private String mvaluename;
	private String fmanunumbers;
	private String fsection;
	private String fauthentication;
	private String ftest;
	private String fprevention;
	private int modelid;
	
	@Transient
	private Gather gatherId;
	@Transient
	private Insframework insframeworkId;
	
	//导入时用来暂存值
	private String typename;
	private String statusname;
	
	
	public int getMvalueid() {
		return mvalueid;
	}
	public void setMvalueid(int mvalueid) {
		this.mvalueid = mvalueid;
	}
	public String getFmanunumbers() {
		return fmanunumbers;
	}
	public void setFmanunumbers(String fmanunumbers) {
		this.fmanunumbers = fmanunumbers;
	}
	public String getFsection() {
		return fsection;
	}
	public void setFsection(String fsection) {
		this.fsection = fsection;
	}
	public String getFauthentication() {
		return fauthentication;
	}
	public void setFauthentication(String fauthentication) {
		this.fauthentication = fauthentication;
	}
	public String getFtest() {
		return ftest;
	}
	public void setFtest(String ftest) {
		this.ftest = ftest;
	}
	public String getFprevention() {
		return fprevention;
	}
	public void setFprevention(String fprevention) {
		this.fprevention = fprevention;
	}
	public String getMvaluename() {
		return mvaluename;
	}
	public void setMvaluename(String mvaluename) {
		this.mvaluename = mvaluename;
	}
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
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getEquipmentNo() {
		return equipmentNo;
	}
	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public Gather getGatherId() {
		return gatherId;
	}
	public void setGatherId(Gather gatherId) {
		this.gatherId = gatherId;
	}
	public int getIsnetworking() {
		return isnetworking;
	}
	public void setIsnetworking(int isnetworking) {
		this.isnetworking = isnetworking;
	}
	public String getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(String joinTime) {
		this.joinTime = joinTime;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public int getStatusId() {
		return statusId;
	}
	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}
	public Insframework getInsframeworkId() {
		return insframeworkId;
	}
	public void setInsframeworkId(Insframework insframeworkId) {
		this.insframeworkId = insframeworkId;
	}
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
	
	public String getFmachingname() {
		return fmachingname;
	}
	public void setFmachingname(String fmachingname) {
		this.fmachingname = fmachingname;
	}
	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public int getModelid() {
		return modelid;
	}
	public void setModelid(int modelid) {
		this.modelid = modelid;
	}
	public String getModelname() {
		return modelname;
	}
	public void setModelname(String modelname) {
		this.modelname = modelname;
	}
	
	
}

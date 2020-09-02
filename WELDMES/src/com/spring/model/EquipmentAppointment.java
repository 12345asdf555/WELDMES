package com.spring.model;
import java.math.BigInteger;
/**
 * 设备预约
 * @author zhushanlong
 *
 */
import java.sql.Timestamp;
import javax.persistence.Transient;
import org.springframework.stereotype.Component;

@Component
public class EquipmentAppointment {
	
	private BigInteger id;		//设备预约id
	private long fmachineId;		//焊机设备id
	private BigInteger fwelderId;
	private int fmachineStatus;
	private String appointmentMessage;
	private String checkMessage;
	private String remark;
	private int checkStatus;
	private long userId;
	private String createTime;
	private String updateTime;
	private long creator;
	private long mender;
	private String checkDatetime;		//审核时间
	private String appointmentDatetime;		//预约时间
	private String giveBackDatetime;		//归还时间
	
	private BigInteger fid;	//焊机设备id
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
	private String typename;	//设备类型
	private String statusname;
	
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public long getFmachineId() {
		return fmachineId;
	}
	public void setFmachineId(long fmachineId) {
		this.fmachineId = fmachineId;
	}
	public BigInteger getFwelderId() {
		return fwelderId;
	}
	public void setFwelderId(BigInteger fwelderId) {
		this.fwelderId = fwelderId;
	}
	public int getFmachineStatus() {
		return fmachineStatus;
	}
	public void setFmachineStatus(int fmachineStatus) {
		this.fmachineStatus = fmachineStatus;
	}
	public String getAppointmentMessage() {
		return appointmentMessage;
	}
	public void setAppointmentMessage(String appointmentMessage) {
		this.appointmentMessage = appointmentMessage;
	}
	public String getCheckMessage() {
		return checkMessage;
	}
	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getCheckStatus() {
		return checkStatus;
	}
	public void setCheckStatus(int checkStatus) {
		this.checkStatus = checkStatus;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public long getCreator() {
		return creator;
	}
	public void setCreator(long creator) {
		this.creator = creator;
	}
	public long getMender() {
		return mender;
	}
	public void setMender(long mender) {
		this.mender = mender;
	}
	public BigInteger getFid() {
		return fid;
	}
	public void setFid(BigInteger fid) {
		this.fid = fid;
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
	public int getIsnetworking() {
		return isnetworking;
	}
	public void setIsnetworking(int isnetworking) {
		this.isnetworking = isnetworking;
	}
	public String getFmachingname() {
		return fmachingname;
	}
	public void setFmachingname(String fmachingname) {
		this.fmachingname = fmachingname;
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
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getModelname() {
		return modelname;
	}
	public void setModelname(String modelname) {
		this.modelname = modelname;
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
	public int getMvalueid() {
		return mvalueid;
	}
	public void setMvalueid(int mvalueid) {
		this.mvalueid = mvalueid;
	}
	public String getMvaluename() {
		return mvaluename;
	}
	public void setMvaluename(String mvaluename) {
		this.mvaluename = mvaluename;
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
	public int getModelid() {
		return modelid;
	}
	public void setModelid(int modelid) {
		this.modelid = modelid;
	}
	public Gather getGatherId() {
		return gatherId;
	}
	public void setGatherId(Gather gatherId) {
		this.gatherId = gatherId;
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
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getCheckDatetime() {
		return checkDatetime;
	}
	public void setCheckDatetime(String checkDatetime) {
		this.checkDatetime = checkDatetime;
	}
	public String getAppointmentDatetime() {
		return appointmentDatetime;
	}
	public void setAppointmentDatetime(String appointmentDatetime) {
		this.appointmentDatetime = appointmentDatetime;
	}
	public String getGiveBackDatetime() {
		return giveBackDatetime;
	}
	public void setGiveBackDatetime(String giveBackDatetime) {
		this.giveBackDatetime = giveBackDatetime;
	}
	
	
}

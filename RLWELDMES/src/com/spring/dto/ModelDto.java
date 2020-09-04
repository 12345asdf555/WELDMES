package com.spring.dto;

import java.math.BigInteger;

/**
 * 超标查询显示数据不全面的问题
 * 需要创建一个dto类（也就是該类）保存所查询的字段
 * @author gpyf16
 */
public class ModelDto {
	private double overproof;
	private String weldTime;
	private BigInteger fid;
	private BigInteger iid;
	private BigInteger jid;
	private String fname;
	private String fwelder_id;
	private String fmachine_id;
	private String fjunction_id;
	private String felectricity;
	private String fvoltage;
	private String iname;
	private String wname;
	private BigInteger livecount;
	private double fmax_electricity;
	private double fmin_electricity;
	private String overtime;
	private String uploaddatetime;
	private double loads;
	private double idle;
	private double time;
	private String type;
	private BigInteger dyne;
	private BigInteger num;
	private int sum1;
	private int sum2;
	private int sum3;
	private int sum4;
	private int sum5;
	private int sum6;
	private int sum7;
	private int sum8;
	private int sum9;
	private int sum10;
	private int maxnum;
	private int minnum;
	private int avgnum;
	private String externalDiameter;//外径
	private String wallThickness;//璧厚
	private String material;//材质
	private String nextexternaldiameter;//下游外径
	private String nextwallThickness;//下游璧厚
	private String nextmaterial;//下游材质
	private BigInteger itemid;//项目id
	private String jidgather;
	private double hous;//用来获取工时的总值
	private String starttime;
	private String endtime;
	private BigInteger companyid;
	private String companyname;
	private BigInteger caustid;
	private String caustname;
	
	public BigInteger getCompanyid() {
		return companyid;
	}
	public void setCompanyid(BigInteger companyid) {
		this.companyid = companyid;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	public BigInteger getCaustid() {
		return caustid;
	}
	public void setCaustid(BigInteger caustid) {
		this.caustid = caustid;
	}
	public String getCaustname() {
		return caustname;
	}
	public void setCaustname(String caustname) {
		this.caustname = caustname;
	}
	public String getNextwallThickness() {
		return nextwallThickness;
	}
	public void setNextwallThickness(String nextwallThickness) {
		this.nextwallThickness = nextwallThickness;
	}
	public String getNextmaterial() {
		return nextmaterial;
	}
	public void setNextmaterial(String nextmaterial) {
		this.nextmaterial = nextmaterial;
	}
	public String getStarttime() {
		return starttime;
	}
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public double getHous() {
		return hous;
	}
	public void setHous(double hous) {
		this.hous = hous;
	}
	public String getExternalDiameter() {
		return externalDiameter;
	}
	public void setExternalDiameter(String externalDiameter) {
		this.externalDiameter = externalDiameter;
	}
	public String getWallThickness() {
		return wallThickness;
	}
	public void setWallThickness(String wallThickness) {
		this.wallThickness = wallThickness;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getNextexternaldiameter() {
		return nextexternaldiameter;
	}
	public void setNextexternaldiameter(String nextexternaldiameter) {
		this.nextexternaldiameter = nextexternaldiameter;
	}
	public BigInteger getItemid() {
		return itemid;
	}
	public void setItemid(BigInteger itemid) {
		this.itemid = itemid;
	}
	public String getJidgather() {
		return jidgather;
	}
	public void setJidgather(String jidgather) {
		this.jidgather = jidgather;
	}	
	public int getSum1() {
		return sum1;
	}
	public void setSum1(int sum1) {
		this.sum1 = sum1;
	}
	public int getSum2() {
		return sum2;
	}
	public void setSum2(int sum2) {
		this.sum2 = sum2;
	}
	public int getSum3() {
		return sum3;
	}
	public void setSum3(int sum3) {
		this.sum3 = sum3;
	}
	public int getSum4() {
		return sum4;
	}
	public void setSum4(int sum4) {
		this.sum4 = sum4;
	}
	public int getSum5() {
		return sum5;
	}
	public void setSum5(int sum5) {
		this.sum5 = sum5;
	}
	public int getSum6() {
		return sum6;
	}
	public void setSum6(int sum6) {
		this.sum6 = sum6;
	}
	public int getSum7() {
		return sum7;
	}
	public void setSum7(int sum7) {
		this.sum7 = sum7;
	}
	public int getSum8() {
		return sum8;
	}
	public void setSum8(int sum8) {
		this.sum8 = sum8;
	}
	public int getSum9() {
		return sum9;
	}
	public void setSum9(int sum9) {
		this.sum9 = sum9;
	}
	public int getSum10() {
		return sum10;
	}
	public void setSum10(int sum10) {
		this.sum10 = sum10;
	}
	public int getMaxnum() {
		return maxnum;
	}
	public void setMaxnum(int maxnum) {
		this.maxnum = maxnum;
	}
	public int getMinnum() {
		return minnum;
	}
	public void setMinnum(int minnum) {
		this.minnum = minnum;
	}
	public int getAvgnum() {
		return avgnum;
	}
	public void setAvgnum(int avgnum) {
		this.avgnum = avgnum;
	}
	public BigInteger getDyne() {
		return dyne;
	}
	public void setDyne(BigInteger dyne) {
		this.dyne = dyne;
	}
	public BigInteger getNum() {
		return num;
	}
	public void setNum(BigInteger num) {
		this.num = num;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public double getTime() {
		return time;
	}
	public void setTime(double time) {
		this.time = time;
	}
	public double getIdle() {
		return idle;
	}
	public void setIdle(double idle) {
		this.idle = idle;
	}
	public double getLoads() {
		return loads;
	}
	public void setLoads(double loads) {
		this.loads = loads;
	}
	public String getOvertime() {
		return overtime;
	}
	public void setOvertime(String overtime) {
		this.overtime = overtime;
	}
	public String getUploaddatetime() {
		return uploaddatetime;
	}
	public void setUploaddatetime(String uploaddatetime) {
		this.uploaddatetime = uploaddatetime;
	}
	public BigInteger getIid() {
		return iid;
	}
	public void setIid(BigInteger iid) {
		this.iid = iid;
	}
	public BigInteger getJid() {
		return jid;
	}
	public void setJid(BigInteger jid) {
		this.jid = jid;
	}
	public String getFwelder_id() {
		return fwelder_id;
	}
	public void setFwelder_id(String fwelder_id) {
		this.fwelder_id = fwelder_id;
	}
	public String getFmachine_id() {
		return fmachine_id;
	}
	public void setFmachine_id(String fmachine_id) {
		this.fmachine_id = fmachine_id;
	}
	public String getFjunction_id() {
		return fjunction_id;
	}
	public void setFjunction_id(String fjunction_id) {
		this.fjunction_id = fjunction_id;
	}
	public String getFelectricity() {
		return felectricity;
	}
	public void setFelectricity(String felectricity) {
		this.felectricity = felectricity;
	}
	public String getFvoltage() {
		return fvoltage;
	}
	public void setFvoltage(String fvoltage) {
		this.fvoltage = fvoltage;
	}
	public String getIname() {
		return iname;
	}
	public void setIname(String iname) {
		this.iname = iname;
	}
	public String getWname() {
		return wname;
	}
	public void setWname(String wname) {
		this.wname = wname;
	}
	public double getFmax_electricity() {
		return fmax_electricity;
	}
	public void setFmax_electricity(double fmax_electricity) {
		this.fmax_electricity = fmax_electricity;
	}
	public double getFmin_electricity() {
		return fmin_electricity;
	}
	public void setFmin_electricity(double fmin_electricity) {
		this.fmin_electricity = fmin_electricity;
	}
	public double getOverproof() {
		return overproof;
	}
	public void setOverproof(double overproof) {
		this.overproof = overproof;
	}
	public BigInteger getLivecount() {
		return livecount;
	}
	public void setLivecount(BigInteger livecount) {
		this.livecount = livecount;
	}
	public String getWeldTime() {
		return weldTime;
	}
	public void setWeldTime(String weldTime) {
		this.weldTime = weldTime;
	}
	public BigInteger getFid() {
		return fid;
	}
	public void setFid(BigInteger fid) {
		this.fid = fid;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	
}

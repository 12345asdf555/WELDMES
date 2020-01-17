package com.spring.model;

import java.math.BigInteger;
import java.util.Date;

/**
 * 用户
 *
 *
 */
public class Report{
	/**
	 * 
	 */
	private BigInteger id;
	private BigInteger insid;
	private BigInteger machid;
	private String fname;
	private String fwsid;
	private String fteamid;
	private String fmachineid;
	private String fmachinestatus;
	private String fmachinemodel;
	private double fstandardele;
	private double fstandardvol;
	private double frealvol;
	private double frealele;
	private String fcurrentwelder;
	private int fstatus;
	private double finspower;
	private String fafv;
	private String fweldingtime;
	private Date fboottime;
	private Date fofftime;
	private Date fonlinetime;
	private Date ffirsttime;
	private Date fvalidtime;
	private double fdiameter;
	private String fspeed;
	private String fback;
	private String fweldernum;
	private String fphone;
	private String fwarn;
	private String dia;
	private BigInteger result1;
	private BigInteger result2;
	private BigInteger num3;
	private String eno;
	private String model;
	private String time;
	public Report(){
		super();
	}
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public BigInteger getResult1() {
		return result1;
	}
	public void setResult1(BigInteger result1) {
		this.result1 = result1;
	}
	public BigInteger getResult2() {
		return result2;
	}
	public void setResult2(BigInteger result2) {
		this.result2 = result2;
	}
	public BigInteger getNum3() {
		return num3;
	}
	public void setNum3(BigInteger num3) {
		this.num3 = num3;
	}
	public String getEno() {
		return eno;
	}
	public void setEno(String eno) {
		this.eno = eno;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getDia() {
		return dia;
	}
	public void setDia(String dia) {
		this.dia = dia;
	}
	public BigInteger getMachid() {
		return machid;
	}
	public void setMachid(BigInteger machid) {
		this.machid = machid;
	}
	public BigInteger getInsid() {
		return insid;
	}
	public void setInsid(BigInteger insid) {
		this.insid = insid;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getFwsid() {
		return fwsid;
	}
	public void setFwsid(String fwsid) {
		this.fwsid = fwsid;
	}
	public String getFteamid() {
		return fteamid;
	}
	public void setFteamid(String fteamid) {
		this.fteamid = fteamid;
	}
	public String getFmachineid() {
		return fmachineid;
	}
	public void setFmachineid(String fmachineid) {
		this.fmachineid = fmachineid;
	}
	public String getFmachinestatus() {
		return fmachinestatus;
	}
	public void setFmachinestatus(String fmachinestatus) {
		this.fmachinestatus = fmachinestatus;
	}
	public String getFmachinemodel() {
		return fmachinemodel;
	}
	public void setFmachinemodel(String fmachinemodel) {
		this.fmachinemodel = fmachinemodel;
	}
	public double getFstandardele() {
		return fstandardele;
	}
	public void setFstandardele(double fstandardele) {
		this.fstandardele = fstandardele;
	}
	public double getFstandardvol() {
		return fstandardvol;
	}
	public void setFstandardvol(double fstandardvol) {
		this.fstandardvol = fstandardvol;
	}
	public double getFrealvol() {
		return frealvol;
	}
	public void setFrealvol(double frealvol) {
		this.frealvol = frealvol;
	}
	public double getFrealele() {
		return frealele;
	}
	public void setFrealele(double frealele) {
		this.frealele = frealele;
	}
	public String getFcurrentwelder() {
		return fcurrentwelder;
	}
	public void setFcurrentwelder(String fcurrentwelder) {
		this.fcurrentwelder = fcurrentwelder;
	}
	public int getFstatus() {
		return fstatus;
	}
	public void setFstatus(int fstatus) {
		this.fstatus = fstatus;
	}
	public double getFinspower() {
		return finspower;
	}
	public void setFinspower(double finspower) {
		this.finspower = finspower;
	}
	public String getFafv() {
		return fafv;
	}
	public void setFafv(String fafv) {
		this.fafv = fafv;
	}
	public String getFweldingtime() {
		return fweldingtime;
	}
	public void setFweldingtime(String fweldingtime) {
		this.fweldingtime = fweldingtime;
	}
	public Date getFboottime() {
		return fboottime;
	}
	public void setFboottime(Date fboottime) {
		this.fboottime = fboottime;
	}
	public Date getFofftime() {
		return fofftime;
	}
	public void setFofftime(Date fofftime) {
		this.fofftime = fofftime;
	}
	public Date getFonlinetime() {
		return fonlinetime;
	}
	public void setFonlinetime(Date fonlinetime) {
		this.fonlinetime = fonlinetime;
	}
	public Date getFfirsttime() {
		return ffirsttime;
	}
	public void setFfirsttime(Date ffirsttime) {
		this.ffirsttime = ffirsttime;
	}
	public Date getFvalidtime() {
		return fvalidtime;
	}
	public void setFvalidtime(Date fvalidtime) {
		this.fvalidtime = fvalidtime;
	}
	public double getFdiameter() {
		return fdiameter;
	}
	public void setFdiameter(double fdiameter) {
		this.fdiameter = fdiameter;
	}
	public String getFspeed() {
		return fspeed;
	}
	public void setFspeed(String fspeed) {
		this.fspeed = fspeed;
	}
	public String getFback() {
		return fback;
	}
	public void setFback(String fback) {
		this.fback = fback;
	}
	public String getFweldernum() {
		return fweldernum;
	}
	public void setFweldernum(String fweldernum) {
		this.fweldernum = fweldernum;
	}
	public String getFphone() {
		return fphone;
	}
	public void setFphone(String fphone) {
		this.fphone = fphone;
	}
	public String getFwarn() {
		return fwarn;
	}
	public void setFwarn(String fwarn) {
		this.fwarn = fwarn;
	}
	public Report(BigInteger result1,BigInteger result2,BigInteger num3,String eno,String model,String time,String dia,BigInteger id,String fwsid,String fteamid,String fmachineid,String fmachinestatus,String fmachinemodel,double fstandardele,double fstandardvol,double frealvol,double frealele,String fcurrentwelder,int fstatus,double finspower,String fafv,String fweldingtime,Date fboottime,Date fofftime,Date fonlinetime,Date ffirsttime,Date fvalidtime,double fdiameter,String fspeed,String fback,String fweldernum,String fphone,String fwarn) {
		super();
		this.id = id;
		this.result1 = result1;
		this.result2 = result2;
		this.num3 = num3;
		this.eno = eno;
		this.model = model;
		this.time = time;
		this.dia = dia;
			this.fwsid = fwsid;
			this.fteamid = fteamid;
			this.fmachineid = fmachineid;
			this.fmachinestatus = fmachinestatus;
			this.fmachinemodel = fmachinemodel;
			this.fstandardele = fstandardele;
			this.fstandardvol = fstandardvol;
			this.frealvol = frealvol;
			this.frealele = frealele;
			this.fcurrentwelder = fcurrentwelder;
			this.fstatus = fstatus;
			this.finspower = finspower;
			this.fafv = fafv;
			this.fweldingtime = fweldingtime;
			this.fboottime = fboottime;
			this.fofftime = fofftime;
			this.fonlinetime = fonlinetime;
			this.ffirsttime = ffirsttime;
			this.fvalidtime = fvalidtime;
			this.fdiameter = fdiameter;
			this.fspeed = fspeed;
			this.fback = fback;
			this.fweldernum = fweldernum;
			this.fphone = fphone;
			this.fwarn = fwarn;
	}
}
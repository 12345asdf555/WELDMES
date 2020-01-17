package com.spring.model;

import java.math.BigInteger;
import java.util.Date;

public class Product {
	private BigInteger id;
	private BigInteger iid;
	private String pronum;
	private String proinfo;
	private String partnum;
	private String partinfo;
	private String backone;
	private String backtwo;
	private String backthree;
	private String backfour;
	private String processname;
	private String weldposition;
	private String material;
	private double format;
	private String method;
	private String drying;
	private String temperature;
	private String factor;
	private String frequire;
	private String flevel;
	private String qualify;
	private String frange;
	private Date fcreatedate;
	private Date fupdatedate;
	private long fcreater;
	private long fupdater;
	public Product(){
		super();
	}
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public BigInteger getIid() {
		return iid;
	}
	public void setIid(BigInteger iid) {
		this.iid = iid;
	}
	public String getPronum(){
		return pronum;
	}
	public void setPronum(String pronum){
		this.pronum = pronum;
	}
	public String getProinfo(){
		return proinfo;
	}
	public void setProinfo(String proinfo){
		this.proinfo = proinfo;
	}
	public String getPartnum(){
		return partnum;
	}
	public void setPartnum(String partnum){
		this.partnum = partnum;
	}
	public String getPartinfo(){
		return partinfo;
	}
	public void setPartinfo(String partinfo){
		this.partinfo = partinfo;
	}
	public String getBackone(){
		return backone;
	}
	public void setBackone(String backone){
		this.backone = backone;
	}
	public String getBacktwo(){
		return backtwo;
	}
	public void setBacktwo(String backtwo){
		this.backtwo = backtwo;
	}
	public String getBackthree(){
		return backthree;
	}
	public void setBackthree(String backthree){
		this.backthree = backthree;
	}
	public String getBackfour(){
		return backfour;
	}
	public void setBackfour(String backfour){
		this.backfour = backfour;
	}
	public String getProcessname(){
		return processname;
	}
	public void setProcessname(String processname){
		this.processname = processname;
	}
	public String getWeldposition(){
		return weldposition;
	}
	public void setWeldposition(String weldposition){
		this.weldposition = weldposition;
	}
	public String getMaterial(){
		return material;
	}
	public void setMaterial(String material){
		this.material = material;
	}
	public double getFormat(){
		return format;
	}
	public void setFormat(double format){
		this.format = format;
	}
	public String getMethod(){
		return method;
	}
	public void setMethod(String method){
		this.method = method;
	}
	public String getDrying(){
		return drying;
	}
	public void setDrying(String drying){
		this.drying = drying;
	}
	public String getTemperature(){
		return temperature;
	}
	public void setTemperature(String temperature){
		this.temperature = temperature;
	}
	public String getFactor(){
		return factor;
	}
	public void setFactor(String factor){
		this.factor = factor;
	}
	public String getFrequire(){
		return frequire;
	}
	public void setFrequire(String frequire){
		this.frequire = frequire;
	}
	public String getFlevel(){
		return flevel;
	}
	public void setFlevel(String flevel){
		this.flevel = flevel;
	}
	public String getQualify(){
		return qualify;
	}
	public void setQualify(String qualify){
		this.qualify = qualify;
	}
	public String getFrange(){
		return frange;
	}
	public void setFrange(String frange){
		this.frange = frange;
	}
	public Date getFcreatedate(){
		return fcreatedate;
	}
	public void setFcreatedate(Date fcreatedate){
		this.fcreatedate = fcreatedate;
	}
	public Date getFupdatedate(){
		return fupdatedate;
	}
	public void setFupdatedate(Date fupdatedate){
		this.fupdatedate = fupdatedate;
	}
	public long getFcreater() {
		return fcreater;
	}
	public void setFcreater(long fcreater) {
		this.fcreater = fcreater;
	}
	public long getFupdater() {
		return fupdater;
	}
	public void setFupdater(long fupdater) {
		this.fupdater = fupdater;
	}
	public Product(BigInteger id,BigInteger iid,String pronum,String proinfo,String partnum,String partinfo,String backone,String backtwo,String backthree,String backfour,String processname,String weldposition,String material,double format,String method,String drying,String temperature,String factor,String frequire,String flevel,String qualify,String frange,Date fcreatedate,Date fupdatedate,long fcreater,long fupdater) {
		super();
		this.id = id;
		this.iid = iid;
		this.pronum = pronum;
		this.proinfo = proinfo;
		this.partnum = partnum;
		this.partinfo = partinfo;
		this.backone = backone;
		this.backtwo = backtwo;
		this.backthree = backthree;
		this.backfour = backfour;
		this.processname = processname;
		this.weldposition = weldposition;
		this.material = material;
		this.format = format;
		this.method = method;
		this.drying = drying;
		this.temperature = temperature;
		this.factor = factor;
		this.frequire = frequire;
		this.flevel = flevel;
		this.qualify = qualify;
		this.frange = frange;
		this.fcreatedate = fcreatedate;
		this.fupdatedate = fupdatedate;
		this.fcreater = fcreater;
		this.fupdater = fupdater;
	}
}

package com.spring.model;

public class Td {
	private int id;
	private double electricity;
	private double voltage;
	private String fposition;
	private String fwelder_no;
	private String fname;
	private String fstatus_id;
	private String fequipment_no;
	private String finsframework_id;
	private int fpt;
	private int fpi;
	private int fpp;
	private String fpn;
	private int fdt;
	private int fdp;
	private int fdi;
	private String fdn;
	private int fci;
	private int fct;
	private String fcn;
	private double time;
	private double worktime;
	private String model;
	public Td(){
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getElectricity() {
		return electricity;
	}
	public void setElectricity(double electricity) {
		this.electricity = electricity;
	}
	public double getVoltage() {
		return voltage;
	}
	public void setVoltage(double voltage) {
		this.voltage = voltage;
	}
	public String getFposition(){
		return fposition;
	}
	public void setFposition(String fposition) {
		this.fposition = fposition;
	}
	public String getFwelder_no(){
		return fwelder_no;
	}
	public void setFwelder_no(String fwelder_no) {
		this.fwelder_no = fwelder_no;
	}
	public String getFname(){
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getFequipment_no(){
		return fequipment_no;
	}
	public void setFequipment_no(String fequipment_no) {
		this.fequipment_no = fequipment_no;
	}
	public String getFinsframework_id(){
		return finsframework_id;
	}
	public void setFinsframework_id(String finsframework_id) {
		this.finsframework_id = finsframework_id;
	}
	public String getFstatus_id() {
		return fstatus_id;
	}
	public void setFstatus_id(String fstatus_id) {
		this.fstatus_id = fstatus_id;
	}
	public int getFpt() {
		return fpt;
	}
	public void setFpt(int fpt) {
		this.fpt = fpt;
	}
	public int getFpi() {
		return fpi;
	}
	public void setFpi(int fpi) {
		this.fpi = fpi;
	}
	public int getFpp() {
		return fpp;
	}
	public void setFpp(int fpp) {
		this.fpp = fpp;
	}
	public int getFdt() {
		return fdt;
	}
	public void setFdt(int fdt) {
		this.fdt = fdt;
	}
	public int getFdp() {
		return fdp;
	}
	public void setFdp(int fdp) {
		this.fdp = fdp;
	}
	public int getFdi() {
		return fdi;
	}
	public void setFdi(int fdi) {
		this.fdi = fdi;
	}
	public int getFct() {
		return fct;
	}
	public void setFct(int fct) {
		this.fct = fct;
	}
	public int getFci() {
		return fci;
	}
	public void setFci(int fci) {
		this.fci = fci;
	}
	public String getFpn(){
		return fpn;
	}
	public void setFpn(String fpn) {
		this.fpn = fpn;
	}
	public String getFdn(){
		return fdn;
	}
	public void setFdn(String fdn) {
		this.fdn = fdn;
	}
	public String getFcn(){
		return fcn;
	}
	public void setFcn(String fcn) {
		this.fcn = fcn;
	}
	public double getTime() {
		return time;
	}
	public void setTime(double time) {
		this.time = time;
	}
	public double getWorktime() {
		return worktime;
	}
	public void setWorktime(double worktime) {
		this.worktime = worktime;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public Td(int id,double electricity,double voltage,String fposition,String fwelder_no,String fname,String fequipment_no,String finsframework_id,String fstatus_id,int fpt,int fpp,int fpi, int fdt,int fdp,int fdi,int fct,int fci,String fcn,String fdn,String fpn) {
		super();
		this.id = id;
		this.electricity = electricity;
		this.voltage = voltage;
		this.fposition = fposition;
		this.fwelder_no = fwelder_no;
		this.fname = fname;
		this.fequipment_no = fequipment_no;
		this.finsframework_id = finsframework_id;
		this.fstatus_id = fstatus_id;
		this.fpt = fpt;
		this.fpp = fpp;
		this.fpi = fpi;
		this.fdt = fdt;
		this.fdp = fdp;
		this.fdi = fdi;
		this.fct = fct;
		this.fci = fci;
		this.fcn = fcn;
		this.fdn = fdn;
		this.fpn = fpn;
	}
}

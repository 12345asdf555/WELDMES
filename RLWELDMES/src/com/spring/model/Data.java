package com.spring.model;

/**
 */
public class Data {

	private double electricity;
	private double voltage;
	private long sensor_Num;
	private long machine_id;
	private long welder_id;
	private long code;
	private long year;
	private long month;
	private long day;
	private long hour;
	private long minute;
	private long second;
	private int status;
	public Data(){
		super();
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
	public long getSensor_Num() {
		return sensor_Num;
	}
	public void setSensor_Num(long sensor_Num) {
		this.sensor_Num = sensor_Num;
	}
	public long getMachine_id() {
		return machine_id;
	}
	public void setMachine_id(long machine_id) {
		this.machine_id = machine_id;
	}
	public long getWelder_id() {
		return welder_id;
	}
	public void setWelder_id(long welder_id) {
		this.welder_id = welder_id;
	}
	public long getCode() {
		return code;
	}
	public void setCode(long code) {
		this.code = code;
	}
	public long getYear() {
		return year;
	}
	public void setYear(long year) {
		this.year = year;
	}
	public long getMonth() {
		return month;
	}
	public void setMonth(long month) {
		this.month = month;
	}
	public long getDay() {
		return day;
	}
	public void setDay(long day) {
		this.day = day;
	}
	public long getHour() {
		return hour;
	}
	public void setHour(long hour) {
		this.hour = hour;
	}
	public long getMinute() {
		return minute;
	}
	public void setMinute(long minute) {
		this.minute = minute;
	}
	public long getSecond() {
		return second;
	}
	public void setSecond(long second) {
		this.second = second;
	}
	public long getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}

	public Data(double electricity,double voltage,long sensor_Num,long machine_id,long welder_id,long code,long year,long month,long day,long hour,long minute,long second,int status) {
		super();
		this.electricity = electricity;
		this.voltage = voltage;
		this.sensor_Num = sensor_Num;
		this.machine_id = machine_id;
		this.welder_id = welder_id;
		this.code = code;
		this.year = year;
		this.month = month;
		this.day = day;
		this.hour = hour;
		this.minute = minute;
		this.second = second;
		this.status = status;
	}
}

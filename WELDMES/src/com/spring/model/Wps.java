package com.spring.model;

import java.math.BigInteger;
import java.util.Date;


public class Wps {
	private long fid;
	private BigInteger insid;
	private BigInteger macid;
	private String insname;
	private BigInteger welderid;
	private String weldername;
	private String updatename;
	private String fwpsnum;
	private int fweld_i;
	private int fweld_v;
	private int fweld_i_max;
	private int fweld_i_min;
	private int fweld_v_max;
	private int fweld_v_min;
	private int fweld_alter_i;
	private int fweld_alter_v;
	private int fweld_prechannel;
	private Date fcreatedate;
	private Date fupdatedate;
	private long fcreater;
	private long fupdater;
	private long fowner;
	private String fback;
	private String fname;
	private double fdiameter;
	private double ftime;
	private double fadvance;
	private double fhysteresis;
	private double fini_ele;
	private double fini_vol;
	private double fini_vol1;
	private double fweld_ele;
	private double fweld_vol;
	private double fweld_vol1;
	private double farc_ele;
	private double farc_vol;
	private double farc_vol1;
	private double fweld_tuny_ele;
	private double fweld_tuny_vol;
	private double farc_tuny_ele;
	private String finitial;
	private String fcontroller;
	private String fmode;
	private double frequency;
	private double gasflow;
	private int ftorch;
	private int fprocessid;
	private double weldingratio;
	private String fprocessname;
	private String f001;
	private String f002;
	private String f003;
	private String f004;
	private String f005;
	private String f006;
	private String f007;
	private String f008;
	private String f009;
	private String f010;
	private String f011;
	private String f012;
	private String f013;
	private String f014;
	private String f015;
	private String f016;
	private String f017;
	private String f018;
	private String f019;
	private String f020;
	private String f021;
	private String f022;
	private String f023;
	private String f024;
	private double firsttime;     
	private double farc_time;
	private double Rush;
	private double handarc_ele;
	private double handarc_time;
	private double hand_ele;
	private double Base_ele;
	private double Base_vol;
	private double Base_vol1;
	private double fargon;
	private double manual_weld;
	private double arc_length;
	private double pulse;
	private double fweldparameters;
	private double rise_time;
	private double decline_time;
	private double thrust_ele;
	private double pulse_ratio;
	private double point_speed;
	private double farc_tuny_vol;
	private double fini_tuny_vol;
	
	public double getFspeed() {
		return fspeed;
	}
	public void setFspeed(double fspeed) {
		this.fspeed = fspeed;
	}
	public double getFarc_speed() {
		return farc_speed;
	}
	public void setFarc_speed(double farc_speed) {
		this.farc_speed = farc_speed;
	}
	public double getFarc_tuny_speed() {
		return farc_tuny_speed;
	}
	public void setFarc_tuny_speed(double farc_tuny_speed) {
		this.farc_tuny_speed = farc_tuny_speed;
	}
	public String getFselectstep() {
		return fselectstep;
	}
	public void setFselectstep(String fselectstep) {
		this.fselectstep = fselectstep;
	}
	public String getFfrequency() {
		return ffrequency;
	}
	public void setFfrequency(String ffrequency) {
		this.ffrequency = ffrequency;
	}
	private double fspeed;
	private double farc_speed;
	private double farc_tuny_speed;
	private String fselectstep;
	private String ffrequency;
	
	public String getGuide() {
		return guide;
	}
	public void setGuide(String guide) {
		this.guide = guide;
	}
	public String getSlope() {
		return slope;
	}
	public void setSlope(String slope) {
		this.slope = slope;
	}
	public String getSpecialarc() {
		return specialarc;
	}
	public void setSpecialarc(String specialarc) {
		this.specialarc = specialarc;
	}
	public String getSpecialarc_rep() {
		return specialarc_rep;
	}
	public void setSpecialarc_rep(String specialarc_rep) {
		this.specialarc_rep = specialarc_rep;
	}
	public String getTs_condition() {
		return ts_condition;
	}
	public void setTs_condition(String ts_condition) {
		this.ts_condition = ts_condition;
	}
	public String getPulse_ele() {
		return pulse_ele;
	}
	public void setPulse_ele(String pulse_ele) {
		this.pulse_ele = pulse_ele;
	}
	public String getAc_frequency() {
		return ac_frequency;
	}
	public void setAc_frequency(String ac_frequency) {
		this.ac_frequency = ac_frequency;
	}
	public String getClean_width() {
		return clean_width;
	}
	public void setClean_width(String clean_width) {
		this.clean_width = clean_width;
	}
	public String getAc_dc() {
		return ac_dc;
	}
	public void setAc_dc(String ac_dc) {
		this.ac_dc = ac_dc;
	}
	public String getPulse_width() {
		return pulse_width;
	}
	public void setPulse_width(String pulse_width) {
		this.pulse_width = pulse_width;
	}
	public String getAc_ratio() {
		return ac_ratio;
	}
	public void setAc_ratio(String ac_ratio) {
		this.ac_ratio = ac_ratio;
	}
	public String getAc_wave() {
		return ac_wave;
	}
	public void setAc_wave(String ac_wave) {
		this.ac_wave = ac_wave;
	}
	public String getPulse_tuny_ele() {
		return pulse_tuny_ele;
	}
	public void setPulse_tuny_ele(String pulse_tuny_ele) {
		this.pulse_tuny_ele = pulse_tuny_ele;
	}
	public String getSpecial_arcorder() {
		return special_arcorder;
	}
	public void setSpecial_arcorder(String special_arcorder) {
		this.special_arcorder = special_arcorder;
	}
	public String getSpecial_arc_initial() {
		return special_arc_initial;
	}
	public void setSpecial_arc_initial(String special_arc_initial) {
		this.special_arc_initial = special_arc_initial;
	}
	public String getSpecial_arctime() {
		return special_arctime;
	}
	public void setSpecial_arctime(String special_arctime) {
		this.special_arctime = special_arctime;
	}
	public String getClick_ele() {
		return click_ele;
	}
	public void setClick_ele(String click_ele) {
		this.click_ele = click_ele;
	}
	public String getTwo_click_ele() {
		return two_click_ele;
	}
	public void setTwo_click_ele(String two_click_ele) {
		this.two_click_ele = two_click_ele;
	}
	public String getRepeat_end() {
		return repeat_end;
	}
	public void setRepeat_end(String repeat_end) {
		this.repeat_end = repeat_end;
	}
	public double getRise_time() {
		return rise_time;
	}
	private String guide;
	private String slope;
	private String specialarc;
	private String specialarc_rep;
	private String ts_condition;
	private String pulse_ele;
	private String ac_frequency;
	private String clean_width;
	private String ac_dc ;
	private String pulse_width;
	private String ac_ratio;
	private String ac_wave;
	private String pulse_tuny_ele;
	private String special_arcorder;
	private String special_arc_initial;
	private String special_arctime;
	private String click_ele;
	private String two_click_ele;
	private String repeat_end;
	public Wps(){
		super();
	}
	public long getFid() {
		return fid;
	}
	public void setFid(long fid) {
		this.fid = fid;
	}
	public BigInteger getWelderid() {
		return welderid;
	}
	public void setWelderid(BigInteger welderid) {
		this.welderid = welderid;
	}
	public BigInteger getMacid() {
		return macid;
	}
	public void setMacid(BigInteger macid) {
		this.macid = macid;
	}
	public BigInteger getInsid() {
		return insid;
	}
	public void setInsid(BigInteger insid) {
		this.insid = insid;
	}
	public String getWeldername(){
		return weldername;
	}
	public void setWeldername(String weldername){
		this.weldername = weldername;
	}
	public String getUpdatename(){
		return updatename;
	}
	public void setUpdatename(String updatename){
		this.updatename = updatename;
	}
	public String getInsname(){
		return insname;
	}
	public void setInsname(String insname){
		this.insname = insname;
	}
	public String getFwpsnum(){
		return fwpsnum;
	}
	public void setFwpsnum(String fwpsnum){
		this.fwpsnum = fwpsnum;
	}
	public int getFweld_i() {
		return fweld_i;
	}
	public void setFweld_i(int fweld_i) {
		this.fweld_i = fweld_i;
	}
	public int getFweld_v() {
		return fweld_v;
	}
	public void setFweld_v(int fweld_v) {
		this.fweld_v = fweld_v;
	}
	public int getFweld_i_max() {
		return fweld_i_max;
	}
	public void setFweld_i_max(int fweld_i_max) {
		this.fweld_i_max = fweld_i_max;
	}
	public int getFweld_i_min() {
		return fweld_i_min;
	}
	public void setFweld_i_min(int fweld_i_min) {
		this.fweld_i_min = fweld_i_min;
	}
	public int getFweld_v_max() {
		return fweld_v_max;
	}
	public void setFweld_v_max(int fweld_v_max) {
		this.fweld_v_max = fweld_v_max;
	}
	public int getFweld_v_min() {
		return fweld_v_min;
	}
	public void setFweld_v_min(int fweld_v_min) {
		this.fweld_v_min = fweld_v_min;
	}
	public int getFweld_alter_i() {
		return fweld_alter_i;
	}
	public void setFweld_alter_i(int fweld_alter_i) {
		this.fweld_alter_i = fweld_alter_i;
	}
	public int getFweld_alter_v() {
		return fweld_alter_v;
	}
	public void setFweld_alter_v(int fweld_alter_v) {
		this.fweld_alter_v = fweld_alter_v;
	}
	public int getFweld_prechannel() {
		return fweld_prechannel;
	}
	public void setFweld_prechannel(int fweld_prechannel) {
		this.fweld_prechannel = fweld_prechannel;
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
	public long getFowner() {
		return fowner;
	}
	public void setFowner(long fowner) {
		this.fowner = fowner;
	}
	public String getFback(){
		return fback;
	}
	public void setFback(String fback){
		this.fback = fback;
	}
	public String getFname(){
		return fname;
	}
	public void setFname(String fname){
		this.fname = fname;
	}
	public double getFdiameter(){
		return fdiameter;
	}
	public void setFdiameter(double fdiameter){
		this.fdiameter = fdiameter;
	}
	public Wps(long fid,BigInteger insid,BigInteger macid,String insname,BigInteger welderid,String weldername,String updatename,String fwpsnum,int fweld_i,int fweld_v,int fweld_i_max,int fweld_i_min,int fweld_v_max,int fweld_v_min,int fweld_alter_i,int fweld_alter_v,int fweld_prechannel,Date fcreatedate,Date fupdatedate,long fcreater,long fupdater,long fowner,String fback,String fname,double fdiameter,double ftime,double fadvance,double fhysteresis,double fini_ele,double fini_vol,double fini_vol1,double fweld_ele,double fweld_vol,double fweld_vol1,double farc_ele,double farc_vol,double farc_vol1,double fweld_tuny_ele,double fweld_tuny_vol,double farc_tuny_ele,String finitial,String fcontroller,String fmode,int ftorch,int fprocessid,String fprocessname
			,String f001,String f002,String f003,String f004,String f005,String f006,String f007,String f008,String f009,String f010,String f011,String f012,String f013,String f014,String f015,String f016,String f017,String f018,String f019,String f020,String f021,String f022, String f023,String f024) {
		super();
		this.macid = macid;
		this.insname = insname;
		this.weldername = weldername;
		this.updatename = updatename;
		this.insid = insid;
		this.welderid = welderid;
		this.fid = fid;
		this.fwpsnum = fwpsnum;
		this.fweld_i = fweld_i;
		this.fweld_v = fweld_v;
		this.fweld_i_max = fweld_i_max;
		this.fweld_i_min = fweld_i_min;
		this.fweld_v_max = fweld_v_max;
		this.fweld_v_min = fweld_v_min;
		this.fweld_alter_i = fweld_alter_i;
		this.fweld_alter_v = fweld_alter_v;
		this.fweld_prechannel = fweld_prechannel;
		this.fcreatedate = fcreatedate;
		this.fupdatedate = fupdatedate;
		this.fcreater = fcreater;
		this.fupdater = fupdater;
		this.fowner = fowner;
		this.fback = fback;
		this.fname = fname;
		this.fdiameter = fdiameter;
		this.ftime = ftime;
		this.fadvance = fadvance;
		this.fhysteresis = fhysteresis;
		this.fini_ele = fini_ele;
		this.fini_vol = fini_vol;
		this.fini_vol1 = fini_vol1;
		this.fweld_ele = fweld_ele;
		this.fweld_vol = fweld_vol1;
		this.farc_ele = farc_ele;
		this.farc_vol = farc_vol;
		this.farc_vol1 = farc_vol1;
		this.fweld_tuny_ele = fweld_tuny_ele;
		this.fweld_tuny_vol = fweld_tuny_vol;
		this.farc_tuny_ele = farc_tuny_ele;
		this.finitial = finitial;
		this.fcontroller = fcontroller;
		this.fmode = fmode;
		this.ftorch = ftorch;
		this.fprocessid = fprocessid;
		this.fprocessname = fprocessname;
		this.f001 = f001;
		this.f002 = f002;
		this.f003 = f003;
		this.f004 = f004;
		this.f005 = f005;
		this.f006 = f006;
		this.f007 = f007;
		this.f008 = f008;
		this.f009 = f009;
		this.f010 = f010;
		this.f011 = f011;
		this.f012 = f012;
		this.f013 = f013;
		this.f014 = f014;
		this.f015 = f015;
		this.f016 = f016;
		this.f017 = f017;
		this.f018 = f018;
		this.f019 = f019;
		this.f020 = f020;
		this.f021 = f021;
		this.f022 = f022;
		this.f023 = f023;
		this.f024 = f024;
	}
	public double getFtime() {
		return ftime;
	}
	public void setFtime(double ftime) {
		this.ftime = ftime;
	}
	public double getFadvance() {
		return fadvance;
	}
	public void setFadvance(double fadvance) {
		this.fadvance = fadvance;
	}
	public double getFhysteresis() {
		return fhysteresis;
	}
	public void setFhysteresis(double fhysteresis) {
		this.fhysteresis = fhysteresis;
	}
	public double getFini_ele() {
		return fini_ele;
	}
	public void setFini_ele(double fini_ele) {
		this.fini_ele = fini_ele;
	}
	public double getFini_vol() {
		return fini_vol;
	}
	public void setFini_vol(double fini_vol) {
		this.fini_vol = fini_vol;
	}
	public double getFweld_ele() {
		return fweld_ele;
	}
	public void setFweld_ele(double fweld_ele) {
		this.fweld_ele = fweld_ele;
	}
	public double getFweld_vol() {
		return fweld_vol;
	}
	public void setFweld_vol(double fweld_vol) {
		this.fweld_vol = fweld_vol;
	}
	public double getFarc_ele() {
		return farc_ele;
	}
	public void setFarc_ele(double farc_ele) {
		this.farc_ele = farc_ele;
	}
	public double getFarc_vol() {
		return farc_vol;
	}
	public void setFarc_vol(double farc_vol) {
		this.farc_vol = farc_vol;
	}
	public double getFweld_tuny_ele() {
		return fweld_tuny_ele;
	}
	public void setFweld_tuny_ele(double fweld_tuny_ele) {
		this.fweld_tuny_ele = fweld_tuny_ele;
	}
	public double getFweld_tuny_vol() {
		return fweld_tuny_vol;
	}
	public void setFweld_tuny_vol(double fweld_tuny_vol) {
		this.fweld_tuny_vol = fweld_tuny_vol;
	}
	public double getFarc_tuny_ele() {
		return farc_tuny_ele;
	}
	public void setFarc_tuny_ele(double farc_tuny_ele) {
		this.farc_tuny_ele = farc_tuny_ele;
	}
	public String getFinitial() {
		return finitial;
	}
	public void setFinitial(String finitial) {
		this.finitial = finitial;
	}
	public String getFcontroller() {
		return fcontroller;
	}
	public void setFcontroller(String fcontroller) {
		this.fcontroller = fcontroller;
	}
	public String getFmode() {
		return fmode;
	}
	public void setFmode(String fmode) {
		this.fmode = fmode;
	}
	public double getFini_vol1() {
		return fini_vol1;
	}
	public void setFini_vol1(double fini_vol1) {
		this.fini_vol1 = fini_vol1;
	}
	public double getFweld_vol1() {
		return fweld_vol1;
	}
	public void setFweld_vol1(double fweld_vol1) {
		this.fweld_vol1 = fweld_vol1;
	}
	public double getFarc_vol1() {
		return farc_vol1;
	}
	public void setFarc_vol1(double farc_vol1) {
		this.farc_vol1 = farc_vol1;
	}
	public double getFrequency() {
		return frequency;
	}
	public void setFrequency(double frequency) {
		this.frequency = frequency;
	}
	public double getGasflow() {
		return gasflow;
	}
	public void setWeldingratio(double weldingratio) {
		this.weldingratio = weldingratio;
	}
	public double getWeldingratio() {
		return weldingratio;
	}
	public void setGasflow(double gasflow) {
		this.gasflow = gasflow;
	}
	
	public int getFtorch() {
		return ftorch;
	}
	public void setFtorch(int ftorch) {
		this.ftorch = ftorch;
	}
	public int getFprocessid() {
		return fprocessid;
	}
	public void setFprocessid(int fprocessid) {
		this.fprocessid = fprocessid;
	}
	public String getFprocessname() {
		return fprocessname;
	}
	public void setFprocessname(String fprocessname) {
		this.fprocessname = fprocessname;
	}
	public String getF001() {
		return f001;
	}
	public void setF001(String f001) {
		this.f001 = f001;
	}
	public String getF002() {
		return f002;
	}
	public void setF002(String f002) {
		this.f002 = f002;
	}
	public String getF003() {
		return f003;
	}
	public void setF003(String f003) {
		this.f003 = f003;
	}
	public String getF004() {
		return f004;
	}
	public void setF004(String f004) {
		this.f004 = f004;
	}
	public String getF005() {
		return f005;
	}
	public void setF005(String f005) {
		this.f005 = f005;
	}
	public String getF006() {
		return f006;
	}
	public void setF006(String f006) {
		this.f006 = f006;
	}
	public String getF007() {
		return f007;
	}
	public void setF007(String f007) {
		this.f007 = f007;
	}
	public String getF008() {
		return f008;
	}
	public void setF008(String f008) {
		this.f008 = f008;
	}
	public String getF009() {
		return f009;
	}
	public void setF009(String f009) {
		this.f009 = f009;
	}
	public String getF010() {
		return f010;
	}
	public void setF010(String f010) {
		this.f010 = f010;
	}
	public String getF011() {
		return f011;
	}
	public void setF011(String f011) {
		this.f011 = f011;
	}
	public String getF012() {
		return f012;
	}
	public void setF012(String f012) {
		this.f012 = f012;
	}
	public String getF013() {
		return f013;
	}
	public void setF013(String f013) {
		this.f013 = f013;
	}
	public String getF014() {
		return f014;
	}
	public void setF014(String f014) {
		this.f014 = f014;
	}
	public String getF015() {
		return f015;
	}
	public void setF015(String f015) {
		this.f015 = f015;
	}
	public String getF016() {
		return f016;
	}
	public void setF016(String f016) {
		this.f016 = f016;
	}
	public String getF017() {
		return f017;
	}
	public void setF017(String f017) {
		this.f017 = f017;
	}
	public String getF018() {
		return f018;
	}
	public void setF018(String f018) {
		this.f018 = f018;
	}
	public String getF019() {
		return f019;
	}
	public void setF019(String f019) {
		this.f019 = f019;
	}
	public String getF020() {
		return f020;
	}
	public void setF020(String f020) {
		this.f020 = f020;
	}
	public String getF021() {
		return f021;
	}
	public void setF021(String f021) {
		this.f021 = f021;
	}
	public String getF022() {
		return f022;
	}
	public void setF022(String f022) {
		this.f022 = f022;
	}
	public String getF023() {
		return f023;
	}
	public void setF023(String f023) {
		this.f023 = f023;
	}
	public String getF024() {
		return f024;
	}
	public void setF024(String f024) {
		this.f024 = f024;
	}
	public double getFirsttime(){
		return firsttime;
	}
	public void setFirsttime(double firsttime){
		this.firsttime = firsttime;
	}
	public double getFarc_time(){
		return farc_time;
	}
	public void setFarc_time(double farc_time){
		this.farc_time = farc_time;
	}
	public double getRush(){
		return Rush;
	}
	public void setRush(double Rush){
		this.Rush = Rush;
	}
	public double getHandarc_ele(){
		return handarc_ele;
	}
	public void setHandarc_ele (double handarc_ele ){
		this.handarc_ele = handarc_ele ;
	}
	public double getHandarc_time(){
		return handarc_time;
	}
	public void setHandarc_time(double handarc_time ){
		this.handarc_time  = handarc_time ;
	}
	public double getHand_ele(){
		return hand_ele;
	}
	public void setHand_ele(double hand_ele ){
		this.hand_ele = hand_ele  ;
	}
	public double getBase_ele(){
		return Base_ele;
	}
	public void setBase_ele(double Base_ele ){
		this.Base_ele = Base_ele  ;
	}
	public double getBase_vol(){
		return Base_vol;
	}
	public void setBase_vol(double Base_vol ){
		this.Base_vol = Base_vol  ;
	}
	public double getBase_vol1(){
		return Base_vol1;
	}
	public void setBase_vol1(double Base_vol1 ){
		this.Base_vol1 = Base_vol1;
	}
	public double getFargon(){
		return fargon;
	}
	public void setFargon(double fargon){
		this.fargon = fargon;
	}
	public double getManual_weld(){
		return manual_weld ;
	}
	public void setManual_weld(double manual_weld){
		this.manual_weld  = manual_weld ;
	}
	public double getArc_length(){
		return arc_length ;
	}
	public void setArc_length(double arc_length){
		this.arc_length = arc_length ;
	}
	public double getPulse(){
		return pulse ;
	}
	public void setPulse(double pulse){
		this.pulse = pulse ;
	}
	public double getFweldparameters(){
		return fweldparameters ;
	}
	public void setFweldparameters(double fweldparameters){
		this.fweldparameters = fweldparameters ;
	}
	public double getRrise_time(){
		return rise_time ;
	}
	public void setRise_time(double rise_time){
		this.rise_time = rise_time ;
	}
	public double getDecline_time(){
		return decline_time ;
	}
	public void setDecline_time(double decline_time){
		this.decline_time = decline_time;
	}
	public double getThrust_ele(){
		return thrust_ele ;
	}
	public void setThrust_ele(double thrust_ele){
		this.thrust_ele = thrust_ele;
	}
	public double getPulse_ratio(){
		return pulse_ratio ;
	}
	public void setPulse_ratio(double pulse_ratio){
		this.pulse_ratio = pulse_ratio;
	}
	public double getPoint_speed(){
		return point_speed ;
	}
	public void setPoint_speed(double point_speed){
		this.point_speed = point_speed;
	}
	public double getFarc_tuny_vol() {
		return farc_tuny_vol;
	}
	public void setFarc_tuny_vol(double farc_tuny_vol) {
		this.farc_tuny_vol = farc_tuny_vol;
	}
	public double getFini_tuny_vol() {
		return fini_tuny_vol;
	}
	public void setFini_tuny_vol(double fini_tuny_vol) {
		this.fini_tuny_vol = fini_tuny_vol;
	}
}

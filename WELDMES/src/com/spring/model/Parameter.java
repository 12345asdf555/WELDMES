package com.spring.model;

import java.math.BigInteger;

public class Parameter {
	private BigInteger id;
	private BigInteger folt;
	private int fvv;
	private String fcn;
	private String fst;
	private String fsft;
	private String fct;
	private String fww;
	private String fafv;
	private String fspeed;
	private String fwc;
	private String fsp;
	private String fds;
	private String fas;
	private String fns;
	public Parameter(){
		super();
	}
	public BigInteger getId(){
		return id;
	}
	public void setId(BigInteger id){
		this.id=id;
	}
	public BigInteger getFolt(){
		return folt;
	}
	public void setFolt(BigInteger folt){
		this.folt=folt;
	}
	public int getFvv(){
		return fvv;
	}
	public void setFvv(int fvv){
		this.fvv=fvv;
	}
	public String getFcn(){
		return fcn;
	}
	public void setFcn(String fcn){
		this.fcn=fcn;
	}
	public String getFst(){
		return fst;
	}
	public void setFst(String fst){
		this.fst=fst;
	}
	public String getFsft(){
		return fsft;
	}
	public void setFsft(String fsft){
		this.fsft=fsft;
	}
	public String getFct(){
		return fct;
	}
	public void setFct(String fct){
		this.fct=fct;
	}
	public String getFww(){
		return fww;
	}
	public void setFww(String fww){
		this.fww=fww;
	}
	public String getFafv(){
		return fafv;
	}
	public void setFafv(String fafv){
		this.fafv=fafv;
	}
	public String getFspeed(){
		return fspeed;
	}
	public void setFspeed(String fspeed){
		this.fspeed=fspeed;
	}
	public String getFwc(){
		return fwc;
	}
	public void setFwc(String fwc){
		this.fwc=fwc;
	}
	public String getFsp(){
		return fsp;
	}
	public void setFsp(String fsp){
		this.fsp=fsp;
	}
	public String getFds(){
		return fds;
	}
	public void setFds(String fds){
		this.fds=fds;
	}
	public String getFns(){
		return fns;
	}
	public void setFns(String fns){
		this.fns=fns;
	}
	public String getFas(){
		return fas;
	}
	public void setFas(String fas){
		this.fas=fas;
	}
	public Parameter(BigInteger id,BigInteger folt,int fvv,String fcn,String fst,String fsft,String fct,String fww,String fafv,String fspeed,String fwc,String fsp,String fds,String fas,String fns){
	super();
		this.id = id;
		this.folt=folt;
		this.fvv=fvv;
		this.fcn=fcn;
		this.fst=fst;
		this.fsft=fsft;
		this.fct=fct;
		this.fww=fww;
		this.fafv=fafv;
		this.fspeed=fspeed;
		this.fwc=fwc;
		this.fsp=fsp;
		this.fds=fds;
		this.fns=fns;
		this.fas=fas;
	}
}

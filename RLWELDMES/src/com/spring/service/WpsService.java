package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.dto.WeldDto;
import com.spring.model.Wps;
import com.spring.page.Page;

public interface WpsService {
	List<Wps> findAll(Page page, BigInteger parent,String str);
	List<Wps> findAllSpe(BigInteger machine,BigInteger chanel);
	List<Wps> findSpe(BigInteger machine,String ch);
	List<Wps> findHistory(Page page, BigInteger parent);
	List<Wps> AllSpe(BigInteger machine,String ch);
	void give(Wps wps);
	BigInteger findByUid(long uid);
	void save(Wps wps);
	void update(Wps wps);
	int getUsernameCount(String fwpsnum);
	Wps findById(BigInteger fid);
	void delete(BigInteger fid);
	String findIpById(BigInteger fid);
	void deleteHistory(BigInteger fid);
	Wps findSpeById(BigInteger fid);
	int findCount(BigInteger machine, String string);
	void saveSpe(Wps wps);
	void updateSpe(Wps wps);
	void saveSpc(Wps wps);
	void updateSpc(Wps wps);
	/**
	 * 根据焊机号和job号获取参数
	 * @param machine
	 * @param chanel
	 * @return
	 */
	List<Wps> getFnsDetail(BigInteger machine, String chanel);
	/**
	 * 获取焊机的所有job号
	 * @param machine
	 * @return
	 */
	List<Wps> getFnsJobList(BigInteger machine);
	/**
	 * 新增job
	 * @param wps
	 */
	void addJob(Wps wps);
	/**
	 * 修改job
	 * @param wps
	 */
	void updateJob(Wps wps);
	/**
	 * 删除Job
	 */
	void deleteJob(String machine,String chanel);
	
	void saveOtcspc(Wps wps);
	void updateOtcspc(Wps wps);
	List<Wps> findOtcspc(BigInteger machine,BigInteger chanel);
	
	List<Wps> findAllSperl(BigInteger machine,BigInteger chanel);
	void saveSperl(Wps wps);
	void updateSperl(Wps wps);
	void saveSperlmw(Wps wps);
	void updateSperlmw(Wps wps);
	List<Wps> findSperl(BigInteger machine,String ch);
	List<Wps> getWpslibList(Page page, String search);
	List<Wps> getWpslibStatus();
	void saveWpslib(Wps wps);
	void updateWpslib(Wps wps);
	void deleteWpslib(BigInteger fid);
	void deleteWpsBelongLib(BigInteger fid);
	List<Wps> getMainwpsList(Page page, BigInteger parent);
	void deleteMainWps(BigInteger fid);
	boolean saveOtcWpsHistory(Wps wps);
	/**
	 * 工艺库与下发焊机的对应列表
	 * @param wps
	 * @return
	 */
	List<Wps> getWpslibMachineHistoryList(Page page, String machineNum, String wpslibName, WeldDto dto);
	
	/**
	 * 查询工艺历史记录
	 * @param id
	 * @return
	 */
	Wps getRlDetail(String id);
}

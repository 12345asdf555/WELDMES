package com.spring.service;

import java.math.BigInteger;
import java.util.List;


import com.spring.model.Gather;
import com.spring.page.Page;

public interface GatherService {
	/**
	 * 分页显示采集列表
	 * @param page 分页
	 * @param str 查询信息
	 * @return
	 */
	List<Gather> getGatherPageAll(Page page,String str,BigInteger parent);
	
	/**
	 * 查询采集列表
	 * @param str 查询信息
	 * @return
	 */
	List<Gather> getGatherAll(String str,BigInteger parent);
	
	/**
	 * 根据编号查询id
	 * @param gatherno采集编号
	 * @return
	 */
	BigInteger getGatherByNo(String gatherno);
	
	/**
	 * 判断采集编号是否存在
	 * @param gatherno采集编号
	 * @return
	 */
	int getGatherNoCount(String gatherno,BigInteger item);
	int getGatherNoByItemCount(String gatherno,String itemid);
	
	/**
	 * 根据id查询采集信息
	 * @param id 采集id
	 * @return
	 */
	Gather getGatherById(BigInteger id);
	
	/**
	 * 添加采集信息
	 * @param ins采集对象
	 */
	void addGather(Gather ins);
	
	/**
	 * 修改采集信息
	 * @param ins采集对象
	 */
	void editGather(Gather ins);
	
	/**
	 * 删除采集信息
	 * @param id采集id
	 */
	void deleteGather(BigInteger id);
	
	/**
	 * 根据组织机构id查找采集id及编号
	 * @param insfid 组织机构id
	 * @return
	 */
	List<Gather> getGatherByInsfid(BigInteger insfid);
}

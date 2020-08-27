package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.spring.model.LiveData;
import com.spring.model.WeldedJunction;
import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.page.Page;

public interface LiveDataService {
	
	/**
	 * 查询公司焊接工时
	 * @param dto扩展参数类
	 * @param parent父id
	 * @return
	 */
	List<ModelDto> getCompanyhour(WeldDto dto,BigInteger parent,String insftype);
	
	/**
	 * 获取焊口分类
	 * @param page 分页
	 * @param parent 父id
	 * @param material 材质
	 * @param external_diameter 外径
	 * @param wall_thickness 璧厚
	 * @param nextExternal_diameter 下游外径
	 * @return
	 */
	List<ModelDto> getHousClassify(Page page,BigInteger parent,String searchStr);
	
	/**
	 * 公司工艺超标统计
	 * @param dto 扩展参数类
	 * @return
	 */
	List<ModelDto> getCompanyOverproof(WeldDto dto,BigInteger parent,String insftype);
	
	/**
	 * 获取当前所包含的项目
	 * @param parent 上级项目id
	 * @return
	 */
	List<LiveData> getAllInsf(BigInteger parent,int type);
	List<LiveData> getAllInsf(Page page,BigInteger parent,int type);
	
	/**
	 * 获取当前跨度所包含的时间
	 * @param dto 扩展参数类
	 * @return
	 */
	List<ModelDto> getAllTime(Page page,WeldDto dto);
	
	/**
	 * 获取公司超时待机统计
	 * @param dto 扩展参数类
	 * @param num 超时点
	 * @return
	 */
	List<ModelDto> getcompanyOvertime(WeldDto dto , String num,BigInteger parent,String insftype);
	
	/**
	 * 焊口焊接工时
	 * @param dto扩展参数类
	 * @return
	 */
	List<ModelDto> getJunctionHous(Page page,WeldDto dto);

	/**
	 * 公司负荷率
	 * @param dto扩展参数类
	 * @return
	 */
	List<ModelDto> getCompanyLoads(WeldDto dto,BigInteger parent,String insftype);
	
	/**
	 * 获取所有焊机
	 * @param parent 项目id
	 * @param dto扩展参数类
	 * @return
	 */
	List<LiveData> getMachine(BigInteger parent);
	
	/**
	 * 获取公司空载率
	 * @param dto 扩展参数类
	 * @return
	 */
	List<ModelDto> getCompanyNoLoads(WeldDto dto,BigInteger parent,String insftype);

	/**
	 * 公司闲置率
	 * @param dto 扩展参数类
	 * @return
	 */
	List<ModelDto> getCompanyIdle(WeldDto dto,BigInteger parent);
	
	/**
	 * 获取项目所有焊机数量
	 * @param id 项目id
	 * @return
	 */
	int getMachineCount(BigInteger id);
	
	/**
	 * 公司单台设备运行数据统计
	 * @param dto 扩展参数类
	 * @param parent 上级id
	 * @return
	 */
	List<ModelDto> getCompanyUse(Page page,WeldDto dto,BigInteger parent);
	
	/**
	 * 公司工效
	 * @param page 分页
	 * @param parent 父id
	 * @param dto 扩展参数类
	 * @return
	 */
	List<ModelDto> companyEfficiency(Page page ,BigInteger parent,WeldDto dto,String insftype);
	
	/**
	 * 获取焊机id总达因值
	 * @param str 拼接的焊机id条件
	 * @return
	 */
	BigInteger getDyneByJunctionno(String str);
	
	/**
	 * 获取集团层子级
	 * @return
	 */
	List<LiveData> getBlocChildren();

	/**
	 * 获取工效最大值最小值以及平均跨度
	 */
	List<ModelDto> getEfficiencyChartNum(WeldDto dto,BigInteger parent);
	
	/**
	 * 获取工效图表数据
	 */
	List<ModelDto> getEfficiencyChart(WeldDto dto,BigInteger parent,int minnum,int avgnum);
	
	/**
	 * 查询实时数据集团焊机数量
	 * @param dto 扩张参数类
	 * @param parent 事业部id
	 * @return
	 */
	List<ModelDto> getBlocMachineCount(WeldDto dto,BigInteger parent);
	
	/**
	 * 查询实时数据公司焊机数量
	 * @param dto 扩张参数类
	 * @param parent 公司id
	 * @return
	 */
	List<ModelDto> getLiveMachineCount(WeldDto dto,BigInteger parent,String insftype);
	
	/**
	 * 根据组织机构及时间点获取工作总时长
	 * @param parent 组织机构id
	 * @param time 时间点
	 * @param mid 焊机id
	 * @return
	 */
	BigInteger getCountByTime(BigInteger parent,String time,BigInteger mid);
	
	/**
	 * 获取焊机排行前10（最高，最低）
	 * @param dto
	 * @return
	 */
	List<ModelDto> getWeldingmachineList(WeldDto dto);
	

	/**
	 * 获取焊工排行前10（最高，最低）
	 * @param dto
	 * @return
	 */
	List<ModelDto> getWelderList(WeldDto dto);
	
	/**
	 * 获取用户id
	 * @return
	 */
	BigInteger getUserId(HttpServletRequest request);

	/**
	 * 获取所有时间
	 * @param dto
	 * @return
	 */
	List<ModelDto> getAllTimes(WeldDto dto);

	/**
	 * 根据id获取焊口信息
	 * @param id
	 * @return
	 */
	WeldedJunction getWeldedJunctionById(BigInteger id);
	
}

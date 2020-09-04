package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.model.LiveData;

import tk.mybatis.mapper.common.Mapper;

public interface LiveDataMapper extends Mapper<LiveData>{
	
	List<ModelDto> getCompanyhour(@Param("dto") WeldDto dto,@Param("parent") BigInteger parent,@Param("insftype")String insftype);

	List<ModelDto> getHousClassify(@Param("parent")BigInteger parent,@Param("str")String str);
	
	List<ModelDto> getCompanyOverproof(@Param("dto") WeldDto dto,@Param("parent") BigInteger parent,@Param("insftype")String insftype);
	
	List<ModelDto> getAllTime(@Param("dto") WeldDto dto);
	
	List<LiveData> getAllInsf(@Param("parent") BigInteger parent,@Param("type") int type);
	
	List<ModelDto> getcompanyOvertime(@Param("dto") WeldDto dto,@Param("num") String num,@Param("parent") BigInteger parent,@Param("insftype")String insftype);
	
	List<ModelDto> getJunctionHous(@Param("dto") WeldDto dto);
	
	List<ModelDto> getCompanyLoads(@Param("dto")WeldDto dto,@Param("parent") BigInteger parent,@Param("insftype")String insftype);
	
	List<LiveData> getMachine(@Param("parent") BigInteger parent);
	
	List<ModelDto> getCompanyNoLoads(@Param("dto")WeldDto dto,@Param("parent") BigInteger parent,@Param("insftype")String insftype);
	
	List<ModelDto> getCompanyIdle(@Param("dto")WeldDto dto,@Param("parent") BigInteger parent);
	
	int getMachineCount(@Param("id") BigInteger id);
	
	List<ModelDto> getCompanyUse(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent);
	
	List<ModelDto> companyEfficiency(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent,@Param("insftype")String insftype);
	
	BigInteger getDyneByJunctionno(@Param("str") String str);
	
	List<LiveData> getBlocChildren();
	
	List<ModelDto> getEfficiencyChartNum(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent);
	
	List<ModelDto> getEfficiencyChart(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent,@Param("minnum")int minnum,@Param("avgnum")int avgnum);
	
	List<ModelDto> getBlocMachineCount(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent);
	
	List<ModelDto> getLiveMachineCount(@Param("dto")WeldDto dto,@Param("parent")BigInteger parent,@Param("insftype")String insftype);
	
	BigInteger getCountByTime(@Param("parent")BigInteger parent,@Param("time")String time,@Param("mid")BigInteger mid);
	
	List<ModelDto> getWeldingmachineList(@Param("dto")WeldDto dto);

	List<ModelDto> getWelderList(@Param("dto")WeldDto dto);
}

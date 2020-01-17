package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.dto.WeldDto;
import com.spring.model.Report;

public interface ReportMapper {
	BigInteger getWpsid(BigInteger machid);
	Report getWps(BigInteger wpsid);
	Report getSyspara();
	List<Report> findAllWelder(@Param("dto") WeldDto dto,@Param("itemid") BigInteger itemid);
	List<Report> getAndroidData(@Param("dto") WeldDto dto);
	List<Report> findMachine(String weldid);
	long getWeldingTime(@Param("dto") WeldDto dto,@Param("machid") BigInteger machid,@Param("weldid") String weldid);
	long getOnTime(@Param("dto") WeldDto dto,@Param("machid") BigInteger machid);
	long getRealEle(@Param("dto") WeldDto dto,@Param("machid") BigInteger machid);
	long getRealVol(@Param("dto") WeldDto dto,@Param("machid") BigInteger machid);
	long getHjTime(@Param("machid") BigInteger machid,@Param("time") String time);
	long getZxTime(@Param("machid") BigInteger machid,@Param("time") String time);
	String getFirstTime(@Param("machid") BigInteger machid,@Param("time") String time);
	List<Report> getAllPara(@Param("parent")BigInteger parent,@Param("str")String str,@Param("time") String time);
	List<Report> historyData(@Param("dto") WeldDto dto,@Param("fid") String fid,@Param("mach") BigInteger mach,@Param("welderid") String welderid);
}

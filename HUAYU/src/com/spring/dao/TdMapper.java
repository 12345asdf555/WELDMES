package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Td;

public interface TdMapper {
	List<Td> findAll(@Param("str")String str);
	List<Td> findAllpro(long ins);
	List<Td> findAllcom();
	List<Td> findAlldiv(long ins);
	List<Td> getAllPosition(@Param("parent")BigInteger parent);
	List<Td> getMachine(@Param("mach")BigInteger mach,@Param("parent")BigInteger parent);
	long findAllIns(long uid);
	long findInsid(String insname);
	String findweld(String weldid);
	String findInsname(long uid);
	String findPosition(String equip);
	List<Td> allWeldname(@Param("parent")BigInteger parent);
	List<Td> findMachine(String fposition);
	Td getLiveTime(@Param("time")String time,@Param("machineid")BigInteger machineid);
}
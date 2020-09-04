package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Wps;

public interface WpsMapper {
	List<Wps> findAll(@Param("parent")BigInteger parent,@Param("str")String str);
	List<Wps> findAllSpe(@Param("machine")BigInteger machine,@Param("chanel")BigInteger chanel);
	List<Wps> findSpe(@Param("machine")BigInteger machine,@Param("chanel")String chanel);
	List<Wps> AllSpe(@Param("machine")BigInteger machine,@Param("chanel")String chanel);
	List<Wps> findHistory(@Param("parent")BigInteger parent);
	void save(Wps wps);
	void give(Wps wps);
	BigInteger findByUid(long uid);
	void update(Wps wps);
	int getUsernameCount(@Param("fwpsnum")String fwpsnum);
	Wps findById(BigInteger fid);
	Wps findSpeById(BigInteger fid);
	void delete(BigInteger fid);
	String findIpById(BigInteger fid);
	void deleteHistory(BigInteger fid);
	int findCount(@Param("machine")BigInteger machine, @Param("chanel")String chanel);
	void saveSpe(Wps wps);
	void updateSpe(Wps wps);
	void saveSpc(Wps wps);
	void updateSpc(Wps wps);
	List<Wps> getFnsDetail(@Param("machine")BigInteger machine, @Param("chanel")String chanel);
	List<Wps> getFnsJobList(@Param("machine")BigInteger machine);
	List<Wps> findAllSperl(@Param("machine")BigInteger machine,@Param("chanel")BigInteger chanel);
	void saveSperl(Wps wps);
	void updateSperl(Wps wps);
	void addJob(Wps wps);
	void updateJob(Wps wps);
	void deleteJob(@Param("machine")String machine,@Param("chanel")String chanel);
	void saveOtcspc(Wps wps);
	void updateOtcspc(Wps wps);
	List<Wps> findOtcspc(@Param("machine")BigInteger machine,@Param("chanel")BigInteger chanel);
	List<Wps> findSperl(@Param("machine")BigInteger machine,@Param("chanel")String chanel);
}

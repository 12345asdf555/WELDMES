package com.spring.dao;

import java.math.BigInteger;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.model.Product;

public interface ProductMapper {
	List<Product> findAll(@Param("parent")BigInteger parent,@Param("str")String str);
	Product findById(BigInteger fid);
	void save(Product product);
	void update(Product product);
	void delete(BigInteger fid);
	List<Product> findAllWeldf(@Param("id")BigInteger id,@Param("parent")BigInteger parent,@Param("str")String str);
	Product findWeldfById(BigInteger fid);
	void saveWeldf(Product product);
	void updateWeldf(Product product);
	void deleteWeldf(BigInteger fid);
	List<Product> findAllProcess(@Param("id")BigInteger id,@Param("parent")BigInteger parent,@Param("str")String str);
	Product findProcessById(BigInteger fid);
	void saveProcess(Product product);
	void updateProcess(Product product);
	void deleteProcess(BigInteger fid);
	void deleteByWeld(BigInteger fid);
	void deleteByWp(BigInteger fid);
	void deleteByProduct(BigInteger fid);
	void deleteByProcess(BigInteger fid);
	BigInteger findWeldId();
	BigInteger findProcessId();
	void saveProwe(Product product);
	void saveWeldcess(Product product);
	
}

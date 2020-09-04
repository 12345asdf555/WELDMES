package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.model.Product;
import com.spring.page.Page;

public interface ProductService {
	List<Product> findAll(Page page, BigInteger parent,String str);
	Product findById(BigInteger fid);
	void save(Product product);
	void update(Product product);
	void delete(BigInteger fid);
	List<Product> findAllWeldf(BigInteger id,Page page, BigInteger parent,String str);
	Product findWeldfById(BigInteger fid);
	void saveWeldf(Product product);
	void updateWeldf(Product product);
	void deleteWeldf(BigInteger fid);
	List<Product> findAllProcess(BigInteger id,Page page, BigInteger parent,String str);
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

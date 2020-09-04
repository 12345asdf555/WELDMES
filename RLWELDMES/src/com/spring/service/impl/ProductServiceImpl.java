package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dao.ProductMapper;
import com.spring.model.Product;
import com.spring.page.Page;
import com.spring.service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Resource
	private ProductMapper mapper;
	
	@Override
	public List<Product> findAll(Page page, BigInteger parent, String str) {
		// TODO Auto-generated method stub
		return mapper.findAll(parent, str);
	}

	@Override
	public Product findById(BigInteger fid) {
		// TODO Auto-generated method stub
		return mapper.findById(fid);
	}

	@Override
	public void save(Product product) {
		// TODO Auto-generated method stub
		mapper.save(product);
	}

	@Override
	public void update(Product product) {
		// TODO Auto-generated method stub
		mapper.update(product);
	}

	@Override
	public void delete(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.delete(fid);
	}

	@Override
	public List<Product> findAllWeldf(BigInteger id,Page page, BigInteger parent, String str) {
		// TODO Auto-generated method stub
		return mapper.findAllWeldf(id,parent, str);
	}

	@Override
	public Product findWeldfById(BigInteger fid) {
		// TODO Auto-generated method stub
		return mapper.findWeldfById(fid);
	}

	@Override
	public void saveWeldf(Product product) {
		// TODO Auto-generated method stub
		mapper.saveWeldf(product);
	}

	@Override
	public void updateWeldf(Product product) {
		// TODO Auto-generated method stub
		mapper.updateWeldf(product);
	}

	@Override
	public void deleteWeldf(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteWeldf(fid);
	}

	public List<Product> findAllProcess(BigInteger id,Page page, BigInteger parent, String str) {
		// TODO Auto-generated method stub
		return mapper.findAllProcess(id,parent, str);
	}

	public Product findProcessById(BigInteger fid) {
		// TODO Auto-generated method stub
		return mapper.findProcessById(fid);
	}

	public void saveProcess(Product product) {
		// TODO Auto-generated method stub
		mapper.saveProcess(product);
	}

	public void updateProcess(Product product) {
		// TODO Auto-generated method stub
		mapper.updateProcess(product);
	}

	public void deleteProcess(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteProcess(fid);
	}

	public void deleteByWeld(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteByWeld(fid);
	}

	public void deleteByWp(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteByWp(fid);
	}

	public void deleteByProduct(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteByProduct(fid);
	}

	public void deleteByProcess(BigInteger fid) {
		// TODO Auto-generated method stub
		mapper.deleteByProcess(fid);
	}

	public BigInteger findWeldId() {
		// TODO Auto-generated method stub
		return mapper.findWeldId();
	}
	
	public BigInteger findProcessId() {
		// TODO Auto-generated method stub
		return mapper.findProcessId();
	}

	public void saveProwe(Product product) {
		// TODO Auto-generated method stub
		mapper.saveProwe(product);
	}

	public void saveWeldcess(Product product) {
		// TODO Auto-generated method stub
		mapper.saveWeldcess(product);
	}

}

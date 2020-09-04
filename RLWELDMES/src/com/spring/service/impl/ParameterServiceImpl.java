package com.spring.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dao.ParameterMapper;
import com.spring.model.Parameter;
import com.spring.service.ParameterService;

@Service
@Transactional  //此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class ParameterServiceImpl implements ParameterService{

	@Resource
	private ParameterMapper mapper;
	@Override
	public List<Parameter> getAllParameter() {
		// TODO Auto-generated method stub
		return mapper.getAllParameter();
	}
	@Override
	public boolean UpdateParameter(Parameter para) {
		// TODO Auto-generated method stub
		return mapper.UpdateParameter(para);
	}

}

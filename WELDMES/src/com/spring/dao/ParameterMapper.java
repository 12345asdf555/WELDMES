package com.spring.dao;

import java.util.List;

import com.spring.model.Parameter;

public interface ParameterMapper {
	List<Parameter> getAllParameter();
	boolean UpdateParameter(Parameter para);
}

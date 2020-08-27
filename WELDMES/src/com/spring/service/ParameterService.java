package com.spring.service;

import java.util.List;

import com.spring.model.Parameter;

public interface ParameterService {
	List<Parameter> getAllParameter();
	boolean UpdateParameter(Parameter para);
}

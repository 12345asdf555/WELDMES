package com.spring.controller;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.Parameter;
import com.spring.service.ParameterService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/pmt",produces = { "text/json;charset=UTF-8" })
public class ParameterController {
	@Autowired
	private ParameterService parameterService;
	
	@RequestMapping("/getParameterAll")
	@ResponseBody
	public String getParameter(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Parameter> findAll = parameterService.getAllParameter();
			for(Parameter pmt:findAll){
				json.put("id", pmt.getId());
				json.put("folt", pmt.getFolt());
				json.put("fvv", pmt.getFvv());
				json.put("fcn", pmt.getFcn());
				json.put("fst", pmt.getFst());
				json.put("fsft", pmt.getFsft());
				json.put("fct", pmt.getFct());
				json.put("fww", pmt.getFww());
				json.put("fafv", pmt.getFafv());
				json.put("fspeed", pmt.getFspeed());
				json.put("fwc", pmt.getFwc());
				json.put("fsp", pmt.getFsp());
				json.put("fds", pmt.getFds());
				json.put("fas", pmt.getFas());
				json.put("fns", pmt.getFns());
				ary.add(json);
			}
			obj.put("success",true);
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows",ary);
		return obj.toString();
	}
	@RequestMapping("/editParameter")
	@ResponseBody
	public String editParameter(HttpServletRequest request){
		Parameter para= new Parameter();
		JSONObject obj=new JSONObject();
		try{
			para.setId(new BigInteger(request.getParameter("id")));
			para.setFcn(request.getParameter("companyName"));
			para.setFvv(Integer.parseInt(request.getParameter("check")));
			para.setFst(request.getParameter("hour1")+":"+request.getParameter("minute1")+":"+request.getParameter("second1"));
			para.setFsft(request.getParameter("hour2")+":"+request.getParameter("minute2")+":"+request.getParameter("second2"));
			para.setFct(request.getParameter("hour3")+":"+request.getParameter("minute3")+":"+request.getParameter("second3"));
			para.setFolt(new BigInteger(request.getParameter("times")));
			para.setFww(request.getParameter("one")+","+request.getParameter("two")+","+request.getParameter("six")+","+request.getParameter("eight"));
			para.setFafv(request.getParameter("airflow"));
			para.setFspeed(request.getParameter("speed"));
			para.setFwc(request.getParameter("weld"));
			para.setFsp(request.getParameter("wait"));
			para.setFds(request.getParameter("day"));
			para.setFas(request.getParameter("after"));
			para.setFns(request.getParameter("night"));
			parameterService.UpdateParameter(para);
			obj.put("success",true);
		}catch(Exception e){
			obj.put("success",false);
			obj.put("errorMsg",e.getMessage());
		}
		return obj.toString();
	}
}
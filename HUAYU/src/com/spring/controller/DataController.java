package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.Data;
import com.spring.service.DataService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/data",produces = { "text/json;charset=UTF-8" })
public class DataController {
	@Autowired
	private DataService dataService;
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/AllData")
	public String AllUser(HttpServletRequest request){
		return "/data/allData";
	}
	@RequestMapping("/getAllData")
	@ResponseBody
	public String getAllUser(HttpServletRequest request){
		List<Data> findAll = dataService.findAll();
		request.setAttribute("dataList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Data data:findAll){
				json.put("electricity", data.getElectricity());
				json.put("voltage", data.getVoltage());
				json.put("sensor_Num", data.getSensor_Num());
				json.put("machine_id", data.getMachine_id());
				json.put("welder_id",data.getWelder_id());
				json.put("code", data.getCode());
				json.put("year", data.getYear());
				json.put("month", data.getMonth());
				json.put("day", data.getDay());
				json.put("hour", data.getHour());
				json.put("minute", data.getMinute());
				json.put("second", data.getSecond());
				json.put("status", data.getStatus());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
//		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
//		return "/allUser";
	}
}

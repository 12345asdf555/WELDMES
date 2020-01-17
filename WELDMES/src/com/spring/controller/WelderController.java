package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Welder;
import com.spring.page.Page;
import com.spring.service.WelderService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/welder", produces = { "text/json;charset=UTF-8" })
public class WelderController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private WelderService wm;
	IsnullUtil iutil = new IsnullUtil();
	
	@RequestMapping("/goWelder")
	public String goWelder(){
		return "welder/welder";
	}
	
	@RequestMapping("/getWelderList")
	@ResponseBody
	public String getWelderList(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		
		page = new Page(pageIndex,pageSize,total);
		List<Welder> list =wm.getWelderAll(page, search);
		long total = 0;
		
		if(list != null){
			PageInfo<Welder> pageinfo = new PageInfo<Welder>(list);
			total = pageinfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Welder we:list){
				json.put("id", we.getId());
				json.put("name", we.getName());
				json.put("welderno", we.getWelderno());
				json.put("itemname", we.getIname());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}

	@RequestMapping("/addWelder")
	@ResponseBody
	public String addWelder(@ModelAttribute("we")Welder we){
		JSONObject obj = new JSONObject();
		try{
			wm.addWelder(we);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
		
	}
	
	@RequestMapping("/editWelder")
	@ResponseBody
	public String editWelder(@ModelAttribute("we")Welder we){
		JSONObject obj = new JSONObject();
		try{
			wm.editWelder(we);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/removeWelder")
	@ResponseBody
	public String removeWelder(@ModelAttribute("we")Welder we){
		System.out.println(we.getId());
		JSONObject obj = new JSONObject();
		try{
			wm.removeWelder(we.getId());
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 校验焊工编号是否存在
	 * @param wno
	 * @return
	 */
	@RequestMapping("/wnoValidate")
	@ResponseBody
	public String wnoValidate(@RequestParam String wno){
		boolean flag = true;
		int count = wm.getWeldernoCount(wno);
		if(count > 0){
			flag = false;
		}
		return flag + "";
	}
}
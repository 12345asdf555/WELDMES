package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Dictionarys;
import com.spring.model.Resources;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.ResourceService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/resource",produces = { "text/json;charset=UTF-8" })
public class ResourceController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	@Autowired
	private ResourceService resourceService;

	@Autowired
	private DictionaryService dm;
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/AllResource")
	public String AllResource(HttpServletRequest request){
		return "resource/allResource";
	}
	@RequestMapping("/getAllResource")
	@ResponseBody
	public String getAllResource(HttpServletRequest request){
		
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		
		page = new Page(pageIndex,pageSize,total);
		List<Resources> findAll = resourceService.findAll(page,search);
		long total = 0;
		if(findAll != null){
			PageInfo<Resources> pageinfo = new PageInfo<Resources>(findAll);
			total = pageinfo.getTotal();
		}
		
		request.setAttribute("resourceList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Resources resource:findAll){
				json.put("id", resource.getId());
				json.put("resourceName", resource.getResourceName());
				json.put("resourceType", resource.getResourceType());
				json.put("resourceAddress", resource.getResourceAddress());
				json.put("resourceDesc",resource.getResourceDesc());
				json.put("status", resource.getStatusname());
				json.put("statusid", resource.getStatus());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 添加用户并重定向
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/addResource")
	@ResponseBody
	public String addResource(Resources resource,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
			resource.setStatus(Integer.parseInt(request.getParameter("status")));
			resourceService.save(resource);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 *编辑用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateResource")
	@ResponseBody
	public String updateResource(Resources resource,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		resource.setStatus(Integer.parseInt(request.getParameter("status")));
		try{
			resourceService.update(resource);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	/**
	 * 删除用户
	 * @param id
	 * @param request
	 * @param response
	 * @return 
	 */
	@RequestMapping("/delResource")
	@ResponseBody
	public String delResource(@RequestParam int id){

			JSONObject obj = new JSONObject();
			try{
				Resources resource = resourceService.findById(new Integer(id));
				resourceService.delete(new Integer(resource.getId()));
				 obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	@RequestMapping("/resourcenamevalidate")
	@ResponseBody
	private String resourcenamevalidate(@RequestParam String resourceName){
		boolean data = true;
		int count = resourceService.getResourcenameCount(resourceName);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	@RequestMapping("/getStatusAll")
	@ResponseBody
	public String getStatusAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(6);
			for(Dictionarys d:dictionary){
				json.put("id", d.getValue());
				json.put("name", d.getValueName());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
}
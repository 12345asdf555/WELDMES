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
import com.spring.page.Page;
import com.spring.service.DictionaryService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/Dictionary",produces = { "text/json;charset=UTF-8" })
public class DictonaryController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private DictionaryService dictionaryManager;
	
	@RequestMapping("/goDictionary")
	public String goDictionary(HttpServletRequest request){
		return "Dictionary/DictionaryList";
	}
	
	@RequestMapping("/goAddDictionary")
	public String goAddDictionary(HttpServletRequest request){
		return "Dictionary/addDictionary";
	}
	
	@RequestMapping("/goParameter")
	public String goParameter(HttpServletRequest request){
		return "system/parameter";
	}
	
	@RequestMapping("/goEditDictionary")
	public String goEditDictionary(HttpServletRequest request){
		int id=Integer.parseInt(request.getParameter("id"));
		Dictionarys dic=dictionaryManager.getDictionaryByFid(id);
		request.setAttribute("Dictionary",dic);
		return "Dictionary/editDictionary";
	}
	
	@RequestMapping("/goRemoveDictionary")
	public String goRemoveDictionary(@RequestParam int id,HttpServletRequest request){
		Dictionarys dic=dictionaryManager.getDictionaryByFid(id);
		request.setAttribute("Dictionary",dic);
		return "Dictionary/RemoveDictionary";
	}
	
	@RequestMapping("/getDictionaryAll")
	@ResponseBody
	public String getDictionaryAll(HttpServletRequest request){
		pageIndex=Integer.parseInt(request.getParameter("page"));
		pageSize=Integer.parseInt(request.getParameter("rows"));
		String search=request.getParameter("searchStr");
		
		
		request.getSession().setAttribute("searchStr", search);
		page=new Page(pageIndex,pageSize,total);
		
		List<Dictionarys> list=dictionaryManager.getAllDictionary(page, search);
		
		long total=0;
		if(list!=null){
			PageInfo<Dictionarys> pageInfo=new PageInfo<Dictionarys>(list);
			total=pageInfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		
		try{
			for(Dictionarys d:list){
				json.put("id",d.getId());
				json.put("typeid",d.getTypeid());
				json.put("value", d.getValue());
				json.put("valueName", d.getValueName());
				json.put("desc", d.getBack());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows",ary);
		return obj.toString();
	}
	
	@RequestMapping("/addDictionary")
	@ResponseBody
	public String AddDictionary(Dictionarys dic, HttpServletRequest request){
		JSONObject obj=new JSONObject();
		try{
			String backs=request.getParameter("back");
			dic.setBack(backs);
			dictionaryManager.addDictionary(dic);
			obj.put("success",true);
		}catch(Exception e){
			obj.put("success",false);
			obj.put("errorMsg",e.getMessage());
		}
		return obj.toString();
	}
	@RequestMapping("/editDictionary")
	@ResponseBody
	public String EditDictionary(Dictionarys dic,HttpServletRequest request){
		JSONObject obj=new JSONObject();
		try{
			String backs=request.getParameter("back");
			dic.setBack(backs);
			dictionaryManager.editDictionary(dic);
			obj.put("success",true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success",false);
			obj.put("errorMsg",e.getMessage());
		}
		return obj.toString();
	}
	@RequestMapping("/deleteDictionary")
	@ResponseBody
	public String DeleteDictionary(@RequestParam int id){
		JSONObject obj=new JSONObject();
		try{
			dictionaryManager.deleteDictionary(id);
			obj.put("success",true);
		}catch(Exception e){
			obj.put("success",false);
			obj.put("errorMsg",e.getMessage());
		}
		return obj.toString();
	}
	

	@RequestMapping("/getDictionaryType")
	@ResponseBody
	public String getDictionaryType(){
		JSONObject obj=new JSONObject();
		JSONObject json=new JSONObject();
		JSONArray ary=new JSONArray();
		try{
			List<Dictionarys> list = dictionaryManager.getDictionaryType();
			for(Dictionarys d:list){
				json.put("id", d.getTypeid());
				json.put("name", d.getBack());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
}
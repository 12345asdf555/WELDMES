package com.spring.controller;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Gather;
import com.spring.model.MyUser;
import com.spring.page.Page;
import com.spring.service.GatherService;
import com.spring.service.InsframeworkService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/gather", produces = { "text/json;charset=UTF-8" })
public class GatherController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private GatherService gm;
	@Autowired
	private InsframeworkService insm;
	
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 跳转采集页面
	 * @return
	 */
	@RequestMapping("/goGather")
	public String goGather(){
		return "gather/gather";
	}
	
	@RequestMapping("/getGatherList")
	@ResponseBody
	public String getGatherList(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String parentid = request.getParameter("parent");
		request.getSession().setAttribute("searchStr", searchStr);
		BigInteger parent = null;
		if(iutil.isNull(parentid)){
			parent = new BigInteger(parentid);
		}else{
			parent = insm.getUserInsframework();
		}
		page = new Page(pageIndex,pageSize,total);
		
		List<Gather> list = gm.getGatherPageAll(page, searchStr, parent);
		long total = 0;
		
		if(list != null){
			PageInfo<Gather> pageinfo = new PageInfo<Gather>(list);
			total = pageinfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Gather g:list){
				json.put("id", g.getId());
				json.put("gatherNo", g.getGatherNo());
				json.put("itemid",g.getItemid());
				json.put("itemname",g.getItemname());
				json.put("status",g.getStatus());
				json.put("protocol", g.getProtocol());
				json.put("ipurl", g.getIpurl());
				json.put("macurl", g.getMacurl());
				json.put("leavetime", g.getLeavetime());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/addGather")
	@ResponseBody
	public String addGather(@ModelAttribute("gether")Gather gather){
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			gather.setCreater(new BigInteger(user.getId()+""));
			//ModelAttribute收集的数据为‘’时插入会有异常
			if(!iutil.isNull(gather.getIpurl())){
				gather.setIpurl(null);
			}
			if(!iutil.isNull(gather.getMacurl())){
				gather.setMacurl(null);
			}
			if(!iutil.isNull(gather.getLeavetime())){
				gather.setLeavetime(null);
			}
			gather.setGatherNo(gather.getGatherNo());
			gm.addGather(gather);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
		
	}
	
	@RequestMapping("/editGather")
	@ResponseBody
	public String editGather(@ModelAttribute("gether")Gather gather, @RequestParam String id){
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			gather.setUpdater(new BigInteger(user.getId()+""));
			//ModelAttribute收集的数据为‘’时插入会有异常
			if(!iutil.isNull(gather.getIpurl())){
				gather.setIpurl(null);
			}
			if(!iutil.isNull(gather.getMacurl())){
				gather.setMacurl(null);
			}

			if(!iutil.isNull(gather.getLeavetime())){
				gather.setLeavetime(null);
			}
			gather.setGatherNo(gather.getGatherNo());
			gm.editGather(gather);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/removeGather")
	@ResponseBody
	public String removeGather(@RequestParam String id){
		JSONObject obj = new JSONObject();
		try{
			gm.deleteGather(new BigInteger(id));
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 校验采集编号是否存在
	 * @param name
	 * @return
	 */
	@RequestMapping("/gathernoValidate")
	@ResponseBody
	public String gathernoValidate(HttpServletRequest request,@RequestParam String gatherno){
		boolean flag = true;
		String itemid = request.getParameter("itemid");
		BigInteger item = null;
		if(iutil.isNull(itemid)){
			item = new BigInteger(itemid);
		}
		int count = gm.getGatherNoCount(gatherno,item);
		if(count > 0){
			flag = false;
		}
		return flag + "";
	}
}

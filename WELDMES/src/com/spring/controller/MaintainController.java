package com.spring.controller;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Dictionarys;
import com.spring.model.MaintenanceRecord;
import com.spring.model.WeldingMachine;
import com.spring.model.WeldingMaintenance;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.MaintainService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/maintain", produces = { "text/json;charset=UTF-8" })
public class MaintainController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;

	@Autowired
	private MaintainService mm;
	@Autowired
	private InsframeworkService im;
	IsnullUtil iutil = new IsnullUtil();

	@Autowired
	private DictionaryService dm;
	/**
	 * 跳转维修记录页面
	 * @return
	 */
	@RequestMapping("/goMaintain")
	public String goWeldingMahine(){
		return "maintain/maintain";
	}
	
	/**
	 * 显示维修列表
	 * @return
	 */
	@RequestMapping("/getMaintainList")
	@ResponseBody
	public String getWeldingMachine(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String weldingmachineId = request.getParameter("wid");
		String searchStr = request.getParameter("searchStr");
		request.getSession().setAttribute("searchStr", searchStr);
		BigInteger wid = null;
		BigInteger parent = im.getUserInsframework();
		if(iutil.isNull(weldingmachineId)){
			wid = new BigInteger(weldingmachineId);
		}		
		page = new Page(pageIndex,pageSize,total);
		
		List<WeldingMaintenance> list = mm.getWeldingMaintenanceAllPage(page,parent,wid,searchStr);
		long total = 0;
		
		if(list != null){
			PageInfo<WeldingMaintenance> pageinfo = new PageInfo<WeldingMaintenance>(list);
			total = pageinfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(WeldingMaintenance wm:list){
				json.put("id", wm.getId());
				json.put("equipmentNo", wm.getWelding().getEquipmentNo());
				json.put("wid", wm.getWelding().getId());
				json.put("mid", wm.getMaintenance().getId());
				json.put("viceman", wm.getMaintenance().getViceman());
				json.put("starttime",wm.getMaintenance().getStartTime());
				json.put("endtime", wm.getMaintenance().getEndTime());
				json.put("typeid", wm.getMaintenance().getTypeId());
				json.put("typename", wm.getMaintenance().getTypename());
				json.put("desc", wm.getMaintenance().getDesc());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getComboboxValue")
	@ResponseBody
	public String getComboboxValue(){
		JSONObject json = new JSONObject();
		JSONArray ary1 = new JSONArray();
		JSONArray ary2 = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<WeldingMachine> list1 = mm.getEquipmentno(im.getUserInsframework());
			for(WeldingMachine wm:list1){
				json.put("equipmentNo", wm.getEquipmentNo());
				json.put("mid", wm.getId());
				ary1.add(json);
			}
			List<Dictionarys> dictionary = dm.getDictionaryValue(5);
			for(Dictionarys d:dictionary){
				json.put("typeid", d.getValue());
				json.put("typename", d.getValueName());
				ary2.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("ary1", ary1);
		obj.put("ary2", ary2);
		return obj.toString();
	}
	
	@RequestMapping("/addMaintain")
	@ResponseBody
	public String addMaintain(HttpServletRequest request,@ModelAttribute("wm")WeldingMaintenance wm) {
		JSONObject obj = new JSONObject();
		try{
			MaintenanceRecord mr = new MaintenanceRecord();
			mr.setViceman(request.getParameter("viceman"));
			if(iutil.isNull(request.getParameter("starttime"))){
				mr.setStartTime(request.getParameter("starttime"));
			}
			if(iutil.isNull(request.getParameter("endtime"))){
				mr.setEndTime(request.getParameter("endtime"));
			}
			if(iutil.isNull(request.getParameter("desc"))){
				mr.setDesc(request.getParameter("desc"));
			}
			mr.setTypeId(Integer.parseInt(request.getParameter("tId")));
			wm.setMaintenance(mr);
			WeldingMachine w = new WeldingMachine();
			w.setId(new BigInteger(request.getParameter("wId")));
			wm.setWelding(w);
			mm.addMaintian(wm,mr,new BigInteger(request.getParameter("wId")));
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/editMaintain")
	@ResponseBody
	public String editMaintain(HttpServletRequest request,@RequestParam String mid,@RequestParam String wId) {
		JSONObject obj = new JSONObject();
		try{
			MaintenanceRecord mr = new MaintenanceRecord();
			mr.setId(new BigInteger(mid));
			mr.setViceman(request.getParameter("viceman"));
			if(iutil.isNull(request.getParameter("starttime"))){
				mr.setStartTime(request.getParameter("starttime"));
			}
			if(iutil.isNull(request.getParameter("endtime"))){
				mr.setEndTime(request.getParameter("endtime"));
			}else{
				mm.editstatus(new BigInteger(wId), 33);
			}
			if(iutil.isNull(request.getParameter("desc"))){
				mr.setDesc(request.getParameter("desc"));
			}
			mr.setTypeId(Integer.parseInt(request.getParameter("tId")));
			mm.updateMaintenanceRecord(mr);
			List<WeldingMaintenance> list =  mm.getEndtime(new BigInteger(wId));
			boolean flag = true;
			for(WeldingMaintenance wm : list){
				if(!iutil.isNull(wm.getMaintenance().getEndTime())){
					flag = false;
				}
			}
			if(flag){
				mm.editstatus(new BigInteger(wId), 31);
			}
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 完成维修
	 * @param wid
	 * @return
	 */
	@RequestMapping("/updateEndtime")
	@ResponseBody
	public String updateEndtime(@RequestParam String wid,@RequestParam String weldingid){
		JSONObject obj = new JSONObject();
		try{
			mm.updateEndtime(new BigInteger(wid));
			List<WeldingMaintenance> list =  mm.getEndtime(new BigInteger(weldingid));
			boolean flag = true;
			for(WeldingMaintenance wm : list){
				if(!iutil.isNull(wm.getMaintenance().getEndTime())){
					flag = false;
				}
			}
			if(flag){
				mm.editstatus(new BigInteger(weldingid), 31);
			}
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/removeMaintain")
	@ResponseBody
	public String removeMaintain(@RequestParam String wid){
		JSONObject obj = new JSONObject();
		try{
			WeldingMaintenance wm = mm.getWeldingMaintenanceById(new BigInteger(wid));
			mm.deleteMaintenanceRecord(wm.getMaintenance().getId());
			mm.deleteWeldingMaintenance(wm.getId());
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
}

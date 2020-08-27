package com.spring.controller;

import java.math.BigInteger;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.DataStatistics;
import com.spring.model.Dictionarys;
import com.spring.model.Gather;
import com.spring.model.Insframework;
import com.spring.model.MyUser;
import com.spring.model.WeldingMachine;
import com.spring.model.WeldingMaintenance;
import com.spring.page.Page;
import com.spring.service.DataStatisticsService;
import com.spring.service.DictionaryService;
import com.spring.service.GatherService;
import com.spring.service.InsframeworkService;
import com.spring.service.MaintainService;
import com.spring.service.WeldingMachineService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/weldingMachine", produces = { "text/json;charset=UTF-8" })
public class WeldingMachineController {
	public java.sql.Statement stmt =null;
	public java.sql.Connection conn = null;
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private WeldingMachineService wmm;
	
	@Autowired
	private MaintainService maintain;
	
	@Autowired
	private InsframeworkService im;
	
	@Autowired
	private GatherService gm;
	
	@Autowired
	private DictionaryService dm;
	
	@Autowired
	private DataStatisticsService dss;
	
	
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 焊机设备管理
	 * @return
	 */
	@RequestMapping("/goWeldingMachine")
	public String goWeldingMahine(){
		return "weldingMachine/weldingmachine";
	}
	
	/**
	 * CAT厂商焊机管理
	 * @return
	 */
	@RequestMapping("/gomathine")
	public String gomathine(){
		return "Mathine/Mathine";
	}
	
	/**
	 * cat焊机设备管理
	 * @return
	 */
	@RequestMapping("/gocatMachine")
	public String gocatMachine(){
		return "catmachine/catmachine";
	}
	
	/**
	 * 维修记录
	 * @param request
	 * @param wid
	 * @return
	 */
	@RequestMapping("/goMaintain")
	public String goMaintain(HttpServletRequest request, @RequestParam String wid){
		WeldingMachine weld = wmm.getWeldingMachineById(new BigInteger(wid));
		if(weld.getIsnetworking()==0){
			request.setAttribute("isnetworking", "是");
		}else{
			request.setAttribute("isnetworking", "否");
		}
		request.setAttribute("w", weld);
		return "maintain/weldingmaintenance";
	}
	
	/**
	 * 焊机规范管理
	 */
	@RequestMapping("/goSpecify")
	public String goSpecify(){
		return "specification/specification";
	}
	/**
	 * 显示焊机列表
	 * @return
	 */
	@RequestMapping("/getWedlingMachineList")
	@ResponseBody
	public String getWeldingMachine(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = im.getUserInsframework();
		}
		request.getSession().setAttribute("searchStr", searchStr);
		page = new Page(pageIndex,pageSize,total);
		List<WeldingMachine> list = wmm.getWeldingMachineAll(page,parent,searchStr);
		long total = 0;
		
		if(list != null){
			PageInfo<WeldingMachine> pageinfo = new PageInfo<WeldingMachine>(list);
			total = pageinfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(WeldingMachine wm:list){
				json.put("id", wm.getId());
				json.put("ip", wm.getIp());
				json.put("equipmentNo", wm.getEquipmentNo());
				json.put("position", wm.getPosition());
				json.put("gatherId", wm.getGatherId());
				if(wm.getIsnetworking()==0){
					json.put("isnetworking", "是");
				}else{
					json.put("isnetworking", "否");
				}
				json.put("isnetworkingId", wm.getIsnetworking());
				json.put("joinTime", wm.getJoinTime());
				json.put("typeName",wm.getTypename());
				json.put("typeId", wm.getTypeId());
				json.put("statusName", wm.getStatusname());
				json.put("statusId", wm.getStatusId());
				json.put("manufacturerName", wm.getMvaluename());
				json.put("manuno", wm.getMvalueid());
				json.put("manufacturerNo", wm.getFmanunumbers());
				json.put("action", wm.getFsection());
				json.put("nextTime", wm.getFtest());
				json.put("inspectTime", wm.getFauthentication());
				json.put("maintainTime", wm.getFprevention());
				if( wm.getInsframeworkId()!=null && !"".equals(wm.getInsframeworkId())){
					json.put("insframeworkName", wm.getInsframeworkId().getName());
					json.put("iId", wm.getInsframeworkId().getId());
				}
				if(wm.getModel()!=null && !("").equals(wm.getModelname())){
					json.put("model",wm.getModel());
					json.put("modelname",wm.getModelname());
				}else{
					json.put("model",null);
					json.put("modelname",null);
				}
				if(wm.getGatherId()!=null && !("").equals(wm.getGatherId())){
					json.put("gatherId", wm.getGatherId().getGatherNo());
					json.put("gid", wm.getGatherId().getId());
				}else{
					json.put("gatherId", null);
					json.put("gid", null);
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	/**
	 * 获取焊机及其对应的采集模块
	 * @return
	 */
	@RequestMapping("/getMachineGather")
	@ResponseBody
	public String getMachineGather(HttpServletRequest request){
		List<WeldingMachine> list = wmm.getMachineGather();
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(WeldingMachine wm:list){
				json.put("id", wm.getId());
				json.put("gatherId", wm.getGatherId());
				if(wm.getGatherId()!=null && !("").equals(wm.getGatherId())){
					json.put("gatherId", wm.getGatherId().getGatherNo());
					json.put("gid", wm.getGatherId().getId());
				}else{
					json.put("gatherId", null);
					json.put("gid", null);
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 获取设备类型
	 * @return
	 */
	@RequestMapping("/getTypeAll")
	@ResponseBody
	public String getTypeAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(4);
			for(Dictionarys d:dictionary){
				json.put("id", d.getValue());
				json.put("name", d.getValueName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 获取项目类型
	 * @return
	 */
	@RequestMapping("/getInsframeworkAll")
	@ResponseBody
	public String getInsframeworkAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			//数据权限处理
			BigInteger parent = im.getUserInsframework();
//			List<Insframework> list = im.getInsAll(0,parent);
			List<DataStatistics> list = dss.getAllInsframe(parent);
			for(DataStatistics i:list){
				json.put("id", i.getId());
				json.put("name", i.getName());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 获取采集编号
	 * @return
	 */
	@RequestMapping("/getGatherAll")
	@ResponseBody
	public String getGatherAll(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String itemid = request.getParameter("itemid");
		BigInteger item = null;
		if(iutil.isNull(itemid)){
			item = new BigInteger(itemid);
		}
		try{
			List<Gather> list = gm.getGatherByInsfid(item);
			for(Gather g:list){
				json.put("id", g.getId());
				json.put("name", g.getGatherNo());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 获取焊机状态
	 * @return
	 */
	@RequestMapping("/getStatusAll")
	@ResponseBody
	public String getStatusAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(3);
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
	
	/**
	 * 获取厂商
	 * @return
	 */
	@RequestMapping("/getManuAll")
	@ResponseBody
	public String getManuAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(14);
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
	
	/**
	 * 获取设备厂商下的焊机型号
	 * @return
	 */
	@RequestMapping("/getModelAll")
	@ResponseBody
	public String getModelAll(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			String str = request.getParameter("str");
			if(str!=null&&!("").equals(str)){
				int num = Integer.valueOf(request.getParameter("str"));
				List<Dictionarys> dictionary = dm.getModelOfManu(num);
				for(Dictionarys d:dictionary){
					json.put("id", d.getId());
					json.put("name", d.getValueName());
					ary.add(json);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 获取设备型号
	 * @return
	 */
	@RequestMapping("/getcatModelAll")
	@ResponseBody
	public String getcatModelAll(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			int type = 0;
			String typeid = request.getParameter("type");
			if(iutil.isNull(typeid)){
				type = Integer.parseInt(typeid);
			}
			List<WeldingMachine> list = wmm.getcatMachineModel(type); 
			for(int i=0;i<list.size();i++){
				json.put("id", list.get(i).getTypeId());
				json.put("name", list.get(i).getTypename());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 获取所有焊机及其型号
	 * @return
	 */
	@RequestMapping("/getMachineModelAll")
	@ResponseBody
	public String getMachineModelAll(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<WeldingMachine> mml = wmm.getMachineModel();
			for(WeldingMachine wm:mml){
				json.put("id", wm.getId());
				json.put("equip", wm.getEquipmentNo());
				json.put("model", wm.getModel());
				json.put("modelname", wm.getModelname());
				json.put("manuid", wm.getMvalueid());
				json.put("manuname", wm.getMvaluename());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 新增
	 * @return
	 */
	@RequestMapping("/addWeldingMachine")
	@ResponseBody
	public String addWeldingMachine(HttpServletRequest request){
		WeldingMachine wm = new WeldingMachine();
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			wm.setCreater(new BigInteger(user.getId()+""));
			wm.setIp(request.getParameter("ip"));
			wm.setModel(request.getParameter("model"));
			System.out.println(request.getParameter("equipmentNo"));
			wm.setEquipmentNo(request.getParameter("equipmentNo"));
			if(iutil.isNull(request.getParameter("joinTime"))){
				wm.setJoinTime(request.getParameter("joinTime"));
			}
			if(iutil.isNull(request.getParameter("position"))){
				wm.setPosition(request.getParameter("position"));
			}
			if(iutil.isNull(request.getParameter("gatherId"))){
				Gather g = new Gather();
				g.setId(new BigInteger(request.getParameter("gatherId")));
				wm.setGatherId(g);
			}
			wm.setIsnetworking(Integer.parseInt(request.getParameter("isnetworkingId")));
			wm.setTypeId(Integer.parseInt(request.getParameter("tId")));
			Insframework ins = new Insframework();
			ins.setId(new BigInteger(request.getParameter("iId")));
			wm.setInsframeworkId(ins);
			wm.setStatusId(Integer.parseInt(request.getParameter("sId")));
			wm.setMvalueid(Integer.parseInt(request.getParameter("manuno")));
			wmm.addWeldingMachine(wm);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 修改
	 * @return
	 */
	@RequestMapping("/editWeldingMachine")
	@ResponseBody
	public String editWeldingMachine(HttpServletRequest request){
		WeldingMachine wm = new WeldingMachine();
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			wm.setUpdater(new BigInteger(user.getId()+""));
			wm.setId(new BigInteger(request.getParameter("wid")));
			wm.setEquipmentNo(request.getParameter("equipmentNo"));
			if(iutil.isNull(request.getParameter("joinTime"))){
				wm.setJoinTime(request.getParameter("joinTime"));
			}
			if(iutil.isNull(request.getParameter("position"))){
				wm.setPosition(request.getParameter("position"));
			}
			if(iutil.isNull(request.getParameter("gatherId"))){
				Gather g = new Gather();
				g.setId(new BigInteger(request.getParameter("gatherId")));
				wm.setGatherId(g);
			}
			wm.setIsnetworking(Integer.parseInt(request.getParameter("isnetworkingId")));
			wm.setTypeId(Integer.parseInt(request.getParameter("tId")));
			Insframework ins = new Insframework();
			ins.setId(new BigInteger(request.getParameter("iId")));
			wm.setInsframeworkId(ins);
			wm.setStatusId(Integer.parseInt(request.getParameter("sId")));
			wm.setIp(request.getParameter("ip"));
			wm.setModel(request.getParameter("model"));
			//修改焊机状态为启用时，结束所有维修任务
			int sid = wm.getStatusId();
			if(sid == 31){
				List<WeldingMaintenance> list =  maintain.getEndtime(wm.getId());
				for(WeldingMaintenance w : list){
					if(w.getMaintenance().getEndTime()==null || w.getMaintenance().getEndTime()==""){
						maintain.updateEndtime(w.getId());
					}
				}
			}
			wm.setMvalueid(Integer.parseInt(request.getParameter("manuno")));
			wmm.editWeldingMachine(wm);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	/**
	 * 删除焊机设备
	 * @param wid
	 * @return
	 */
	@RequestMapping("/removeWeldingMachine")
	@ResponseBody
	private String removeWeldingMachine(@RequestParam String wid){
		JSONObject obj = new JSONObject();
		try{
			wmm.deleteWeldingChine(new BigInteger(wid));
			wmm.deleteHistory(new BigInteger(wid));
			List<WeldingMaintenance> list = maintain.getMaintainByWeldingMachinId(new BigInteger(wid));
			for(WeldingMaintenance wm : list){
				//删除维修记录
				maintain.deleteWeldingMaintenance(wm.getId());
				maintain.deleteMaintenanceRecord(wm.getMaintenance().getId());
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", true);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/findAllweldmachine")
	@ResponseBody
	public String getAllAuthority(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		WeldingMachine wm = new WeldingMachine();
		String temp=request.getParameter("bar");
		if(iutil.isNull(temp)){
			wm.setStatusId(Integer.parseInt(temp));
		}
		List<WeldingMachine> find = wmm.findlweldmachinetype(new BigInteger(wm.getStatusId()+""));
		List<WeldingMachine> list = wmm.findAllweldmachine();
		try{
			for(WeldingMachine w:list){
				json.put("id", w.getId());
				json.put("weldmachinetype", w.getTypename());
				json.put("machinevalue", w.getMvaluename());
				json.put("symble", 0);
				for(WeldingMachine ww:find){
					if(w.getMvaluename().equals(ww.getTypename())){
						json.put("symble", 1);
					}
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 修改厂商焊机绑定关系
	 * @return
	 */
	@RequestMapping("/getfactoryType")
	@ResponseBody
	public String getfactoryType(HttpServletRequest request){
		WeldingMachine wm = new WeldingMachine();
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			wm.setUpdater(new BigInteger(user.getId()+""));
			wm.setStatusId(Integer.parseInt(request.getParameter("back")));
			wm.setFmachingname("1");
			wmm.deletefactory(new BigInteger(wm.getStatusId()+""));
			String[] str = request.getParameter("str").split(",");
			for(int i=0;i<str.length;i++){
				wm.setTypeId(Integer.parseInt(str[i]));
				wmm.addfactoryType(wm);
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
	 * cat焊机新增
	 * @return
	 */
	@RequestMapping("/addcatmachine")
	@ResponseBody
	public String addcatmachine(HttpServletRequest request){
		WeldingMachine wm = new WeldingMachine();
		JSONObject obj = new JSONObject();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			wm.setCreater(new BigInteger(user.getId()+""));
			wm.setIp(request.getParameter("ip"));
			wm.setModel(request.getParameter("model"));
			System.out.println(request.getParameter("equipmentNo"));
			wm.setEquipmentNo(request.getParameter("equipmentNo"));
			if(iutil.isNull(request.getParameter("joinTime"))){
				wm.setJoinTime(request.getParameter("joinTime"));
			}
			if(iutil.isNull(request.getParameter("position"))){
				wm.setPosition(request.getParameter("position"));
			}
			if(iutil.isNull(request.getParameter("gatherId"))){
				Gather g = new Gather();
				g.setId(new BigInteger(request.getParameter("gatherId")));
				wm.setGatherId(g);
			}
			wm.setIsnetworking(Integer.parseInt(request.getParameter("isnetworkingId")));
			wm.setTypeId(Integer.parseInt(request.getParameter("tId")));
			Insframework ins = new Insframework();
			ins.setId(new BigInteger(request.getParameter("iId")));
			wm.setInsframeworkId(ins);
			wm.setStatusId(Integer.parseInt(request.getParameter("sId")));
			wm.setMvalueid(Integer.parseInt(request.getParameter("manuno")));
			wm.setFmanunumbers(request.getParameter("manufacturerNo"));
			wm.setFsection(request.getParameter("action"));
			
			String test = request.getParameter("nextTime");
			if(test!=null&&!"".equals(test)){
				wm.setFtest(request.getParameter("nextTime"));
			}
			//wm.setFprevention(request.getParameter("maintainTime"));
			String matime = request.getParameter("maintainTime");
			if(matime!=null&&!"".equals(matime)){
				wm.setFprevention(request.getParameter("maintainTime"));
			}
			String inspecttime = request.getParameter("inspectTime");
			if(inspecttime!=null&&!"".equals(inspecttime)){
				wm.setFauthentication(request.getParameter("inspectTime"));
			}
			//wm.setFauthentication(request.getParameter("inspectTime"));
			wmm.addcatmachine(wm);
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 获取设备组织机构
	 * @return
	 */
	@RequestMapping("/getWeldInsframework")
	@ResponseBody
	public String getWeldInsframework(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String parent = request.getParameter("machine_id");
		BigInteger machin_id = null;
		if(iutil.isNull(parent)){
			machin_id = new BigInteger(parent);
		}
		try{
			List<WeldingMachine> wm = wmm.getmachineins(machin_id);
			for(WeldingMachine w:wm){
				json.put("id", w.getId());
				json.put("name", w.getMvaluename());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * cat焊机修改
	 * @return
	 */
	@RequestMapping("/editcatmachine")
	@ResponseBody
	public String editcatmachine(HttpServletRequest request){
		WeldingMachine wm = new WeldingMachine();
		JSONObject obj = new JSONObject();
		try{
  			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			wm.setUpdater(new BigInteger(user.getId()+""));
			wm.setId(new BigInteger(request.getParameter("wid")));
			wm.setEquipmentNo(request.getParameter("equipmentNo"));
			if(iutil.isNull(request.getParameter("joinTime"))){
				wm.setJoinTime(request.getParameter("joinTime"));
			}
			if(iutil.isNull(request.getParameter("position"))){
				wm.setPosition(request.getParameter("position"));
			}
			if(iutil.isNull(request.getParameter("gatherId"))){
				Gather g = new Gather();
				g.setId(new BigInteger(request.getParameter("gatherId")));
				wm.setGatherId(g);
			}
			wm.setIsnetworking(Integer.parseInt(request.getParameter("isnetworkingId")));
			wm.setTypeId(Integer.parseInt(request.getParameter("tId")));
			Insframework ins = new Insframework();
			ins.setId(new BigInteger(request.getParameter("iId")));
			wm.setInsframeworkId(ins);
			wm.setStatusId(Integer.parseInt(request.getParameter("sId")));
			wm.setIp(request.getParameter("ip"));
			wm.setModel(request.getParameter("model"));
			//修改焊机状态为启用时，结束所有维修任务
			int sid = wm.getStatusId();
			if(sid == 31){
				List<WeldingMaintenance> list =  maintain.getEndtime(wm.getId());
				for(WeldingMaintenance w : list){
					if(w.getMaintenance().getEndTime()==null || w.getMaintenance().getEndTime()==""){
						maintain.updateEndtime(w.getId());
					}
				}
			}
			wm.setMvalueid(Integer.parseInt(request.getParameter("manuno")));
			wm.setFmanunumbers(request.getParameter("manufacturerNo"));
			wm.setFsection(request.getParameter("action"));
			String test = request.getParameter("nextTime");
			if(test!=null&&!"".equals(test)){
				wm.setFtest(request.getParameter("nextTime"));
			}
			//wm.setFprevention(request.getParameter("maintainTime"));
			String matime = request.getParameter("maintainTime");
			if(matime!=null&&!"".equals(matime)){
				wm.setFprevention(request.getParameter("maintainTime"));
			}
			String inspecttime = request.getParameter("inspectTime");
			if(inspecttime!=null&&!"".equals(inspecttime)){
				wm.setFauthentication(request.getParameter("inspectTime"));
			}
			//wm.setFauthentication(request.getParameter("inspectTime"));
			wmm.editcatmachine(wm);
			String symbol = request.getParameter("symbol");
			String equipmentno = request.getParameter("equipmentNo");
			String nextTime = request.getParameter("nextTime");
			if(Integer.valueOf(symbol)==1){
				//获取焊工以及管理员信息
				Class.forName("com.mysql.jdbc.Driver");  
	            conn = DriverManager.getConnection("jdbc:mysql://121.196.222.216:3306/XMWeld?user=db_admin&password=PIJXmcLRa0QgOw2c&useUnicode=true&autoReconnect=true&characterEncoding=UTF8");
	            stmt= conn.createStatement();
	            ArrayList<String> listarraymail = new ArrayList<String>();
				ArrayList<String> listarraymailer = new ArrayList<String>();
				//String sqlmachine = "SELECT tb_catweldmachine.fmachingnumber,tb_catweldinf.fcheckintime,tb_catweldinf.ficworkime FROM tb_catweldinf";
				String sqlmailer = "SELECT femailname,femailaddress,femailtype FROM tb_catemailinf";
				ResultSet rs;
				try {
					/*rs = stmt.executeQuery(sqlmachine);
	            	while (rs.next()) {
	            		listarraymail.add(rs.getString("fweldername"));
	            		listarraymail.add(rs.getString("fcheckintime"));
	            		listarraymail.add(rs.getString("ficworkime"));
	            	}*/
	            	rs = stmt.executeQuery(sqlmailer);
	            	while (rs.next()) {
	            		listarraymailer.add(rs.getString("femailname"));
	            		listarraymailer.add(rs.getString("femailaddress"));
	            		listarraymailer.add(rs.getString("femailtype"));
	            	}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				try{
					for(int j=0;j<listarraymailer.size();j+=3){
						if(listarraymailer.get(j+2).equals("3")){
							final Properties props = new Properties();
							final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
							props.setProperty("mail.smtp.socketFactory.fallback", "false");
						    //props.setProperty("mail.transport.protocol", "smtp");
						    //props.put("mail.smtp.auth", "true");
						    //props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
						    props.setProperty("mail.smtp.host","smtp.163.com"); //服务器地址
						    props.setProperty("mail.smtp.port", "465");
							props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
						    props.setProperty("mail.smtp.socketFactory.port", "465");
						    props.setProperty("mail.smtp.auth", "true");
							/*props.setProperty("mail.smtp.auth", "true");
						    props.setProperty("mail.transport.protocol", "smtp");
						    //props.put("mail.smtp.auth", "true");
						    props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
						    props.put("mail.smtp.port", "25");*/
						    
						    // 发件人的账号
					        props.put("mail.user", "jingsudongyu123@163.com");
					        // 访问SMTP服务时需要提供的密码
					        props.put("mail.password", "jsdy123456");
						    
						 // 构建授权信息，用于进行SMTP进行身份验证
					        Authenticator authenticator = new Authenticator() {
					            @Override
					            protected PasswordAuthentication getPasswordAuthentication() {
					                // 用户名、密码
					                String userName = props.getProperty("mail.user");
					                String password = props.getProperty("mail.password");
					                return new PasswordAuthentication(userName, password);
					            }
					        };
					        // 使用环境属性和授权信息，创建邮件会话
						    
					        Session session = Session.getInstance(props, authenticator);
						    session.setDebug(true);
						    
						    Message msg = new MimeMessage(session);
						    msg.setSubject("焊机校验提醒");
						    msg.setText(equipmentno + " 下次校验时间为：" + nextTime);
						    msg.setSentDate(new Date());
						    msg.setFrom(new InternetAddress("jiangsudongyu123@163.com"));//发件人邮箱
						    msg.setRecipient(Message.RecipientType.TO,
						    new InternetAddress(listarraymailer.get(j+1))); //收件人邮箱
						    //msg.addRecipient(Message.RecipientType.CC, 
				    		//new InternetAddress("XXXXXXXXXXX@qq.com")); //抄送人邮箱
						    msg.saveChanges();
						    Transport transport = session.getTransport();
						    transport.connect("jiangsudongyu123@163.com","qwerasdf12345678");//发件人邮箱,授权码
						    
						    transport.sendMessage(msg, msg.getAllRecipients());
						    transport.close();
						}
					}
					
			    }catch(Exception e){
			    	e.getStackTrace();
			    }
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
	 * 删除cat焊机设备
	 * @param wid
	 * @return
	 */
	@RequestMapping("/removecatmachine")
	@ResponseBody
	private String removecatmachine(@RequestParam String wid){
		JSONObject obj = new JSONObject();
		try{
			wmm.deletecatmachine(new BigInteger(wid));
			wmm.deleteHistory(new BigInteger(wid));
			List<WeldingMaintenance> list = maintain.getMaintainByWeldingMachinId(new BigInteger(wid));
			for(WeldingMaintenance wm : list){
				//删除维修记录
				maintain.deleteWeldingMaintenance(wm.getId());
				maintain.deleteMaintenanceRecord(wm.getMaintenance().getId());
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", true);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	@RequestMapping("/enovalidate")
	@ResponseBody
	private String enovalidate(@RequestParam String eno){
		boolean data = true;
		int count = wmm.getEquipmentnoCount(eno);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	@RequestMapping("/gidvalidate")
	@ResponseBody
	private String gidvalidate(HttpServletRequest request){
		String gather = request.getParameter("gather");
		String itemid = request.getParameter("itemid");
		BigInteger item = null;
		if(iutil.isNull(itemid)){
			item = new BigInteger(itemid);
		}
		boolean data = true;
		int count = wmm.getGatheridCount(item,gather);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
}

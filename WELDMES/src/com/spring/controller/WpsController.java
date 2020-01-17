package com.spring.controller;

import java.math.BigInteger;
import java.nio.channels.SocketChannel;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.MyUser;
import com.spring.model.Wps;
import com.spring.page.Page;
import com.spring.service.TdService;
import com.spring.service.WpsService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/wps",produces = { "text/json;charset=UTF-8" })
public class WpsController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	private String wpsfid;
	private String wpspre;
	@Autowired
	private WpsService wpsService;
	@Autowired
	private TdService tdService;
	
    public static final String IP_ADDR = "121.196.222.216";//服务器地址   
    public static final int PORT = 5555;//服务器端口号  
	
	IsnullUtil iutil = new IsnullUtil();
	private SocketChannel socketChannel;
	private String strdata;
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	
	@RequestMapping("/AllWps")
	public String AllUser(HttpServletRequest request){
		return "weldwps/allWps";
	}
	
	@RequestMapping("/AllSpe")
	public String AllSpe(HttpServletRequest request){
		return "specification/specificationEntrance";
	}
	
	@RequestMapping("/jumpJsp")
	public String jumpJsp(HttpServletRequest request){
		String urlStr = request.getParameter("urlStr");
		return "specification/"+urlStr;
	}

	@RequestMapping("/getAllWps")
	@ResponseBody
	public String getAllWps(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		page = new Page(pageIndex,pageSize,total);
		List<Wps> findAll = wpsService.findAll(page,parent,search);
		long total = 0;
		
		if(findAll != null){
			PageInfo<Wps> pageinfo = new PageInfo<Wps>(findAll);
			total = pageinfo.getTotal();
		}

		request.setAttribute("wpsList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				String creat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(wps.getFcreatedate());
				String update = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(wps.getFupdatedate());
				json.put("FID", wps.getFid());
				json.put("FWPSNum", wps.getFwpsnum());
				json.put("Fweld_I", wps.getFweld_i());
				json.put("Fweld_V", wps.getFweld_v());
				json.put("Fweld_I_MAX",wps.getFweld_i_max());
				json.put("Fweld_I_MIN", wps.getFweld_i_min());
				json.put("Fweld_V_MAX", wps.getFweld_v_max());
				json.put("Fweld_V_MIN", wps.getFweld_v_min());
				json.put("Fweld_Alter_I", wps.getFweld_alter_i());
				json.put("Fweld_Alter_V", wps.getFweld_alter_v());
				json.put("Fweld_PreChannel", wps.getFweld_prechannel());
				json.put("FCReateDate",creat);
				json.put("FUpdateDate", update);
				json.put("Fowner",wps.getInsname());
				json.put("insid",wps.getInsid());
				json.put("Fback", wps.getFback());
				json.put("Fname", wps.getFname());
				json.put("Fdiameter", wps.getFdiameter());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllSpe")
	@ResponseBody
	public String getAllSpe(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		BigInteger chanel = new BigInteger(request.getParameter("chanel"));
		List<Wps> findAll = wpsService.findAllSpe(machine,chanel);

		request.setAttribute("wpsList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				json.put("FID", wps.getFid());
				json.put("FWPSNum", wps.getWelderid());
				json.put("finitial", wps.getFinitial());
				json.put("fcontroller", wps.getFcontroller());
				json.put("fselect",wps.getInsname());
				json.put("farc", wps.getWeldername());
				json.put("fcharacter", wps.getFweld_v_max());
				json.put("fmode", wps.getFmode());
				json.put("fmaterial", wps.getUpdatename());
				json.put("fgas", wps.getFback());
				json.put("fdiameter", wps.getFname());
				json.put("ftime", wps.getFtime());
				json.put("fadvance", wps.getFadvance());
				json.put("fhysteresis", wps.getFhysteresis());
				json.put("fini_ele", wps.getFini_ele());
				json.put("fini_vol", wps.getFini_vol());
				json.put("fini_vol1", wps.getFini_vol1());
				json.put("fweld_ele", wps.getFweld_ele());
				json.put("fweld_vol", wps.getFweld_vol());
				json.put("fweld_vol1", wps.getFweld_vol1());
				json.put("farc_ele", wps.getFarc_ele());
				json.put("farc_vol", wps.getFarc_vol());
				json.put("farc_vol1", wps.getFarc_vol1());
				json.put("fweld_tuny_ele", wps.getFweld_tuny_ele());
				json.put("fweld_tuny_vol", wps.getFweld_tuny_vol());
				json.put("farc_tuny_ele", wps.getFarc_tuny_ele());
				json.put("Fdiameter", wps.getFdiameter());
				json.put("frequency", wps.getFrequency());
				json.put("gasflow", wps.getGasflow());
				json.put("ftorch", wps.getFtorch());
				json.put("fprocessid", wps.getFprocessid());
				json.put("weldingratio",wps.getWeldingratio());
				//上海通用新增
				json.put("firsttime", wps.getFirsttime());
				json.put("farc_time", wps.getFarc_time());
				json.put("Rush", wps.getRush());
				json.put("handarc_ele", wps.getHandarc_ele());
				json.put("handarc_time", wps.getHandarc_time());
				json.put("hand_ele", wps.getHand_ele());
				json.put("Base_ele", wps.getBase_ele());
				json.put("Base_vol", wps.getBase_vol());
				json.put("Base_vol1", wps.getBase_vol1());
				json.put("fargon", wps.getFargon());
				json.put("manual_weld", wps.getManual_weld());
				json.put("arc_length", wps.getArc_length());
				json.put("pulse", wps.getPulse());
				json.put("fweldparameters", wps.getFweldparameters());
				json.put("rise_time", wps.getRrise_time());
				json.put("decline_time", wps.getDecline_time());
				json.put("thrust_ele", wps.getThrust_ele());
				json.put("pulse_ratio", wps.getPulse_ratio());
				json.put("point_speed", wps.getPoint_speed());
				//上海通用
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/Spe")
	@ResponseBody
	public String Spe(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		String ch = request.getParameter("chanel");
		List<Wps> findAll = wpsService.AllSpe(machine,ch);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String str="";
		try{
			for(Wps wps:findAll){
				str += wps.getWelderid()+",";
				json.put("FWPSNum", wps.getWelderid());
				json.put("finitial", wps.getFinitial());
				json.put("fcontroller", wps.getFcontroller());
				json.put("fselect",wps.getInsname());
				json.put("farc", wps.getWeldername());
				json.put("fcharacter", wps.getFweld_v_max());
				json.put("fmode", wps.getFmode());
				json.put("fmaterial", wps.getUpdatename());
				json.put("fgas", wps.getFback());
				json.put("fdiameter", wps.getFname());
				json.put("ftime", wps.getFtime());
				json.put("fadvance", wps.getFadvance());
				json.put("fhysteresis", wps.getFhysteresis());
				json.put("fini_ele", wps.getFini_ele());
				json.put("fini_vol", wps.getFini_vol());
				json.put("fini_vol1", wps.getFini_vol1());
				json.put("fweld_ele", wps.getFweld_ele());
				json.put("fweld_vol", wps.getFweld_vol());
				json.put("fweld_vol1", wps.getFweld_vol1());
				json.put("farc_ele", wps.getFarc_ele());
				json.put("farc_vol", wps.getFarc_vol());
				json.put("farc_vol1", wps.getFarc_vol1());
				json.put("fweld_tuny_ele", wps.getFweld_tuny_ele());
				json.put("fweld_tuny_vol", wps.getFweld_tuny_vol());
				json.put("farc_tuny_ele", wps.getFarc_tuny_ele());
				json.put("Fdiameter", wps.getFdiameter());
				json.put("frequency", wps.getFrequency());
				json.put("gasflow", wps.getGasflow());
				json.put("ftorch", wps.getFtorch());
				json.put("fprocessid", wps.getFprocessid());
				//上海通用新增
				json.put("weldingratio", wps.getWeldingratio());
				json.put("firsttime",wps.getFirsttime());
				json.put("farc_time",wps.getFarc_time());
				json.put("Rush",wps.getRush());
				json.put("hand_ele",wps.getHand_ele());
				json.put("handarc_ele",wps.getHandarc_ele());
				json.put("handarc_time",wps.getHandarc_time());
				json.put("Base_ele",wps.getBase_ele());
				json.put("Base_vol",wps.getBase_vol());
				json.put("Base_vol1",wps.getBase_vol1());
				json.put("fargon",wps.getFargon());
				json.put("manual_weld",wps.getManual_weld());
				json.put("arc_length",wps.getArc_length());
				json.put("pulse",wps.getPulse());
				json.put("fweldparameters",wps.getFweldparameters());
				json.put("rise_time",wps.getRrise_time());
				json.put("decline_time",wps.getDecline_time());
				json.put("thrust_ele",wps.getThrust_ele());
				json.put("point_speed",wps.getPoint_speed());
				json.put("pulse_ratio",wps.getPulse_ratio());
				
				/*******************a350p****************/
				json.put("guide", wps.getGuide());
				json.put("slope", wps.getSlope());
				json.put("specialarc", wps.getSpecialarc());
				json.put("specialarc_rep", wps.getSpecialarc_rep());
				json.put("ts_condition", wps.getTs_condition());
				json.put("pulse_ele", wps.getPulse_ele());
				json.put("ac_frequency", wps.getAc_frequency());
				json.put("clean_width", wps.getClean_width());
				json.put("ac_dc", wps.getAc_dc());
				json.put("pulse_width", wps.getPulse_width());
				json.put("ac_ratio", wps.getAc_ratio());
				json.put("ac_wave", wps.getAc_wave());
				json.put("pulse_tuny_ele", wps.getPulse_tuny_ele());
				json.put("special_arcorder", wps.getSpecial_arcorder());
				json.put("special_arc_initial", wps.getSpecial_arc_initial());
				json.put("special_arctime",wps.getSpecial_arctime());
				json.put("click_ele", wps.getClick_ele());
				json.put("two_click_ele", wps.getTwo_click_ele());
				json.put("repeat_end", wps.getRepeat_end());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		obj.put("chanelNum", str);
		return obj.toString();
	}
	
	@RequestMapping("/toAddWps")
	public String toAddUser(HttpServletRequest request){
		return "weldwps/addWps";
	}
	
	@RequestMapping("/toAddSpe")
	public String toAddSpe(HttpServletRequest request){
		return "specification/addSpe";
	}
	
	
	@RequestMapping("/toUpdateWps")
	public String toUpdateWps(@RequestParam BigInteger fid,HttpServletRequest request){
		Wps wps = wpsService.findById(fid);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		request.setAttribute("wps", wps);
		request.setAttribute("update", sdf.format(wps.getFupdatedate()));
		request.setAttribute("create", sdf.format(wps.getFcreatedate()));
		return "weldwps/editWps";
	}
	
	@RequestMapping("/toUpdateSpe")
	public String toUpdateSpe(@RequestParam BigInteger fid,HttpServletRequest request){
		Wps wps = wpsService.findSpeById(fid);
		request.setAttribute("wps", wps);
		return "specification/editSpe";
	}
	
	@RequestMapping("/toDestroyWps")
	public String toDestroyWps(@RequestParam BigInteger fid,HttpServletRequest request){
		Wps wps = wpsService.findById(fid);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		request.setAttribute("wps", wps);
		request.setAttribute("update", sdf.format(wps.getFupdatedate()));
		request.setAttribute("create", sdf.format(wps.getFcreatedate()));
		return "weldwps/destroyWps";
	}
	
	@RequestMapping("/toDestroySpe")
	public String toDestroySpe(@RequestParam BigInteger fid,HttpServletRequest request){
		Wps wps = wpsService.findSpeById(fid);
		request.setAttribute("wps", wps);
		return "specification/destroySpe";
	}
	@RequestMapping("/apSpc")
	@ResponseBody
	public String apSpc(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		Integer finitial = Integer.valueOf(request.getParameter("finitial"));
		Integer fcontroller = Integer.valueOf(request.getParameter("fcontroller"));
		Integer fmode = Integer.valueOf(request.getParameter("fmode"));
		Integer fselect = Integer.valueOf(request.getParameter("fselect"));
		Integer farc = Integer.valueOf(request.getParameter("farc"));
		Integer fmaterial = Integer.valueOf(request.getParameter("fmaterial"));
		Integer fgas = Integer.valueOf(request.getParameter("fgas"));
		BigInteger fdiameter = new BigInteger(request.getParameter("fdiameter"));
		Integer chanel = Integer.valueOf(request.getParameter("chanel"));
		double ftime = Double.valueOf(request.getParameter("ftime"));
		double fadvance = Double.valueOf(request.getParameter("fadvance"));
		double fini_ele = Double.valueOf(request.getParameter("fini_ele"));
		double fweld_ele = Double.valueOf(request.getParameter("fweld_ele"));
		double farc_ele = Double.valueOf(request.getParameter("farc_ele"));
		double fhysteresis = Double.valueOf(request.getParameter("fhysteresis"));
		int fcharacter = Integer.valueOf(request.getParameter("fcharacter"));
		double fweld_tuny_ele = Double.valueOf(request.getParameter("fweld_tuny_ele"));
		double farc_tuny_ele = Double.valueOf(request.getParameter("farc_tuny_ele"));
		double fini_vol = Double.valueOf(request.getParameter("fini_vol"));
		double fweld_vol = Double.valueOf(request.getParameter("fweld_vol"));
		double farc_vol = Double.valueOf(request.getParameter("farc_vol"));
		double fini_vol1 = Double.valueOf(request.getParameter("fini_vol1"));
		double fweld_vol1 = Double.valueOf(request.getParameter("fweld_vol1"));
		double farc_vol1 = Double.valueOf(request.getParameter("farc_vol1"));
		//double fweld_tuny_vol = Double.valueOf(request.getParameter("fweld_tuny_vol"));
		//double farc_tuny_vol = Double.valueOf(request.getParameter("farc_tuny_vol"));
		BigInteger machine=new BigInteger(request.getParameter("machine"));
		double frequency = Double.valueOf(request.getParameter("frequency"));
		double gasflow = Double.valueOf(request.getParameter("gasflow"));
		double weldingratio = Double.valueOf(request.getParameter("weldingratio"));
		//int fprocess = Integer.valueOf(request.getParameter("fprocess"));
		//int ftorch = Integer.valueOf(request.getParameter("ftorch"));
		
		double firsttime = Double.valueOf(request.getParameter("firsttime"));
		double farc_time = Double.valueOf(request.getParameter("farc_time"));
		double Rush = Double.valueOf(request.getParameter("Rush"));
		double handarc_ele = Double.valueOf(request.getParameter("handarc_ele"));
		double handarc_time = Double.valueOf(request.getParameter("handarc_time"));
		double hand_ele = Double.valueOf(request.getParameter("hand_ele"));
		double Base_ele = Double.valueOf(request.getParameter("Base_ele"));
		double Base_vol = Double.valueOf(request.getParameter("Base_vol"));
		double Base_vol1 = Double.valueOf(request.getParameter("Base_vol1"));
		double fargon = Double.valueOf(request.getParameter("fargon"));
		double manual_weld = Double.valueOf(request.getParameter("manual_weld"));
		double arc_length = Double.valueOf(request.getParameter("arc_length"));
		double pulse = Double.valueOf(request.getParameter("pulse"));
		double fweldparameters = Double.valueOf(request.getParameter("fweldparameters"));
		double rise_time = Double.valueOf(request.getParameter("rise_time"));
		double decline_time = Double.valueOf(request.getParameter("decline_time"));
		double thrust_ele = Double.valueOf(request.getParameter("thrust_ele"));
		double pulse_ratio = Double.valueOf(request.getParameter("pulse_ratio"));
		double point_speed = Double.valueOf(request.getParameter("point_speed"));
		
		try{
			wps.setFweld_i_max(chanel);
			wps.setFweld_i_min(finitial);
			wps.setFweld_alter_i(fcontroller);
			wps.setFweld_v_min(fmode);
			wps.setFweld_i(fselect);
			wps.setFweld_v(farc);
			wps.setFweld_v_max(fcharacter);
			wps.setFweld_prechannel(fmaterial);
			wps.setFweld_alter_v(fgas);
			wps.setInsid(fdiameter);
			wps.setFtime(ftime);
			wps.setFadvance(fadvance);
			wps.setFhysteresis(fhysteresis);
			wps.setFini_ele(fini_ele);
			wps.setFini_vol(fini_vol);
			wps.setFini_vol1(fini_vol1);
			wps.setFweld_ele(fweld_ele);
			wps.setFweld_vol(fweld_vol);
			wps.setFweld_vol1(fweld_vol1);
			wps.setFarc_ele(farc_ele);
			wps.setFarc_vol(farc_vol);
			wps.setFarc_vol1(farc_vol1);
			wps.setFweld_tuny_ele(fweld_tuny_ele);
			//wps.setFweld_tuny_vol(fweld_tuny_vol);
			wps.setFarc_tuny_ele(farc_tuny_ele);
			//wps.setFdiameter(farc_tuny_vol);
			wps.setMacid(machine);
			wps.setFcreater(myuser.getId());
			wps.setFupdater(myuser.getId());
			wps.setFrequency(frequency);
			wps.setGasflow(gasflow);
			
			wps.setWeldingratio(weldingratio);
			wps.setFirsttime(firsttime);
			wps.setFarc_time(farc_time);
			wps.setRush(Rush);
			wps.setHand_ele(hand_ele);
			wps.setHandarc_ele(handarc_ele);
			wps.setHandarc_time(handarc_time);
			wps.setBase_ele(Base_ele);
			wps.setBase_vol(Base_vol1);
			wps.setBase_vol1(Base_vol1);
			wps.setFargon(fargon);
			wps.setManual_weld(manual_weld);
			wps.setArc_length(arc_length);
			wps.setPulse(pulse);
			wps.setFweldparameters(fweldparameters);
			wps.setRise_time(rise_time);
			wps.setDecline_time(decline_time);
			wps.setThrust_ele(thrust_ele);
			wps.setPoint_speed(point_speed);
			wps.setPulse_ratio(pulse_ratio);
			wps.setBase_vol(Base_vol);
			if(wpsService.findCount(machine,chanel.toString())<=0){
				wpsService.saveSpc(wps);
			}else{
				wpsService.updateSpc(wps);
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	
	}
	@RequestMapping("/apSpe")
	@ResponseBody
	public String apSpe(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		Integer finitial = Integer.valueOf(request.getParameter("finitial"));
		Integer fcontroller = Integer.valueOf(request.getParameter("fcontroller"));
		Integer fmode = Integer.valueOf(request.getParameter("fmode"));
		Integer fselect = Integer.valueOf(request.getParameter("fselect"));
		Integer farc = Integer.valueOf(request.getParameter("farc"));
		Integer fmaterial = Integer.valueOf(request.getParameter("fmaterial"));
		Integer fgas = Integer.valueOf(request.getParameter("fgas"));
		BigInteger fdiameter = new BigInteger(request.getParameter("fdiameter"));
		Integer chanel = Integer.valueOf(request.getParameter("chanel"));
		double ftime = Double.valueOf(request.getParameter("ftime"));
		double fadvance = Double.valueOf(request.getParameter("fadvance"));
		double fini_ele = Double.valueOf(request.getParameter("fini_ele"));
		double fweld_ele = Double.valueOf(request.getParameter("fweld_ele"));
		double farc_ele = Double.valueOf(request.getParameter("farc_ele"));
		double fhysteresis = Double.valueOf(request.getParameter("fhysteresis"));
		int fcharacter = Integer.valueOf(request.getParameter("fcharacter"));
		double fweld_tuny_ele = Double.valueOf(request.getParameter("fweld_tuny_ele"));
		double farc_tuny_ele = Double.valueOf(request.getParameter("farc_tuny_ele"));
		double fini_vol = Double.valueOf(request.getParameter("fini_vol"));
		double fweld_vol = Double.valueOf(request.getParameter("fweld_vol"));
		double farc_vol = Double.valueOf(request.getParameter("farc_vol"));
		double fini_vol1 = Double.valueOf(request.getParameter("fini_vol1"));
		double fweld_vol1 = Double.valueOf(request.getParameter("fweld_vol1"));
		double farc_vol1 = Double.valueOf(request.getParameter("farc_vol1"));
		double fweld_tuny_vol = Double.valueOf(request.getParameter("fweld_tuny_vol"));
		double farc_tuny_vol = Double.valueOf(request.getParameter("farc_tuny_vol"));
		BigInteger machine=new BigInteger(request.getParameter("machine"));
		double frequency = Double.valueOf(request.getParameter("frequency"));
		double gasflow = Double.valueOf(request.getParameter("gasflow"));
		double weldingratio = Double.valueOf(request.getParameter("weldingratio"));
		int fprocess = Integer.valueOf(request.getParameter("fprocess"));
		int ftorch = Integer.valueOf(request.getParameter("ftorch"));
		
//		double firsttime = Double.valueOf(request.getParameter("firsttime"));
//		double farc_time = Double.valueOf(request.getParameter("farc_time"));
//		double Rush = Double.valueOf(request.getParameter("Rush"));
//		double handarc_ele = Double.valueOf(request.getParameter("handarc_ele"));
//		double handarc_time = Double.valueOf(request.getParameter("handarc_time"));
//		double hand_ele = Double.valueOf(request.getParameter("hand_ele"));
//		double Base_ele = Double.valueOf(request.getParameter("Base_ele"));
//		double Base_vol = Double.valueOf(request.getParameter("Base_vol"));
//		double Base_vol1 = Double.valueOf(request.getParameter("Base_vol1"));
//		double fargon = Double.valueOf(request.getParameter("fargon"));
//		double manual_weld = Double.valueOf(request.getParameter("manual_weld"));
//		double arc_length = Double.valueOf(request.getParameter("arc_length"));
//		double pulse = Double.valueOf(request.getParameter("pulse"));
//		double fweldparameters = Double.valueOf(request.getParameter("fweldparameters"));
//		double rise_time = Double.valueOf(request.getParameter("rise_time"));
//		double decline_time = Double.valueOf(request.getParameter("decline_time"));
//		double thrust_ele = Double.valueOf(request.getParameter("thrust_ele"));
//		double pulse_ratio = Double.valueOf(request.getParameter("pulse_ratio"));
//		double point_speed = Double.valueOf(request.getParameter("point_speed"));
		
		try{
			wps.setFweld_i_max(chanel);
			wps.setFweld_i_min(finitial);
			wps.setFweld_alter_i(fcontroller);
			wps.setFweld_v_min(fmode);
			wps.setFweld_i(fselect);
			wps.setFweld_v(farc);
			wps.setFweld_v_max(fcharacter);
			wps.setFweld_prechannel(fmaterial);
			wps.setFweld_alter_v(fgas);
			wps.setInsid(fdiameter);
			wps.setFtime(ftime);
			wps.setFadvance(fadvance);
			wps.setFhysteresis(fhysteresis);
			wps.setFini_ele(fini_ele);
			wps.setFini_vol(fini_vol);
			wps.setFini_vol1(fini_vol1);
			wps.setFweld_ele(fweld_ele);
			wps.setFweld_vol(fweld_vol);
			wps.setFweld_vol1(fweld_vol1);
			wps.setFarc_ele(farc_ele);
			wps.setFarc_vol(farc_vol);
			wps.setFarc_vol1(farc_vol1);
			wps.setFweld_tuny_ele(fweld_tuny_ele);
			wps.setFweld_tuny_vol(fweld_tuny_vol);
			wps.setFarc_tuny_ele(farc_tuny_ele);
			wps.setFdiameter(farc_tuny_vol);
			wps.setMacid(machine);
			wps.setFcreater(myuser.getId());
			wps.setFupdater(myuser.getId());
			wps.setFrequency(frequency);
			wps.setGasflow(gasflow);
			wps.setFprocessid(fprocess);
			wps.setFtorch(ftorch);
			wps.setWeldingratio(weldingratio);
//			wps.setFirsttime(firsttime);
//			wps.setFarc_time(farc_time);
//			wps.setRush(Rush);
//			wps.setHand_ele(hand_ele);
//			wps.setHandarc_ele(handarc_ele);
//			wps.setHandarc_time(handarc_time);
//			wps.setBase_ele(Base_ele);
//			wps.setBase_vol(Base_vol1);
//			wps.setBase_vol1(Base_vol1);
//			wps.setFargon(fargon);
//			wps.setManual_weld(manual_weld);
//			wps.setArc_length(arc_length);
//			wps.setPulse(pulse);
//			wps.setFweldparameters(fweldparameters);
//			wps.setRise_time(rise_time);
//			wps.setDecline_time(decline_time);
//			wps.setThrust_ele(thrust_ele);
//			wps.setPoint_speed(point_speed);
//			wps.setPulse_ratio(pulse_ratio);
//			wps.setBase_vol(Base_vol);
			if(wpsService.findCount(machine,chanel.toString())<=0){
				wpsService.saveSpe(wps);
			}else{
				wpsService.updateSpe(wps);
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/saveCopy")
	@ResponseBody
	public String saveCopy(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		String ch = request.getParameter("chanel");
		String str = request.getParameter("str");
		BigInteger mac = new BigInteger(request.getParameter("mac"));
		List<Wps> findAll = wpsService.findSpe(mac,ch);
		try{
	        if(null!=str&&""!=str){
	        String[] ss = str.split(",");
	        for (int i = 0; i < ss.length; i++) {
			for(Wps spe:findAll){
			if(wpsService.findCount(new BigInteger(ss[i]),String.valueOf(spe.getFweld_i_max()))<=0){
				spe.setMacid(new BigInteger(ss[i]));
				spe.setFcreater(myuser.getId());
				spe.setFupdater(myuser.getId());
				wpsService.saveSpe(spe);
			}else{
				spe.setMacid(new BigInteger(ss[i]));
				spe.setFupdater(myuser.getId());
				wpsService.updateSpe(spe);
			}
			}
	        }
	        }
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
/*	@RequestMapping("/findCount")
	@ResponseBody
	public String findCount(HttpServletRequest request){
		Wps wps = new Wps();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String ch = request.getParameter("chanel");
		String str = request.getParameter("str");
		BigInteger mac = new BigInteger(request.getParameter("mac"));
		try{
			int co;
			if(ch==null&&"".equals(ch)){
				co=1;
			}else{
				co = wpsService.findCount(mac,ch);
			}
			BigInteger parent = null;
			List<Td> getAP = tdService.getAllPosition(parent);
			for(Td td:getAP){
	        if(null!=str&&""!=str){
	        String[] ss = str.split(",");
	        for (int i = 0; i < ss.length; i++) {
	        	if(td.getId()==Long.valueOf(ss[i])){
				json.put("machineid", td.getFequipment_no());
				json.put("insname", td.getFcn());
				json.put("num", "1-"+co);
				json.put("readynum", 0);
				ary.add(json);
	        	}
	        }
	        }
		}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		obj.put("rows", ary);
		return obj.toString();
	}*/
	
	@RequestMapping("/findCount")
	@ResponseBody
	public String findCount(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		String chanel = request.getParameter("chanel");
		BigInteger mac = new BigInteger(request.getParameter("mac"));
		int count = 0;
		try{
			count = wpsService.findCount(mac,chanel);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		obj.put("count", count);
		return obj.toString();
	}
	
	@RequestMapping("/addWps")
	@ResponseBody
	public String addUser(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
	        wps.setFinitial(request.getParameter("finitial"));
	        wps.setFcontroller(request.getParameter("fcontroller"));
			wps.setFcreater(myuser.getId());
			wps.setFupdater(myuser.getId());
			wps.setFwpsnum(request.getParameter("fwn"));
			wps.setFback(request.getParameter("Fback"));
	        wps.setFname(request.getParameter("Fname"));
			wps.setFowner(Long.parseLong(request.getParameter("ins")));
			wps.setFweld_i( Integer.parseInt(request.getParameter("Fweld_I")));
	        wps.setFweld_v( Integer.parseInt(request.getParameter("Fweld_V")));
	        wps.setFweld_i_max(Integer.parseInt(request.getParameter("Fweld_I_MAX")));
	        wps.setFweld_i_min(Integer.parseInt(request.getParameter("Fweld_I_MIN")));
	        wps.setFweld_v_max(Integer.parseInt(request.getParameter("Fweld_V_MAX")));
	        wps.setFweld_v_min(Integer.parseInt(request.getParameter("Fweld_V_MIN")));
	        wps.setFweld_alter_i(Integer.parseInt(request.getParameter("Fweld_Alter_I")));
	        wps.setFweld_alter_v(Integer.parseInt(request.getParameter("Fweld_Alter_V")));
	        wps.setFweld_prechannel(Integer.parseInt(request.getParameter("Fweld_PreChannel")));
	        wps.setFdiameter(Double.valueOf(request.getParameter("Fdiameter")));
			wps.setFcreatedate(sdf.parse(sdf.format((new Date()).getTime())));
			wps.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			wpsService.save(wps);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/updateWps")
	@ResponseBody
	public String updateWps(Wps wps,HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			wps.setFid(Long.parseLong(request.getParameter("FID")));
			wps.setFupdater(myuser.getId());
	        wps.setFowner(Long.parseLong(request.getParameter("ins")));
//	        wps.setFcreatedate(sdf.parse(request.getParameter("FCReateDate")));
	        wps.setFwpsnum(request.getParameter("FWPSNum"));
	        wps.setFweld_i( Integer.parseInt(request.getParameter("Fweld_I")));
	        wps.setFweld_v( Integer.parseInt(request.getParameter("Fweld_V")));
	        wps.setFweld_i_max(Integer.parseInt(request.getParameter("Fweld_I_MAX")));
	        wps.setFweld_i_min(Integer.parseInt(request.getParameter("Fweld_I_MIN")));
	        wps.setFweld_v_max(Integer.parseInt(request.getParameter("Fweld_V_MAX")));
	        wps.setFweld_v_min(Integer.parseInt(request.getParameter("Fweld_V_MIN")));
	        wps.setFweld_alter_i(Integer.parseInt(request.getParameter("Fweld_Alter_I")));
	        wps.setFweld_alter_v(Integer.parseInt(request.getParameter("Fweld_Alter_V")));
	        wps.setFweld_prechannel(Integer.parseInt(request.getParameter("Fweld_PreChannel")));
	        wps.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
	        wps.setFback(request.getParameter("Fback"));
	        wps.setFname(request.getParameter("Fname"));
	        wps.setFdiameter(Double.valueOf(request.getParameter("Fdiameter")));
		    wpsService.update(wps);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	@RequestMapping("/destroyWps")
	@ResponseBody
	public String destroyWps(@RequestParam BigInteger fid){

			JSONObject obj = new JSONObject();
			try{
				wpsService.delete(fid);
				wpsService.deleteHistory(fid);
				 obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	@RequestMapping("/wpsvalidate")
	@ResponseBody
	private String wpsvalidate(@RequestParam String fwpsnum){
		boolean data = true;
		int count = wpsService.getUsernameCount(fwpsnum);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	@RequestMapping("/selectwps")
	public String selectwps(HttpServletRequest request){
		return "weldwps/selectWps";
	}
	
	@RequestMapping("/selectmachine")
	public String selectmachine(HttpServletRequest request){
		 wpsfid = request.getParameter("fid");
		 wpspre = request.getParameter("pre");
		return "weldwps/selectMachine";
	}
	
	@RequestMapping("/giveWM")
	@ResponseBody
	public String giveWM(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String wpsid = request.getParameter("wpsid");
		String panelnum = request.getParameter("panelnum");
		String machid = request.getParameter("machid");
		String[] wfid = wpsid.split(",");
		String[] wpre = panelnum.split(",");
		String[] mmid = machid.split(",");
		JSONObject obj = new JSONObject();
		try{
			for(int i=0;i<wfid.length;i++){
				wps.setFid(Long.parseLong(wfid[i]));
		        wps.setFweld_prechannel(Integer.parseInt(wpre[i]));
				wps.setFcreater(myuser.getId());
				wps.setFupdater(myuser.getId());
				wps.setInsid(wpsService.findByUid(myuser.getId()));
				wps.setFcreatedate(sdf.parse(sdf.format((new Date()).getTime())));
				wps.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
				for(int j=0;j<mmid.length;j++){
					wps.setMacid(new BigInteger(mmid[j]));
					wpsService.give(wps);
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
	
	@RequestMapping("/findHistory")
	@ResponseBody
	public String findHistory(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		page = new Page(pageIndex,pageSize,total);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		page = new Page(pageIndex,pageSize,total);
		List<Wps> findHistory = wpsService.findHistory(page,parent);
		long total = 0;	
		if(findHistory != null){
			PageInfo<Wps> pageinfo = new PageInfo<Wps>(findHistory);
			total = pageinfo.getTotal();
		}
		try{
			for(Wps wps:findHistory){
				json.put("FWPSNum", wps.getFwpsnum());
				json.put("Fweld_PreChannel", wps.getFweld_prechannel());
				json.put("FCReateDate",new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(wps.getFcreatedate()));
				json.put("Fname", wps.getFname());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/getFnsDetail")
	@ResponseBody
	public String getFnsDetail(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		String chanel = request.getParameter("chanel");
		List<Wps> findAll = wpsService.getFnsDetail(machine,chanel);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				json.put("f001", wps.getF001());
				json.put("f002", wps.getF002());
				json.put("f003", wps.getF003());
				json.put("fadvance", wps.getFadvance());
				json.put("fhysteresis", wps.getFhysteresis());
				json.put("f004", wps.getF004());
				json.put("f005", wps.getF005());
				json.put("f006", wps.getF006());
				json.put("f007", wps.getF007());
				json.put("f008", wps.getF008());
				json.put("f009", wps.getF009());
				json.put("f010", wps.getF010());
				json.put("f011", wps.getF011());
				json.put("f012", wps.getF012());
				json.put("f013", wps.getF013());
				json.put("f014", wps.getF014());
				json.put("f015", wps.getF015());
				json.put("f016", wps.getF016());
				json.put("f017", wps.getF017());
				json.put("f018", wps.getF018());
				json.put("f019", wps.getF019());
				json.put("f020", wps.getF020());
				json.put("f021", wps.getF021());
				json.put("f022", wps.getF022());
				json.put("f023", wps.getF023());
				json.put("f024", wps.getF024());
				if (chanel.length() < 4) {
					int length = 4 - chanel.length();
					for (int i = 0; i < length; i++) {
						chanel = "0" + chanel;
					}
				}
				json.put("jobno", chanel);
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getFnsJobList")
	@ResponseBody
	public String getFnsJobList(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		List<Wps> findAll = wpsService.getFnsJobList(machine);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				String jobno = wps.getFwpsnum();
				if (jobno.length() < 4) {
					int length = 4 - jobno.length();
					for (int i = 0; i < length; i++) {
						jobno = "0" + jobno;
					}
				}
				json.put("jobno", jobno);
				json.put("jobname", wps.getF024());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/addJobNoDetail")
	@ResponseBody
	public String addJobNoDetail(HttpServletRequest request){
		Wps wps = new Wps();
		JSONObject obj = new JSONObject();
		try{
			wps.setF001("0");
			wps.setF002("0");
			wps.setF003("0");
			wps.setF004("135");
			wps.setF005("0");
			wps.setF006("0");
			wps.setF007("1");
			wps.setF008("1");
			wps.setF009("50");
			wps.setF010("0");
			wps.setF011("0");
			wps.setF012("0");
			wps.setF013("0");
			wps.setF014("0");
			wps.setF015("0");
			wps.setF016("0");
			wps.setF017("0");
			wps.setF018("0");
			wps.setF019("0");
			wps.setF020("-1");
			wps.setF021("1");
			wps.setF022("-10");
			wps.setF023("10");
			wps.setF024(request.getParameter("jobname"));
			wps.setFadvance(0.1);
			wps.setFhysteresis(0.5);
			wps.setFwpsnum(request.getParameter("jobno"));
			wps.setMacid(new BigInteger(request.getParameter("machid")));
			wpsService.addJob(wps);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/updateJobNoDetail")
	@ResponseBody
	public String updateJobNoDetail(HttpServletRequest request){
		Wps wps = new Wps();
		JSONObject obj = new JSONObject();
		int flag = Integer.valueOf(request.getParameter("flag"));
		try{
			wps.setF001(request.getParameter("f0011"));
			wps.setF002(request.getParameter("f0021"));
			wps.setF003(request.getParameter("f0031"));
			wps.setF004(request.getParameter("f0041"));
			wps.setF005(request.getParameter("f0051"));
			wps.setF006(request.getParameter("f0061"));
			wps.setF007(request.getParameter("f0071"));
			wps.setF008(request.getParameter("f0081"));
			wps.setF009(request.getParameter("f0091"));
			wps.setF010(request.getParameter("f0101"));
			wps.setF011(request.getParameter("f0111"));
			wps.setF012(request.getParameter("f0121"));
			wps.setF013(request.getParameter("f0131"));
			wps.setF014(request.getParameter("f0141"));
			wps.setF015(request.getParameter("f0151"));
			wps.setF016(request.getParameter("f0161"));
			wps.setF017(request.getParameter("f0171"));
			wps.setF018(request.getParameter("f0181"));
			wps.setF019(request.getParameter("f0191"));
			wps.setF020(request.getParameter("f0201"));
			wps.setF021(request.getParameter("f0211"));
			wps.setF022(request.getParameter("f0221"));
			wps.setF023(request.getParameter("f0231"));
			wps.setF024(request.getParameter("f0241"));
			wps.setFadvance(Double.valueOf(request.getParameter("fadvance")));
			wps.setFhysteresis(Double.valueOf(request.getParameter("fhysteresis")));
			wps.setFwpsnum(request.getParameter("jobno"));
			wps.setMacid(new BigInteger(request.getParameter("machid")));
			if(flag==0) {
				wpsService.updateJob(wps);
			}else {
				wpsService.addJob(wps);
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/deleteJob")
	@ResponseBody
	public String deleteJob(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
			String chanel = request.getParameter("jobno");
			String machine = request.getParameter("machid");
			wpsService.deleteJob(machine,chanel);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/getAllOtcspc")
	@ResponseBody
	public String getAllOtcspc(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		BigInteger chanel = new BigInteger(request.getParameter("chanel"));
		List<Wps> findAll = wpsService.findOtcspc(machine,chanel);
		request.setAttribute("wpsList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				json.put("FID", wps.getFid());
				json.put("FWPSNum", wps.getWelderid());
				json.put("finitial", wps.getFinitial());
				json.put("farc", wps.getWeldername());
				json.put("fcharacter", wps.getFweld_v_max());
				json.put("ftime", wps.getFtime());
				json.put("fadvance", wps.getFadvance());
				json.put("fhysteresis", wps.getFhysteresis());
				json.put("fini_ele", wps.getFini_ele());
				json.put("fweld_ele", wps.getFweld_ele());
				json.put("farc_ele", wps.getFarc_ele());
				json.put("fweld_tuny_ele", wps.getFweld_tuny_ele());
				json.put("farc_tuny_ele", wps.getFarc_tuny_ele());
				json.put("frequency", wps.getFrequency());
				json.put("ftorch", wps.getFtorch());
				json.put("fprocessid", wps.getFprocessid());
				json.put("pulse", wps.getPulse());
				json.put("rise_time", wps.getRrise_time());
				json.put("decline_time", wps.getDecline_time());
				json.put("guide", wps.getGuide());
				json.put("slope", wps.getSlope());
				json.put("specialarc", wps.getSpecialarc());
				json.put("specialarc_rep", wps.getSpecialarc_rep());
				json.put("ts_condition", wps.getTs_condition());
				json.put("pulse_ele", wps.getPulse_ele());
				json.put("ac_frequency", wps.getAc_frequency());
				json.put("clean_width", wps.getClean_width());
				json.put("ac_dc", wps.getAc_dc());
				json.put("pulse_width", wps.getPulse_width());
				json.put("ac_ratio", wps.getAc_ratio());
				json.put("ac_wave", wps.getAc_wave());
				json.put("pulse_tuny_ele", wps.getPulse_tuny_ele());
				json.put("special_arcorder", wps.getSpecial_arcorder());
				json.put("special_arc_initial", wps.getSpecial_arc_initial());
				json.put("special_arctime",wps.getSpecial_arctime());
				json.put("click_ele", wps.getClick_ele());
				json.put("two_click_ele", wps.getTwo_click_ele());
				json.put("repeat_end", wps.getRepeat_end());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/otcspc")
	@ResponseBody
	public String otcspc(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		Integer finitial = Integer.valueOf(request.getParameter("finitial"));
		Integer farc = Integer.valueOf(request.getParameter("farc"));
		Integer chanel = Integer.valueOf(request.getParameter("chanel"));
		int fcharacter = Integer.valueOf(request.getParameter("contact_arc"));
		double pulse = Double.valueOf(request.getParameter("pulse_ctrl"));
		int ftorch = Integer.valueOf(request.getParameter("weld_gun"));
		double ftime = Double.valueOf(request.getParameter("ftime"));
		double fadvance = Double.valueOf(request.getParameter("fadvance"));
		double fini_ele = Double.valueOf(request.getParameter("fini_ele"));
		double rise_time = Double.valueOf(request.getParameter("rise_time"));
		double fweld_ele = Double.valueOf(request.getParameter("fweld_ele"));
		double farc_ele = Double.valueOf(request.getParameter("farc_ele"));
		double fhysteresis = Double.valueOf(request.getParameter("fhysteresis"));
		double decline_time = Double.valueOf(request.getParameter("decline_time"));
		String pulse_ele = String.valueOf(request.getParameter("pulse_ele"));
		double fweld_tuny_ele = Double.valueOf(request.getParameter("fweld_tuny_ele"));
		String ac_ratio = String.valueOf(request.getParameter("ac_rate"));
		String pulse_tuny_ele = String.valueOf(request.getParameter("fpulse_tuny_ele"));
		double farc_tuny_ele = Double.valueOf(request.getParameter("farc_tuny_ele"));
		String pulse_width = String.valueOf(request.getParameter("pulse_width"));
		int fprocess = Integer.valueOf(request.getParameter("weld_method"));
		String special_arcorder = request.getParameter("fsarc_time");
		String special_arc_initial = String.valueOf(request.getParameter("fsarc_init_time"));
		String special_arctime = String.valueOf(request.getParameter("fsarc_arc_time"));
		BigInteger machine=new BigInteger(request.getParameter("machine"));
		String click_ele = String.valueOf(request.getParameter("click_ele"));
		String two_click_ele = String.valueOf(request.getParameter("double_click_ele"));
		String repeat_end = String.valueOf(request.getParameter("frepeat_end"));
		String ac_frequency = String.valueOf(request.getParameter("acfreq"));
		String ac_dc = String.valueOf(request.getParameter("ac_dcfreq"));
		String clean_width = String.valueOf(request.getParameter("clear_width"));
		String ac_wave = String.valueOf(request.getParameter("ac_form"));
		String guide = String.valueOf(request.getParameter("set_guide"));
		String slope = String.valueOf(request.getParameter("fcontroller"));
		String specialarc = String.valueOf(request.getParameter("fsarc"));
		String specialarc_rep = String.valueOf(request.getParameter("fsarc_repeat"));
		String ts_condition = String.valueOf(request.getParameter("fcondition"));
		double frequency = Double.valueOf(request.getParameter("pulsefreq"));
		try{
			wps.setFrequency(frequency);
			wps.setFweld_i_max(chanel);
			wps.setFweld_i_min(finitial);
			wps.setFweld_v(farc);
			wps.setFweld_v_max(fcharacter);
			wps.setFweld_ele(fweld_ele);
			wps.setFtime(ftime);
			wps.setFadvance(fadvance);
			wps.setFhysteresis(fhysteresis);
			wps.setFini_ele(fini_ele);
			wps.setFarc_ele(farc_ele);
			wps.setFweld_tuny_ele(fweld_tuny_ele);
			wps.setFarc_tuny_ele(farc_tuny_ele);
			wps.setMacid(machine);
			wps.setFcreater(myuser.getId());
			wps.setFupdater(myuser.getId());
			wps.setFprocessid(fprocess);
			wps.setPulse(pulse);
			wps.setRise_time(rise_time);
			wps.setDecline_time(decline_time);
			wps.setGuide(guide);
			wps.setSlope(slope);
			wps.setSpecial_arcorder(special_arcorder);
			wps.setSpecialarc_rep(specialarc_rep);
			wps.setSpecialarc(specialarc);
			wps.setSpecial_arc_initial(special_arc_initial);
			wps.setSpecial_arctime(special_arctime);
			wps.setPulse_ele(pulse_ele);
			wps.setPulse_width(pulse_width);
			wps.setPulse_tuny_ele(pulse_tuny_ele);
			wps.setTs_condition(ts_condition);
			wps.setAc_dc(ac_dc);
			wps.setAc_frequency(ac_frequency);
			wps.setAc_ratio(ac_ratio);
			wps.setAc_wave(ac_wave);
			wps.setClean_width(clean_width);
			wps.setClick_ele(click_ele);
			wps.setTwo_click_ele(two_click_ele);
			wps.setRepeat_end(repeat_end);
			wps.setFtorch(ftorch);
			
			if(wpsService.findCount(machine,chanel.toString())<=0){
				wpsService.saveOtcspc(wps);
			}else{
				wpsService.updateOtcspc(wps);
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/getAllSperl")
	@ResponseBody
	public String getAllSperl(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		BigInteger chanel = new BigInteger(request.getParameter("chanel"));
		List<Wps> findAll = wpsService.findAllSperl(machine,chanel);

		request.setAttribute("wpsList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Wps wps:findAll){
				json.put("FID", wps.getFid());
				json.put("FWPSNum", wps.getWelderid());
				json.put("fselect",wps.getInsname());
				json.put("fcharacter", wps.getFweld_v_max());
				json.put("fmaterial", wps.getUpdatename());
				json.put("fgas", wps.getFback());
				json.put("fdiameter", wps.getFname());
				json.put("fweld_ele", wps.getFweld_ele());
				json.put("fweld_vol", wps.getFweld_vol());
				json.put("fspeed", wps.getFspeed());
				
				json.put("fadvance",wps.getFadvance());
				json.put("farc_speed", wps.getFarc_speed());
				json.put("farc_tuny_speed", wps.getFarc_tuny_speed());
				json.put("fini_ele", wps.getFini_ele());
				json.put("fini_vol", wps.getFini_vol());
				json.put("farc_ele", wps.getFarc_ele());
				json.put("farc_vol", wps.getFarc_vol());
				json.put("fweld_tuny_ele", wps.getFweld_tuny_ele());
				json.put("fweld_tuny_vol", wps.getFweld_tuny_vol());
				json.put("farc_tuny_vol", wps.getFarc_tuny_vol());
				json.put("fini_tuny_vol", wps.getFini_tuny_vol());
				json.put("frequency", Integer.toString((Double.valueOf(wps.getFfrequency()).intValue())));
				json.put("fselectstep", wps.getFselectstep());
				json.put("ftime", wps.getFtime());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/apSperl")
	@ResponseBody
	public String apSperl(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		Integer fselect = Integer.valueOf(request.getParameter("fselect"));
		int fcharacter = Integer.valueOf(request.getParameter("fcharacter"));
		Integer fmaterial = Integer.valueOf(request.getParameter("fmaterial"));
		Integer fgas = Integer.valueOf(request.getParameter("fgas"));
		BigInteger fdiameter = new BigInteger(request.getParameter("fdiameter"));
		Integer chanel = Integer.valueOf(request.getParameter("chanel"));
		double fweld_ele = Double.valueOf(request.getParameter("fweld_ele"));
		double fweld_vol = Double.valueOf(request.getParameter("fweld_vol"));
		double fspeed = Double.valueOf(request.getParameter("fspeed"));
		double farc_speed = Double.valueOf(request.getParameter("farc_speed"));
		double farc_tuny_speed = Double.valueOf(request.getParameter("farc_tuny_speed"));
		double fini_vol = Double.valueOf(request.getParameter("fini_vol"));
		double fini_ele = Double.valueOf(request.getParameter("fini_ele"));
		double farc_vol = Double.valueOf(request.getParameter("farc_vol"));
		double farc_ele = Double.valueOf(request.getParameter("farc_ele"));
		double fadvance = Double.valueOf(request.getParameter("fadvance"));
		double fweld_tuny_vol = Double.valueOf(request.getParameter("fweld_tuny_vol"));
		double fini_tuny_vol = Double.valueOf(request.getParameter("fini_tuny_vol"));
		double farc_tuny_vol = Double.valueOf(request.getParameter("farc_tuny_vol"));
		double fweld_tuny_ele = Double.valueOf(request.getParameter("fweld_tuny_ele"));
		String fselectstep = Integer.toString(Integer.valueOf(request.getParameter("fselectstep")));
		String ffrequency = Integer.toString(Integer.valueOf(request.getParameter("frequency")));
		double ftime = Double.valueOf(request.getParameter("ftime"));
		BigInteger machine=new BigInteger(request.getParameter("machine"));
		
		try{
			wps.setFweld_i_max(chanel);
			wps.setFweld_i(fselect);
			wps.setFweld_v_max(fcharacter);
			wps.setFweld_prechannel(fmaterial);
			wps.setFweld_alter_v(fgas);
			wps.setInsid(fdiameter);
			wps.setFweld_ele(fweld_ele);
			wps.setFweld_vol(fweld_vol);
			wps.setFspeed(fspeed);
			wps.setFarc_speed(farc_speed);
			wps.setFarc_tuny_speed(farc_tuny_speed);
			wps.setFini_ele(fini_ele);
			wps.setFini_vol(fini_vol);
			wps.setFarc_vol(farc_vol);
			wps.setFarc_ele(farc_ele);
			wps.setFadvance(fadvance);
			wps.setFweld_tuny_ele(fweld_tuny_ele);
			wps.setFweld_tuny_vol(fweld_tuny_vol);
			wps.setFselectstep(fselectstep);
			wps.setFfrequency(ffrequency);
			wps.setFtime(ftime);
			wps.setMacid(machine);
			wps.setFcreater(myuser.getId());
			wps.setFupdater(myuser.getId());
			wps.setFarc_tuny_vol(farc_tuny_vol);
			wps.setFini_tuny_vol(fini_tuny_vol);
			if(wpsService.findCount(machine,chanel.toString())<=0){
				wpsService.saveSperl(wps);
			}else{
				wpsService.updateSperl(wps);
			}
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/saveCopyrl")
	@ResponseBody
	public String saveCopyrl(HttpServletRequest request){
		Wps wps = new Wps();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		String ch = request.getParameter("chanel");
		String str = request.getParameter("str");
		BigInteger mac = new BigInteger(request.getParameter("mac"));
		List<Wps> findAll = wpsService.findSperl(mac,ch);
		try{
	        if(null!=str&&""!=str){
	        String[] ss = str.split(",");
	        for (int i = 0; i < ss.length; i++) {
			for(Wps spe:findAll){
			if(wpsService.findCount(new BigInteger(ss[i]),String.valueOf(spe.getFweld_i_max()))<=0){
				spe.setMacid(new BigInteger(ss[i]));
				spe.setFcreater(myuser.getId());
				spe.setFupdater(myuser.getId());
				wpsService.saveSperl(spe);
			}else{
				spe.setMacid(new BigInteger(ss[i]));
				spe.setFupdater(myuser.getId());
				wpsService.updateSperl(spe);
			}
			}
	        }
	        }
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}

	@RequestMapping("/Sperl")
	@ResponseBody
	public String Sperl(HttpServletRequest request){
		BigInteger machine = new BigInteger(request.getParameter("machine"));
		String ch = request.getParameter("chanel");
		List<Wps> findAll = wpsService.AllSpe(machine,ch);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String str="";
		try{
			for(Wps wps:findAll){
				str += wps.getWelderid()+",";
				json.put("FWPSNum", wps.getWelderid());
				json.put("finitial", wps.getFinitial());
				json.put("fcontroller", wps.getFcontroller());
				json.put("fselect",wps.getInsname());
				json.put("farc", wps.getWeldername());
				json.put("fcharacter", wps.getFweld_v_max());
				json.put("fmode", wps.getFmode());
				json.put("fmaterial", wps.getUpdatename());
				json.put("fgas", wps.getFback());
				json.put("fdiameter", wps.getFname());
				json.put("ftime", wps.getFtime());
				json.put("fadvance", wps.getFadvance());
				json.put("fhysteresis", wps.getFhysteresis());
				json.put("fini_ele", wps.getFini_ele());
				json.put("fini_vol", wps.getFini_vol());
				json.put("fini_vol1", wps.getFini_vol1());
				json.put("fweld_ele", wps.getFweld_ele());
				json.put("fweld_vol", wps.getFweld_vol());
				json.put("fweld_vol1", wps.getFweld_vol1());
				json.put("farc_ele", wps.getFarc_ele());
				json.put("farc_vol", wps.getFarc_vol());
				json.put("farc_vol1", wps.getFarc_vol1());
				json.put("fweld_tuny_ele", wps.getFweld_tuny_ele());
				json.put("fweld_tuny_vol", wps.getFweld_tuny_vol());
				json.put("farc_tuny_ele", wps.getFarc_tuny_ele());
				json.put("Fdiameter", wps.getFdiameter());
				json.put("frequency", wps.getFrequency());
				json.put("gasflow", wps.getGasflow());
				json.put("ftorch", wps.getFtorch());
				json.put("fprocessid", wps.getFprocessid());
				json.put("fspeed", wps.getFspeed());
				json.put("farc_speed", wps.getFarc_speed());
				json.put("farc_tuny_speed", wps.getFarc_tuny_speed());
				json.put("fselectstep", wps.getFselectstep());
				//上海通用新增
				json.put("weldingratio", wps.getWeldingratio());
				json.put("firsttime",wps.getFirsttime());
				json.put("farc_time",wps.getFarc_time());
				json.put("Rush",wps.getRush());
				json.put("hand_ele",wps.getHand_ele());
				json.put("handarc_ele",wps.getHandarc_ele());
				json.put("handarc_time",wps.getHandarc_time());
				json.put("Base_ele",wps.getBase_ele());
				json.put("Base_vol",wps.getBase_vol());
				json.put("Base_vol1",wps.getBase_vol1());
				json.put("fargon",wps.getFargon());
				json.put("manual_weld",wps.getManual_weld());
				json.put("arc_length",wps.getArc_length());
				json.put("pulse",wps.getPulse());
				json.put("fweldparameters",wps.getFweldparameters());
				json.put("rise_time",wps.getRrise_time());
				json.put("decline_time",wps.getDecline_time());
				json.put("thrust_ele",wps.getThrust_ele());
				json.put("point_speed",wps.getPoint_speed());
				json.put("pulse_ratio",wps.getPulse_ratio());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		obj.put("chanelNum", str);
		return obj.toString();
	}
}
package com.spring.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.model.Report;
import com.spring.page.Page;
import com.spring.service.InsframeworkService;
import com.spring.service.LiveDataService;
import com.spring.service.ReportService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/rep",produces = { "text/json;charset=UTF-8" })
public class ReportController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private LiveDataService lm;
	
	@Autowired
	private InsframeworkService insm;
	
	IsnullUtil iutil = new IsnullUtil();
	
	@RequestMapping("/weldpara")
	public String WeldPara(HttpServletRequest request){
		return "report/WeldParameter";
	}
	@RequestMapping("/warnreport")
	public String WarnRep(HttpServletRequest request){
		return "report/WarnReport";
	}
	@RequestMapping("/wireuse")
	public String WireUse(HttpServletRequest request){
		return "report/WireUse";
	}
	@RequestMapping("/welderreport")
	public String WelderRep(HttpServletRequest request){
		return "report/WelderReport";
	}
	@RequestMapping("/alarm")
	public String Alarm(HttpServletRequest request){
		return "report/AlarmManage";
	}
	@RequestMapping("/history")
	public String History(HttpServletRequest request){
		return "td/HistoryWelder";
	}
	
	@RequestMapping("/historyJunction")
	public String HistoryJunction(HttpServletRequest request){
		return "td/HistoryJunction";
	}
	
	@RequestMapping("/historyMachine")
	public String HistoryMachine(HttpServletRequest request){
		return "td/HistoryMachine";
	}
	
	@RequestMapping("/android")
	public String android(HttpServletRequest request){
		return "report/Android";
	}
	
	@RequestMapping("/getTime")
	@ResponseBody
	public String getTime(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String datetime = "%" + sdf.format(date) + "%";
		List<Report> list = reportService.getAllPara(parent, search, datetime);
		long total = 0;
		if(list != null){
			PageInfo<Report> pageinfo = new PageInfo<Report>(list);
			total = pageinfo.getTotal();
		}
		Report r1 = reportService.getSyspara();
		try{
		 for(Report wm1:list){
		 json.put("id", wm1.getId());
		 json.put("afv", r1.getFafv());
		 json.put("standardele", wm1.getFstandardele());
		 json.put("standardvol", wm1.getFstandardvol());
		 json.put("boottime", "");
		 json.put("machineid", wm1.getEno());
		 json.put("machinemodel", wm1.getModel());
		 json.put("macstatus", "关机");
		 ary.add(json);
		 }
		}catch(Exception e){
			e.printStackTrace();
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
		}
	
	@RequestMapping("/getTWeld")
	@ResponseBody
	public String getTWeld(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String datetime = "%" + sdf.format(date) + "%";
		List<Report> list = reportService.getAllPara(parent, search, datetime);
		long total = 0;
		if(list != null){
			PageInfo<Report> pageinfo = new PageInfo<Report>(list);
			total = pageinfo.getTotal();
		}
		Report r1 = reportService.getSyspara();
		try{
		 for(Report wm1:list){
		 json.put("boottime", wm1.getTime());
		 json.put("machineid", wm1.getEno());
		 json.put("machinemodel", wm1.getModel());
		 json.put("diameter", wm1.getDia());
		 json.put("speed", r1.getFspeed());
		 json.put("macstatus", "关机");
		 ary.add(json);
		 }
		}catch(Exception e){
			e.printStackTrace();
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
		}
	
	@RequestMapping("/AndroidReport")
	@ResponseBody
	public String AndroidReport(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		WeldDto dto = new WeldDto();
		dto.setDtoStatus(1);
		dto.setDay("day");
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		List<ModelDto> time = null;
		if(iutil.isNull(request.getParameter("page")) && iutil.isNull(request.getParameter("rows"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
			pageSize = Integer.parseInt(request.getParameter("rows"));
			page = new Page(pageIndex,pageSize,total);
			time = lm.getAllTime(page,dto);
		}else{
			time = lm.getAllTimes(dto);
		}
		long total = 0;
		if(time != null){
			PageInfo<ModelDto> pageinfo = new PageInfo<ModelDto>(time);
			total = pageinfo.getTotal();
		}
		List<Report> list = reportService.getAndroidData(dto);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Report repo:list){
				json.put("count", repo.getId());
				json.put("time", repo.getTime());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	
	@RequestMapping("/getWelderReport")
	@ResponseBody
	public String getWelderReport(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String type = request.getParameter("otype");
		WeldDto dto = new WeldDto();
		//数据权限处理
		lm.getUserId(request);
		String afreshLogin = (String)request.getAttribute("afreshLogin");
		if(iutil.isNull(afreshLogin)){
			return "0";
		}
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(type)){
			if(type.equals("1")){
				dto.setYear("year");
			}else if(type.equals("2")){
				dto.setMonth("month");
			}else if(type.equals("3")){
				dto.setDay("day");
			}else if(type.equals("4")){
				dto.setWeek("week");
			}
		}
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		page = new Page(pageIndex,pageSize,total);
		String insid = request.getParameter("insid");
		BigInteger itemid = null;
		if("".equals(insid) || insid==null){
			itemid = insm.getUserInsframework();
		}else{
			itemid = new BigInteger(insid);
		}
		List<Report> list = reportService.findAllWelder(page,dto,itemid);
		long total = 0;
		
		if(list != null){
			PageInfo<Report> pageinfo = new PageInfo<Report>(list);
			total = pageinfo.getTotal();
		}
		request.setAttribute("userList", list);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		String hour1;
		String minute1;
		String second1;
		String times;
		try{
			for(Report repo:list){
					json.put("machinemodel", repo.getFmachinemodel());
					json.put("machineid", repo.getFmachineid());
					json.put("fname", repo.getFname());
					json.put("phone", repo.getNum3());
					json.put("weldernum", repo.getFweldernum());
					json.put("back", repo.getFback());
					if(repo.getResult1().toString()=="0"){
						json.put("valuetime", "00:00:00");
					}else{
					long hour = Integer.valueOf(repo.getResult1().toString())/3600;
					if(hour<10){
						hour1 = "0" + String.valueOf(hour) + ":";
					}else{
						hour1 = String.valueOf(hour) + ":";
					}
					long last = Integer.valueOf(repo.getResult1().toString())%3600;
					long minute = last/60;
					if(minute<10){
						minute1 = "0" + String.valueOf(minute) + ":";
					}else{
						minute1 = String.valueOf(minute) + ":";
					}
					long second = last%60;
					if(second<10){
						second1 = "0" + String.valueOf(second);
					}else{
						second1 = String.valueOf(second);
					}
					times = hour1 + minute1 + second1;
					json.put("valuetime", times);
					}
					ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	@RequestMapping("/historyCurve")
	@ResponseBody
	public String historyCurve(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar c = Calendar.getInstance();
		Calendar cb = Calendar.getInstance();
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String welderid = request.getParameter("welderid");
		BigInteger mach = new BigInteger(request.getParameter("mach"));
		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			int types = insm.getUserInsfType(uid);
			if(types==21){
				parentId = insm.getUserInsfId(uid).toString();
			}
		}
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		String fid = request.getParameter("fid");
		List<Report> list;
		pageIndex=1;
		pageSize = 28800;
		page = new Page(pageIndex,pageSize,total);
		try{
			do{
				list = reportService.historyData(page,dto,fid,mach,welderid);
				if(list.size()!=0){
					for(int i=0;i<list.size();i++){
						if(i==list.size()-1){
							json.put("ele", list.get(i).getFstandardele());
							json.put("vol", list.get(i).getFstandardvol());
							json.put("time", list.get(i).getFweldingtime());
							ary.add(json);
						}else{
			                c.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(list.get(i).getFweldingtime()));
			                cb.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(list.get(i+1).getFweldingtime()));
			                if(cb.getTimeInMillis()-c.getTimeInMillis()==1000){
								json.put("ele", list.get(i).getFstandardele());
								json.put("vol", list.get(i).getFstandardvol());
								json.put("time", list.get(i).getFweldingtime());
								ary.add(json);
			                }else if(cb.getTimeInMillis()-c.getTimeInMillis()==2000){
								json.put("ele", list.get(i).getFstandardele());
								json.put("vol", list.get(i).getFstandardvol());
								json.put("time", list.get(i).getFweldingtime());
								ary.add(json);
								c.add(Calendar.SECOND,1);
								json.put("ele", 0);
								json.put("vol", 0);
								json.put("time", sdf.format(c.getTime()));
								ary.add(json);
			                }else if(cb.getTimeInMillis()-c.getTimeInMillis()>=3000){
								json.put("ele", list.get(i).getFstandardele());
								json.put("vol", list.get(i).getFstandardvol());
								json.put("time", list.get(i).getFweldingtime());
								ary.add(json);
								c.add(Calendar.SECOND,1);
								json.put("ele", 0);
								json.put("vol", 0);
								json.put("time", sdf.format(c.getTime()));
								ary.add(json);
								cb.add(Calendar.SECOND,-1);
								json.put("ele", 0);
								json.put("vol", 0);
								json.put("time", sdf.format(cb.getTime()));
								ary.add(json);
			                }	
						}
/* else if(list.get(i).getFstatus()==7){
			                c.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(list.get(i).getFweldingtime()));
			                c.add(Calendar.SECOND,-1);
							json.put("ele", 0);
							json.put("vol", 0);
							json.put("time", sdf.format(c.getTime()));
							ary.add(json);
						}*/
					}
				}
				pageIndex+=pageSize;
				page = new Page(pageIndex,pageSize,total);
			}while(list.size()==28800);
		}catch(Exception e){
			e.printStackTrace();
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getWpsByMid")
	@ResponseBody
	public String getWpsByMid(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		BigInteger fid = new BigInteger(request.getParameter("fid"));
		try{
			Report repo = reportService.getWps(reportService.getWpsid(fid));
			json.put("maxele", repo.getInsid());
			json.put("minele", repo.getMachid());
			json.put("maxvol", repo.getResult1());
			json.put("minvol", repo.getResult2());
			ary.add(json);
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
}
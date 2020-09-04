package com.spring.controller;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.model.LiveData;
import com.spring.page.Page;
import com.spring.service.InsframeworkService;
import com.spring.service.LiveDataService;
import com.spring.service.WeldingMachineService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/companyChart", produces = { "text/json;charset=UTF-8" })
public class CompanyChartController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private LiveDataService lm;
	
	@Autowired
	private WeldingMachineService wm;
	@Autowired
	private InsframeworkService insm;
	
	IsnullUtil iutil = new IsnullUtil();
	
	@RequestMapping("/goContrast")
	public String goContrast(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/contrast";
	}
	
	/**
	 * 跳转公司工时页面
	 * @return
	 */
	@RequestMapping("/goCompanyHour")
	public String goCompany(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companyHour";
	}
	
	/**
	 * 跳转公司超标页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyOverproof")
	public String goCompanyOverproof(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companyoverproof";
	}
	
	/**
	 * 跳转公司超时待机页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyOvertime")
	public String goCompanyOvertime(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companyovertime";
	}
	
	/**
	 * 跳转公司设备负荷率页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyLoads")
	public String goCompanyLoads(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companyloads";
	}
	
	/**
	 * 跳转公司设备空载率页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyNoLoads")
	public String goCompanyNoLoads(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companynoloads";
	}
	
	/**
	 * 跳转公司闲置率页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyIdle")
	public String goCompanyIdle(HttpServletRequest request){
		String parent = request.getParameter("parent");
		insm.showParent(request, parent);
		lm.getUserId(request);
		request.setAttribute("parent", parent);
		return "companychart/companyidle";
	}
	
	/**
	 * 跳转公司单台设备运行数据统计页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyUse")
	public String goCompanyUse(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/companyuse";
	}
	
	/**
	 * 跳转公司工效页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyEfficiency")
	public String goCompanyEfficiency(HttpServletRequest request){
		String nextparent = request.getParameter("nextparent");
		insm.showParent(request, nextparent);
		lm.getUserId(request);
		request.setAttribute("nextparent",nextparent);
		return "companychart/companyefficiency";
	}

	/**
	 * 跳转焊机最高排行页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyWmMax")
	public String goCompanyWmMax(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/companywmmax";
	}
	
	/**
	 * 跳转焊机最低排行页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyWmMin")
	public String goCompanyWmMin(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/companywmmin";
	}
	
	/**
	 * 跳转焊工最高排行页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyWelderMax")
	public String goCompanyWelderMax(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/companyweldermax";
	}
	
	/**
	 * 跳转焊工最高排行页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goCompanyWelderMin")
	public String goCompanyWelderMin(HttpServletRequest request){
		lm.getUserId(request);
		return "companychart/companyweldermin";
	}
	
	/**
	 * 公司工时报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyHour")
	@ResponseBody
	public String getCompanyHour(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String search = request.getParameter("search");
		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		String s = (String)request.getSession().getAttribute("s");
		if(iutil.isNull(s)){
			dto.setSearch(s);
		}
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		if(iutil.isNull(search)){
			dto.setSearch(search);
		}
		page = new Page(pageIndex,pageSize,total);
		int types = insm.getTypeById(parent),temptype = types;
		String insftype = "fid";
		if(types==20){
			temptype = 21;
			insftype = "companyid";
		}else if(types==21){
			temptype = 22;
			insftype = "caustid";
		}else if(types==22){
			temptype = 23;
		}
		List<LiveData> insf = null;
		if(iutil.isNull(request.getParameter("page"))){
			insf = lm.getAllInsf(page, parent, temptype);
		}else{
			insf = lm.getAllInsf(parent, temptype);
		}
		long total = 0;
		if(insf != null){
			PageInfo<LiveData> pageinfo = new PageInfo<LiveData>(insf);
			total = pageinfo.getTotal();
		}
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<ModelDto> list = lm.getCompanyhour(dto, parent,insftype);
			for(int i=0;i<insf.size();i++){
				json.put("name",insf.get(i).getFname());
				json.put("itemid",insf.get(i).getFid());
				int jidgather = 0;
				double manhour = 0;
				for(int j=0;j<list.size();j++){
					BigInteger insfid = list.get(j).getFid();
					if(types==20){
						insfid = list.get(j).getCompanyid();
					}else if(types==21){
						insfid = list.get(j).getCaustid();
					}
					if(insf.get(i).getFid().equals(insfid)){
						String[] str = list.get(j).getJidgather().split(",");
						if(!list.get(j).getJidgather().equals("0")){
							jidgather = str.length;
						}
						manhour = list.get(j).getHous();
					}
				}
				json.put("jidgather", jidgather);
				json.put("manhour", manhour);
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
	 * 公司超标报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyOverproof")
	@ResponseBody
	public String getCompanyOverproof(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String type = request.getParameter("otype");
		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
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
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		JSONArray arys = new JSONArray();
		JSONArray arys1 = new JSONArray();
		try{
			int types = insm.getTypeById(parent),temptype = types;
			String insftype = "fid";
			if(types==20){
				temptype = 21;
				insftype = "companyid";
			}else if(types==21){
				temptype = 22;
				insftype = "caustid";
			}else if(types==22){
				temptype = 23;
			}
			List<ModelDto> list = lm.getCompanyOverproof(dto,parent,insftype);
			List<LiveData> ins = lm.getAllInsf(parent,temptype);
			double[] num = null;
			for(ModelDto live :time){
				json.put("weldTime",live.getWeldTime());
				arys.add(json);
			}
			for(int i=0;i<ins.size();i++){
				num = new double[time.size()];
				for(int j=0;j<time.size();j++){
					num[j] = 0;
					for(ModelDto l:list){
						BigInteger id = l.getFid();
						if(types==20){
							id = l.getCompanyid();
						}else if(types==21){
							id = l.getCaustid();
						}
						if(ins.get(i).getFid().equals(id) && time.get(j).getWeldTime().equals(l.getWeldTime())){
							num[j] = (double)Math.round(l.getOverproof()*100)/100;
						}
					}
				}
				json.put("overproof",num);
				json.put("name",ins.get(i).getFname());
				json.put("itemid",ins.get(i).getFid());
				arys1.add(json);
			}
			JSONObject object = new JSONObject();
			
			for(int i=0;i<time.size();i++){
				for(int j=0;j<arys1.size();j++){
					JSONObject js = (JSONObject)arys1.get(j);
					String overproof = js.getString("overproof").substring(1, js.getString("overproof").length()-1);
					String[] str = overproof.split(",");
					object.put("a"+j, str[i]);
				}
				object.put("w",time.get(i).getWeldTime());
				ary.add(object);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		obj.put("arys", arys);
		obj.put("arys1", arys1);
		return obj.toString();
	}

	
	/**
	 * 公司超时报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyOvertime")
	@ResponseBody
	public String getCompanyOvertime(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String type = request.getParameter("otype");
		String number = request.getParameter("number");
		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
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
		if(!iutil.isNull(number)){
			number = "0";
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
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		JSONArray arys = new JSONArray();
		JSONArray arys1 = new JSONArray();
		try{
			int types = insm.getTypeById(parent),temptype = types;
			String insftype = "fid";
			if(types==20){
				temptype = 21;
				insftype = "companyid";
			}else if(types==21){
				temptype = 22;
				insftype = "caustid";
			}else if(types==22){
				temptype = 23;
			}
			List<ModelDto> list = lm.getcompanyOvertime(dto, number, parent,insftype);
			List<LiveData> ins = lm.getAllInsf(parent,temptype);
			int[] num = null;
			for(ModelDto live :time){
				json.put("weldTime",live.getWeldTime());
				arys.add(json);
			}
			for(int i=0;i<ins.size();i++){
				num = new int[time.size()];
				for(int j=0;j<time.size();j++){
					num[j] = 0;
					for(ModelDto l:list){
						BigInteger id = l.getFid();
						if(types==20){
							id = l.getCompanyid();
						}else if(types==21){
							id = l.getCaustid();
						}
						if(ins.get(i).getFid().equals(id) && time.get(j).getWeldTime().equals(l.getWeldTime())){
							num[j] = Integer.parseInt(l.getOvertime().toString());
						}
					}
				}
				json.put("overtime",num);
				json.put("name",ins.get(i).getFname());
				json.put("itemid",ins.get(i).getId());
				arys1.add(json);
			}
			JSONObject object = new JSONObject();
			
			for(int i=0;i<time.size();i++){
				for(int j=0;j<arys1.size();j++){
					JSONObject js = (JSONObject)arys1.get(j);
					String overproof = js.getString("overtime").substring(1, js.getString("overtime").length()-1);
					String[] str = overproof.split(",");
					object.put("a"+j, str[i]);
				}
				object.put("w",time.get(i).getWeldTime());
				ary.add(object);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		obj.put("arys", arys);
		obj.put("arys1", arys1);
		return obj.toString();
	}

	/**
	 * 公司负荷率报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyLoads")
	@ResponseBody
	public String getCompanyLoads(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String type = request.getParameter("otype");
		WeldDto dto = new WeldDto();
		dto.setDtoStatus(1);
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
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
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		JSONArray arys = new JSONArray();
		JSONArray arys1 = new JSONArray();
		try{
			int types = insm.getTypeById(parent),temptype = types;
			String insftype = "fid";
			if(types==20){
				temptype = 21;
				insftype = "companyid";
			}else if(types==21){
				temptype = 22;
				insftype = "caustid";
			}else if(types==22){
				temptype = 23;
			}
			List<ModelDto> list = lm.getCompanyLoads(dto,parent,insftype);
			List<ModelDto> machine = lm.getLiveMachineCount(dto, parent,insftype);
			List<LiveData> ins = lm.getAllInsf(parent,temptype);
			double[] num = null;
			for(ModelDto live :time){
				json.put("weldTime",live.getWeldTime());
				arys.add(json);
			}
			for(int i=0;i<ins.size();i++){
				num = new double[time.size()];
				for(int j=0;j<time.size();j++){
					num[j] = 0;
					for(ModelDto l:list){
						for(ModelDto m:machine){
							BigInteger id = l.getFid(),machineid = m.getFid();
							if(types==20){
								id = l.getCompanyid();
								machineid = m.getCompanyid();
							}else if(types==21){
								id = l.getCaustid();
								machineid = m.getCaustid();
							}
							if(m.getWeldTime().equals(l.getWeldTime()) && machineid.equals(id)){
								if(ins.get(i).getFname().equals(l.getFname()) && time.get(j).getWeldTime().equals(l.getWeldTime())){
									num[j] = (double)Math.round(l.getLoads()/m.getLoads()*100*100)/100;
								}
							}
						}
					}
				}
				json.put("loads",num);
				json.put("name",ins.get(i).getFname());
				json.put("itemid",ins.get(i).getId());
				arys1.add(json);
			}
			JSONObject object = new JSONObject();
			
			for(int i=0;i<time.size();i++){
				for(int j=0;j<arys1.size();j++){
					JSONObject js = (JSONObject)arys1.get(j);
					String overproof = js.getString("loads").substring(1, js.getString("loads").length()-1);
					String[] str = overproof.split(",");
					object.put("a"+j, str[i]+"%");
				}
				object.put("w",time.get(i).getWeldTime());
				ary.add(object);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		obj.put("arys", arys);
		obj.put("arys1", arys1);
		return obj.toString();
	}

	/**
	 * 公司空载率报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyNoLoads")
	@ResponseBody
	public String getCompanyNoLoads(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		String type = request.getParameter("otype");
		WeldDto dto = new WeldDto();
		dto.setDtoStatus(0);
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
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
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		JSONArray arys = new JSONArray();
		JSONArray arys1 = new JSONArray();
		try{
			int types = insm.getTypeById(parent),temptype = types;
			String insftype = "fid";
			if(types==20){
				temptype = 21;
				insftype = "companyid";
			}else if(types==21){
				temptype = 22;
				insftype = "caustid";
			}else if(types==22){
				temptype = 23;
			}
			List<ModelDto> list = lm.getCompanyNoLoads(dto,parent,insftype);
			List<ModelDto> machine = lm.getLiveMachineCount(dto, parent,insftype);
			List<LiveData> ins = lm.getAllInsf(parent,temptype);
			double[] num = null;
			for(ModelDto live :time){
				json.put("weldTime",live.getWeldTime());
				arys.add(json);
			}
			for(int i=0;i<ins.size();i++){
				num = new double[time.size()];
				for(int j=0;j<time.size();j++){
					num[j] = 0;
					for(ModelDto l:list){
						for(ModelDto m:machine){
							BigInteger id = l.getFid(),machineid = m.getFid();
							if(types==20){
								id = l.getCompanyid();
								machineid = m.getCompanyid();
							}else if(types==21){
								id = l.getCaustid();
								machineid = m.getCaustid();
							}
							if(m.getWeldTime().equals(l.getWeldTime()) && machineid.equals(id)){
								if(ins.get(i).getFname().equals(l.getFname()) && time.get(j).getWeldTime().equals(l.getWeldTime())){
									BigInteger livecount = lm.getCountByTime(l.getIid(), l.getWeldTime(),null);
									num[j] = (double)Math.round(l.getLoads()/livecount.doubleValue()/m.getLoads()*100*100)/100;
								}
							}
						}
					}
				}
				json.put("loads",num);
				json.put("name",ins.get(i).getFname());
				json.put("itemid",ins.get(i).getId());
				arys1.add(json);
			}
			JSONObject object = new JSONObject();
			
			for(int i=0;i<time.size();i++){
				for(int j=0;j<arys1.size();j++){
					JSONObject js = (JSONObject)arys1.get(j);
					String overproof = js.getString("loads").substring(1, js.getString("loads").length()-1);
					String[] str = overproof.split(",");
					object.put("a"+j, str[i]+"%");
				}
				object.put("w",time.get(i).getWeldTime());
				ary.add(object);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		obj.put("arys", arys);
		obj.put("arys1", arys1);
		return obj.toString();
	}

	
	/**
	 * 公司闲置率报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyIdle")
	@ResponseBody
	public String getCompanyIdle(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String type = request.getParameter("otype");
		String parentId = request.getParameter("parent");
		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
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
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
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
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		JSONArray arys = new JSONArray();
		JSONArray arys1 = new JSONArray();
		try{
			List<ModelDto> list = lm.getCompanyIdle(dto,parent);
			int types = insm.getTypeById(parent),temptype = types;
			if(types==20){
				temptype = 21;
			}else if(types==21){
				temptype = 22;
			}else if(types==22){
				temptype = 23;
			}
			List<LiveData> ins = lm.getAllInsf(parent,temptype);
			double[] num = null;
			for(ModelDto live :time){
				json.put("weldTime",live.getWeldTime());
				arys.add(json);
			}
			for(int i=0;i<ins.size();i++){
				num = new double[time.size()];
				int count = lm.getMachineCount(ins.get(i).getFid());
				for(int j=0;j<time.size();j++){
					num[j] = count;
					for(ModelDto l:list){
						BigInteger id = l.getFid();
						if(types==20){
							id = l.getCompanyid();
						}else if(types==21){
							id = l.getCaustid();
						}
						if(ins.get(i).getFid().equals(id) && time.get(j).getWeldTime().equals(l.getWeldTime())){
							num[j] = count - l.getNum().doubleValue();
						}
					}
				}
				json.put("idle",num);
				json.put("name",ins.get(i).getFname());
				json.put("id",ins.get(i).getFid());
				arys1.add(json);
			}
			JSONObject object = new JSONObject();
			
			for(int i=0;i<time.size();i++){
				for(int j=0;j<arys1.size();j++){
					JSONObject js = (JSONObject)arys1.get(j);
					String overproof = js.getString("idle").substring(1, js.getString("idle").length()-1);
					String[] str = overproof.split(",");
					object.put("a"+j, str[i]);
				}
				object.put("w",time.get(i).getWeldTime());
				ary.add(object);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		obj.put("arys", arys);
		obj.put("arys1", arys1);
		return obj.toString();
	}
	
	/**
	 * 公司单台设备运行数据统计信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyUse")
	@ResponseBody
	public String getCompanyUse(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String type = request.getParameter("type");
		WeldDto dto = new WeldDto();
		lm.getUserId(request);
		String afreshLogin = (String)request.getAttribute("afreshLogin");
		if(iutil.isNull(afreshLogin)){
			return "0";
		}
		BigInteger typeid = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(type)){
			typeid = new BigInteger(type);
		}
		page = new Page(pageIndex,pageSize,total);
		List<ModelDto> list = lm.getCompanyUse(page, dto, typeid);
		long total = 0;
		if(list != null){
			PageInfo<ModelDto> pageinfo = new PageInfo<ModelDto>(list);
			total = pageinfo.getTotal();
		}
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(ModelDto l:list){
				double num = wm.getMachineCountByManu(l.getFid(),typeid).doubleValue();
				double time = (double)Math.round(l.getTime()/num*100)/100;
				json.put("time", time);
				json.put("fname", l.getFname());
				json.put("fid",l.getFid());
				json.put("num", num);
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
	 * 下拉框
	 * @return
	 */
	@RequestMapping("getCaust")
	@ResponseBody
	public String getCaust(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		BigInteger parent = null;
		//数据权限处理
		BigInteger uid = lm.getUserId(request);
		String afreshLogin = (String)request.getAttribute("afreshLogin");
		if(iutil.isNull(afreshLogin)){
			json.put("id", 0);
			json.put("name", "无");
			ary.add(json);
			obj.put("ary", ary);
			return obj.toString();
		}
		parent = insm.getUserInsfId(uid);
		int types = insm.getTypeById(parent),temptype = types;
		if(types==20){
			temptype = 21;
		}else if(types==21){
			temptype = 22;
		}else if(types==22){
			temptype = 23;
		}
		try{
			List<LiveData> list = lm.getAllInsf(parent, temptype);
			for(int i=0;i<list.size();i++){
				json.put("id", list.get(i).getFid());
				json.put("name", list.get(i).getFname());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 公司工效报表信息查询
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCompanyEfficiency")
	@ResponseBody
	public String getCompanyEfficiency(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		WeldDto dto = new WeldDto();
		BigInteger parent = null;
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = insm.getUserInsframework();
		}
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		page = new Page(pageIndex,pageSize,total);
		int types = insm.getTypeById(parent);
		String insftype = "fid";
		if(types==20){
			insftype = "companyid";
		}else if(types==21){
			insftype = "caustid";
		}
		List<ModelDto> list = lm.companyEfficiency(page, parent, dto,insftype);
		PageInfo<ModelDto> pageinfo = new PageInfo<ModelDto>(list);
		long total = pageinfo.getTotal();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(ModelDto m : list){
				BigInteger id = m.getFid();
				String name = m.getFname();
				if(types==20){
					id = m.getCompanyid();
					name = m.getCompanyname();
				}else if(types==21){
					id = m.getCaustid();
					name = m.getCaustname();
				}
				json.put("id",id);
				json.put("iname",name);
				json.put("wname",m.getWname());
				json.put("wid",m.getFwelder_id());
				String[] str = m.getJidgather().split(",");
				double weldtime = (double)Math.round(Double.valueOf(m.getWeldTime())*100)/100;
				json.put("weldtime",weldtime);
				json.put("num",str.length);
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
	 * 获取焊机最高/低排行
	 * @param request
	 * @return
	 */
	@RequestMapping("getCompanyWmList")
	@ResponseBody
	public String getCompanyWmList(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		int status = Integer.parseInt(request.getParameter("status"));

		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			dto.setParent(new BigInteger(parentId));
		}
		dto.setDtoStatus(status);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		try{
			List<ModelDto> list = lm.getWeldingmachineList(dto);
			for(ModelDto m:list){
				json.put("num", m.getLoads());
				json.put("equipment", m.getFname());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
	}


	/**
	 * 获取焊工最高/低排行
	 * @param request
	 * @return
	 */
	@RequestMapping("getCompanyWerderList")
	@ResponseBody
	public String getCompanyWerderList(HttpServletRequest request){
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String parentId = request.getParameter("parent");
		int status = Integer.parseInt(request.getParameter("status"));

		WeldDto dto = new WeldDto();
		if(!iutil.isNull(parentId)){
			//数据权限处理
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		if(iutil.isNull(time1)){
			dto.setDtoTime1(time1);
		}
		if(iutil.isNull(time2)){
			dto.setDtoTime2(time2);
		}
		if(iutil.isNull(parentId)){
			dto.setParent(new BigInteger(parentId));
		}
		dto.setDtoStatus(status);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		try{
			List<ModelDto> list = lm.getWelderList(dto);
			for(ModelDto m:list){
				json.put("num", m.getLoads());
				json.put("equipment", m.getFname());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 获取工效图表信息
	 * @param request
	 * @param parent
	 * @return
	 */
	@RequestMapping("/getCaustEfficiencyChart")
	@ResponseBody
	public String getCaustEfficiency(HttpServletRequest request,@RequestParam BigInteger parent){
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			String time1 = request.getParameter("dtoTime1");
			String time2 = request.getParameter("dtoTime2");
			String parentid = request.getParameter("parent");
			WeldDto dto = new WeldDto();
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			if(iutil.isNull(parentid)){
				parent = new BigInteger(parentid);
			}else{
				parent = insm.getUserInsframework();
			}
			List<ModelDto> list = lm.getEfficiencyChartNum(dto, parent);
			List<ModelDto> efficiency = null;
			String[] num1 = new String[10];
			double[] num2 = new double[10];
			int oldnum = 0,newnum = 0,maxnum = 0;
			for(ModelDto m:list){
				if(m!=null){
					if(m.getAvgnum()==0){
						m.setAvgnum(2);
						if(m.getMinnum()>0){
							num1[0] = m.getMinnum()-1+"-"+(m.getMinnum()+m.getAvgnum());
						}else{
							num1[0] = m.getMinnum()+"-"+(m.getMinnum()+m.getAvgnum());
						}
						for(int i=1;i<10;i++){
							oldnum = m.getMinnum()+m.getAvgnum()*i+1;
							newnum = m.getMinnum()+m.getAvgnum()*(i+1);
							num1[i] = oldnum+"-"+newnum;
						}
					}else{
						if(m.getMinnum()>0){
							num1[0] = m.getMinnum()-1+"-"+(m.getMinnum()+m.getAvgnum());
						}else{
							num1[0] = m.getMinnum()+"-"+(m.getMinnum()+m.getAvgnum());
						}
						for(int i=1;i<9;i++){
							oldnum = m.getMinnum()+m.getAvgnum()*i+1;
							newnum = m.getMinnum()+m.getAvgnum()*(i+1);
							num1[i] = oldnum+"-"+newnum;
						}
						maxnum = m.getMinnum()+m.getAvgnum()*10+10;
						num1[9] = newnum+"-"+maxnum;
					}
					efficiency = lm.getEfficiencyChart(dto, parent, m.getMinnum(), m.getAvgnum());
					for(ModelDto e:efficiency){
						double sum = e.getSum1()+e.getSum2()+e.getSum3()+e.getSum4()+e.getSum5()+e.getSum6()+e.getSum7()+e.getSum8()+e.getSum9()+e.getSum10();
						num2[0] = e.getSum1()/sum*100;num2[1] = e.getSum2()/sum*100;
						num2[2] = e.getSum3()/sum*100;num2[3] = e.getSum4()/sum*100;
						num2[4] = e.getSum5()/sum*100;num2[5] = e.getSum6()/sum*100;
						num2[6] = e.getSum7()/sum*100;num2[7] = e.getSum7()/sum*100;
						num2[8] = e.getSum9()/sum*100;num2[9] = e.getSum10()/sum*100;
					}
					for(int i=0;i<num2.length;i++){
						num2[i] = (double)Math.round(num2[i]*100)/100;
					}
					json.put("num1", num1);
					json.put("num2", num2);
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
	 * 获取焊口分类信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getItemHousClassify")
	@ResponseBody
	public String getItemHousClassify(HttpServletRequest request){
		String parentId = request.getParameter("item");
		String searchStr = request.getParameter("searchStr");
		if(!iutil.isNull(parentId)){
			//处理用户数据权限
			BigInteger uid = lm.getUserId(request);
			String afreshLogin = (String)request.getAttribute("afreshLogin");
			if(iutil.isNull(afreshLogin)){
				return "0";
			}
			parentId = insm.getUserInsfId(uid).toString();
		}
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = insm.getUserInsframework();
		}
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		page = new Page(pageIndex,pageSize,total);
		List<ModelDto> list = lm.getHousClassify(page, parent, searchStr);
		PageInfo<ModelDto> pageinfo = new PageInfo<ModelDto>(list);
		long total = pageinfo.getTotal();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			String s = "";
			for(ModelDto m : list){
				json.put("fid",m.getFid());
				json.put("material",m.getMaterial());
				json.put("nextmaterial",m.getNextmaterial());
				json.put("wall_thickness",m.getWallThickness());
				json.put("nextwall_thickness",m.getNextwallThickness());
				json.put("external_diameter",m.getExternalDiameter());
				json.put("nextExternal_diameter",m.getNextexternaldiameter());
				ary.add(json);
				s = " (fmaterial='"+list.get(0).getMaterial()+"' and fexternal_diameter='"+list.get(0).getExternalDiameter()+
						"' and fwall_thickness='"+list.get(0).getWallThickness()+"' and fnextExternal_diameter='"+list.get(0).getNextexternaldiameter()+
						"' and fnextwall_thickness ='"+list.get(0).getNextwallThickness()+"' and Fnext_material ='"+list.get(0).getNextmaterial()+"')";
			}
			request.getSession().setAttribute("s", s);
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}

}

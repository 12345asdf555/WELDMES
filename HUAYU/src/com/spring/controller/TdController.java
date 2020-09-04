package com.spring.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.util.IsnullUtil;
import com.spring.model.Insframework;
import com.spring.model.MyUser;
import com.spring.model.Person;
import com.spring.model.Td;
import com.spring.model.WeldingMachine;
import com.spring.service.InsframeworkService;
import com.spring.service.LiveDataService;
import com.spring.service.PersonService;
import com.spring.service.TdService;
import com.spring.service.WeldingMachineService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/td",produces = { "text/json;charset=UTF-8" })
public class TdController {
	
	@Autowired
	private TdService tdService;
	@Autowired
	private LiveDataService lm;
	@Autowired
	private InsframeworkService insm;
	@Autowired
	private PersonService ps;
	@Autowired
	private WeldingMachineService wm;
	
	
	IsnullUtil iutil = new IsnullUtil();
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/AllTdbf")
	@ResponseBody
	public String Alltdbf(HttpServletRequest request){
		String websocket = request.getSession().getServletContext().getInitParameter("websocket");
//		request.setAttribute("web_socket", websocket);
		JSONObject obj = new JSONObject();
		obj.put("web_socket", websocket);
		return obj.toString();
	}
	
	@RequestMapping("/AllTd")
	public String Alltd(HttpServletRequest request){
/*		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		long uid = myuser.getId();
		String insname = tdService.findInsname(tdService.findIns(uid));
		request.setAttribute("insname", insname);*/
		return "td/newCurve";
	}
	
	@RequestMapping("/goNextcurve")
	public String goNextcurve(HttpServletRequest request){
		lm.getUserId(request);
	    String value = request.getParameter("value");
	    String valuename = request.getParameter("valuename");
	    String type = request.getParameter("type");
	    request.setAttribute("value", value);
	    request.setAttribute("valuename", valuename);
	    request.setAttribute("type", type);
		return "td/nextCurve";
	}
	
	@RequestMapping("/AllTdd")
	public String AllTdd(HttpServletRequest request){
		request.setAttribute("divi", request.getParameter("value"));
		return "/division";
	}
	
	@RequestMapping("/AllTddp")
	public String AllTddp(HttpServletRequest request){
		request.setAttribute("proj", request.getParameter("value"));
		return "/project";
	}
	
	@RequestMapping("/AllTdp")
	public String AllTdp(HttpServletRequest request){
		return "/project";
	}
	
	@RequestMapping("/AllTdad")
	@ResponseBody
	public String AllTdad(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		String eq = request.getParameter("e");
		String an = request.getParameter("a");
		String vo = request.getParameter("v");
		String value = request.getParameter("value");
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			String[] equ = eq.split(",");
			String[] anp = an.split(",");
			String[] vol = vo.split(",");
			System.out.println(equ);
			for(int i = 0;i < equ.length;i++)
			{
				if(value.equals(equ[i])){
				json.put("voltage",vol[i]);
				json.put("electricity",anp[i]);
				ary.add(json);
				}
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
		
	}
	
	@RequestMapping("/AllTda")
	public String AllTda(HttpServletRequest request){
		request.setAttribute("av", request.getParameter("value"));
		return "/AV";
	}
	
	@RequestMapping("/getAllTd")
	@ResponseBody
	public String getAllTd(HttpServletRequest request){
		
		JSONObject obj = new JSONObject();
		String da = request.getParameter("data");
/*		System.out.println(da);*/
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(int i = 0;i < da.length();i+=53)
			{
				json.put("fstatus_id", da.substring(0+i, 2+i));
				json.put("finsframework_id", da.substring(2+i, 4+i));
				json.put("fequipment_no", da.substring(4+i, 8+i));
				json.put("fwelder_no", da.substring(8+i, 12+i));
				json.put("voltage", da.substring(12+i, 16+i));
				json.put("electricity", da.substring(16+i, 20+i));
				json.put("time", da.substring(20+i, 41+i));
				json.put("maxele", da.substring(41+i, 44+i));
				json.put("minele", da.substring(44+i, 47+i));
				json.put("maxvol", da.substring(47+i, 50+i));
				json.put("minvol", da.substring(50+i, 53+i));
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllTddiv")
	@ResponseBody
	public String getAllTddiv(HttpServletRequest request){
		
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		JSONObject obj = new JSONObject();
		long uid = myuser.getId();
		List<Td> findAlld = tdService.findAlldiv(tdService.findIns(uid));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:findAlld)
			{
				json.put("fid", td.getFdi());
				json.put("fname", td.getFdn());
				json.put("fparent", td.getFdp());
				json.put("ftype", td.getFdt());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllTdp")
	@ResponseBody
	public String getAllTdp(HttpServletRequest request){
		
		JSONObject obj = new JSONObject();
		String da = request.getParameter("data");
		System.out.println(da);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(int i = 0;i < da.length();i+=53)
			{
				json.put("fstatus_id", da.substring(0+i, 2+i));
				json.put("finsframework_id", da.substring(2+i, 4+i));
				json.put("fequipment_no", da.substring(4+i, 8+i));
				json.put("fwelder_no", da.substring(8+i, 12+i));
				String weldname = tdService.findweld(da.substring(8+i, 12+i));
				json.put("fname", weldname);
				json.put("voltage", da.substring(12+i, 16+i));
				json.put("electricity", da.substring(16+i, 20+i));
				json.put("time", da.substring(20+i, 41+i));
				json.put("maxele", da.substring(41+i, 44+i));
				json.put("minele", da.substring(44+i, 47+i));
				json.put("maxvol", da.substring(47+i, 50+i));
				json.put("minvol", da.substring(50+i, 53+i));
				String position = tdService.findPosition(da.substring(4+i,8+i));
				json.put("fposition", position);
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllTdp1")
	@ResponseBody
	public String getAllTdp1(HttpServletRequest request){
		
		JSONObject obj = new JSONObject();
		long uid = Long.parseLong(request.getParameter("ins"));
		List<Td> findAllpro = tdService.findAlldiv(uid);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:findAllpro){
				json.put("fid", td.getFdi());
				json.put("fname", td.getFdn());
				json.put("fparent", td.getFdp());
				json.put("ftype", td.getFdt());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllTdp2")
	@ResponseBody
	public String getAllTdp2(HttpServletRequest request){
		
		JSONObject obj = new JSONObject();
		String insname = request.getParameter("div");
		long insid = tdService.findInsid(insname);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			
				json.put("fid", insid);
				ary.add(json);
			
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllTdd")
	@ResponseBody
	public String getAllTdd(HttpServletRequest request){
		
		JSONObject obj = new JSONObject();
		String insname = request.getParameter("div");
		long insid = tdService.findInsid(insname);
		List<Td> findAlld = tdService.findAlldiv(insid);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:findAlld)
			{
				json.put("fid", td.getFdi());
				json.put("fname", td.getFdn());
				json.put("fparent", td.getFdp());
				json.put("ftype", td.getFdt());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getWeld")
	@ResponseBody
	public String getWeld(HttpServletRequest request){
		
		String weldid = request.getParameter("weldid");
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
				json.put("fweldname",tdService.findweld(weldid));
				ary.add(json);
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getPosition")
	@ResponseBody
	public String getPosition(HttpServletRequest request){
		
		String equip = request.getParameter("equip");
		String eee = tdService.findPosition(equip);
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
				json.put("fpositin",eee);
				ary.add(json);
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllPosition")
	@ResponseBody
	public String getAllPosition(HttpServletRequest request){
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			MyUser myuser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			List<Insframework> insframework = insm.getInsByUserid(BigInteger.valueOf(myuser.getId()));
			parent = insframework.get(0).getId();
		}
		List<Td> getAP = tdService.getAllPosition(parent);
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:getAP){
				json.put("fid",td.getId());
				json.put("fequipment_no", td.getFequipment_no());
				json.put("fposition", td.getFposition());
				json.put("finsid", td.getFci());
				json.put("finsname", td.getFcn());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getMachine")
	@ResponseBody
	public String getMachine(HttpServletRequest request){
		String mach = request.getParameter("mach");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		List<Td> getAP = tdService.getMachine(new BigInteger(mach),parent);
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:getAP){
				json.put("fid",td.getId());
				json.put("fequipment_no", td.getFequipment_no());
				json.put("fposition", td.getFposition());
				json.put("finsid", td.getFci());
				json.put("finsname", td.getFcn());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
/*	@RequestMapping("/isnull")
	@ResponseBody
	public String isnull(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		List<Td> getAP = tdService.getAllPosition();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:getAP){
				json.put("fequipment_no",td.getFequipment_no());
				json.put("fposition", td.getFposition());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}*/
	
	@RequestMapping("/geInsname")
	@ResponseBody
	public String geInsname(HttpServletRequest request){
		
		int iid =  Integer.parseInt(request.getParameter("iid"));
		String insname = tdService.findInsname(iid);;
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
				json.put("fid", insname);
				ary.add(json);
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/allWeldname")
	@ResponseBody
	public String allWeldname(HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Insframework> insframework = insm.getInsByUserid(BigInteger.valueOf(myuser.getId()));
		BigInteger parent = insframework.get(0).getId();
		List<Td> fwn = tdService.allWeldname(parent);	
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			for(Td td:fwn){
				json.put("fname",td.getFname());
				json.put("fwelder_no", td.getFwelder_no());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getLiveWelder")
	@ResponseBody
	public String getLiveWelder(HttpServletRequest request){
		BigInteger uid = lm.getUserId(request);
		BigInteger parent = null;
		String parentId = request.getParameter("parent");
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = insm.getUserInsfId(uid);
		}
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		try{
			List<Person> list = ps.findAll(parent);
			Insframework insname = insm.getInsById(parent);
			for(int i=0;i<list.size();i++){
				json.put("fid",list.get(i).getId());
				json.put("fname",list.get(i).getName());
				json.put("fwelder_no", list.get(i).getWelderno());
				json.put("fitemid", list.get(i).getInsid());
				json.put("fitemname", insname.getName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getLiveMachine")
	@ResponseBody
	public String getLiveMachine(HttpServletRequest request){
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		JSONObject obj = new JSONObject();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
			List<Td> getAP = tdService.getAllPosition(parent);
			try{
				for(Td td:getAP){
					json.put("fid",td.getId());
					json.put("fequipment_no", td.getFequipment_no());
					json.put("fposition", td.getFposition());
					json.put("finsid", td.getFci());
					json.put("finsname", td.getFcn());
					if(td.getModel().contains("NB")){
						json.put("model", 1);
					}else if(td.getModel().contains("CPVE")){
						json.put("model", 2);
					}else if(td.getModel().contains("EP")){
						json.put("model", 3);
					}else if(td.getModel().contains("WB")){
						json.put("model", 4);
					}else if(td.getModel().contains("SPC")){
						json.put("model", 5);
					}else{
						json.put("model", 0);
					}
					ary.add(json);
				}
			}catch(Exception e){
				e.getMessage();
			}
		}else{
			MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
				    .getAuthentication()  
				    .getPrincipal();
			long uid = myuser.getId();
			List<Insframework> insframework = insm.getInsByUserid(BigInteger.valueOf(uid));
			parent = insframework.get(0).getId();
			if(insframework.get(0).getType()==20){
				List<Td> getAP = tdService.getAllPosition(parent);
				try{
					for(Td td:getAP){
						json.put("fid",td.getId());
						json.put("fequipment_no", td.getFequipment_no());
						json.put("fposition", td.getFposition());
						json.put("finsid", td.getFci());
						json.put("finsname", td.getFcn());
						if(td.getModel().contains("NB")){
							json.put("model", 1);
						}else if(td.getModel().contains("CPVE")){
							json.put("model", 2);
						}else if(td.getModel().contains("EP")){
							json.put("model", 3);
						}else if(td.getModel().contains("WB")){
							json.put("model", 4);
						}else{
							json.put("model", 0);
						}
						ary.add(json);
					}
				}catch(Exception e){
					e.getMessage();
				}
			}else{
				List<Insframework> in = insm.getInsIdByParent(insm.getInsByUserid(BigInteger.valueOf(uid)).get(0).getId(),24);
				List<Td> getAP = tdService.getAllPosition(parent);
				try{
					for(Td td:getAP){
						for(Insframework ins:in){
							if(td.getFci()==Integer.valueOf(ins.getId().toString())){
								json.put("fid",td.getId());
								json.put("fequipment_no", td.getFequipment_no());
								json.put("fposition", td.getFposition());
								json.put("finsid", td.getFci());
								json.put("finsname", td.getFcn());
								if(td.getModel().contains("NB")){
									json.put("model", 1);
								}else if(td.getModel().contains("CPVE")){
									json.put("model", 2);
								}else if(td.getModel().contains("EP")){
									json.put("model", 3);
								}else if(td.getModel().contains("WB")){
									json.put("model", 4);
								}else{
									json.put("model", 0);
								}
								ary.add(json);
							}
						}
					}
				}catch(Exception e){
					e.getMessage();
				}
			}
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getLiveTime")
	@ResponseBody
	public String getLiveTime(HttpServletRequest request){
		JSONObject json = new JSONObject();
		try{
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String time = sdf.format(new Date());
			Td list = tdService.getLiveTime(time, new BigInteger(request.getParameter("machineid")));
			WeldingMachine machinelist = wm.getWeldingMachineById(new BigInteger(request.getParameter("machineid")));
			json.put("machineno", machinelist.getTypename());
			if(list!=null){
				json.put("worktime",list.getWorktime());
				json.put("time",list.getTime());
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return json.toString();
	}
}
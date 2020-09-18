package com.spring.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.EquipmentAppointment;
import com.spring.model.MyUser;
import com.spring.model.User;
import com.spring.model.Welder;
import com.spring.page.Page;
import com.spring.service.EquipmentAppointmentService;
import com.spring.service.InsframeworkService;
import com.spring.service.UserService;
import com.spring.service.WelderService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 设备预约审核
 * @author zhushanlong
 */
@Controller
@RequestMapping(value = "/equipmentAudit", produces = { "text/json;charset=UTF-8" })
public class EquipmentAuditController {
	private final static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**
	 * 分页
	 */
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	IsnullUtil iutil = new IsnullUtil();
	@Autowired
	private InsframeworkService im;
	
	@Autowired
	private EquipmentAppointmentService eas;
	@Autowired
	private WelderService ws;
	@Autowired
	private UserService userService;
	
	/**
	 * 设备预约审核
	 * @return
	 */
	@RequestMapping("/goEquipmentAudit")
	public String goWeldingMahine(Model model){
		return "equipmentAudit/equipmentAudit";
	}
	
	/**
	 * 显示焊机预约审核列表
	 * @return
	 */
	@RequestMapping("/getEquipmentAuditList")
	@ResponseBody
	public String getEquipmentAppointment(HttpServletRequest request){
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
		
		MyUser myuser = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (null != myuser) {
			searchStr = "tea.user_id = "+myuser.getId();
		}
		
		//查询焊机设备状态为‘启用’的设备数据
		List<EquipmentAppointment> list = eas.getEquipmentAuditAll(page, parent, searchStr);
		
		long total = 0;
		if(list != null){
			PageInfo<EquipmentAppointment> pageinfo = new PageInfo<EquipmentAppointment>(list);
			total = pageinfo.getTotal();
		}
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(EquipmentAppointment wm : list){
				json.put("id", wm.getId());
				json.put("appointmentDatetime", wm.getAppointmentDatetime());
				json.put("giveBackDatetime", wm.getGiveBackDatetime());
				json.put("checkDatetime", wm.getCheckDatetime());
				json.put("fmachine_status", wm.getFmachineStatus());
				json.put("appointment_message", wm.getAppointmentMessage());
				json.put("check_message", wm.getCheckMessage());
				json.put("remark", wm.getRemark());
				json.put("check_status", wm.getCheckStatus());
				json.put("userId", wm.getUserId());
				//根据焊机id查询最新的一条预约列表数据
				Welder welder = ws.getWelderForFid(wm.getFwelderId());
				if(null != welder){
					json.put("welderInfo", welder.getWelderno()+" ("+welder.getName()+")");
					json.put("welderId", welder.getId());		//焊工id
					json.put("welderno", welder.getWelderno());	//焊工编号
				}else{
					json.put("welderInfo","");
					json.put("welderId","");
					json.put("welderno", "");
				}
				//根据用户id查询用户信息
				User user = userService.getUserInsframework(BigInteger.valueOf(wm.getUserId()));
				if (null != user){
					json.put("userInfo", user.getUserName()+" ("+user.getUserPosition()+")");
				}else{
					json.put("userInfo", "");
				}
				json.put("create_time", wm.getCreateTime());
				json.put("fid", wm.getFid());
				json.put("ip", wm.getIp());
				json.put("equipmentNo", wm.getEquipmentNo());
				json.put("position", wm.getPosition());
				json.put("gatherId", wm.getGatherId());
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
				if(wm.getInsframeworkId()!=null && !"".equals(wm.getInsframeworkId())){
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
	 * 设备审核
	 * @param request
	 * @return
	 */
	@RequestMapping("/addEquipmentAudit")
	@ResponseBody
	public String addEquipmentAudit(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		EquipmentAppointment appointment = new EquipmentAppointment();
		try{
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String id = request.getParameter("id");
			String check_status = request.getParameter("check_status");		//审核状态
			String checkMessage = request.getParameter("checkMessage");		//审核内容
			
			appointment.setId(BigInteger.valueOf(Long.valueOf(id)));
			appointment.setCheckStatus(Integer.valueOf(check_status));
			appointment.setCheckDatetime(sdf.format(System.currentTimeMillis()));
			appointment.setCheckMessage(checkMessage);
			appointment.setMender(user.getId());
			int i = eas.editEquipmentAppointment(appointment);
			if (i != 0) {
				obj.put("success", true);
			}else {
				obj.put("success", false);
			}
		}catch (Exception e) {
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
			e.printStackTrace();
		}
		return obj.toString();
	}
	
	/**
	 * 编辑设备审核
	 * @param request
	 * @return
	 */
	@RequestMapping("/editEquipmentAudit")
	@ResponseBody
	public String editEquipmentAudit(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
			EquipmentAppointment appointment = new EquipmentAppointment();
			MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String id = request.getParameter("id");
			String check_status = request.getParameter("check_status");		//审核状态
			String checkMessage = request.getParameter("checkMessage");		//审核内容
			
			appointment.setId(BigInteger.valueOf(Long.valueOf(id)));
			appointment.setCheckStatus(Integer.valueOf(check_status));
			appointment.setCheckMessage(checkMessage);
			appointment.setCheckDatetime(sdf.format(System.currentTimeMillis()));
			appointment.setMender(user.getId());
			int i = eas.editEquipmentAppointment(appointment);
			if (i != 0) {
				obj.put("success", true);
			}else {
				obj.put("success", false);
			}
		}catch (Exception e) {
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
			e.printStackTrace();
		}
		return obj.toString();
	}
}

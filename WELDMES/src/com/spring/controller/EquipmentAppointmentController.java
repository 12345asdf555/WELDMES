package com.spring.controller;


import java.math.BigInteger;
import java.text.ParseException;
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
 * 设备预约管理
 * 
 * @author zhushanlong
 */
@Controller
@RequestMapping(value = "/equipmentAppointment", produces = { "text/json;charset=UTF-8" })
public class EquipmentAppointmentController{

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
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
	 * 设备预约管理
	 * 
	 * @return
	 */
	@RequestMapping("/goEquipmentAppointment")
	public String goWeldingMahine(Model model) {
		return "equipmentAppointment/equipmentAppointment";
	}

	/**
	 * 显示焊机预约列表
	 * 
	 * @return
	 */
	@RequestMapping("/getEquipmentAppointmentList")
	@ResponseBody
	public String getEquipmentAppointment(HttpServletRequest request) {
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if (iutil.isNull(parentId)) {
			parent = new BigInteger(parentId);
		} else {
			parent = im.getUserInsframework();
		}
		request.getSession().setAttribute("searchStr", searchStr);
		page = new Page(pageIndex, pageSize, total);

		// 查询焊机设备状态为‘启用’的设备数据
		List<EquipmentAppointment> list = eas.getEquipmentAppointmentAll(page, parent, searchStr);
		long total = 0;
		if (list != null) {
			PageInfo<EquipmentAppointment> pageinfo = new PageInfo<EquipmentAppointment>(list);
			total = pageinfo.getTotal();
		}
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try {
			for (EquipmentAppointment wm : list) {
				json.put("fid", wm.getFid());	//焊机id
				json.put("ip", wm.getIp());
				json.put("equipmentNo", wm.getEquipmentNo());
				json.put("position", wm.getPosition());
				json.put("gatherId", wm.getGatherId());
				json.put("isnetworkingId", wm.getIsnetworking());
				json.put("joinTime", wm.getJoinTime());
				json.put("typeName", wm.getTypename());
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
				if (wm.getInsframeworkId() != null && !"".equals(wm.getInsframeworkId())) {
					json.put("insframeworkName", wm.getInsframeworkId().getName());
					json.put("iId", wm.getInsframeworkId().getId());
				}
				if (wm.getModel() != null && !("").equals(wm.getModelname())) {
					json.put("model", wm.getModel());
					json.put("modelname", wm.getModelname());
				} else {
					json.put("model", null);
					json.put("modelname", null);
				}
				if (wm.getGatherId() != null && !("").equals(wm.getGatherId())) {
					json.put("gatherId", wm.getGatherId().getGatherNo());
					json.put("gid", wm.getGatherId().getId());
				} else {
					json.put("gatherId", null);
					json.put("gid", null);
				}
				ary.add(json);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}

	/**
	 * 根据焊机id查询预约列表，展示详细信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getEquipmentListForFmachineId")
	@ResponseBody
	public String getEquipmentListForFmachineId(HttpServletRequest request) {
		String fmachine_id = request.getParameter("fmachineId");
		BigInteger fmachineId = BigInteger.valueOf(0);
		if (null != fmachine_id && !"".equals(fmachine_id)){
			fmachineId = BigInteger.valueOf(Long.valueOf(fmachine_id));
		}
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject obj = new JSONObject();
		List<EquipmentAppointment> list = eas.getEquipmentListForFmachineId(fmachineId);
		int total = eas.countEquipmentByFmachineId(fmachineId);
		if (null != list && list.size() > 0){
			for (EquipmentAppointment equipment : list) {
				json.put("id", equipment.getId());
				json.put("fmachineId", equipment.getFmachineId());
				json.put("fwelderId", equipment.getFwelderId());
				// 根据焊工id查询焊工信息
				Welder welder = ws.getWelderForFid(equipment.getFwelderId());
				if (null != welder) {
					json.put("welderInfo", welder.getWelderno() + " (" + welder.getName() + ")");
					json.put("welderno", welder.getWelderno()); // 焊工编号
				} else {
					json.put("welderInfo", "");
					json.put("welderno", "");
				}
				json.put("fmachineStatus", equipment.getFmachineStatus());
				json.put("appointmentMessage", equipment.getAppointmentMessage());
				json.put("checkMessage", equipment.getCheckMessage());
				json.put("remark", equipment.getRemark());
				json.put("checkStatus", equipment.getCheckStatus());
				json.put("userId", equipment.getUserId());
				// 根据用户id查询用户信息
				User user = userService.getUserInsframework(BigInteger.valueOf(equipment.getUserId()));
				if (null != user) {
					json.put("userInfo", user.getUserName() + " (" + user.getUserPosition() + ")");
				} else {
					json.put("userInfo", "");
				}
				json.put("createTime", equipment.getCreateTime());
				json.put("checkDatetime", equipment.getCheckDatetime());
				json.put("appointmentDatetime", equipment.getAppointmentDatetime());
				json.put("giveBackDatetime", equipment.getGiveBackDatetime());
				ary.add(json);
			}
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	/**
	 * 新增设备预约
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/addEquipmentAppointment")
	@ResponseBody
	public String addEquipmentAppointment(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		EquipmentAppointment appointment = new EquipmentAppointment();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String welderno = request.getParameter("fwelderno"); // 焊工编号
			BigInteger fwelderId = ws.getWelderIdForWelderNo(welderno); // 根据焊工编号查询焊工id
			String appointmentMessage = request.getParameter("appointmentMessage");
			String remarks = request.getParameter("remarks");
			String userId = request.getParameter("userId");
			String fid = request.getParameter("fid");
			String giveBackDatetime = request.getParameter("giveBackDatetime");
			String appointmentDatetime = request.getParameter("appointmentDatetime");

			appointment.setCreator(user.getId());
			appointment.setFmachineId(Long.valueOf(fid)); // 焊机id
			appointment.setFwelderId(fwelderId); // 焊工id
			appointment.setFmachineStatus(Integer.valueOf(0).intValue()); // 预约状态：预约中
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckMessage("");
			appointment.setRemark(remarks);
			appointment.setCheckStatus(Integer.valueOf(1)); // 审核状态：待审核
			appointment.setUserId(Long.valueOf(userId)); // 审核人id
			appointment.setGiveBackDatetime(giveBackDatetime);
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setCreateTime(sdf.format(System.currentTimeMillis()));
			eas.addEquipmentAppointment(appointment);
			obj.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}

	/**
	 * 编辑设备预约
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/editEquipmentAppointment")
	@ResponseBody
	public String editEquipmentAppointment(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		EquipmentAppointment appointment = new EquipmentAppointment();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String welderno = request.getParameter("fwelderno"); // 焊工编号
			BigInteger fwelderId = ws.getWelderIdForWelderNo(welderno); // 根据焊工编号查询焊工id
			String appointmentMessage = request.getParameter("appointmentMessage");
			String remarks = request.getParameter("remarks");
			String userId = request.getParameter("userId");
			String fid = request.getParameter("fid");
			String id = request.getParameter("id");
			String giveBackDatetime = request.getParameter("giveBackDatetime");
			String appointmentDatetime = request.getParameter("appointmentDatetime");
			String checkMessage = request.getParameter("checkMessage");

			appointment.setMender(user.getId());
			appointment.setFmachineId(Long.valueOf(fid)); // 焊机id
			appointment.setFwelderId(fwelderId); // 焊工id
			appointment.setFmachineStatus(Integer.valueOf(0).intValue()); // 焊机状态：预约中
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckMessage(checkMessage);
			appointment.setRemark(remarks);
			appointment.setCheckStatus(Integer.valueOf(1)); // 审核状态：待审核
			appointment.setUserId(Long.valueOf(userId)); // 审核人id
			appointment.setGiveBackDatetime(giveBackDatetime);
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setId(BigInteger.valueOf(Long.valueOf(id)));
			int i = eas.editEquipmentAppointment(appointment);
			if (i != 0) {
				obj.put("success", true);
			}else {
				obj.put("success", false);
			}
		} catch (Exception e) {
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
			e.printStackTrace();
		}
		return obj.toString();
	}

	/**
	 * 根据焊工编号判断焊工是否存在
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/findWelderByWelderNo")
	@ResponseBody
	public String findWelderByWelderNo(HttpServletRequest request) {
		String fwelderno = request.getParameter("fwelderno");
		int countWelder = ws.getWeldernoCount(fwelderno);
		JSONObject obj = new JSONObject();
		if (countWelder == 0) { // 没有该焊工编号
			obj.put("success", false);
		} else {
			obj.put("success", true);
		}
		return obj.toString();
	}

	/**
	 * 取消设备预约
	 * @param request
	 * @return
	 */
	@RequestMapping("/cancelAppointment")
	@ResponseBody
	public String cancelAppointment(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String id = request.getParameter("id");
			EquipmentAppointment appointment = new EquipmentAppointment();
			appointment.setId(BigInteger.valueOf(Long.valueOf(id)));
			appointment.setMender(user.getId());
			appointment.setFmachineStatus(Integer.valueOf(4));	//状态：已取消
			int i = eas.editEquipmentAppointment(appointment);
			if(i != 0) {
				obj.put("success", true);
			}else {
				obj.put("success", false);
			}
		} catch (Exception e) {
			obj.put("success", false);
			e.printStackTrace();
		}
		return obj.toString();
	}

}

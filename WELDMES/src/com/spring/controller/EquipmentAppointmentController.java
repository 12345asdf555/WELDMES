package com.spring.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.RunnableScheduledFuture;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.erdangjiade.spring.security.MyInvocationSecurityMetadataSource;
import com.erdangjiade.spring.security.tool.Beeper;
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
 *
 */
@Controller
@RequestMapping(value = "/equipmentAppointment", produces = { "text/json;charset=UTF-8" })
public class EquipmentAppointmentController{

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
	 * 设备预约管理
	 * 
	 * @return
	 */
	@RequestMapping("/goEquipmentAppointment")
	public String goWeldingMahine(Model model) {
		return "equipmentAppointment/equipmentAppointment";
	}

	private boolean isNotEmpty(Object object) {
		if (null != object && !"".equals(object)) {
			return true;
		}
		return false;
	}

	private Map<BigInteger,ScheduledFuture<?>> map = new HashMap<BigInteger, ScheduledFuture<?>>();
	
	/**
	 * 判断当前时间与预约时间关系，修改设备预约表的焊机状态 当设备预约提交成功后，创建该线程方法
	 * @throws InterruptedException 
	 */
	public void updateMachineForTime(final BigInteger id, String appointmentDatetime) throws InterruptedException {
		long startTime = 0;
		try {
			long starttimes = new Date(System.currentTimeMillis()).getTime(); // 当前时间
			long end = sdf.parse(appointmentDatetime).getTime();

			if (starttimes < end) {
				startTime = (end - starttimes) / 1000;
			}
			System.out.println("预约时间：=============="+appointmentDatetime);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("主键id：" + id + "-------------------焊机状态修改任务将于" + startTime + "秒后开始");
		/**
		 * 将任务加入到阻塞队列
		 */
		if (MyInvocationSecurityMetadataSource.pbq.add(new Beeper(id, startTime))){
			//添加成功
			System.out.println("任务加入到阻塞队列成功");
		}else{
			System.out.println("阻塞队列已满，任务加入到阻塞队列失败！");
		}
		/**
		 * 线程池获取阻塞队列任务
		 */
		final ScheduledFuture<?> scheduledFuture = MyInvocationSecurityMetadataSource.executor.schedule(MyInvocationSecurityMetadataSource.pbq.take(), startTime, TimeUnit.SECONDS);
		
		map.put(id, scheduledFuture);
		
//		 /** 
//         * 创建并执行在给定延迟后启用的一次性操作。 
//         * 这里用于在N时间后取消任务 （1分钟）
//         */  
//		MyInvocationSecurityMetadataSource.executor.schedule(new Runnable() {
//            public void run() {
//                System.out.println("取消任务:==========="+sdf.format(new Date(System.currentTimeMillis())));
//                executor.cancel(true);
//            }
//        }, startTime+10, TimeUnit.SECONDS);
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
				json.put("fid", wm.getFid());
				// 根据焊机id查询最新的一条预约列表数据
				EquipmentAppointment equipment = eas.getEquipmentForFmachineId(wm.getFid());
				if (null != equipment) {
					// 根据焊工id查询焊工信息
					Welder welder = ws.getWelderForFid(equipment.getFwelderId());
					if (null != welder) {
						json.put("welderInfo", welder.getWelderno() + " (" + welder.getName() + ")");
						json.put("welderId", welder.getId()); // 焊工id
						json.put("welderno", welder.getWelderno()); // 焊工编号
					} else {
						json.put("welderInfo", "");
						json.put("welderId", "");
						json.put("welderno", "");
					}
					json.put("appointmentDatetime", equipment.getAppointmentDatetime()); // 预约时间
					json.put("giveBackDatetime", equipment.getGiveBackDatetime()); // 归还时间
					json.put("fmachine_status", equipment.getFmachineStatus()); // 焊机状态

					if (isNotEmpty(equipment.getAppointmentDatetime()) && isNotEmpty(equipment.getGiveBackDatetime())) {
						// 当前时间在预约时间之后并且当前时间在归还时间之前
						if ((new Date(System.currentTimeMillis())
								.compareTo(sdf.parse(equipment.getAppointmentDatetime())) >= 0)
								&& (new Date(System.currentTimeMillis())
										.compareTo(sdf.parse(equipment.getGiveBackDatetime())) <= 0)) {
							// 修改焊机状态为：使用中
						}
					}

					json.put("checkDatetime", equipment.getCheckDatetime());
					json.put("appointment_message", equipment.getAppointmentMessage());
					json.put("check_message", equipment.getCheckMessage());
					json.put("remark", equipment.getRemark());
					json.put("check_status", equipment.getCheckStatus());
					json.put("userId", equipment.getUserId());
					json.put("id", equipment.getId());
					// 根据用户id查询用户信息
					User user = userService.getUserInsframework(BigInteger.valueOf(equipment.getUserId()));
					if (null != user) {
						json.put("userInfo", user.getUserName() + " (" + user.getUserPosition() + ")");
					} else {
						json.put("userInfo", "");
					}
					json.put("create_time", equipment.getCreateTime());
				} else {
					json.put("welderInfo", "");
					json.put("welderId", "");
					json.put("welderno", "");
					json.put("appointmentDatetime", "");
					json.put("giveBackDatetime", "");
					json.put("checkDatetime", "");
					json.put("fmachine_status", "");
					json.put("appointment_message", "");
					json.put("check_message", "");
					json.put("remark", "");
					json.put("check_status", "");
					json.put("userId", "");
					json.put("id", "");

					json.put("userInfo", "");
					json.put("create_time", "");
				}
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

			appointment.setCreator(Long.valueOf(user.getId()));
			appointment.setFmachineId(Long.valueOf(fid)); // 焊机id
			appointment.setFwelderId(fwelderId); // 焊工id
			appointment.setFmachineStatus(1); // 焊机状态：预约中
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckMessage(null);
			appointment.setRemark(remarks);
			appointment.setCheckStatus(1); // 审核状态：待审核
			appointment.setUserId(Long.valueOf(userId)); // 审核人id
			appointment.setGiveBackDatetime(giveBackDatetime);
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setCreateTime(sdf.format(new Date(System.currentTimeMillis())));
			int id = eas.addEquipmentAppointment(appointment);
			// 新增成功创建定时任务，修改焊机状态
			if (id != 0) {
				//updateMachineForTime(BigInteger.valueOf(Long.valueOf(id)), appointmentDatetime);
			}
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
			String old_appointmentDatetime = request.getParameter("old_appointmentDatetime");
			String checkStatus = request.getParameter("checkStatus");
			String checkMessage = request.getParameter("checkMessage");

			appointment.setMender(Long.valueOf(user.getId()));
			appointment.setFmachineId(Long.valueOf(fid)); // 焊机id
			appointment.setFwelderId(fwelderId); // 焊工id
			appointment.setFmachineStatus(1); // 焊机状态：预约中
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckMessage(checkMessage);
			appointment.setRemark(remarks);
			appointment.setCheckStatus(1); // 审核状态：待审核
			appointment.setUserId(Long.valueOf(userId)); // 审核人id
			appointment.setGiveBackDatetime(giveBackDatetime);
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setId(BigInteger.valueOf(Long.valueOf(id)));
			int update_eas = eas.editEquipmentAppointment(appointment);
			if (update_eas != 0){	//修改成功
				if (null != appointmentDatetime && !appointmentDatetime.equals(old_appointmentDatetime)){
					System.out.println("预约时间修改成功！");
				}
			}
			obj.put("success", true);
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
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/cancelAppointment")
	@ResponseBody
	public String cancelAppointment(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String fid = request.getParameter("fid");
			String fmachine_status = request.getParameter("fmachine_status");
			String fwelderId = request.getParameter("fwelderId"); // 焊工id
			String appointmentMessage = request.getParameter("appointmentMessage");
			String userId = request.getParameter("userId");
			String giveBackDatetime = request.getParameter("giveBackDatetime");
			String appointmentDatetime = request.getParameter("appointmentDatetime");
			String checkStatus = request.getParameter("checkStatus");

			EquipmentAppointment appointment = new EquipmentAppointment();
			appointment.setFmachineId(Long.valueOf(fid));
			appointment.setFwelderId(BigInteger.valueOf(Long.valueOf(fwelderId)));
			appointment.setFmachineStatus(Integer.valueOf(fmachine_status));
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckStatus(Integer.valueOf(checkStatus));
			appointment.setUserId(Long.valueOf(userId));
			appointment.setCreateTime(sdf.format(new Date()));
			appointment.setCreator(Long.valueOf(user.getId()));
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setGiveBackDatetime(giveBackDatetime);
			eas.addEquipmentAppointment(appointment);
			obj.put("success", true);
		} catch (Exception e) {
			obj.put("success", false);
			e.printStackTrace();
		}
		return obj.toString();
	}

	/**
	 * 设备归还
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/equipmentGiveBack")
	@ResponseBody
	public String equipmentGiveBack(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String fid = request.getParameter("fid");
			String fmachine_status = request.getParameter("fmachine_status");
			String fwelderId = request.getParameter("fwelderId"); // 焊工id
			String appointmentMessage = request.getParameter("appointmentMessage");
			String userId = request.getParameter("userId");
			String giveBackDatetime = request.getParameter("giveBackDatetime");
			String appointmentDatetime = request.getParameter("appointmentDatetime");
			String checkStatus = request.getParameter("checkStatus");

			EquipmentAppointment appointment = new EquipmentAppointment();
			appointment.setFmachineId(Long.valueOf(fid));
			appointment.setFwelderId(BigInteger.valueOf(Long.valueOf(fwelderId)));
			appointment.setFmachineStatus(Integer.valueOf(fmachine_status));
			appointment.setAppointmentMessage(appointmentMessage);
			appointment.setCheckStatus(Integer.valueOf(checkStatus)); // 审核状态：待审核
			appointment.setUserId(Long.valueOf(userId));
			appointment.setCreateTime(sdf.format(new Date()));
			appointment.setCreator(Long.valueOf(user.getId()));
			appointment.setAppointmentDatetime(appointmentDatetime);
			appointment.setGiveBackDatetime(giveBackDatetime);
			eas.addEquipmentAppointment(appointment);
			obj.put("success", true);
		} catch (Exception e) {
			obj.put("success", false);
			e.printStackTrace();
		}
		return obj.toString();
	}


}

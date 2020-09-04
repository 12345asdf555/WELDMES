package com.spring.controller;

import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.dto.ModelDto;
import com.spring.dto.WeldDto;
import com.spring.model.DataStatistics;
import com.spring.model.Dictionarys;
import com.spring.model.LiveData;
import com.spring.model.MyUser;
import com.spring.page.Page;
import com.spring.service.DataStatisticsService;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.LiveDataService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/datastatistics", produces = { "text/json;charset=UTF-8" })
public class DataStatisticsController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private DataStatisticsService dss;
	@Autowired
	private DictionaryService dm;
	@Autowired
	private LiveDataService ls;
	@Autowired
	private InsframeworkService im;

	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 跳转班组生产数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goItemData")
	public String goItemProductionData(HttpServletRequest request){
		return "datastatistics/itemdata";
	}

	/**
	 * 跳转设备生产数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goMachineData")
	public String goMachineProductionData(HttpServletRequest request){
		return "datastatistics/machinedata";
	}
	
	/**
	 * 跳转人员生产数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goPersonData")
	public String goPersonProductionData(HttpServletRequest request){
		return "datastatistics/persondata";
	}
	
	
	/**
	 * 跳转人员生产数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goWorkpieceData")
	public String goWorkpieceProductionData(HttpServletRequest request){
		return "datastatistics/workpiecedata";
	}
	
	/**
	 * 跳转班组焊接数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goWeldItemData")
	public String goWeldItemProductionData(HttpServletRequest request){
		return "welddatastatistics/itemdata";
	}

	/**
	 * 跳转设备焊接数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goWeldMachineData")
	public String goWeldMachineProductionData(HttpServletRequest request){
		return "welddatastatistics/machinedata";
	}
	
	/**
	 * 跳转人员焊接数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goWeldPersonData")
	public String goWeldPersonProductionData(HttpServletRequest request){
		return "welddatastatistics/persondata";
	}
	
	
	/**
	 * 跳转人员焊接数据页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/goWeldWorkpieceData")
	public String goWeldWorkpieceProductionData(HttpServletRequest request){
		return "welddatastatistics/workpiecedata";
	}
	
	/**
	 * 跳转故障报表页面
	 * @return
	 */
	@RequestMapping("/goFauit")
	public String goFauit(HttpServletRequest request){
		request.setAttribute("t1",request.getParameter("t1"));
		request.setAttribute("t2",request.getParameter("t2"));
		request.setAttribute("fauit",request.getParameter("fauit"));
		return "datastatistics/fauit";
	}
	
	/**
	 * 跳转故障报表明细页面
	 * @return
	 */
	@RequestMapping("/goFauitDetail")
	public String goFauitDetail(HttpServletRequest request){
		request.setAttribute("id",request.getParameter("id"));
		request.setAttribute("parenttime1",request.getParameter("time1"));
		request.setAttribute("parenttime2",request.getParameter("time2"));
		request.setAttribute("fauit",request.getParameter("fauit"));
		return "datastatistics/fauitdetail";
	}
	
	/**
	 * 跳转班组生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getItemData")
	@ResponseBody
	public String getItemProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			List<DataStatistics> list = dss.getItemMachineCount(page,im.getUserInsframework());
			
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				json.put("t0", i.getName());//所属班组
				json.put("t1", i.getTotal());//设备总数
				int machinenum = 0;
				BigInteger starttime = null;
				DataStatistics weldtime = null;
				DataStatistics junction = dss.getWorkJunctionNum(i.getId(), dto);//获取工作(焊接)的焊口数
				DataStatistics parameter = dss.getParameter();//获取参数
				BigInteger standytime = null;
				BigInteger arcairtime = null;
				arcairtime = dss.getArcairtime(i.getId(),dto);//获取碳弧气刨时间
				if(arcairtime == null || "".equals(arcairtime)){
					json.put("t12","00:00:00");
				}else{
					json.put("t12",getTimeStrBySecond(arcairtime));
				}
				
				machinenum = dss.getStartingUpMachineNum(i.getId(),dto);//获取开机焊机总数
				starttime = dss.getStaringUpTime(i.getId(), dto);//获取开机总时长
				json.put("t2", machinenum);//开机设备数
				json.put("t7", getTimeStrBySecond(starttime));//工作时间
				standytime = dss.getStandytime(i.getId(), dto);//获取待机总时长
				weldtime = dss.getWorkTimeAndEleVol(i.getId(),dto);//获取焊接时长，平均电流电压
				double standytimes = 0,time=0,electric=0;
				if(standytime!=null){
					standytimes = standytime.doubleValue()/60/60;
				}
				if(weldtime!=null){
					electric = (double)Math.round((weldtime.getWorktime().doubleValue()/60/60*(weldtime.getElectricity()*weldtime.getVoltage())/1000+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
				}else{
					electric = (double)Math.round((time+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
				}
				json.put("t10", String.format("%.1f",electric*1.25));//电能消耗
				
				if(junction.getJunctionnum()!=0){
					json.put("t5", junction.getJunctionnum());//焊接焊缝数
				}else{
					json.put("t5", 0);
				}
				if(i.getTotal()!=0 && weldtime!=null){
					DataStatistics machine = dss.getWorkMachineNum(i.getId(), dto);//获取工作(焊接)的焊机数
					if(machine!=null && junction!=null){
						json.put("t3",machine.getMachinenum() );//实焊设备数
						json.put("t6", getTimeStrBySecond(weldtime.getWorktime()));//焊接时间
						double useratio =(double)Math.round(Double.valueOf(machinenum)/Double.valueOf(i.getTotal())*100*100)/100;
						double weldingproductivity = (double)Math.round(weldtime.getWorktime().doubleValue()/starttime.doubleValue()*100*100)/100;
						json.put("t4", useratio);//设备利用率
						json.put("t8", weldingproductivity);//焊接效率
					}
					if(parameter!=null){
						double  wtime = weldtime.getWorktime().doubleValue()/60;
						String[] str = parameter.getWireweight().split(",");
						double wireweight =Double.valueOf(str[0]);
						double wire = 0;
						if(weldtime!=null){
//							wire = (double)Math.round(wireweight*(Integer.valueOf(String.valueOf(weldtime.getWorktime()))*(parameter.getSpeed()/60))*100000)/100; //焊丝消耗量=焊丝长度*焊丝密度
							//wire = (double)Math.round(wireweight*weldtime.getWirefeedrate()*100000)/100; //焊丝消耗量=焊丝长度*焊丝密度
							wire = (double)Math.round(weldtime.getWirefeedrate()*1000);
						}
						double air = (double)Math.round(parameter.getAirflow()*wtime*100)/100;//气体消耗量=气体流量*焊接时间
						json.put("t9", wire);//焊丝消耗
						json.put("t11", air);//气体消耗
					}
				}else{
					json.put("t3",0);//实焊设备数
					json.put("t6", "00:00:00");//焊接时间
					json.put("t4", 0);//设备利用率
					json.put("t8", 0);//焊接效率
					json.put("t2", 0);//开机设备数
					json.put("t9", 0);//焊丝消耗
					json.put("t11", 0);//气体消耗
				}
				ary.add(json);
			}
			//表头
			String [] str = {"所属班组","设备总数","开机设备数","实焊设备数","设备利用率(%)","焊接焊缝数","焊接时间","工作时间","焊接效率(%)","焊丝消耗(G)","电能消耗(KWH)","气体消耗(L)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	/**
	 * 跳转班组焊接数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWeldItemData")
	@ResponseBody
	public String getWeldItemProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			dto.setParent(im.getUserInsframework());
			List<DataStatistics> ilist = dss.getWeldItemInCount(page,dto);
//			List<DataStatistics> olist = dss.getWeldItemOutCount(page,dto);
			
			if(ilist != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(ilist);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:ilist){
/*				for(DataStatistics o:olist){
					if(i.getName().equals(o.getName())){*/
						dto.setItem(i.getName());
						json.put("t0", i.getName());//所属班组
						json.put("t1", getTimeStrBySecond(i.getInsid()));//累计焊接时间
						json.put("t2", getTimeStrBySecond(i.getInsid().subtract(i.getWorktime())));//正常焊接时长
						json.put("t3", getTimeStrBySecond(i.getWorktime()));//超规范焊接时长
						BigInteger arcairtime = null;
						arcairtime = dss.getArcairtime4(page,dto);//获取碳弧气刨时间
						if(arcairtime == null || "".equals(arcairtime)){
							json.put("t5","00:00:00");
						}else{
							json.put("t5",getTimeStrBySecond(arcairtime));
						}
						if(Integer.valueOf(i.getInsid().toString())+Integer.valueOf(i.getWorktime().toString())!=0){
							json.put("t4", new DecimalFormat("0.00").format((float)Integer.valueOf(i.getInsid().subtract(i.getWorktime()).toString())/(Integer.valueOf(i.getInsid().toString()))*100));//规范符合率
						}else{
							json.put("t4",0);
						}
						ary.add(json);
/*					}
				}*/
			}
			//表头
			String [] str = {"所属班组","累计焊接时间","正常段时长","超规范时长","规范符合率(%)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	/**
	 * 跳转设备生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getMachineData")
	@ResponseBody
	public String getMachineProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String item = request.getParameter("item");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		BigInteger itemid = null;
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			if(iutil.isNull(item)){
				itemid = new BigInteger(item);
			}else{
				itemid = im.getUserInsframework();
			}
			List<DataStatistics> list = dss.getAllMachine(page,itemid);
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				dto.setMachineid(i.getId());
				json.put("t0", i.getInsname());
				json.put("t1", i.getName());
				json.put("t2", i.getPosition());
				DataStatistics junctionnum = dss.getWorkJunctionNum(null, dto);
				DataStatistics parameter = dss.getParameter();
				BigInteger worktime = null,standytime=null;
				DataStatistics weld = null;
				String weldingtimes = null;
				if(junctionnum.getJunctionnum()!=0){
					json.put("t3", junctionnum.getJunctionnum());//焊接焊缝数
				}else{
					json.put("t3", 0);
/*					json.put("t4", "00:00:00");
					json.put("t7", 0);*/
				}
				
				worktime = dss.getStaringUpTime(i.getInsid(), dto);
				json.put("t5", getTimeStrBySecond(worktime));//工作时间
				standytime = dss.getStandytime(i.getInsid(), dto);//获取待机总时长
				weld = dss.getWorkTimeAndEleVol(i.getInsid(), dto);
				weldingtimes = dss.getworktimes(i.getInsid(), dto);//获取焊接次数
				if(weldingtimes == null || "".equals(weldingtimes)){
					json.put("t10",0);
				}else{
					json.put("t10",Integer.parseInt(weldingtimes));
				}
				double standytimes = 0,ttime=0,electric=0;
				if(standytime!=null){
					standytimes = standytime.doubleValue()/60/60;
				}
				if(weld!=null){
					electric = (double)Math.round((weld.getWorktime().doubleValue()/60/60*(weld.getElectricity()*weld.getVoltage())/1000+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
				}else{
					electric = (double)Math.round((ttime+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
				}
				json.put("t8", String.format("%.1f",electric*1.25));//电能消耗
				
				if(weld!=null){
					BigInteger arcairtime = null;
					arcairtime = dss.getArcairtime(i.getInsid(),dto);//获取碳弧气刨时间
					if(arcairtime == null || "".equals(arcairtime)){
						json.put("t11","00:00:00");
					}else{
						json.put("t11",getTimeStrBySecond(arcairtime));
					}
					json.put("t4", getTimeStrBySecond(weld.getWorktime()));//焊接时间
					json.put("t5", getTimeStrBySecond(worktime));//工作时间
					double weldingproductivity = (double)Math.round(weld.getWorktime().doubleValue()/worktime.doubleValue()*100*100)/100;
					json.put("t6", weldingproductivity);//焊接效率
					if(parameter!=null){
						double  time = weld.getWorktime().doubleValue()/60;
						String[] str = parameter.getWireweight().split(",");
						double wireweight =Double.valueOf(str[0]);
						double wire = 0;
						if(weld!=null){
//							wire = (double)Math.round(wireweight*(Integer.valueOf(String.valueOf(weld.getWorktime()))*(parameter.getSpeed()/60))*100000)/100; //焊丝消耗量=焊丝长度*焊丝密度
							//wire = (double)Math.round(wireweight*weld.getWirefeedrate()*100000)/100; //焊丝消耗量=焊丝|焊丝重量*送丝速度
							//wire = (double)Math.round(weld.getWirefeedrate()*100000)/100;
							wire = (double)Math.round(weld.getWirefeedrate()*1000);
						}
						double air = (double)Math.round(parameter.getAirflow()*time*100)/100;//气体消耗量=气体流量*焊接时间
						json.put("t7", wire);//焊丝消耗
						json.put("t9", air);//气体消耗
					}
				}else{
					json.put("t4", "00:00:00");
					json.put("t6", 0);
					json.put("t7", 0);
					json.put("t9", 0);
					json.put("t10",0);
					json.put("t11","00:00:00");
				}
				ary.add(json);
			}
			//表头
			String [] str = {"所属班组","设备编号","设备位置","焊接焊缝数","焊接时间","工作时间","焊接效率(%)","焊丝消耗(G)","电能消耗(KWH)","气体消耗(L)","焊接次数","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转设备焊接数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWeldMachineData")
	@ResponseBody
	public String getWeldMachineProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String item = request.getParameter("item");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		BigInteger itemid = null;
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			if(iutil.isNull(item)){
				itemid = new BigInteger(item);
			}else{
				itemid = im.getUserInsframework();
			}
			List<DataStatistics> ilist = dss.getWeldMachineInCount(page,dto,itemid);
//			List<DataStatistics> olist = dss.getWeldMachineOutCount(page,dto,itemid);
			
			if(ilist != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(ilist);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:ilist){
/*				for(DataStatistics o:olist){
					if(i.getName().equals(o.getName())){*/
						json.put("t0", i.getInsname());//焊机编号
						json.put("t1", i.getPosition());//设备位置
						json.put("t2", i.getName());//所属班组
						json.put("t3", getTimeStrBySecond(i.getInsid()));//累计焊接时间
						json.put("t4", getTimeStrBySecond(i.getInsid().subtract(i.getWorktime())));//正常焊接时长
						json.put("t5", getTimeStrBySecond(i.getWorktime()));//超规范焊接时长
						dto.setItem(i.getInsname());
						BigInteger arcairtime = null;
						arcairtime = dss.getArcairtime5(page,dto);//获取碳弧气刨时间
						if(arcairtime == null || "".equals(arcairtime)){
							json.put("t7","00:00:00");
						}else{
							json.put("t7",getTimeStrBySecond(arcairtime));
						}
						if(Integer.valueOf(i.getInsid().toString())+Integer.valueOf(i.getWorktime().toString())!=0){
							json.put("t6", new DecimalFormat("0.00").format((float)Integer.valueOf(i.getInsid().subtract(i.getWorktime()).toString())/(Integer.valueOf(i.getInsid().toString()))*100));//规范符合率
						}else{
							json.put("t6",0);
						}
						ary.add(json);
/*					}
				}*/
			}
			//表头
			String [] str = {"设备编码","设备位置","所属班组","累计焊接时间","正常段时长","超规范时长","规范符合率(%)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转人员生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getPersonData")
	@ResponseBody
	public String getPersonProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			List<DataStatistics> list = dss.getAllWelder(page,im.getUserInsframework());
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				dto.setWelderno(i.getSerialnumber());
				json.put("t0", i.getSerialnumber());
				json.put("t1", i.getName());
				DataStatistics weld = null;
				BigInteger worktime = null,standytime=null;
				DataStatistics junctionnum = dss.getWorkJunctionNumByWelder(null, dto);
				DataStatistics parameter = dss.getParameter();
				BigInteger arcairtime = null;
				
				worktime = dss.getStaringUpTimeByWelder(null, dto);
				json.put("t4", getTimeStrBySecond(worktime));//工作时间
				standytime = dss.getStandytimeByWelder(null, dto);
				weld = dss.getWorkTimeAndEleVolByWelder(null, dto);
				double standytimes = 0,time=0,electric=0;
				if(standytime!=null){
					standytimes = standytime.doubleValue()/60/60;
				}
				if(weld!=null){
					arcairtime = dss.getArcairtime1(i.getId(),dto);//获取碳弧气刨时间
					if(arcairtime == null || "".equals(arcairtime)){
						json.put("t9","00:00:00");
					}else{
						json.put("t9",getTimeStrBySecond(arcairtime));
					}
					time = weld.getWorktime().doubleValue()/60/60;
					electric = (double)Math.round((time*(weld.getElectricity()*weld.getVoltage())/1000+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
				}else{
					electric = (double)Math.round((time+standytimes*parameter.getStandbypower()/1000)*100)/100;
				}
				json.put("t7", String.format("%.1f",electric*1.25));//电能消耗
				
				if(junctionnum.getJunctionnum()!=0){
					json.put("t2", junctionnum.getJunctionnum());//焊接焊缝数
				}else{
					json.put("t2", 0);
				}
				if(weld!=null){
					json.put("t3", getTimeStrBySecond(weld.getWorktime()));//焊接时间
					double weldingproductivity = (double)Math.round(weld.getWorktime().doubleValue()/worktime.doubleValue()*100*100)/100;
					json.put("t5", weldingproductivity);//焊接效率
					if(parameter!=null){
						double  wtime = weld.getWorktime().doubleValue()/60;
						String[] str = parameter.getWireweight().split(",");
						double wireweight =Double.valueOf(str[0]);
						double wire = 0;
						if(weld!=null){
//							wire = (double)Math.round(wireweight*(Integer.valueOf(String.valueOf(weld.getWorktime()))*(parameter.getSpeed()/60))*100000)/100; //焊丝消耗量=焊丝长度*焊丝密度
							//wire = (double)Math.round(wireweight*weld.getWirefeedrate()*100000)/100; //焊丝消耗量=焊丝|焊丝重量*送丝速度
							wire = (double)Math.round(weld.getWirefeedrate()*1000);
						}
						double air = (double)Math.round(parameter.getAirflow()*wtime*100)/100;//气体消耗量=气体流量*焊接时间
						json.put("t6", wire);//焊丝消耗
						json.put("t8", air);//气体消耗
					}
				}else{
					json.put("t3", "00:00:00");
					json.put("t5", 0);
					json.put("t6", 0);
					json.put("t8", 0);
					json.put("t9", "00:00:00");
				}
				ary.add(json);
			}
			//表头
			String [] str = {"焊工编号","焊工名称","焊接焊缝数","焊接时间","工作时间","焊接效率(%)","焊丝消耗(G)","电能消耗(KWH)","气体消耗(L)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转人员焊接数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWeldPersonData")
	@ResponseBody
	public String getWeldPersonProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			dto.setParent(im.getUserInsframework());
			List<DataStatistics> ilist = dss.getWeldPersonInCount(page,dto);
//			List<DataStatistics> olist = dss.getWeldPersonOutCount(page,dto);
			
			if(ilist != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(ilist);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:ilist){
//				for(DataStatistics o:olist){
//					if((i.getInsname()).equals(o.getInsname())){
						json.put("t0", i.getInsname());//焊工编号
						json.put("t1", i.getName());//焊工 姓名
						json.put("t2", getTimeStrBySecond(i.getInsid()));//累计焊接时间
						json.put("t3", getTimeStrBySecond(i.getInsid().subtract(i.getWorktime())));//正常焊接时长
						json.put("t4", getTimeStrBySecond(i.getWorktime()));//超规范焊接时长
						dto.setItem(i.getInsname());
						BigInteger arcairtime = null;
						arcairtime = dss.getArcairtime6(page,dto);//获取碳弧气刨时间
						if(arcairtime == null || "".equals(arcairtime)){
							json.put("t6","00:00:00");
						}else{
							json.put("t6",getTimeStrBySecond(arcairtime));
						}
						if(Integer.valueOf(i.getInsid().toString())+Integer.valueOf(i.getWorktime().toString())!=0){
							json.put("t5", new DecimalFormat("0.00").format((float)Integer.valueOf(i.getInsid().subtract(i.getWorktime()).toString())/(Integer.valueOf(i.getInsid().toString()))*100));//规范符合率
						}else{
							json.put("t5",0);
						}
						ary.add(json);
//					}
//				}
			}
			//表头
			String [] str = {"焊工编号","焊工姓名","累计焊接时间","正常段时长","超规范时长","规范符合率(%)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转工件生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWorkpieceData")
	@ResponseBody
	public String getWorkpieceProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		String junctionno = request.getParameter("junctionno");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			List<DataStatistics> list = dss.getAllJunction(page,"%"+ junctionno+"%",im.getUserInsframework());
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				dto.setJunctionno(i.getSerialnumber());
				json.put("t0", i.getSerialnumber());
				BigInteger worktime = dss.getStaringUpTimeByJunction(null, dto);
				DataStatistics parameter = dss.getParameter();
				BigInteger standytime = null;
				DataStatistics weld = null;
				if(worktime!=null){
					json.put("t2", getTimeStrBySecond(worktime));//工作时间
					weld = dss.getWorkTimeAndEleVolByJunction(null, dto);
					standytime = dss.getStandytimeByJunction(null, dto);

					double standytimes = 0,time=0,electric=0,speed = 0,heatinput = 0;
					if(standytime!=null){
						standytimes = standytime.doubleValue()/60/60;
					}
					if(weld!=null){
						time = weld.getWorktime().doubleValue()/60/60;
						electric = (double)Math.round((time*(weld.getElectricity()*weld.getVoltage())/1000+standytimes*parameter.getStandbypower()/1000)*100)/100;//电能消耗量=焊接时间*焊接平均电流*焊接平均电压+待机时间*待机功率
						speed = (double)Math.round((i.getSpeed()/Double.valueOf(weld.getWorktime().toString()))*100)/100;//行走速度= 焊缝长度/焊缝焊接时间V=秒/厘米；
						//热输入量=n*焊接电流*焊接电压*焊接时间/行走速度,n---热效率系数0.8
						if(speed!=0){
							heatinput = (double)Math.round((0.8*weld.getElectricity()*weld.getVoltage()*Double.valueOf(weld.getWorktime().toString())/speed)*100)/100;
						}
					}else{
						electric = (double)Math.round((time+standytimes*parameter.getStandbypower()/1000)*100)/100;
					}
					json.put("t5", String.format("%.1f",electric*1.25));//电能消耗
					json.put("t7", speed);//行走速度
					json.put("t8", heatinput);//热输入量
				}else{
					json.put("t2", "00:00:00");
					json.put("t5", 0);
					json.put("t7", 0);//行走速度
					json.put("t8", 0);//热输入量
				}
				if(worktime!=null && weld!=null){
					BigInteger arcairtime = null;
					arcairtime = dss.getArcairtime2(i.getId(),dto);//获取碳弧气刨时间
					if(arcairtime == null || "".equals(arcairtime)){
						json.put("t9","00:00:00");
					}else{
						json.put("t9",getTimeStrBySecond(arcairtime));
					}
					json.put("t1", getTimeStrBySecond(weld.getWorktime()));//焊接时间
					double weldingproductivity = (double)Math.round(weld.getWorktime().doubleValue()/worktime.doubleValue()*100*100)/100;
					json.put("t3", weldingproductivity);//焊接效率
					if(parameter!=null){
						double  time = weld.getWorktime().doubleValue()/60;
						String[] str = parameter.getWireweight().split(",");
						double wireweight =Double.valueOf(str[0]);
						double wire = 0;
						if(weld!=null){
//							wire = (double)Math.round(wireweight*(Integer.valueOf(String.valueOf(weld.getWorktime()))*(parameter.getSpeed()/60))*100000)/100; //焊丝消耗量=焊丝长度*焊丝密度
							//wire = (double)Math.round(wireweight*weld.getWirefeedrate()*100000)/100; //焊丝消耗量=焊丝|焊丝重量*送丝速度
							wire = (double)Math.round(weld.getWirefeedrate()*1000);
						}
						double air = (double)Math.round(parameter.getAirflow()*time*100)/100;//气体消耗量=气体流量*焊接时间
						json.put("t4", wire);//焊丝消耗
						json.put("t6", air);//气体消耗
					}
				}else{
					json.put("t1", "00:00:00");
					json.put("t3", 0);
					json.put("t4", 0);
					json.put("t6", 0);
					json.put("t7", 0);//行走速度
					json.put("t8", 0);//热输入量
					json.put("t9","00:00:00");//碳弧气刨时间
				}
				ary.add(json);
			}
			//表头
			String [] str = {"焊缝编号","焊接时间","工作时间","焊接效率(%)","焊丝消耗(G)","电能消耗(KWH)","气体消耗(L)","行走速度(cm/s)","热输入量(J/cm)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转工件焊接数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWeldWorkpieceData")
	@ResponseBody
	public String getWeldWorkpieceProductionData(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String junctionno = request.getParameter("junctionno");
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			dto.setParent(im.getUserInsframework());
			List<DataStatistics> ilist = dss.getWeldPieceInCount(page,dto,"%"+ junctionno+"%");
//			List<DataStatistics> olist = dss.getWeldPieceOutCount(page,dto,"%"+ junctionno+"%");
			
			if(ilist != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(ilist);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:ilist){
//				for(DataStatistics o:olist){
//					if((i.getInsname()).equals(o.getInsname())){
						dto.setItem(i.getName());
						json.put("t0", i.getInsname());//工件编号
						json.put("t1", getTimeStrBySecond(i.getInsid()));//累计焊接时间
						json.put("t2", getTimeStrBySecond(i.getInsid().subtract(i.getWorktime())));//正常焊接时长
						json.put("t3", getTimeStrBySecond(i.getWorktime()));//超规范焊接时长
						dto.setJunctionno(i.getInsname());
						BigInteger arcairtime = null;
						arcairtime = dss.getArcairtime7(page,dto);//获取碳弧气刨时间
						if(arcairtime == null || "".equals(arcairtime)){
							json.put("t5","00:00:00");
						}else{
							json.put("t5",getTimeStrBySecond(arcairtime));
						}
						if(Integer.valueOf(i.getInsid().toString())+Integer.valueOf(i.getWorktime().toString())!=0){
							json.put("t4", new DecimalFormat("0.00").format((float)Integer.valueOf(i.getInsid().subtract(i.getWorktime()).toString())/(Integer.valueOf(i.getInsid().toString()))*100));//规范符合率
						}else{
							json.put("t4",0);
						}
						ary.add(json);
//					}
//				}
			}
			//表头
			String [] str = {"焊缝编号","累计焊接时间","正常段时长","超规范时长","规范符合率(%)","碳弧气刨时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}

	
	/**
	 * 跳转故障报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getFauit")
	@ResponseBody
	public String getFauit(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		int fauit = 0 ;
		if(iutil.isNull(request.getParameter("fauit"))){
			fauit  = Integer.parseInt(request.getParameter("fauit"));
		}
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			dto.setParent(im.getUserInsframework());
			List<DataStatistics> list = dss.getFauit(page, dto, fauit);
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				json.put("t0", i.getId());
				json.put("t1", i.getName());
				json.put("t2", i.getInsname());
				json.put("t3", i.getValuename());
				json.put("t4", i.getNum());
				ary.add(json);
			}
			//表头
			String [] str = {"序号","焊机编号","焊机归属","故障类型","故障时间(s)"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转故障明细报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getFauitDeatil")
	@ResponseBody
	public String getFauitDeatil(HttpServletRequest request){
		if(iutil.isNull(request.getParameter("page"))){
			pageIndex = Integer.parseInt(request.getParameter("page"));
		}
		if(iutil.isNull(request.getParameter("rows"))){
			pageSize = Integer.parseInt(request.getParameter("rows"));
		}
		String time1 = request.getParameter("dtoTime1");
		String time2 = request.getParameter("dtoTime2");
		BigInteger id = null;
		int fauit = 0 ;
		if(iutil.isNull(request.getParameter("fauit"))){
			fauit  = Integer.parseInt(request.getParameter("fauit"));
		}
		if(iutil.isNull(request.getParameter("id"))){
			id  = new BigInteger(request.getParameter("id"));
		}
		page = new Page(pageIndex,pageSize,total);
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject title = new JSONObject();
		WeldDto dto = new WeldDto();
		JSONArray titleary = new JSONArray();
		long total = 0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			if(iutil.isNull(time2)){
				dto.setDtoTime2(time2);
			}
			dto.setParent(im.getUserInsframework());
			List<DataStatistics> list = dss.getFauitDetail(page, dto, id, fauit);
			if(list != null){
				PageInfo<DataStatistics> pageinfo = new PageInfo<DataStatistics>(list);
				total = pageinfo.getTotal();
			}
			for(DataStatistics i:list){
				json.put("t0", i.getName());
				json.put("t1", i.getInsname());
				json.put("t2", i.getValuename());
				json.put("t3", i.getTime());
				ary.add(json);
			}
			//表头
			String [] str = {"焊机编号","焊机归属","故障类型","故障发生时间"};
			for(int i=0;i<str.length;i++){
				title.put("title", str[i]);
				titleary.add(title);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("total", total);
		obj.put("ary", titleary);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 获取组织机构
	 * @return
	 */
	@RequestMapping("/getAllInsframework")
	@ResponseBody
	public String getAllInsframework(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<DataStatistics> list = dss.getAllInsframe(im.getUserInsframework());
			json.put("id", 0);
			json.put("name", "全部");
			ary.add(json);
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
	 * 获取故障类型
	 * @return
	 */
	@RequestMapping("/getAllFauit")
	@ResponseBody
	public String getAllFauit(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(15);
			json.put("id", 0);
			json.put("name", "全部");
			ary.add(json);
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
	
	public String getTimeStrBySecond(BigInteger timeParam ) {
		if(timeParam == null){
			return "00:00:00";
		}
		BigInteger[] str = timeParam.divideAndRemainder(new BigInteger("60"));//divideAndRemainder返回数组。第一个是商第二个时取模
		BigInteger second = str[1];
		BigInteger minuteTemp = timeParam.divide(new BigInteger("60"));//subtract：BigInteger相减，multiply：BigInteger相乘，divide : BigInteger相除
        if (minuteTemp.compareTo(new BigInteger("0"))>0) {//compareTo：比较BigInteger类型的大小，大则返回1，小则返回-1 ，等于则返回0
        	BigInteger[] minstr = minuteTemp.divideAndRemainder(new BigInteger("60"));
    		BigInteger minute = minstr[1];
    		BigInteger hour = minuteTemp.divide(new BigInteger("60"));
            if (hour.compareTo(new BigInteger("0"))>0) {
                return (hour.compareTo(new BigInteger("9"))>0 ? (hour + "") : ("0" + hour)) + ":" + (minute.compareTo(new BigInteger("9"))>0 ? (minute + "") : ("0" + minute))
                        + ":" + (second .compareTo(new BigInteger("9"))>0 ? (second + "") : ("0" + second));
            } else {
                return "00:" + (minute.compareTo(new BigInteger("9"))>0 ? (minute + "") : ("0" + minute)) + ":"
                        + (second .compareTo(new BigInteger("9"))>0 ? (second + "") : ("0" + second));
            }
        } else {
            return "00:00:" + (second .compareTo(new BigInteger("9"))>0 ? (second + "") : ("0" + second));
        }
	}
	

	@RequestMapping("getWorkRank")
	@ResponseBody
	public String getWorkRank(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		try{ 
			String parentid = request.getParameter("parent");
			BigInteger parent = null;
			if(iutil.isNull(parentid)){
				parent = new BigInteger(parentid);
			}
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			List<DataStatistics> list = dss.getWorkRank(im.getUserInsframework(), sdf.format(date));
			for(int i=0;i<list.size();i++){
				json.put("rownum", i+1);
				json.put("welderno", list.get(i).getWelderno());
				json.put("name", list.get(i).getName());
				json.put("item", list.get(i).getInsname());
				json.put("hour", (double)Math.round(list.get(i).getHour()*100)/100);
				ary.add(json);
			}
			obj.put("rows", ary);
		}catch(Exception e){
			e.printStackTrace();
		}
		return obj.toString();
	}
	
	/**
	 * 跳转班组生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getUseRatio")
	@ResponseBody
	public String getUseRatio(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject json = new JSONObject();
		try{
			String parentid = request.getParameter("parent");
			BigInteger parent = null;
			if(iutil.isNull(parentid)){
				parent = new BigInteger(parentid);
			}
			List<DataStatistics> list = dss.getItemMachineCount(im.getUserInsframework());
			for(DataStatistics i:list){
				json.put("itemname", i.getName());//班组
				json.put("machinenum", i.getTotal());//设备总数
				Date date = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				DataStatistics machine = dss.getWorkMachineCount(i.getId(), sdf.format(date));
				if(machine!=null){
					json.put("worknum", machine.getMachinenum());//工作设备数
					double useratio =(double)Math.round(Double.valueOf(machine.getMachinenum())/Double.valueOf(i.getTotal())*100*100)/100;
					json.put("useratio", useratio);//设备利用率
				}else{
					json.put("worknum", 0);//工作设备数
					json.put("useratio", 0);//设备利用率
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	
	/**
	 * 跳转班组生产数据报表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getLoadRate")
	@ResponseBody
	public String getLoadRate(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONArray timeary = new JSONArray();
		JSONObject json = new JSONObject();
		JSONObject timejson = new JSONObject();
		try{
			String parentid = request.getParameter("parent");
			String time1 = request.getParameter("time1");
			String time2 = request.getParameter("time2");
			WeldDto dto = new WeldDto();
			BigInteger parent = null;
			if(iutil.isNull(parentid)){
				parent = new BigInteger(parentid);
				dto.setParent(parent);
			}
			dto.setDtoTime1(time1.substring(0, 10));
			dto.setDtoTime2(time2.substring(0, 10));
			dto.setDay("day");
			List<DataStatistics> ilist = dss.getItemWeldTime(dto);
			List<DataStatistics> olist = dss.getItemOverProofTime(dto);
			List<ModelDto> time =  ls.getAllTimes(dto);
			List<LiveData> insf = ls.getAllInsf(im.getUserInsframework(), 23);
			List<DataStatistics> temp = ilist;
			for(int i=0;i<ilist.size();i++){
				double num = 100;
				temp.get(i).setInsname(ilist.get(i).getName());
				temp.get(i).setTime(ilist.get(i).getTime());
				for(int o=0;o<olist.size();o++){
					if(ilist.get(i).getId().equals(olist.get(o).getId()) && ilist.get(i).getTime().equals(olist.get(o).getTime())){
						num = (double)Math.round(((ilist.get(i).getHour()-olist.get(o).getHour())/ilist.get(i).getHour())*100*100)/100;
					}
				}
				temp.get(i).setHour(num);
			}
			for(ModelDto t:time){
				timejson.put("weldtime", t.getWeldTime());//日期
				timeary.add(timejson);
			}
			for(LiveData item:insf){
				json.put("itemname", item.getFname());//班组
				double[] num = new double[time.size()];
				for(int i=0;i<time.size();i++){
					num[i] = 0;
					for(DataStatistics t:temp){
						if(time.get(i).getWeldTime().equals(t.getTime()) && item.getFname().equals(t.getName())){
							num[i] = t.getHour();
						}
					}
				}
				json.put("hour", num);
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("time", timeary);
		obj.put("ary", ary);
		return obj.toString();
	}
	
	/**
	 * 瑞凌首页1-1
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWarnTimes")
	@ResponseBody
	public String getWarnTimes(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		JSONArray aryX = new JSONArray();
		JSONArray aryS = new JSONArray();
		WeldDto dto = new WeldDto();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time1 = dateFormat.format(new Date()).substring(0, 11)+"00:00:00";
		int temp=0;
		DecimalFormat df=new DecimalFormat("0.0");
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			List<DataStatistics> list = dss.getWarnTimes(im.getUserInsframework(),dto);
			for(DataStatistics i:list){
				aryX.add(i.getName());
				aryS.add(df.format(i.getTotal()/60.0));
				if(i.getTotal()>temp) {
					temp = i.getTotal();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("aryX", aryX);
		obj.put("aryS", aryS);
		obj.put("temp", df.format(temp/60.0));
		return obj.toString();
	}
	
	/**
	 * 瑞凌首页2-2
	 * @param request
	 * @return
	 */
	@RequestMapping("/getOnAndWeldRatio")
	@ResponseBody
	public String getOnAndWeldRatio(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		WeldDto dto = new WeldDto();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time1 = dateFormat.format(new Date()).substring(0, 11)+"00:00:00";
		String onRatio = null,weldRatio = null;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			List<DataStatistics> list = dss.getOnAndWeldRatio(im.getUserInsframework(),dto);
			for(DataStatistics i:list){
				if(!"".equals(i.getId().toString())&&!"0".equals(i.getId().toString())&&i.getId().toString()!=null) {
					DecimalFormat df=new DecimalFormat("0.0");
					onRatio = df.format(((float)i.getNum()/Integer.valueOf(i.getId().toString()))*100);
					weldRatio = df.format(((float)i.getTotal()/Integer.valueOf(i.getId().toString()))*100);
//					onRatio = String.valueOf((i.getNum()/Integer.valueOf(i.getId().toString()))*100);
//					weldRatio = String.valueOf((i.getTotal()/Integer.valueOf(i.getId().toString()))*100);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("onRatio", onRatio);
		obj.put("weldRatio", weldRatio);
		return obj.toString();
	}
	
	/**
	 * 瑞凌首页2-1
	 * @param request
	 * @return
	 */
	@RequestMapping("/getOnAndWeldTime")
	@ResponseBody
	public String getOnAndWeldTime(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		WeldDto dto = new WeldDto();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time1 = dateFormat.format(new Date()).substring(0, 11)+"00:00:00";
		JSONArray aryX = new JSONArray();
		JSONArray aryS0 = new JSONArray();
		JSONArray aryS1 = new JSONArray();
		double temp0=0,temp1=0;
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			List<DataStatistics> list = dss.getOnAndWeldTime(im.getUserInsframework(),dto);
			for(DataStatistics i:list){
				DecimalFormat df=new DecimalFormat("0.00");
				aryX.add(i.getName());
				aryS0.add(df.format(i.getInsid().doubleValue()/3600));
				aryS1.add(df.format(i.getWorktime().doubleValue()/3600));
				if(i.getInsid().doubleValue()>temp0) {
					temp0 = Double.valueOf(df.format(i.getInsid().doubleValue()/3600));
				}
				if(i.getWorktime().doubleValue()>temp1) {
					temp1 = Double.valueOf(df.format(i.getWorktime().doubleValue()/3600));
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("aryX", aryX);
		obj.put("aryS0", aryS0);
		obj.put("aryS1", aryS1);
		obj.put("temp0", temp0);
		obj.put("temp1", temp1);
		return obj.toString();
	}
	
	/**
	 * 瑞凌首页2-3(注：焊丝消耗量单位0.1g)
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWireAndFlow")
	@ResponseBody
	public String getWireAndFlow(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		WeldDto dto = new WeldDto();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time1 = dateFormat.format(new Date()).substring(0, 11)+"00:00:00";
		JSONArray aryX = new JSONArray();
		JSONArray aryS0 = new JSONArray();
		JSONArray aryS1 = new JSONArray();
		double temp0=0,temp1=0;
		DecimalFormat df=new DecimalFormat("0.00");
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			List<DataStatistics> list = dss.getWireAndFlow(im.getUserInsframework(),dto);
			for(DataStatistics i:list){
				aryX.add(i.getName());
				aryS0.add(df.format(i.getSpeed()));
				aryS1.add(df.format(i.getAirflow()));
				if(i.getSpeed()>temp0) {
					temp0 = i.getSpeed();
				}
				if(i.getAirflow()>temp1) {
					temp1 = i.getAirflow();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("aryX", aryX);
		obj.put("aryS0", aryS0);
		obj.put("aryS1", aryS1);
		obj.put("temp0", df.format(temp0));
		obj.put("temp1", df.format(temp1));
		return obj.toString();
	}
	
	/**
	 * 瑞凌首页1-3
	 * @param request
	 * @return
	 */
	@RequestMapping("/getMachineOverSpe")
	@ResponseBody
	public String getMachineOverSpe(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		WeldDto dto = new WeldDto();
		SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time1 = dateFormat.format(new Date()).substring(0, 11)+"00:00:00";
		JSONArray aryX = new JSONArray();
		JSONArray aryS0 = new JSONArray();
		JSONArray aryS1 = new JSONArray();
		JSONArray aryS2 = new JSONArray();
		double temp0=0,temp1=0;
		DecimalFormat df=new DecimalFormat("0.0");
		try{
			if(iutil.isNull(time1)){
				dto.setDtoTime1(time1);
			}
			List<DataStatistics> list = dss.getMachineOverSpe(im.getUserInsframework(),dto);
			for(DataStatistics i:list){
				aryX.add(i.getName());
				aryS0.add(df.format(Double.parseDouble(String.valueOf(i.getInsid()))/60.0));
				aryS1.add(i.getHour());
				aryS2.add(i.getTotal());
				if(i.getInsid().doubleValue()>temp0) {
					temp0 = i.getInsid().doubleValue();
				}
				if(i.getTotal()>temp1) {
					temp1 = i.getTotal();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("aryX", aryX);
		obj.put("aryS0", aryS0);
		obj.put("aryS1", aryS1);
		obj.put("aryS2", aryS2);
		obj.put("temp0", df.format(temp0/60.0));
		obj.put("temp1", temp1);
		return obj.toString();
	}
}


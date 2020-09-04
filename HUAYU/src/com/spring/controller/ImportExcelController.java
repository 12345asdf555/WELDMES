package com.spring.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PushbackInputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.POIXMLDocument;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.Dictionarys;
import com.spring.model.Gather;
import com.spring.model.Insframework;
import com.spring.model.MaintenanceRecord;
import com.spring.model.MyUser;
import com.spring.model.Person;
import com.spring.model.WeldedJunction;
import com.spring.model.WeldingMachine;
import com.spring.model.WeldingMaintenance;
import com.spring.service.DictionaryService;
import com.spring.service.GatherService;
import com.spring.service.MaintainService;
import com.spring.service.PersonService;
import com.spring.service.WeldedJunctionService;
import com.spring.service.WeldingMachineService;
import com.spring.util.IsnullUtil;
import com.spring.util.UploadUtil;

import net.sf.json.JSONObject;

/**
 * excel导入数据库
 * @author gpyf16
 *
 */

@Controller
@RequestMapping(value = "/import", produces = { "text/json;charset=UTF-8" })
public class ImportExcelController {
	@Autowired
	private WeldingMachineService wmm;
	@Autowired
	private MaintainService mm;
	@Autowired
	private GatherService g;
	@Autowired
	private PersonService ps;
	@Autowired
	private DictionaryService dm;
	@Autowired
	private WeldedJunctionService wjs;
	
	IsnullUtil iutil = new IsnullUtil();
	

		/**
	 * 导入焊机设备
	 * @param request
	 * @param response
	 * @return
	 */
	
	@RequestMapping("/importWeldingMachine")
	@ResponseBody
	public String importWeldingMachine(HttpServletRequest request,
			HttpServletResponse response){
		UploadUtil u = new UploadUtil();
		JSONObject obj = new JSONObject();
		String path = "";
		try{
			path = u.uploadFile(request, response);
			List<WeldingMachine> list = xlsxWm(path);
			//删除已保存的excel文件
			File file  = new File(path);
			file.delete();
			for(WeldingMachine wm : list){
				wm.setTypeId(dm.getvaluebyname(4,wm.getTypename()));
				wm.setStatusId(dm.getvaluebyname(3,wm.getStatusname()));
				wm.setMvalueid(dm.getvaluebyname(14, wm.getMvaluename()));
				wm.setModel(String.valueOf(dm.getvaluebyname(17, wm.getModel())));
				String name = wm.getInsframeworkId().getName();
				wm.getInsframeworkId().setId(wmm.getInsframeworkByName(name));
				Gather gather = wm.getGatherId();
				int count2 = 0;
				if(gather!=null){
					int count3 = g.getGatherNoByItemCount(gather.getGatherNo(), wm.getInsframeworkId().getId()+"");
					if(count3 == 0){
						obj.put("msg","导入失败，请检查您的采集序号是否存在或是否属于该部门！");
						obj.put("success",false);
						return obj.toString();
					}
					gather.setId(g.getGatherByNo(gather.getGatherNo()));
					wm.setGatherId(gather);
					count2 = wmm.getGatheridCount(wm.getInsframeworkId().getId(),gather.getGatherNo());
				}
				List<Dictionarys> model = dm.getModelOfManu(wm.getMvalueid());
				boolean modelflag = true;
				for(int i=0;i<model.size();i++){
					if(wm.getModel().equals(model.get(i).getId().toString())){
						modelflag = false;
					}
				}
				if(modelflag){
					obj.put("msg","导入失败，请检查您的焊机型号与生产厂商是否匹配！");
					obj.put("success",false);
					return obj.toString();
				}
				if(isInteger(wm.getEquipmentNo())){
					wm.setEquipmentNo(wm.getEquipmentNo());
				}
				wm.setGatherId(gather);
				//编码唯一
				int count1 = wmm.getEquipmentnoCount(wm.getEquipmentNo());
				if(count1>0 || count2>0){
					obj.put("msg","导入失败，请检查您的设备编码、采集序号是否已存在！");
					obj.put("success",false);
					return obj.toString();
				}
				wmm.addWeldingMachine(wm);
			};
			obj.put("success",true);
			obj.put("msg","导入成功！");
		}catch(Exception e){
			e.printStackTrace();
			obj.put("msg","导入失败，请检查您的文件格式以及数据是否符合要求！");
			obj.put("success",false);
		}
		return obj.toString();
	}
	
	/**
	 * cat导入焊机设备
	 * @param request
	 * @param response
	 * @return
	 */
	/*@RequestMapping("/importWeldingMachine")
	@ResponseBody
	public String importWeldingMachine(HttpServletRequest request,
			HttpServletResponse response){
		UploadUtil u = new UploadUtil();
		JSONObject obj = new JSONObject();
		String path = "";
		try{
			path = u.uploadFile(request, response);
			List<WeldingMachine> list = xlsxWm(path);
			//删除已保存的excel文件
			File file  = new File(path);
			file.delete();
			for(WeldingMachine wm : list){
				wm.setTypeId(dm.getvaluebyname(4,wm.getTypename()));
				wm.setStatusId(dm.getvaluebyname(3,wm.getStatusname()));
				wm.setMvalueid(dm.getvaluebyname(14, wm.getMvaluename()));
				wm.setModel(dm.getvaluebyname(17, wm.getModel())+"");
				String name = wm.getInsframeworkId().getName();
				wm.getInsframeworkId().setId(wmm.getInsframeworkByName(name));
				Gather gather = wm.getGatherId();
				int count2 = 0;
				if(gather!=null && iutil.isNull(wm.getGatherId().getGatherNo())){
					int count3 = g.getGatherNoByItemCount(gather.getGatherNo(), wm.getInsframeworkId().getId()+"");
					gather.setId(g.getGatherByNo(gather.getGatherNo()));
					wm.setGatherId(gather);
					count2 = wmm.getGatheridCount(wm.getInsframeworkId().getId(),gather.getGatherNo());
					if(count2>0 || count3 == 0){
						obj.put("msg","导入失败，请检查您的采集序号是否存在或是否属于该部门！");
						obj.put("success",false);
						return obj.toString();
					}
				}
				if(isInteger(wm.getEquipmentNo())){
					wm.setEquipmentNo(wm.getEquipmentNo());
				}
				wm.setGatherId(gather);
				//编码唯一
				int count1 = wmm.getEquipmentnoCount(wm.getEquipmentNo());
				if(count1>0 || count2>0){
					obj.put("msg","导入失败，请检查您的设备编码、采集序号是否已存在！");
					obj.put("success",false);
					return obj.toString();
				}
				wmm.addcatmachine(wm);
			};
			obj.put("success",true);
			obj.put("msg","导入成功！");
		}catch(Exception e){
			e.printStackTrace();
			obj.put("msg","导入失败，请检查您的文件格式以及数据是否符合要求！");
			obj.put("success",false);
		}
		return obj.toString();
	}*/
	
	/**
	 * 导入维修记录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/importMaintain")
	@ResponseBody
	public String importMaintain(HttpServletRequest request,
			HttpServletResponse response){
		UploadUtil u = new UploadUtil();
		JSONObject obj = new JSONObject();
		try{
			String path = u.uploadFile(request, response);
			List<WeldingMaintenance> wt = xlsxMaintain(path);
			//删除已保存的excel文件
			File file  = new File(path);
			file.delete();
			for(int i=0;i<wt.size();i++){
				wt.get(i).getMaintenance().setTypeId(dm.getvaluebyname(5,wt.get(i).getMaintenance().getTypename()));
				BigInteger wmid = null;
				if(isInteger(wt.get(i).getWelding().getEquipmentNo())){
					wmid = wmm.getWeldingMachineByEno(wt.get(i).getWelding().getEquipmentNo());
				}else{
					wmid = wmm.getWeldingMachineByEno(wt.get(i).getWelding().getEquipmentNo());
				}
				wt.get(i).getWelding().setId(wmid);
				//插入数据库
				mm.addMaintian( wt.get(i),wt.get(i).getMaintenance(),wmid);
			};
			obj.put("success",true);
			obj.put("msg","导入成功！");
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success",false);
			obj.put("msg","导入失败，请检查您的文件格式以及数据是否符合要求！");
		}
		return obj.toString();
	}
	
	
	/**
	 * 导入焊工记录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/importWelder")
	@ResponseBody
	public String importWelder(HttpServletRequest request,
			HttpServletResponse response){
		UploadUtil u = new UploadUtil();
		JSONObject obj = new JSONObject();
		try{
			String path = u.uploadFile(request, response);
			List<Person> we = xlsxWelder(path);
			//删除已保存的excel文件
			File file  = new File(path);
			file.delete();
			for(Person w:we){
				if(!iutil.isNull(w.getWelderno()) && !iutil.isNull(w.getName()) && !iutil.isNull(w.getFcheckintime())){
					break;
				}
				w.setLeveid(dm.getvaluebyname(8,w.getLevename()));
				w.setQuali(dm.getvaluebyname(7, w.getQualiname()));
				w.setOwner(wmm.getInsframeworkByName(w.getInsname()));
				MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				w.setCreater(new BigInteger(user.getId()+""));
				w.setUpdater(new BigInteger(user.getId()+""));
				w.setWelderno(w.getWelderno());
				String phone = w.getCellphone();
				/*if(iutil.isNull(phone)){
					if(!phone.matches("^1[3-8]\\d{9}$")){
						obj.put("msg","导入失败，请检查您的手机号码是否正确！");
						obj.put("success",false);
						return obj.toString();
					}
				}*/
				//编码唯一
				int count1 = ps.getUsernameCount(w.getWelderno());
				if(count1>0){
//					obj.put("msg","导入失败，请检查您的焊工编号是否已存在！");
//					obj.put("success",false);
//					return obj.toString();
					continue;
				}else{
					ps.catsave(w);
				}
			};
			obj.put("success",true);
			obj.put("msg","导入成功！");
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success",false);
			obj.put("msg","导入失败，请检查您的文件格式以及数据是否符合要求！");
		}
		return obj.toString();
	}
	

	/**
	 * 导入焊口记录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/importWeldedJunction")
	@ResponseBody
	public String importWeldedJunction(HttpServletRequest request,
			HttpServletResponse response){
		UploadUtil u = new UploadUtil();
		JSONObject obj = new JSONObject();
		try{
			String path = u.uploadFile(request, response);
			List<WeldedJunction> we = xlsxWeldedJunction(path);
			//删除已保存的excel文件
			File file  = new File(path);
			file.delete();
			for(WeldedJunction w:we){
				String wjno = w.getWeldedJunctionno();
				int num = wjno.length();
				if(num<=6){
					for(int i=0;i<6-num;i++){
						wjno = "0"+wjno;
					}
				}else{
					obj.put("success",false);
					obj.put("msg","导入失败，请检查您的焊口编号长度是否符合要求！");
					return obj.toString();
				}
				w.setWeldedJunctionno(wjno);
				int count = wjs.getWeldedjunctionByNo(wjno);
				w.setInsfid(wmm.getInsframeworkByName(w.getItemid().getName()));
				MyUser user = (MyUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				w.setCreater(new BigInteger(user.getId()+""));
				w.setUpdater(new BigInteger(user.getId()+""));
				w.setWeldedJunctionno(w.getWeldedJunctionno());
				//编码唯一
				if(count>0){
//					obj.put("msg","导入失败，请检查您的焊口编号是否已存在！");
//					obj.put("success",false);
//					return obj.toString();
					continue;
				}
				wjs.addJunction(w);
			};
			obj.put("success",true);
			obj.put("msg","导入成功！");
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success",false);
			obj.put("msg","导入失败，请检查您的文件格式以及数据是否符合要求！");
		}
		return obj.toString();
	}
	
	/**
	 * 导入WeldingMaintenance表数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	public static List<WeldingMaintenance> xlsxMaintain(String path) throws IOException, InvalidFormatException{
		List<WeldingMaintenance> wm = new ArrayList<WeldingMaintenance>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		
		int rowstart = sheet.getFirstRowNum()+1;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			WeldingMaintenance dit = new WeldingMaintenance();
			MaintenanceRecord mr = new MaintenanceRecord();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String.valueOf(intValue) : String.valueOf(value);
                    }
					if(k == 0){
						WeldingMachine welding = new WeldingMachine();
						welding.setEquipmentNo(cellValue);
						dit.setWelding(welding);//设备编码
						break;
					}
					else if(k == 2){
						mr.setStartTime(cellValue);//维修起始时间
						break;
					}
					else if(k == 3){
						mr.setEndTime(cellValue);//维修结束时间
						break;
	    			}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						WeldingMachine welding = new WeldingMachine();
						welding.setEquipmentNo(cellValue);
						dit.setWelding(welding);//设备编码
						break;
					}
					else if(k == 1){
						mr.setViceman(cellValue);//维修人员
						break;
					}
					else if(k == 4){
						mr.setTypename(cellValue);
						break;
 					}
					else if(k == 5){
 						mr.setDesc(cellValue);//维修说明
						break;
 					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			dit.setMaintenance(mr);
			wm.add(dit);
		}
		
		return wm;
	}
	
	/**
	 * 导入Wedlingmachine表数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	public static List<WeldingMachine> xlsxWm(String path) throws IOException, InvalidFormatException{
		List<WeldingMachine> wm = new ArrayList<WeldingMachine>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		
		int rowstart = sheet.getFirstRowNum()+1;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			WeldingMachine dit = new WeldingMachine();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
		            	 //处理数字过长时出现x.xxxE9
		            	 BigDecimal big=new BigDecimal(cell.getNumericCellValue());  
		            	 cellValue = big.toString();
                    }
					if(k == 0){
						dit.setEquipmentNo(cellValue);//设备编码
						break;
					}
					else if(k == 2){
						dit.setJoinTime(cellValue);//入厂时间
						break;
					}
					//采集序号机设备序号只能是数字
					else if(k == 7){
						Gather g = new Gather();
						g.setGatherNo(cellValue);
						dit.setGatherId(g);//采集序号
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						dit.setEquipmentNo(cellValue);//设备编码
						break;
					}
					else if(k == 1){
						dit.setTypename(cellValue);//设备类型
						break;
					}
					else if(k == 3){
 						Insframework ins = new Insframework();
 						ins.setName(cellValue);
 						dit.setInsframeworkId(ins);//所属项目
						break;
	    			}
					else if(k == 4){
			        	dit.setStatusname(cellValue);//状态
						break;
 					}
					else if(k == 5){
 						dit.setMvaluename(cellValue);//厂家
						break;
 					}
					else if(k == 6){
						if(cellValue.equals("是")){
	 						dit.setIsnetworking(0);//是否在网
						}else{
	 						dit.setIsnetworking(1);
						}
						break;
 					}
					//采集序号机设备序号只能是数字
					else if(k == 7){
						Gather g = new Gather();
						g.setGatherNo(cellValue);
						dit.setGatherId(g);//采集序号
						break;
					}
					else if(k == 8){
						dit.setPosition(cellValue);//位置
						break;
					}
					else if(k == 9){
						dit.setIp(cellValue);//ip地址
						break;
					}
					else if(k == 10){
						dit.setModel(cellValue);//设备型号
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			wm.add(dit);
		}
		
		return wm;
	}
	
	
	/**
	 * 导入 cat Wedlingmachine数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 *//*
	public static List<WeldingMachine> xlsxWm(String path) throws IOException, InvalidFormatException{
		List<WeldingMachine> wm = new ArrayList<WeldingMachine>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		int rowstart = sheet.getFirstRowNum()+1;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			WeldingMachine dit = new WeldingMachine();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
		            	 //处理数字过长时出现x.xxxE9
		            	 BigDecimal big=new BigDecimal(cell.getNumericCellValue());  
		            	 cellValue = big.toString();
                    }
					if(k == 0){
						dit.setEquipmentNo(cellValue);//设备编码
						break;
					}
					else if(k == 2){
						dit.setJoinTime(cellValue);//入厂时间
						break;
					}
					else if(k == 5){
						dit.setJoinTime(cellValue);//使用日期
						break;
					}
					else if(k == 8){
						dit.setFauthentication(cellValue);//上度认证时间
						break;
					}
					else if(k == 9){
						dit.setFtest(cellValue);//下次效验日期
						break;
					}
					else if(k == 10){
						dit.setFprevention(cellValue);//预防性维护日期
						break;
					}
					//采集序号机设备序号只能是数字
					else if(k == 14){
						Gather g = new Gather();
						g.setGatherNo(cellValue);
						dit.setGatherId(g);//采集序号
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						dit.setEquipmentNo(cellValue);//设备编号
						break;
					}
					else if(k == 1){
						dit.setTypename(cellValue);//设备名称
						break;
					}
					else if(k == 2){
						dit.setModel(cellValue);//设备型号
						break;
					}
					else if(k == 3){
						dit.setMvaluename(cellValue);//制造厂家
						break;
					}
					else if(k == 4){
						dit.setFmanunumbers(cellValue);//出厂编号
						break;
					}
					else if(k == 5){
						dit.setJoinTime(cellValue);//使用日期
						break;
					}
					else if(k == 6){
						dit.setPosition(cellValue);//存放地点
						break;
					}
					else if(k == 7){
						dit.setFsection(cellValue);//使用工段
						break;
					}
					else if(k == 8){
						dit.setFauthentication(cellValue);//上次效验时间
						break;
					}
					else if(k == 9){
						dit.setFtest(cellValue);//下次效验日期
						break;
					}
					else if(k == 10){
						dit.setFprevention(cellValue);//预防性维护日期
						break;
					}
					else if(k == 11){
 						Insframework ins = new Insframework();
 						ins.setName(cellValue);
 						dit.setInsframeworkId(ins);//所属项目
						break;
	    			}
					else if(k == 12){
			        	dit.setStatusname(cellValue);//状态
						break;
 					}
					else if(k == 13){
						if(cellValue.equals("是")){
	 						dit.setIsnetworking(0);//是否在网
						}else{
	 						dit.setIsnetworking(1);
						}
						break;
 					}
					//采集序号机设备序号只能是数字
					else if(k == 14){
						Gather g = new Gather();
						g.setGatherNo(cellValue);
						dit.setGatherId(g);//采集序号
						break;
					}
					
					else if(k == 15){
						dit.setIp(cellValue);//ip地址
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			wm.add(dit);
		}
		
		return wm;
	}*/
	/**
	 * 导入Welder表数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	public static List<Person> xlsxWelder(String path) throws IOException, InvalidFormatException{
		List<Person> welder = new ArrayList<Person>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		
		int rowstart = sheet.getFirstRowNum()+1;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			Person p = new Person();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
		            	 //处理数字过长时出现x.xxxE9
		            	 BigDecimal big=new BigDecimal(cell.getNumericCellValue());  
		            	 cellValue = big.toString();
                   }
					if(k == 1){
						p.setWelderno(cellValue);//焊工编号
						break;
					}
					else if(k == 2){
						p.setCellphone(cellValue);//手机
						break;
 					}
					else if(k == 4){
						p.setCardnum(cellValue);//卡号
						break;
 					}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						p.setName(cellValue);//姓名
						break;
					}
					else if(k == 1){
						p.setWelderno(cellValue);//焊工编号
						break;
					}
					else if(k == 2){
						p.setCellphone(cellValue);//手机
						break;
 					}
					else if(k == 3){
						p.setLevename(cellValue);//级别
						break;
 					}
					else if(k == 4){
						p.setCardnum(cellValue);//卡号
						break;
 					}
					else if(k == 5){
						p.setQualiname(cellValue);//资质
						break;
 					}
					else if(k == 6){
						p.setInsname(cellValue);//部门
						break;
 					}
					else if(k == 7){
						p.setBack(cellValue);//备注
						break;
 					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			welder.add(p);
		}
		
		return welder;
	}
	
	/**
	 * 导入catWelder表数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 *//*
	public static List<Person> xlsxWelder(String path) throws IOException, InvalidFormatException{
		List<Person> welder = new ArrayList<Person>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		
		int rowstart = sheet.getFirstRowNum()+2;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			Person p = new Person();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
		            	 //处理数字过长时出现x.xxxE9
		            	 BigDecimal big=new BigDecimal(cell.getNumericCellValue());  
		            	 cellValue = big.toString();
                   }
					if(k == 0){
						p.setWelderno(cellValue);//焊工编号
						break;
					}
					else if(k == 1){
						p.setFcheckintime(cellValue);//入职时间
						break;
					}
					else if(k == 2){
						p.setCardnum(cellValue);//卡号
						break;
 					}
					else if(k == 3){
						p.setFirstsuretime(cellValue);//首次认证日期
						break;
 					}
					else if(k == 6){
						p.setWorkmaintime(cellValue);//主岗位上岗时间
						break;
 					}
					else if(k == 8){
						p.setWorkfirsttime(cellValue);//岗位一上岗时间
						break;
 					}
					else if(k == 10){
						p.setWorksecondtime(cellValue);//岗位二上岗时间
						break;
 					}
					else if(k == 16){
						p.setScore(cellValue);//理论考试成绩
						break;
 					}
					else if(k == 18){
						p.setIcworkime(cellValue);//IC卡有效期
						break;
 					}
					else if(k == 19){
						p.setYearsure(cellValue);//最后年度认证
						break;
 					}
					else if(k == 20){
						p.setHalfyearsure(cellValue);//半年认证时间
						break;
 					}
					else if(k == 21){
						p.setNextyear(cellValue);//次年年度确认
						break;
 					}
					else if(k == 22){
						p.setCellphone(cellValue);//手机
						break;
 					}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						p.setWelderno(cellValue);//焊工编号
						break;
					}
					else if(k == 1){
						p.setFcheckintime(cellValue);//入职时间
						break;
					}
					else if(k == 2){
						p.setCardnum(cellValue);//钢印号
						break;
 					}
					else if(k == 3){
						p.setFirstsuretime(cellValue);//首次认证日期
						break;
 					}
					else if(k == 4){
						p.setInsname(cellValue);//部门
						break;
 					}
					else if(k == 5){
						p.setWorkship(cellValue);//车间
						break;
 					}
					else if(k == 6){
						p.setWorkmaintime(cellValue);//主岗位上岗时间
						break;
 					}
					else if(k == 7){
						p.setWorkkmainname(cellValue);//主岗位上岗名字
						break;
 					}
					else if(k == 8){
						p.setWorkfirsttime(cellValue);//岗位一上岗时间
						break;
 					}
					else if(k == 9){
						p.setWorkfirstname(cellValue);//岗位一上岗名字
						break;
 					}
					else if(k == 10){
						p.setWorksecondtime(cellValue);//岗位二上岗时间
						break;
 					}
					else if(k == 11){
						p.setWorksecondname(cellValue);//岗位二上岗名字
						break;
 					}
					else if(k == 12){
						p.setQualiname(cellValue);//资质
						break;
 					}
					else if(k == 13){
						p.setLevename(cellValue);//级别
						break;
 					}
					else if(k == 14){
						p.setName(cellValue);//姓名
						break;
 					}
					else if(k == 15){
						p.setLevel(cellValue);//技能等级
						break;
 					}
					else if(k == 16){
						p.setScore(cellValue);//理论考试成绩
						break;
 					}
					else if(k == 17){
						p.setIfpase(cellValue);//认证状态
						break;
 					}
					else if(k == 18){
						p.setIcworkime(cellValue);//IC卡有效期
						break;
 					}
					else if(k == 19){
						p.setYearsure(cellValue);//最后年度认证
						break;
 					}
					else if(k == 20){
						p.setHalfyearsure(cellValue);//半年年度认证
						break;
 					}
					else if(k == 21){
						p.setNextyear(cellValue);//次年年度认证
						break;
 					}
					else if(k == 22){
						p.setCellphone(cellValue);//手机
						break;
 					}
					else if(k == 23){
						p.setBack(cellValue);//备注
						break;
 					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			welder.add(p);
		}
		
		return welder;
	}*/
	
	/**
	 * 导入Weldedjunction表数据
	 * @param path
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	public static List<WeldedJunction> xlsxWeldedJunction(String path) throws IOException, InvalidFormatException{
		List<WeldedJunction> junction = new ArrayList<WeldedJunction>();
		InputStream stream = new FileInputStream(path);
		Workbook workbook = create(stream);
		Sheet sheet = workbook.getSheetAt(0);
		
		int rowstart = sheet.getFirstRowNum()+1;
		int rowEnd = sheet.getLastRowNum();
	    
		for(int i=rowstart;i<=rowEnd;i++){
			Row row = sheet.getRow(i);
			if(null == row){
				continue;
			}
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();
			WeldedJunction p = new WeldedJunction();
			for(int k = cellStart; k<= cellEnd;k++){
				Cell cell = row.getCell(k);
				if(null == cell){
					continue;
				}
				
				String cellValue = "";
				
				switch (cell.getCellType()){
				case HSSFCell.CELL_TYPE_NUMERIC://数字
					if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
		                SimpleDateFormat sdf = null;  
		                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
		                        .getBuiltinFormat("h:mm")) {  
		                    sdf = new SimpleDateFormat("HH:mm");  
		                } else {// 日期  
		                    sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                }  
		                Date date = cell.getDateCellValue();  
		                cellValue = sdf.format(date);  
		            } else if (cell.getCellStyle().getDataFormat() == 58) {  
		                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
		                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		                double value = cell.getNumericCellValue();  
		                Date date = org.apache.poi.ss.usermodel.DateUtil  
		                        .getJavaDate(value);  
		                cellValue = sdf.format(date);  
		            } else {
		            	String num = String.valueOf(cell.getNumericCellValue());
		            	 //处理数字过长时出现x.xxxE9
		            	BigDecimal big=new BigDecimal(cell.getNumericCellValue());
		            	//判断数字是否是小数
		            	Pattern pattern = Pattern.compile("^\\d+\\.\\d+$");
		            	Matcher isNum = pattern.matcher(big+"");
		            	if(isNum.matches()){
		            		//为小数时不进行过长处理否则小数位会自动补位，例：21.3变为21.39999999999999857891452847979962825775146484375
		            		cellValue = num;
		            	}else{
		            		cellValue = big.toString();
		            	}
//		            	 BigDecimal big=new BigDecimal(cell.getNumericCellValue());  
//		            	 cellValue = big.toString();
                   }
					if(k == 0){
						p.setWeldedJunctionno(cellValue);//编号
						break;
					}
					else if(k == 1){
						p.setSerialNo(cellValue);//序列号
						break;
					}
					else if(k == 6){
						p.setDyne(Integer.parseInt(cellValue));//达因
						break;
					}
					else if(k == 8){
						p.setPipelineNo(cellValue);//管线号
						break;
					}
					else if(k == 9){
						p.setRoomNo(cellValue);//房间号
						break;
					}
					else if(k == 10){
						p.setExternalDiameter(cellValue);//上游外径
						break;
					}
					else if(k == 11){
						p.setNextexternaldiameter(cellValue);//下游外径
						break;
					}
					else if(k == 12){
						p.setWallThickness(cellValue);//上游璧厚
						break;
					}
					else if(k == 13){
						p.setNextwall_thickness(cellValue);//下游璧厚
						break;
					}
					else if(k == 16){
						p.setMaxElectricity(Double.valueOf(cellValue));//电流上限
						break;
					}
					else if(k == 17){
						p.setMinElectricity(Double.valueOf(cellValue));//电流下限
						break;
					}
					else if(k == 18){
						p.setMaxValtage(Double.valueOf(cellValue));//电压上限
						break;
					}
					else if(k == 19){
						p.setMinValtage(Double.valueOf(cellValue));//电压下限
						break;
					}
					else if(k == 22){
						p.setStartTime(cellValue);//开始时间
						break;
					}
					else if(k == 23){
						p.setEndTime(cellValue);//结束时间
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_STRING://字符串
					cellValue = cell.getStringCellValue();
					if(k == 0){
						p.setWeldedJunctionno(cellValue);//编号
						break;
					}
					else if(k == 1){
						p.setSerialNo(cellValue);//序列号
						break;
					}
					else if(k == 2){
						p.setUnit(cellValue);//机组
						break;
					}
					else if(k == 3){
						p.setArea(cellValue);//区域
						break;
					}
					else if(k == 4){
						p.setSystems(cellValue);//系统
						break;
					}
					else if(k == 5){
						p.setChildren(cellValue);//子项
						break;
					}
					else if(k == 7){
						p.setSpecification(cellValue);//规格
						break;
					}
					else if(k == 8){
						p.setPipelineNo(cellValue);//管线号
						break;
					}
					else if(k == 9){
						p.setRoomNo(cellValue);//房间号
						break;
					}
					else if(k == 14){
						p.setMaterial(cellValue);//上游材质
						break;
					}
					else if(k == 15){
						p.setNext_material(cellValue);//下游材质
						break;
					}
					else if(k == 20){
						p.setElectricity_unit(cellValue);//电流单位
						break;
					}
					else if(k == 21){
						p.setValtage_unit(cellValue);//电压单位
						break;
					}
					else if(k == 24){
						Insframework insf = new Insframework();
						insf.setName(cellValue);
						p.setItemid(insf);//所属部门
						break;
					}
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
					cellValue = String.valueOf(cell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA: // 公式
					cellValue = String.valueOf(cell.getCellFormula());
					break;
				case HSSFCell.CELL_TYPE_BLANK: // 空值
					cellValue = "";
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障
					cellValue = "";
					break;
				default:
					cellValue = cell.toString().trim();
					break;
				}
			}
			junction.add(p);
		}
		
		return junction;
	}
	
	
	public static Workbook create(InputStream in) throws IOException,InvalidFormatException {
		if (!in.markSupported()) {
            in = new PushbackInputStream(in, 8);
        }
        if (POIFSFileSystem.hasPOIFSHeader(in)) {
            return new HSSFWorkbook(in);
        }
        if (POIXMLDocument.hasOOXMLHeader(in)) {
            return new XSSFWorkbook(OPCPackage.open(in));
        }
        throw new IllegalArgumentException("你的excel版本目前poi解析不了");
    }
	
	public static boolean isInteger(String str) {  
	     Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");  
	     return pattern.matcher(str).matches();  
	 }
}

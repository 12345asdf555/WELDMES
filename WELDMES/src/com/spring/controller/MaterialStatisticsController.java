package com.spring.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.Dictionarys;
import com.spring.model.Insframework;
import com.spring.model.MaterialStatistics;
import com.spring.model.MyUser;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.MaterialStatisticsService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 物料管理
 * @author zhushanlong
 */
@Controller
@RequestMapping(value = "/materialStatistics", produces = { "text/json;charset=UTF-8" })
public class MaterialStatisticsController {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**
	 * 分页
	 */
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private MaterialStatisticsService mss;
	@Autowired
	private InsframeworkService im;
	@Autowired
	private DictionaryService dictionaryService;
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 物料管理页面
	 * @param model
	 * @return
	 */
	@RequestMapping("/goMaterialStatistics")
	public String goMaterialStatistics(Model model) {
		return "materialStatistics/materialStatistics";
	}
	
	@RequestMapping("/getMaterialStatisticsList")
	@ResponseBody
	public String getMaterialStatisticsList(HttpServletRequest request) {
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if (iutil.isNull(parentId)) {
			parent = new BigInteger(parentId);
		}
		request.getSession().setAttribute("searchStr", searchStr);
		page = new Page(pageIndex, pageSize, total);
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		
		List<MaterialStatistics> list = mss.selectMaterialStatisticsList(page,parent, searchStr);
		if (null != list && list.size() > 0){
			for (MaterialStatistics material : list) {
				JSONObject json = new JSONObject();
				json.put("materialStatisticsId", material.getMaterialStatisticsId());//主键id
				json.put("code", material.getCode());
				json.put("name", material.getName());
				json.put("materialType", material.getMaterialType());
				json.put("materialTypeName", material.getMaterialTypeName());
				json.put("location", material.getLocation());
				json.put("inventory", material.getInventory());
				json.put("unit", material.getUnit());
				json.put("totalPrices", material.getTotalPrices());
				json.put("parentId", material.getParentId());
				json.put("supplierId", material.getSupplierId());
				json.put("createTime", material.getCreateTime());
				ary.add(json);
			}
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 物料列表树形菜单
	 * @param name
	 * @return
	 */
	@RequestMapping("/getMaterialTree")
	@ResponseBody
	public void getMaterialTree(HttpServletResponse response){
        String str ="";  
        StringBuilder json = new StringBuilder();
        List<MaterialStatistics> list = mss.selectMaterialTree();
        if (null != list && list.size() > 0){
        	json.append("["); 
        	for (MaterialStatistics tree : list) {  
    	        json.append("{\"id\":" +String.valueOf(tree.getMaterialStatisticsId()));
    	        json.append(",\"text\":\"" + tree.getName() +"11111"+ tree.getCode()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        if (list.size()-1 == list.indexOf(tree)){
    	        	 json.append("}");
    	        }else{
    	        	 json.append("},");
    	        }
        	}
        	json.append("]");
	        str = json.toString();
	        str = str.replace("11111", "     ");
        }
        try {
            response.getWriter().print(str);  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
	}
	
	/**
	 * 获取当前物料信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/findMaterialById")
	@ResponseBody
	public String findMaterialById(HttpServletRequest request) {
		String materialId = request.getParameter("materialId");
		JSONObject obj = new JSONObject();
		MaterialStatistics material = mss.findMaterialById(BigInteger.valueOf(Long.valueOf(materialId)));
		if (null != material){
			obj.put("code", material.getCode());
			obj.put("name", material.getName());
			obj.put("materialTypeName", material.getMaterialTypeName());
			obj.put("location", material.getLocation());
			obj.put("inventory", material.getInventory());
			obj.put("unit", material.getUnit());
			obj.put("totalPrices", material.getTotalPrices());
		}
		return obj.toString();
	}
	
	/**
	 * 删除物料信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteMaterialById")
	@ResponseBody
	public String deleteMaterialById(HttpServletRequest request) {
		String materialId = request.getParameter("materialId");
		JSONObject obj = new JSONObject();
		boolean flag = false;
		if (null != materialId && !"".equals(materialId)){
			int i = mss.deleteMaterialById(BigInteger.valueOf(Long.valueOf(materialId)));
			if (i != 0){
				flag = true;
			}
		}
		obj.put("flag", flag);
		return obj.toString();
	}
	
	/**
	 * 数据初始化获取字典数据
	 * @param request
	 * @return
	 */
	@RequestMapping("/initializeMaterial")
	@ResponseBody
	public String initializeMaterial(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		JSONArray materialType = new JSONArray();
		JSONArray parentIdlist = new JSONArray();
		//物料类型
		List<Dictionarys> materialTypeList = dictionaryService.getDictionaryValue(19);
		if (null != materialTypeList && materialTypeList.size() > 0){
			for (Dictionarys dictionarys : materialTypeList) {
				JSONObject json = new JSONObject();
				json.put("value", dictionarys.getValue());
				json.put("valuename", dictionarys.getValueName());
				materialType.add(json);
			}
		}
		//父级物料列表
		List<MaterialStatistics> list = mss.selectMaterialTree();
		if (null != list && list.size() > 0) {
			for(MaterialStatistics statistics : list) {
    	       JSONObject json = new JSONObject();
    	       json.put("id", String.valueOf(statistics.getMaterialStatisticsId()));
    	       json.put("text", statistics.getName()+"  "+statistics.getCode());
    	       json.put("materialType", statistics.getMaterialType());
    	       json.put("state", "open");
    	       parentIdlist.add(json);
			}
		}
		obj.put("materialType", materialType);
		obj.put("parentIdlist", parentIdlist);
		return obj.toString();
	}
	
	/**
	 * 修改
	 * @param request
	 * @return
	 */
	@RequestMapping("/editMaterialStatistics")
	@ResponseBody
	public String editMaterialStatistics(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		MaterialStatistics material = new MaterialStatistics();
		try{
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String materialId = request.getParameter("materialId");
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String materialType = request.getParameter("materialType");
			String location = request.getParameter("location");
			//String inventory = request.getParameter("inventory");
			String unit = request.getParameter("unit");
			//String totalPrices = request.getParameter("totalPrices");
			String parentId = request.getParameter("parentId");
			
			material.setMaterialStatisticsId(BigInteger.valueOf(Long.valueOf(materialId)));
			material.setCode(code);
			material.setName(name);
			material.setMaterialType(Integer.valueOf(materialType));
			material.setLocation(location);
			//material.setInventory(BigDecimal.valueOf(Long.valueOf(inventory))); //库存暂不做编辑
			material.setUnit(unit);
			//material.setTotalPrices(BigDecimal.valueOf(Long.valueOf(totalPrices)));//总价暂不做编辑
			material.setParentId(BigInteger.valueOf(Long.valueOf(parentId)));
			material.setMender(BigInteger.valueOf(user.getId()));
			int i = mss.updateMaterialById(material);
			if (i != 0){
				obj.put("success", true);
			}else{
				obj.put("success", false);
			}
		}catch (Exception e) {
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 新增
	 * @param request
	 * @return
	 */
	@RequestMapping("/addMaterialStatistics")
	@ResponseBody
	public String addMaterialStatistics(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		MaterialStatistics material = new MaterialStatistics();
		try{
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String materialType = request.getParameter("materialType");
			String location = request.getParameter("location");
			String unit = request.getParameter("unit");
			String parentId = request.getParameter("parentId");
			
			material.setCode(code);
			material.setName(name);
			material.setMaterialType(Integer.valueOf(materialType));
			material.setLocation(location);
			material.setUnit(unit);
			if (null != parentId && !"".equals(parentId)){
				material.setParentId(BigInteger.valueOf(Long.valueOf(parentId)));
			}else{
				material.setParentId(BigInteger.valueOf(0));
			}
			material.setCreator(BigInteger.valueOf(user.getId()));
			material.setCreateTime(sdf.format(System.currentTimeMillis()));
			int i = mss.addMaterialStatistics(material);
			if (i != 0){
				obj.put("success", true);
			}else{
				obj.put("success", false);
			}
		}catch (Exception e) {
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 出入库记录保存
	 * @param request
	 * @return
	 */
	@RequestMapping("/saveMaterialRecord")
	@ResponseBody
	public String saveMaterialRecord(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		MaterialStatistics material = new MaterialStatistics();
		try {
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String codeadd = request.getParameter("codeadd");
			String type = request.getParameter("type");
			String numberadd = request.getParameter("numberadd");
			String orderNumber = request.getParameter("orderNumber");
			String supplierId = request.getParameter("supplierId");
			String record_datetime = request.getParameter("record_datetime");
			String univalence = request.getParameter("univalence");
			String total_prices = request.getParameter("total_prices");
			
			material.setRecordCode(codeadd);
			material.setType(Integer.valueOf(type));
			material.setNumber(BigDecimal.valueOf(Long.valueOf(numberadd)));
			material.setRecordDatetime(record_datetime);
			material.setOrderNumber(orderNumber);
			material.setRecordSupplierId(Integer.valueOf(supplierId));
			material.setUnivalence(BigDecimal.valueOf(Long.valueOf(univalence)));
			material.setRecordTotalPrices(BigDecimal.valueOf(Long.valueOf(total_prices)));
			material.setRecordCreator(BigInteger.valueOf(user.getId()));
			material.setRecordCreateTime(sdf.format(System.currentTimeMillis()));
			int i = mss.saveMaterialRecord(material);
			if (i != 0){
				obj.put("success", true);
			}else{
				obj.put("success", false);
			}
		}catch (Exception e) {
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/getMaterialRecordList")
	@ResponseBody
	public String getMaterialRecordList(HttpServletRequest request) {
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String code = request.getParameter("code");
		request.getSession().setAttribute("searchStr", searchStr);
		page = new Page(pageIndex, pageSize, total);
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		
		List<MaterialStatistics> list = mss.selectMaterialRecordList(page,code, searchStr);
		if (null != list && list.size() > 0){
			for (MaterialStatistics material : list) {
				JSONObject json = new JSONObject();
				json.put("materialRecordId", material.getMaterialRecordId());//主键id
				json.put("recordCode", material.getRecordCode());
				json.put("type", material.getType());
				json.put("number", material.getNumber());
				json.put("recordDatetime", material.getRecordDatetime());
				json.put("orderNumber", material.getOrderNumber());
				json.put("recordSupplierId", material.getRecordSupplierId());
				json.put("univalence", material.getUnivalence());
				json.put("recordTotalPrices", material.getRecordTotalPrices());
				json.put("recordCreateTime", material.getRecordCreateTime());
				ary.add(json);
			}
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
}

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
import com.spring.model.MaterialMessage;
import com.spring.model.MyUser;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.MaterialMessageService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 物料管理
 * @author zhushanlong
 */
@Controller
@RequestMapping(value = "/materialMessage", produces = { "text/json;charset=UTF-8" })
public class MaterialMessageController {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**
	 * 分页
	 */
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private MaterialMessageService mms;
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
	@RequestMapping("/goMaterialMessage")
	public String goMaterialMessage(Model model) {
		return "materialMessage/materialMessage";
	}
	
	@RequestMapping("/getMaterialMessageList")
	@ResponseBody
	public String getMaterialMessageList(HttpServletRequest request) {
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
		
		List<MaterialMessage> list = mms.selectMaterialList(page,parent, searchStr);
		if (null != list && list.size() > 0){
			for (MaterialMessage material : list) {
				JSONObject json = new JSONObject();
				json.put("materialId", material.getMaterialId());
				json.put("code", material.getCode());
				json.put("name", material.getName());
				json.put("materialTypeName", material.getMaterialTypeName());
				json.put("materialType", material.getMaterialType());
				json.put("location", material.getLocation());
				json.put("inventory", material.getInventory());
				if (material.getInventoryChangeType() == 1){
					json.put("inventoryChangeTypeName", "入库");
					json.put("inventoryChangeType", material.getInventoryChangeType());
				}else if(material.getInventoryChangeType() == 2){
					json.put("inventoryChangeTypeName", "出库");
					json.put("inventoryChangeType", material.getInventoryChangeType());
				}else{
					json.put("inventoryChangeTypeName", "");
					json.put("inventoryChangeType", "");
				}
				json.put("changeAddress", material.getChangeAddress());
				json.put("changeNumber", material.getChangeNumber());
				json.put("changeOrder", material.getChangeOrder());
				json.put("putGetStorageTypeName", material.getPutGetStorageTypeName());
				json.put("putGetStorageType", material.getPutGetStorageType());
				json.put("changeTime", material.getChangeTime());
				json.put("unit", material.getUnit());
				json.put("univalence", material.getUnivalence());
				json.put("totalPrices", material.getTotalPrices());
				json.put("parentId", material.getParentId());
				json.put("supplierId", material.getSupplierId());
				json.put("creator", material.getCreator());
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
        List<MaterialMessage> list = mms.selectMaterialTree();
        if (null != list && list.size() > 0){
        	json.append("["); 
        	for (MaterialMessage tree : list) {  
    	        json.append("{\"id\":" +String.valueOf(tree.getMaterialId()));
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
		MaterialMessage material = mms.findMaterialById(BigInteger.valueOf(Long.valueOf(materialId)));
		if (null != material){
			obj.put("code", material.getCode());
			obj.put("name", material.getName());
			obj.put("materialType", material.getMaterialTypeName());
			obj.put("location", material.getLocation());
			obj.put("inventory", material.getInventory());
			//obj.put("inventoryChangeType", material.getInventoryChangeType());
			if (material.getInventoryChangeType() == 1){
				obj.put("inventoryChangeType", "入库");
			}else if(material.getInventoryChangeType() == 2){
				obj.put("inventoryChangeType", "出库");
			}else{
				obj.put("inventoryChangeType", "");
			}
			obj.put("changeAddress", material.getChangeAddress());
			obj.put("changeNumber", material.getChangeNumber());
			obj.put("changeOrder", material.getChangeOrder());
			obj.put("putGetStorageType", material.getPutGetStorageTypeName());
			obj.put("changeTime", material.getChangeTime());
			obj.put("supplierName", material.getSupplierName());
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
			int i = mms.deleteMaterialById(BigInteger.valueOf(Long.valueOf(materialId)));
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
	@RequestMapping("/initialize")
	@ResponseBody
	public String initialize(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		JSONArray materialType = new JSONArray();
		JSONArray putStorageType = new JSONArray();
		JSONArray GetStorageType = new JSONArray();
		//物料类型
		List<Dictionarys> materialTypeList = dictionaryService.getDictionaryValue(19);
		//物料入库类型
		List<Dictionarys> putStorageTypeList = dictionaryService.getDictionaryValue(20);
		//物料出库类型
		List<Dictionarys> GetStorageTypeList = dictionaryService.getDictionaryValue(21);
		
		if (null != materialTypeList && materialTypeList.size() > 0){
			for (Dictionarys dictionarys : materialTypeList) {
				JSONObject json = new JSONObject();
				json.put("value", dictionarys.getValue());
				json.put("valuename", dictionarys.getValueName());
				materialType.add(json);
			}
		}
		if (null != putStorageTypeList && putStorageTypeList.size() > 0){
			for (Dictionarys dictionarys : putStorageTypeList) {
				JSONObject json = new JSONObject();
				json.put("value", dictionarys.getValue());
				json.put("valuename", dictionarys.getValueName());
				putStorageType.add(json);
			}
		}
		if (null != GetStorageTypeList && GetStorageTypeList.size() > 0){
			for (Dictionarys dictionarys : GetStorageTypeList) {
				JSONObject json = new JSONObject();
				json.put("value", dictionarys.getValue());
				json.put("valuename", dictionarys.getValueName());
				GetStorageType.add(json);
			}
		}
		obj.put("materialType", materialType);
		obj.put("putStorageType", putStorageType);
		obj.put("GetStorageType", GetStorageType);
		return obj.toString();
	}
	
	/**
	 * 修改
	 * @param request
	 * @return
	 */
	@RequestMapping("/editMaterialMessage")
	@ResponseBody
	public String editMaterialMessage(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		MaterialMessage material = new MaterialMessage();
		try{
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String materialId = request.getParameter("materialId");
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String materialType = request.getParameter("materialType");
			String location = request.getParameter("location");
			String inventory = request.getParameter("inventory");
			String inventoryChangeType = request.getParameter("inventoryChangeType");
			String changeAddress = request.getParameter("changeAddress");
			String changeNumber = request.getParameter("changeNumber");
			String changeOrder = request.getParameter("changeOrder");
			String putGetStorageType = request.getParameter("putGetStorageType");
			String changeTime = request.getParameter("changeTime");
			String unit = request.getParameter("unit");
			String univalence = request.getParameter("univalence");
			String totalPrices = request.getParameter("totalPrices");
			String parentId = request.getParameter("parentId");
			String supplierId = request.getParameter("supplierId");
			
			material.setMaterialId(BigInteger.valueOf(Long.valueOf(materialId)));
			material.setCode(code);
			material.setName(name);
			material.setMaterialType(Integer.valueOf(materialType));
			material.setLocation(location);
			material.setInventory(inventory);
			material.setInventoryChangeType(Integer.valueOf(inventoryChangeType));
			material.setChangeAddress(changeAddress);
			material.setChangeNumber(Integer.valueOf(changeNumber));
			material.setChangeOrder(changeOrder);
			material.setPutGetStorageType(Integer.valueOf(putGetStorageType));
			material.setChangeTime(changeTime);
			material.setUnit(unit);
			material.setUnivalence(BigDecimal.valueOf(Long.valueOf(univalence)));
			material.setTotalPrices(BigDecimal.valueOf(Long.valueOf(totalPrices)));
			material.setParentId(BigInteger.valueOf(Long.valueOf(parentId)));
			material.setSupplierId(Integer.valueOf(supplierId));
			material.setMender(BigInteger.valueOf(user.getId()));
			int i = mms.updateMaterialById(material);
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
	@RequestMapping("/addMaterialMessage")
	@ResponseBody
	public String addMaterialMessage(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		MaterialMessage material = new MaterialMessage();
		try{
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String materialType = request.getParameter("materialType");
			String location = request.getParameter("location");
			String inventory = request.getParameter("inventory");
			String inventoryChangeType = request.getParameter("inventoryChangeType");
			String changeAddress = request.getParameter("changeAddress");
			String changeNumber = request.getParameter("changeNumber");
			String changeOrder = request.getParameter("changeOrder");
			String putGetStorageType = request.getParameter("putGetStorageType");
			String changeTime = request.getParameter("changeTime");
			String unit = request.getParameter("unit");
			String univalence = request.getParameter("univalence");
			String totalPrices = request.getParameter("totalPrices");
			String parentId = request.getParameter("parentId");
			String supplierId = request.getParameter("supplierId");
			
			material.setCode(code);
			material.setName(name);
			material.setMaterialType(Integer.valueOf(materialType));
			material.setLocation(location);
			material.setInventory(inventory);
			material.setInventoryChangeType(Integer.valueOf(inventoryChangeType));
			material.setChangeAddress(changeAddress);
			material.setChangeNumber(Integer.valueOf(changeNumber));
			material.setChangeOrder(changeOrder);
			material.setPutGetStorageType(Integer.valueOf(putGetStorageType));
			material.setChangeTime(changeTime);
			material.setUnit(unit);
			material.setUnivalence(BigDecimal.valueOf(Long.valueOf(univalence)));
			material.setTotalPrices(BigDecimal.valueOf(Long.valueOf(totalPrices)));
			if (null != parentId && !"".equals(parentId)){
				material.setParentId(BigInteger.valueOf(Long.valueOf(parentId)));
			}else{
				material.setParentId(BigInteger.valueOf(0));
			}
			if (null != supplierId && !"".equals(supplierId)){
				material.setSupplierId(Integer.valueOf(supplierId));
			}else{
				material.setSupplierId(0);
			}
			material.setCreator(BigInteger.valueOf(user.getId()));
			material.setCreateTime(sdf.format(System.currentTimeMillis()));
			int i = mms.addMaterialMessage(material);
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
}

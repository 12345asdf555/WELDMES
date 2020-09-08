package com.spring.controller;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.Insframework;
import com.spring.model.MaterialMessage;
import com.spring.page.Page;
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
				json.put("materialType", material.getMaterialTypeName());
				json.put("location", material.getLocation());
				json.put("inventory", material.getInventory());
				if (material.getInventoryChangeType() == 1){
					json.put("inventoryChangeType", "入库");
				}else if(material.getInventoryChangeType() == 2){
					json.put("inventoryChangeType", "出库");
				}else{
					json.put("inventoryChangeType", "");
				}
				json.put("changeAddress", material.getChangeAddress());
				json.put("changeNumber", material.getChangeNumber());
				json.put("changeOrder", material.getChangeOrder());
				json.put("putGetStorageType", material.getPutGetStorageTypeName());
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
}

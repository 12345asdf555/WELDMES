package com.spring.controller;

import java.io.IOException;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.spring.model.MyUser;
import com.spring.model.SupplierMessage;
import com.spring.page.Page;
import com.spring.service.SupplierMessageService;
import com.spring.util.IsnullUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 供应商管理
 * @author zhushanlong
 */

@Controller
@RequestMapping(value = "/supplierMessage", produces = { "text/json;charset=UTF-8" })
public class SupplierMessageController {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**
	 * 分页
	 */
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	
	@Autowired
	private SupplierMessageService supplierService;
	
	IsnullUtil iutil = new IsnullUtil();
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping("/goSupplierMessage")
	public String goSupplierMessage(Model model) {
		return "supplierMessage/supplierMessage";
	}
	
	/**
	 * 供应商列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/getSupplierMessageList")
	@ResponseBody
	public String getSupplierMessageList(HttpServletRequest request) {
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
		
		List<SupplierMessage> list = supplierService.selectSupplierList(page, parent, searchStr);
		if (null != list && list.size() > 0){
			for (SupplierMessage supplier : list) {
				JSONObject json = new JSONObject();
				json.put("supplierId", supplier.getSupplierId());
				json.put("code", supplier.getCode());
				json.put("name", supplier.getName());
				json.put("address", supplier.getAddress());
				json.put("phone", supplier.getPhone());
				json.put("contacts", supplier.getContacts());
				json.put("remark", supplier.getRemark());
				json.put("creator", supplier.getCreator());
				json.put("createTime", supplier.getCreateTime());
				ary.add(json);
			}
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 新增
	 * @param request
	 * @return
	 */
	@RequestMapping("/addSupplierMessage")
	@ResponseBody
	public String addSupplierMessage(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		SupplierMessage supplier = new SupplierMessage();
		try{
			MyUser user = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String contacts = request.getParameter("contacts");
			String remark = request.getParameter("remark");
			
			supplier.setCode(code);
			supplier.setName(name);
			supplier.setAddress(address);
			supplier.setPhone(phone);
			supplier.setContacts(contacts);
			supplier.setRemark(remark);
			supplier.setCreator(BigInteger.valueOf(user.getId()));
			supplier.setCreateTime(sdf.format(System.currentTimeMillis()));
			
			int i = supplierService.addSupplierMessage(supplier);
			if (i != 0){
				obj.put("success", true);
			}else{
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
	 * 修改
	 * @param request
	 * @return
	 */
	@RequestMapping("/editSupplierMessage")
	@ResponseBody
	public String editSupplierMessage(HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		SupplierMessage supplier = new SupplierMessage();
		try{
			String supplierId = request.getParameter("supplierId");
			String code = request.getParameter("code");
			String name = request.getParameter("name");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String contacts = request.getParameter("contacts");
			String remark = request.getParameter("remark");
			
			supplier.setSupplierId(Integer.valueOf(supplierId));
			supplier.setCode(code);
			supplier.setName(name);
			supplier.setAddress(address);
			supplier.setPhone(phone);
			supplier.setContacts(contacts);
			supplier.setRemark(remark);
			
			int i = supplierService.updateSupplierMessage(supplier);
			if (i != 0){
				obj.put("success", true);
			}else{
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
	 * 删除
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteSupplierMessage")
	@ResponseBody
	public String deleteSupplierMessage(@RequestParam String supplierId) {
		JSONObject obj = new JSONObject();
		boolean success = false;
		try{
			if(null != supplierId && !"".equals(supplierId)){
				int i = supplierService.deleteSupplierMessage(Integer.valueOf(supplierId));
				if (i != 0){
					success = true;
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		obj.put("success", success);
		return obj.toString();
	}
	
	/**
	 * 供应商列表
	 * @param response
	 */
	@RequestMapping("/selectSupplierAll")
	@ResponseBody
	public void selectSupplierAll(HttpServletResponse response){
        String str ="";  
        StringBuilder json = new StringBuilder();
        List<SupplierMessage> list = supplierService.selectSupplierAll();
        if (null != list && list.size() > 0){
        	json.append("["); 
        	for (SupplierMessage tree : list) {  
    	        json.append("{\"id\":" +String.valueOf(tree.getSupplierId()));
    	        json.append(",\"text\":\"" + tree.getName() +"11111"+ tree.getCode()+ "\"");
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
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
	}
}

package com.spring.controller;

import java.math.BigInteger;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
}

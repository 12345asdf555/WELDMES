package com.spring.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.MyUser;
import com.spring.model.Product;
import com.spring.page.Page;
import com.spring.service.ProductService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/product",produces = { "text/json;charset=UTF-8" })
public class ProductController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	private BigInteger prowe;
	private BigInteger wecess;
	
	@Autowired
	private ProductService productService;
	
	IsnullUtil iutil = new IsnullUtil();
	
	@RequestMapping("/AllProduct")
	public String AllProduct(HttpServletRequest request){
		return "product/allProduct";
	}

	@RequestMapping("/getAllProduct")
	@ResponseBody
	public String getAllProduct(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		page = new Page(pageIndex,pageSize,total);
		List<Product> findAll = productService.findAll(page,parent,search);
		long total = 0;
		
		if(findAll != null){
			PageInfo<Product> pageinfo = new PageInfo<Product>(findAll);
			total = pageinfo.getTotal();
		}

		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Product product:findAll){
				json.put("id", product.getId());
				json.put("pronum", product.getPronum());
				json.put("partnum", product.getPartnum());
				json.put("proinfo", product.getProinfo());
				json.put("partinfo", product.getPartinfo());
				json.put("remark1", product.getBackone());
				json.put("remark2", product.getBacktwo());
				json.put("remark3", product.getBackthree());
				json.put("remark4", product.getBackfour());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/toAddProduct")
	public String toAddProduct(HttpServletRequest request){
		return "product/addProduct";
	}
	
	@RequestMapping("/toUpdateProduct")
	public String toUpdateProduct(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findById(fid);
		request.setAttribute("product", product);
		return "product/editProduct";
	}
	
	@RequestMapping("/toDestroyProduct")
	public String toDestroyProduct(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findById(fid);
		request.setAttribute("product", product);
		return "product/deleteProduct";
	}
	
	@RequestMapping("/addProduct")
	@ResponseBody
	public String addProduct(HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Product product = new Product();
		JSONObject obj = new JSONObject();
		try{
			product.setBackone(request.getParameter("remark1"));
			product.setBackfour(request.getParameter("remark4"));
			product.setBackthree(request.getParameter("remark3"));
			product.setBacktwo(request.getParameter("remark2"));
			product.setPronum(request.getParameter("pronum"));
			product.setProinfo(request.getParameter("proinfo"));
			product.setPartnum(request.getParameter("partnum"));
			product.setPartinfo(request.getParameter("partinfo"));
			product.setFcreater(myuser.getId());
			product.setFupdater(myuser.getId());
			product.setFcreatedate(sdf.parse(sdf.format((new Date()).getTime())));
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.save(product);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/updateProduct")
	@ResponseBody
	public String updateProduct(Product product,HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			product.setId(new BigInteger(request.getParameter("id")));
			product.setBackone(request.getParameter("remark1"));
			product.setBackfour(request.getParameter("remark4"));
			product.setBackthree(request.getParameter("remark3"));
			product.setBacktwo(request.getParameter("remark2"));
			product.setPronum(request.getParameter("pronum"));
			product.setProinfo(request.getParameter("proinfo"));
			product.setPartnum(request.getParameter("partnum"));
			product.setPartinfo(request.getParameter("partinfo"));
			product.setFupdater(myuser.getId());
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.update(product);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	@RequestMapping("/destroyProduct")
	@ResponseBody
	public String destroyProduct(@RequestParam BigInteger id){

			JSONObject obj = new JSONObject();
			try{
				productService.deleteByProduct(id);
				productService.delete(id);
				obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	@RequestMapping("/AllWeldf")
	public String AllWeldf(HttpServletRequest request){
		if(request.getParameter("fid")!=null&&request.getParameter("fid")!=""){
		prowe = new BigInteger(request.getParameter("fid"));
		}
		return "weldf/allWeldf";
	}

	@RequestMapping("/getAllWeldf")
	@ResponseBody
	public String getAllWeldf(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		page = new Page(pageIndex,pageSize,total);
		List<Product> findAllWeldf = productService.findAllWeldf(prowe,page,parent,search);
		long total = 0;
		
		if(findAllWeldf != null){
			PageInfo<Product> pageinfo = new PageInfo<Product>(findAllWeldf);
			total = pageinfo.getTotal();
		}

		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Product product:findAllWeldf){
				json.put("id", product.getId());
				json.put("weldnum", product.getPronum());
				json.put("weldinfo", product.getProinfo());
				json.put("remark1", product.getBackone());
				json.put("remark2", product.getBacktwo());
				json.put("remark3", product.getBackthree());
				json.put("remark4", product.getBackfour());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/toAddWeldf")
	public String toAddWeldf(HttpServletRequest request){
		return "weldf/addWeldf";
	}
	
	@RequestMapping("/toUpdateWeldf")
	public String toUpdateWeldf(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findWeldfById(fid);
		request.setAttribute("product", product);
		return "weldf/editWeldf";
	}
	
	@RequestMapping("/toDestroyWeldf")
	public String toDestroyWeldf(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findWeldfById(fid);
		request.setAttribute("product", product);
		return "weldf/deleteWeldf";
	}
	
	@RequestMapping("/addWeldf")
	@ResponseBody
	public String addWeldf(HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Product product = new Product();
		Product duct = new Product();
		JSONObject obj = new JSONObject();
		try{
			product.setBackone(request.getParameter("remark1"));
			product.setBackfour(request.getParameter("remark4"));
			product.setBackthree(request.getParameter("remark3"));
			product.setBacktwo(request.getParameter("remark2"));
			product.setPronum(request.getParameter("weldnum"));
			product.setProinfo(request.getParameter("weldinfo"));
			product.setFcreater(myuser.getId());
			product.setFupdater(myuser.getId());
			product.setFcreatedate(sdf.parse(sdf.format((new Date()).getTime())));
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.saveWeldf(product);
			duct.setIid(productService.findWeldId());
			duct.setId(prowe);
			productService.saveProwe(duct);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/updateWeldf")
	@ResponseBody
	public String updateWeldf(Product product,HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			product.setId(new BigInteger(request.getParameter("id")));
			product.setBackone(request.getParameter("remark1"));
			product.setBackfour(request.getParameter("remark4"));
			product.setBackthree(request.getParameter("remark3"));
			product.setBacktwo(request.getParameter("remark2"));
			product.setPronum(request.getParameter("weldnum"));
			product.setProinfo(request.getParameter("weldinfo"));
			product.setFupdater(myuser.getId());
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.updateWeldf(product);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	@RequestMapping("/destroyWeldf")
	@ResponseBody
	public String destroyWeldf(@RequestParam BigInteger id){

			JSONObject obj = new JSONObject();
			try{
				productService.deleteByWp(id);
				productService.deleteByWeld(id);
				productService.deleteWeldf(id);
				obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	
	@RequestMapping("/AllProcess")
	public String AllProcess(HttpServletRequest request){
		if(request.getParameter("fid")!=null&&request.getParameter("fid")!=""){
		wecess = new BigInteger(request.getParameter("fid"));
		}
		return "process/allProcess";
	}

	@RequestMapping("/getAllProcess")
	@ResponseBody
	public String getAllProcess(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}
		page = new Page(pageIndex,pageSize,total);
		List<Product> findAllProcess = productService.findAllProcess(wecess,page,parent,search);
		long total = 0;
		
		if(findAllProcess != null){
			PageInfo<Product> pageinfo = new PageInfo<Product>(findAllProcess);
			total = pageinfo.getTotal();
		}

		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Product product:findAllProcess){
				json.put("id", product.getId());
				json.put("processname", product.getProcessname());
				json.put("weldposition", product.getWeldposition());
				json.put("material", product.getMaterial());
				json.put("format", product.getFormat());
				json.put("method", product.getMethod());
				json.put("drying", product.getDrying());
				json.put("temperature", product.getTemperature());
				json.put("factor", product.getFactor());
				json.put("require", product.getFrequire());
				json.put("lecel", product.getFlevel());
				json.put("qualify", product.getQualify());
				json.put("range", product.getFrange());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/toAddProcess")
	public String toAddProcess(HttpServletRequest request){
		return "process/addProcess";
	}
	
	@RequestMapping("/toUpdateProcess")
	public String toUpdateProcess(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findProcessById(fid);
		request.setAttribute("process", product);
		return "process/editProcess";
	}
	
	@RequestMapping("/toDestroyProcess")
	public String toDestroyProcess(@RequestParam BigInteger fid,HttpServletRequest request){
		Product product = productService.findProcessById(fid);
		request.setAttribute("process", product);
		return "process/deleteProcess";
	}
	
	@RequestMapping("/addProcess")
	@ResponseBody
	public String addProcess(HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Product product = new Product();
		Product duct = new Product();
		JSONObject obj = new JSONObject();
		try{
			product.setProcessname(request.getParameter("processname"));
			product.setWeldposition(request.getParameter("weldposition"));
			product.setMaterial(request.getParameter("material"));
			product.setFormat(Double.parseDouble(request.getParameter("format")));
			product.setMethod(request.getParameter("method"));
			product.setDrying(request.getParameter("drying"));
			product.setTemperature(request.getParameter("temperature"));
			product.setFactor(request.getParameter("factor"));
			product.setFrequire(request.getParameter("require"));
			product.setFlevel(request.getParameter("lecel"));
			product.setQualify(request.getParameter("qualify"));
			product.setFrange(request.getParameter("range"));
			product.setFcreater(myuser.getId());
			product.setFupdater(myuser.getId());
			product.setFcreatedate(sdf.parse(sdf.format((new Date()).getTime())));
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.saveProcess(product);
			duct.setIid(productService.findProcessId());
			duct.setId(wecess);
			productService.saveWeldcess(duct);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/updateProcess")
	@ResponseBody
	public String updateProcess(Product product,HttpServletRequest request){
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			product.setProcessname(request.getParameter("processname"));
			product.setWeldposition(request.getParameter("weldposition"));
			product.setMaterial(request.getParameter("material"));
			product.setFormat(Double.parseDouble(request.getParameter("format")));
			product.setMethod(request.getParameter("method"));
			product.setDrying(request.getParameter("drying"));
			product.setTemperature(request.getParameter("temperature"));
			product.setFactor(request.getParameter("factor"));
			product.setFrequire(request.getParameter("require"));
			product.setFlevel(request.getParameter("lecel"));
			product.setQualify(request.getParameter("qualify"));
			product.setFrange(request.getParameter("range"));
			product.setFupdater(myuser.getId());
			product.setFupdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			productService.updateProcess(product);
			obj.put("success", true);
			}catch(Exception e){
				e.printStackTrace();
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	@RequestMapping("/destroyProcess")
	@ResponseBody
	public String destroyProcess(@RequestParam BigInteger id){

			JSONObject obj = new JSONObject();
			try{
				productService.deleteByProcess(id);
				productService.deleteProcess(id);
				obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
/*	@RequestMapping("/productvalidate")
	@ResponseBody
	private String productvalidate(@RequestParam String fwpsnum){
		boolean data = true;
		int count = productService.getUsernameCount(fwpsnum);
		if(count>0){
			data = false;
		}
		return data + "";
	}*/
}

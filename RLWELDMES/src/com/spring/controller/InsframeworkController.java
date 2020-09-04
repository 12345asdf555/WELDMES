package com.spring.controller;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.dto.WeldDto;
import com.spring.model.Dictionarys;
import com.spring.model.Insframework;
import com.spring.model.MyUser;
import com.spring.model.WeldingMachine;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.WeldingMachineService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/insframework", produces = { "text/json;charset=UTF-8" })
public class InsframeworkController {
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	private BigInteger value3;
	
	@Autowired
	private InsframeworkService im;
	
	@Autowired
	private DictionaryService dm;
	
	@Autowired
	private WeldingMachineService wmm;
	
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 跳转组织机构页面
	 * @return
	 */
	@RequestMapping("/goInsframework")
	public String goInsframework(){
		return "insframework/insframework";
	}
	
	@RequestMapping("/getInsframeworkList")
	@ResponseBody
	public String getWeldingMachine(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String searchStr = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		request.getSession().setAttribute("searchStr", searchStr);
		BigInteger parent = null;
		WeldDto dto = new WeldDto();
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = im.getUserInsframework();
		}
		int type = im.getTypeById(parent);
		if(type==20){
			dto.setBloc("bloc");
		}else if(type==21){
			dto.setCompany("company");
		}else if(type==22){
			dto.setCaust("caust");
		}else if(type==23){
			dto.setItem("item");
		}
		page = new Page(pageIndex,pageSize,total);
		
		List<Insframework> list = im.getInsframeworkAll(page, parent,searchStr,dto);
		long total = 0;
		
		if(list != null){
			PageInfo<Insframework> pageinfo = new PageInfo<Insframework>(list);
			total = pageinfo.getTotal();
		}
		
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Insframework i:list){
				json.put("id", i.getId());
				json.put("name", i.getName());
				json.put("logogram", i.getLogogram());
				json.put("code", i.getCode());
				json.put("parent", i.getParentname());
				json.put("type", i.getTypename());
				json.put("typeid", i.getType());
				json.put("parentid", i.getParent());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/addInsframework")
	@ResponseBody
	public String addInsframework(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		Insframework insf = new Insframework();
		try{
			String logogram = request.getParameter("logogram");
			String code = request.getParameter("code");
			String parent = request.getParameter("parent");
			String type = request.getParameter("type");
			insf.setName(request.getParameter("name"));
			if(iutil.isNull(logogram)){
				insf.setLogogram(logogram);
			}
			if(iutil.isNull(code)){
				insf.setCode(code);
			}
			if(iutil.isNull(parent)){
				insf.setParent(new BigInteger(parent));
			}
			if(iutil.isNull(type)){
				insf.setType(Integer.parseInt(type));
			}
			im.addInsframework(insf);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
		
	}
	
	@RequestMapping("/editInsframework")
	@ResponseBody
	public String editInsframework(HttpServletRequest request, @RequestParam String id){
		JSONObject obj = new JSONObject();
		Insframework insf = new Insframework();
		try{
			String logogram = request.getParameter("logogram");
			String code = request.getParameter("code");
			String parent = request.getParameter("parent");
			String type = request.getParameter("type");
			insf.setId(new BigInteger(id));
			insf.setName(request.getParameter("name"));
			if(iutil.isNull(logogram)){
				insf.setLogogram(logogram);
			}
			if(iutil.isNull(code)){
				insf.setCode(code);
			}
			if(iutil.isNull(parent)){
				insf.setParent(new BigInteger(parent));
			}
			if(iutil.isNull(type)){
				insf.setType(Integer.parseInt(type));
			}
			im.editInsframework(insf);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/removeInsframework")
	@ResponseBody
	public String removeInsframework(@RequestParam String id){
		JSONObject obj = new JSONObject();
		try{
			im.deleteInsframework(new BigInteger(id));
			obj.put("success", true);
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("msg", e.getMessage());
		}
		return obj.toString();
	}
	
	/**
	 * 获取父节点
	 * @return
	 */
	@RequestMapping("/getParent")
	@ResponseBody
	public String getParent(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			String id = request.getParameter("id");
			int type = Integer.parseInt(request.getParameter("type"));
			//获取用户id
			Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			MyUser myuser = (MyUser)object;
			List<Insframework> insparent = im.getInsByUserid(new BigInteger(myuser.getId()+""));
			List<Insframework> ins = null;
			for(Insframework i:insparent){
				if(i.getType()==20){
					ins = im.getInsAll(23,null);
				}else if(i.getType()==21){
					ins = im.getInsIdByParent(i.getId(),23);
					Insframework insf = im.getInsById(i.getId());
					ins.add(ins.size(),insf);
					if(type==21){
						Insframework insframework = im.getBloc();
						ins.add(ins.size(),insframework);
					}
				}else if(i.getType()==22){
					ins = im.getInsIdByParent(i.getId(),23);
					if(type==22){
						Insframework insf = new Insframework();
						BigInteger parent = im.getParentById(i.getId());
						insf.setId(parent);
						insf.setName(im.getInsframeworkById(parent));
						ins.add(ins.size(),insf);
					}
				}else{
					ins = im.getInsIdByParent(i.getId(),23);
					if(type==23){
						Insframework insf = new Insframework();
						BigInteger parent = im.getParentById(i.getId());
						insf.setId(parent);
						insf.setName(im.getInsframeworkById(parent));
						ins.add(ins.size(),insf);
					}
				}
			}

			if(type==20){
				json.put("id", 0);
				json.put("name", "无");
				ary.add(json);
			}else{
				for(Insframework in:ins){
					if(!in.getId().toString().equals(id)){
						json.put("id", in.getId());
						json.put("name", in.getName());
						ary.add(json);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	

	/**
	 * 获取类型
	 * @return
	 */
	@RequestMapping("/getType")
	@ResponseBody
	public String getType(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			int type = Integer.parseInt(request.getParameter("type"));
			String parent = request.getParameter("parentid");
			if(iutil.isNull(parent)){
				List<Dictionarys> dictionary = dm.getDicValueByValue(2, im.getTypeById(new BigInteger(parent)));
				for(Dictionarys d:dictionary){
					json.put("id", d.getValue());
					json.put("name", d.getValueName());
					ary.add(json);
				}
			}else{
				//获取用户id
				Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				MyUser myuser = (MyUser)object;
				List<Insframework> insparent = im.getInsByUserid(new BigInteger(myuser.getId()+""));
				List<Dictionarys> dictionary = null;
				//获取枚举值
				for(Insframework i:insparent){
					if(i.getType()==20){
						dictionary = dm.getDicValueByValue(2, 19);
					}else if(i.getType()==21){
						if(i.getType()==type){
							dictionary = dm.getDicValueByValue(2, 20);
						}else{
							dictionary = dm.getDicValueByValue(2, 21);
						}
					}else{
						if(type==22){
							dictionary = dm.getDicValueByValue(2, 21);
						}else{
							dictionary = dm.getDicValueByValue(2, 22);
						}
					}
				}
				if(type==20){
					String valuename = dm.getDicValueByType(2,type);
					json.put("id", type);
					json.put("name", valuename);
					ary.add(json);
				}else{
					for(Dictionarys d:dictionary){
						json.put("id", d.getValue());
						json.put("name", d.getValueName());
						ary.add(json);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	
	/**
	 * 获取登录者组织机构id
	 * @return
	 */
	@RequestMapping("/getUserInsfid")
	@ResponseBody
	public String getType(){
		JSONObject obj = new JSONObject();
		try{
			//获取用户id
			Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			MyUser myuser = (MyUser)object;
			List<Insframework> ins = im.getInsByUserid(new BigInteger(myuser.getId()+""));
			if(ins.get(0).getType()==23){
				obj.put("flag",false);
			}else{
				obj.put("flag",true);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return obj.toString();
	}
	
	/**
	 * 校验项目名称是否存在
	 * @param name
	 * @return
	 */
	@RequestMapping("/insfdValidate")
	@ResponseBody
	public String insfidValidate(@RequestParam String name){
		boolean flag = true;
		int count = im.getInsframeworkNameCount(name);
		if(count > 0){
			flag = false;
		}
		return flag + "";
	}
	
	/**
	 * 组织机构树形菜单
	 * @param name
	 * @return
	 */
	@RequestMapping("/getConmpany")
	@ResponseBody
	public void getConmpany(HttpServletResponse response){
        String str ="";  
        StringBuilder json = new StringBuilder();
        BigInteger companyId = im.getUserInsframework();
        int type = im.getTypeById(companyId);
        BigInteger value1,value2;
        if(type==20){
			value1=null;
			value2=null;
			value3=null;
		}else if(type==21){
			value1=im.getUserInsframework();
			value2=null;
			value3=null;
		}else if(type==22){
			value1=im.getParent(im.getUserInsframework()).getId();
			value2=im.getUserInsframework();
			value3=null;
		}else{
			value1=im.getParent(im.getParent(im.getUserInsframework()).getId()).getId();
			value2=im.getParent(im.getUserInsframework()).getId();
			value3=im.getUserInsframework();
		}
        // 拼接根节点  
        Insframework b = im.getBloc();
        if(type==20) {
            if(b!=null){  
    	        json.append("[");  
    	        json.append("{\"id\":" +b.getId());
    	        json.append(",\"text\":\"" +b.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        // 获取根节点下的所有子节点  
    	        List<Insframework> treeList = im.getConmpany(value1);
    	        // 遍历子节点下的子节点  
    	        if(treeList!=null && treeList.size()!=0){  
    	            json.append(",\"children\":[");  
    	            for (Insframework t : treeList) {  
    	                  
    	                json.append("{\"id\":" +String.valueOf(t.getId()));   
    	                json.append(",\"text\":\"" +t.getName() + "\"");   
    	                json.append(",\"state\":\"open\"");   
    	                  
    	                // 该节点有子节点  
    	                // 设置为关闭状态,而从构造异步加载tree  
    	              
    	                List<Insframework> tList = im.getCause(t.getId(),value2);  
    	                if(tList!=null && tList.size()!=0){// 存在子节点  
    	                     json.append(",\"children\":[");  
    	                     json.append(dealJsonFormat(tList));// 存在子节点的都放在一个工具类里面处理了
    	                     json.append("]");  
    	                }  
    	                json.append("},");  
    	            }  
    	            str = json.toString();  
    	            str = str.substring(0, str.length()-1);  
    	            str+="]}]";
    	        }else{
    	            str = json.toString();
    	            str+="}]";
    	        }
                  
            }  
        }else if(type==21) {
        	List<Insframework> treeList = im.getConmpany(value1);
        	for (Insframework tree : treeList) {  
    	        json.append("[");  
    	        json.append("{\"id\":" +String.valueOf(tree.getId()));
    	        json.append(",\"text\":\"" +tree.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        List<Insframework> tList = im.getCause(tree.getId(),value2);  
                if(tList!=null && tList.size()!=0){// 存在子节点  
                     json.append(",\"children\":[");  
                     json.append(dealJsonFormat(tList));// 存在子节点的都放在一个工具类里面处理了
                     json.append("]");  
     	             str = json.toString();
     	             str+="}]";
                } 
        	}
        }else if(type==22) {
        	List<Insframework> tList = im.getCause(null,value2);
        	if(tList!=null && tList.size()!=0){// 存在子节点  
        		json.append("[");
                json.append(dealJsonFormat(tList));// 存在子节点的都放在一个工具类里面处理了
                json.append("]");
	            str = json.toString();
           } 
        }else {
        	List<Insframework> tList = im.getCause(null,companyId);
        	for (Insframework tree : tList) {  
        		json.append("[");  
    	        json.append("{\"id\":" +String.valueOf(tree.getId()));
    	        json.append(",\"text\":\"" +tree.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        json.append("}]");
    	        str = json.toString();
        	}
        }
        try {
            response.getWriter().print(str);  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
	}
	
	public String dealJsonFormat(List<Insframework> tList){  
        StringBuilder json = new StringBuilder();  
        for (Insframework tree : tList) {  
            json.append("{\"id\":" +String.valueOf(tree.getId()));   
            json.append(",\"text\":\"" +tree.getName() + "\"");   
            json.append(",\"state\":\"open\"");
            
            // 获取根节点下的所有子节点  
            List<Insframework> treeLists = im.getCause(tree.getId(),value3);
            // 遍历子节点下的子节点  
            if(treeLists!=null && treeLists.size()!=0){  
                json.append(",\"children\":["); 
                json.append(dealJsonFormat2(treeLists));// 存在子节点的都放在一个工具类里面处理
                json.append("]");  
            }  
            json.append("},");  
        }  
        String str = json.toString();  
        str = str.substring(0, str.length()-1);
        return str;  
    } 
	
	public String dealJsonFormat2(List<Insframework> treeLists){  
        StringBuilder json = new StringBuilder();  
        for (Insframework tree : treeLists) {  
            json.append("{\"id\":" +String.valueOf(tree.getId()));   
            json.append(",\"text\":\"" +tree.getName() + "\"");   
            json.append(",\"state\":\"open\"");
            json.append("},");  
        }  
        String str = json.toString();  
        str = str.substring(0, str.length()-1); 
        return str;  
    } 
	
	/**
	 * 组织机构下面的焊机
	 */
	@RequestMapping("/getMachine")
	@ResponseBody
	public void getMachine(HttpServletResponse response){
        String str ="";  
        StringBuilder json = new StringBuilder();
        BigInteger companyId = im.getUserInsframework();
        int type = im.getTypeById(companyId);
        BigInteger value1,value2;
        if(type==20){
			value1=null;
			value2=null;
			value3=null;
		}else if(type==21){
			value1=im.getUserInsframework();
			value2=null;
			value3=null;
		}else if(type==22){
			value1=im.getParent(im.getUserInsframework()).getId();
			value2=im.getUserInsframework();
			value3=null;
		}else{
			value1=im.getParent(im.getParent(im.getUserInsframework()).getId()).getId();
			value2=im.getParent(im.getUserInsframework()).getId();
			value3=im.getUserInsframework();
		}
        // 拼接根节点  
        Insframework b = im.getBloc();
        if(type==20) {
            if(b!=null){  
    	        json.append("[");  
    	        json.append("{\"id\":" +b.getId());
    	        json.append(",\"text\":\"" +b.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        // 获取根节点下的所有子节点  
    	        List<Insframework> treeList = im.getConmpany(value1);
    	        // 遍历子节点下的子节点  
    	        if(treeList!=null && treeList.size()!=0){  
    	            json.append(",\"children\":[");  
    	            for (Insframework t : treeList) {  
    	                  
    	                json.append("{\"id\":" +String.valueOf(t.getId()));   
    	                json.append(",\"text\":\"" +t.getName() + "\"");   
    	                json.append(",\"state\":\"open\"");   
    	                  
    	                // 该节点有子节点  
    	                // 设置为关闭状态,而从构造异步加载tree  
    	              
    	                List<Insframework> tList = im.getCause(t.getId(),value2);  
    	                if(tList!=null && tList.size()!=0){// 存在子节点  
    	                     json.append(",\"children\":[");  
    	                     json.append(dealJsonFormats(tList));// 存在子节点的都放在一个工具类里面处理了
    	                     json.append("]");  
    	                }  
    	                json.append("},");  
    	            }  
    	            str = json.toString();  
    	            str = str.substring(0, str.length()-1);  
    	            str+="]}]";
    	        }
                  
            }  
        }else if(type==21) {
        	List<Insframework> treeList = im.getConmpany(value1);
        	for (Insframework tree : treeList) {  
    	        json.append("[");  
    	        json.append("{\"id\":" +String.valueOf(tree.getId()));
    	        json.append(",\"text\":\"" +tree.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
    	        List<Insframework> tList = im.getCause(tree.getId(),value2);  
                if(tList!=null && tList.size()!=0){// 存在子节点  
                     json.append(",\"children\":[");  
                     json.append(dealJsonFormats(tList));// 存在子节点的都放在一个工具类里面处理了
                     json.append("]");  
     	             str = json.toString();
     	             str+="}]";
                } 
        	}
        }else if(type==22) {
        	List<Insframework> tList = im.getCause(null,value2);
        	if(tList!=null && tList.size()!=0){// 存在子节点  
        		json.append("[");
                json.append(dealJsonFormats(tList));// 存在子节点的都放在一个工具类里面处理了
                json.append("]");
	            str = json.toString();
           } 
        }else {
        	List<Insframework> tList = im.getCause(null,companyId);
        	for (Insframework tree : tList) {  
        		json.append("[");  
    	        json.append("{\"id\":" +String.valueOf(tree.getId()));
    	        json.append(",\"text\":\"" +tree.getName()+ "\"");
    	        json.append(",\"state\":\"open\"");  
                // 获取根节点下的所有子节点  
                List<WeldingMachine> treeLists = wmm.getMachineByIns(tree.getId());
                // 遍历子节点下的子节点  
                if(treeLists!=null && treeLists.size()!=0){  
                    json.append(",\"children\":["); 
                    json.append(dealJsonFormats2(treeLists));// 存在子节点的都放在一个工具类里面处理
                    json.append("]");  
                }   
    	        json.append("}]");
    	        str = json.toString();
        	}
        }
        try {
            response.getWriter().print(str);  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
	}
	
	public String dealJsonFormats(List<Insframework> tList){  
        StringBuilder json = new StringBuilder();  
        for (Insframework tree : tList) {  
            json.append("{\"id\":" +String.valueOf(tree.getId()));   
            json.append(",\"text\":\"" +tree.getName() + "\"");   
            json.append(",\"state\":\"open\"");
            
            // 获取根节点下的所有子节点  
            List<Insframework> treeLists = im.getCause(tree.getId(),value3);
            // 遍历子节点下的子节点  
            if(treeLists!=null && treeLists.size()!=0){  
                json.append(",\"children\":["); 
                json.append(dealJsonFormat1(treeLists));// 存在子节点的都放在一个工具类里面处理
                json.append("]");  
            }  
            json.append("},");  
        }  
        String str = json.toString();  
        str = str.substring(0, str.length()-1);
        return str;  
    } 
	
	public String dealJsonFormat1(List<Insframework> tList){  
        StringBuilder json = new StringBuilder();  
        for (Insframework tree : tList) {  
            json.append("{\"id\":" +String.valueOf(tree.getId()));   
            json.append(",\"text\":\"" +tree.getName() + "\"");   
            json.append(",\"state\":\"open\"");

            // 获取根节点下的所有子节点  
            List<WeldingMachine> treeLists = wmm.getMachineByIns(tree.getId());
            // 遍历子节点下的子节点  
            if(treeLists!=null && treeLists.size()!=0){  
                json.append(",\"children\":["); 
                json.append(dealJsonFormats2(treeLists));// 存在子节点的都放在一个工具类里面处理
                json.append("]");  
            }  
            json.append("},");  
        }  
        String str = json.toString();  
        str = str.substring(0, str.length()-1);
        return str;  
    } 
	
	public String dealJsonFormats2(List<WeldingMachine> treeLists){  
        StringBuilder json = new StringBuilder();  
        for (WeldingMachine tree : treeLists) {  
            json.append("{\"id\":" +tree.getId());   
            json.append(",\"text\":\"" +tree.getEquipmentNo() + "\"");   
            json.append(",\"state\":\"open\"");
            json.append(",\"attributes\":{\"machine\":1}");
            json.append("},");  
        }  
        String str = json.toString();  
        str = str.substring(0, str.length()-1); 
        return str;  
    }

	
	/**
	 * 判断用户操作权限
	 * @param request
	 * @param id 操作节点id
	 * @return
	 */
	@RequestMapping("/getUserAuthority")
	@ResponseBody
	public String getUserAuthority(HttpServletRequest request,BigInteger id){
		JSONObject obj = new JSONObject();
		obj.put("flag", false);
		obj.put("afreshLogin", "");
		try{
			//获取用户id
			Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			MyUser myuser = (MyUser)object;
			List<Insframework> ins = im.getInsByUserid(new BigInteger(myuser.getId()+""));
			for(Insframework i:ins){
				//如果用户为集团层或点击的是自己的层级时不做判断
				if(i.getType()==20 || id.equals(i.getId())){
					obj.put("flag", true);
				}else{
					List<Insframework> list = im.getInsIdByParent(i.getId(),0);
					for(Insframework insf:list){
						if(id.equals(insf.getId())){
							obj.put("flag",true);
							break;
						}
					}
				}
			}
			return obj.toString();
		}catch(Exception e){
			obj.put("afreshLogin", "您的Session已过期，请重新登录！");
			return obj.toString();
		}
	}
	
	@RequestMapping("/getUserAdd")
	@ResponseBody
	public String getUserAdd(HttpServletRequest request){
		JSONObject obj = new JSONObject();
		obj.put("flag", false);
		obj.put("afreshLogin", "");
		try{
			BigInteger nodeId = new BigInteger(request.getParameter("nodeId"));
			//获取用户id
			Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			MyUser myuser = (MyUser)object;
			List<Insframework> ins = im.getInsByUserid(new BigInteger(myuser.getId()+""));
			for(Insframework i:ins){
				//如果用户为集团层或点击的是自己的层级时不做判断
				if(i.getType()==20 || nodeId.equals(i.getId())){
					obj.put("flag", true);
				}else{
					List<Insframework> list = im.getInsIdByParent(i.getId(),0);
					for(Insframework insf:list){
						if(nodeId.equals(insf.getId())){
							obj.put("flag",true);
							break;
						}
					}
				}
			}
			return obj.toString();
		}catch(Exception e){
			obj.put("afreshLogin", "您的Session已过期，请重新登录！");
			return obj.toString();
		}
	}
}

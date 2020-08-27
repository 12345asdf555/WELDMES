package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Authority;
import com.spring.model.Dictionarys;
import com.spring.page.Page;
import com.spring.service.AuthorityService;
import com.spring.service.DictionaryService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/authority",produces = { "text/json;charset=UTF-8" })
public class AuthorityController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	@Autowired
	private AuthorityService authorityService;
	@Autowired
	private DictionaryService dm;
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/AllAuthority")
	public String AllAuthority(HttpServletRequest request){
		return "authority/allAuthority";
	}
	@RequestMapping("/getAllAuthority")
	@ResponseBody
	public String getAllAuthority(HttpServletRequest request){
		
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		
		page = new Page(pageIndex,pageSize,total);
		List<Authority> findAll = authorityService.findAll(page,search);
		long total = 0;
		if(findAll != null){
			PageInfo<Authority> pageinfo = new PageInfo<Authority>(findAll);
			total = pageinfo.getTotal();
		}
		request.setAttribute("authorityList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Authority authority:findAll){
				json.put("id", authority.getId());
				json.put("authorityName", authority.getAuthorityName());
				json.put("authorityDesc", authority.getAuthorityDesc());
				json.put("statusid", authority.getStatus());
				json.put("status",authority.getStatusname());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
//		return "/allUser";
	}
	
	/**
	 * 跳转到添加用户界面
	 * @param request
	 * @return
	 */
	@RequestMapping("/toAddAuthority")
	public String toAddUser(HttpServletRequest request){
		
		return "authority/addAuthority";
	}
	/**
	 * 添加用户并重定向
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/addAuthority")
	@ResponseBody
	public String addAuthority(Authority authority,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
		authority.setStatus(Integer.parseInt(request.getParameter("status")));
        authority.setAuthorityName("ROLE_"+authority.getAuthorityName());
        authorityService.save(authority);
        String str = request.getParameter("rid");
        if(null!=str&&""!=str)
        {
        String[] s = str.split(",");
        for (int i = 0; i < s.length; i++) {
/*        	String au="";
        	au="ROLE_"+authority.getAuthorityName();
        	System.out.println(au);*/
            Integer id = Integer.parseInt(s[i]);
            authority.setId(authorityService.findAuthId(authority.getAuthorityName()));
            authority.setResourceName(authorityService.findByResourceId(id));
            /*authority.setAuthorityName(au);*/
            authority.setResourceId(id);
            authorityService.saveResource(authority);
        }
        }
		obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}

	/**
	 *编辑用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateAuthority")
	@ResponseBody
	public String updateAuthority(Authority authority,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
        authority.setStatus(Integer.parseInt(request.getParameter("status")));
		String str = request.getParameter("sid");
		Integer aid = Integer.parseInt(request.getParameter("id"));
		authorityService.deleteResource(aid);
		authority.setAuthorityName("ROLE_"+authority.getAuthorityName());
		if(null!=str&&""!=str)
		{
        String[] s = str.split(",");
        for (int i = 0; i < s.length; i++) {
            Integer id = Integer.parseInt(s[i]);
           /* authorityService.deleteResource(authorityService.updateAuthorityResource(aid));*/
            authority.setResourceName(authorityService.findByResourceId(id));
            authority.setResourceId(id);
            authorityService.saveResource(authority);
        }
		}
		    authorityService.update(authority);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	/**
	 * 根据id查询单个用户
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/getAuthority")
	public String getAuthority(@RequestParam int id,HttpServletRequest request){
		Authority a = authorityService.findById(new Integer(id));
		String str = a.getAuthorityName().substring(5);
		a.setAuthorityName(str);
		request.setAttribute("authority", a);
		return "authority/editAuthority";
	}
	
	@RequestMapping("/desAuthority")
	public String desAuthority(@RequestParam int id,HttpServletRequest request){
		Authority a = authorityService.findById(new Integer(id));
/*		String str = a.getAuthorityName().substring(5);
		a.setAuthorityName(str);*/
		request.setAttribute("authority", a);
		return "authority/destroyAuthority";
	}
	/**
	 * 删除用户
	 * @param id
	 * @param request
	 * @param response
	 * @return 
	 */
	@RequestMapping("/delAuthority")
	@ResponseBody
	public String delUser(@RequestParam int id){
		JSONObject obj = new JSONObject();
		try{
			Authority authority = authorityService.findById(new Integer(id));
			authorityService.delete2(new Integer(authority.getId()));	
			authorityService.delete1(new Integer(authority.getId()));
			authorityService.delete(new Integer(authority.getId()));
				obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	@RequestMapping("/getAllResource")
	@ResponseBody
	public String getAllResource(HttpServletRequest request){
		
		List<Authority> findAllResource = authorityService.findAllResource();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Authority authority:findAllResource){
				json.put("id", authority.getId());
				json.put("resources_name", authority.getResourceName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getResource")
	@ResponseBody
	public String getResource(@RequestParam Integer id,HttpServletRequest request){
		
		List<Authority> findResource = authorityService.findResource(new Integer(id));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Authority authority:findResource){
				json.put("id", authority.getResourceId());
				json.put("resources_name", authority.getResourceName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/authoritynamevalidate")
	@ResponseBody
	private String authoritynamevalidate(@RequestParam String authorityName){
		boolean data = true;
		int count = authorityService.getAuthoritynameCount(authorityName);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	@RequestMapping("/getStatusAll")
	@ResponseBody
	public String getStatusAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(6);
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
	

	@RequestMapping("/getAllResource1")
	@ResponseBody
	public String getAllResource1(@RequestParam Integer id,HttpServletRequest request){
		
		List<Authority> findAllResource = authorityService.findAllResource();
		List<Authority> findResource = authorityService.findResource(new Integer(id));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Authority authority:findAllResource){
				json.put("id", authority.getId());
				json.put("resources_name", authority.getResourceName());
				json.put("symbol", 0);
				for(Authority aut:findResource){
					if(authority.getId()==aut.getResourceId()){
						json.put("symbol", 1);
					}
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
}
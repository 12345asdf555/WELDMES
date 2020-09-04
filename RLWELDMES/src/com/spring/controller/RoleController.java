package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Dictionarys;
import com.spring.model.Role;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.RoleService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/role")
public class RoleController {

	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	@Autowired
	private RoleService roleService;

	@Autowired
	private DictionaryService dm;
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/AllRole")
	public String AllUser(HttpServletRequest request){
		return "role/allRole";
	}
	@RequestMapping("/getAllRole")
	@ResponseBody
	public String getAllRole(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		
		page = new Page(pageIndex,pageSize,total);
		List<Role> findAll = roleService.findAll(page,search);
		long total = 0;
		
		if(findAll != null){
			PageInfo<Role> pageinfo = new PageInfo<Role>(findAll);
			total = pageinfo.getTotal();
		}

		request.setAttribute("roleList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Role role:findAll){
				json.put("id", role.getId());
				json.put("roleName", role.getRoleName());
				json.put("roleDesc", role.getRoleDesc());
				json.put("status", role.getStatusname());
				json.put("statusid", role.getRoleStatus());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/todtbUser")
	public String todtbUser(@RequestParam int id,HttpServletRequest request){
		request.setAttribute("role", roleService.findById(new Integer(id)));
		return "role/dtbUser";
	}

	/**
	 * 添加用户并重定向
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/addRole")
	@ResponseBody
	public String addRole(Role role,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		try{
		role.setRoleStatus(Integer.parseInt(request.getParameter("status")));
        String str = request.getParameter("aid");
        roleService.save(role);
        role.setId(roleService.findbyid(role.getRoleName()));
        if(null!=str&&""!=str)
        {
        String[] s = str.split(",");
        for (int i = 0; i < s.length; i++) {
            Integer id = Integer.parseInt(s[i]);
 /*           role.setAuthorityDesc(roleService.findByAuthorityId(id));*/
            role.setAuthorityId(id);
            roleService.saveAuthority(role);
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
	@RequestMapping("/updateRole")
	@ResponseBody
	public String updateRole(HttpServletRequest request){
		Role role = new Role();
		JSONObject obj = new JSONObject();
		try{
/*		role.setRoleId(Integer.parseInt(request.getParameter("id")));*/
		role.setRoleName(request.getParameter("roleName"));
		role.setRoleDesc(request.getParameter("roleDesc"));
		role.setRoleStatus(Integer.parseInt(request.getParameter("status")));	
		String str = request.getParameter("aid");
		Integer rid = Integer.parseInt(request.getParameter("rid"));
		role.setId(rid);
		roleService.deleteAuthority(rid);
		if(null!=str&&""!=str)
		{
        String[] s = str.split(",");
        for (int i = 0; i < s.length; i++) {
            Integer id = Integer.parseInt(s[i]);
            /*roleService.deleteAuthority(roleService.updateRoleAuthority(rid));*/
            role.setAuthorityId(id);
            roleService.saveAuthority(role);
        }
		}
			 roleService.update(role);
			 obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	
	@RequestMapping("/dtbUser")
	public String dtbUser(Role role,HttpServletRequest request){
		JSONObject obj = new JSONObject();
		obj.put("flag", true);
		try{
			String str = request.getParameter("uid");
			Integer rid = Integer.parseInt(request.getParameter("rid"));
			roleService.deleteUser(rid);
			if(null!=str&&""!=str){
				String[] s = str.split(",");
		        for (int i = 0; i < s.length; i++) {
		            Integer id = Integer.parseInt(s[i]);
		            /*roleService.deleteUser(roleService.updateRoleUser(rid));*/
		            role.setUserName(roleService.findByUserId(id));
		            role.setUserId(id);
		            roleService.saveUser(role);
		        }
			}
		}catch(Exception e){
			obj.put("flag", false);
		}
		return obj.toString();
	}
	/**
	 * 根据id查询单个用户
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/getRole")
	public String getRole(@RequestParam int id,HttpServletRequest request){
		
		request.setAttribute("role", roleService.findById(new Integer(id)));
		return "role/editRole";
	}
	
	@RequestMapping("/desRole")
	public String desRole(@RequestParam int id,HttpServletRequest request){
		
		request.setAttribute("role", roleService.findById(new Integer(id)));
		return "role/destroyRole";
	}
	/**
	 * 删除用户
	 * @param id
	 * @param request
	 * @param response
	 */
	@RequestMapping("/delRole")
	@ResponseBody
	public String delRole(@RequestParam int id){
		JSONObject obj = new JSONObject();
		try{
			 Role role = roleService.findById(new Integer(id));
			 roleService.delete2(role.getRoleId());
			 roleService.delete1(role.getRoleId());
			 roleService.delete(new Integer(role.getId()));
			 obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
	}
	@RequestMapping("/getAllAuthority")
	@ResponseBody
	public String getAllAuthority(HttpServletRequest request){
		
		List<Role> findAllAuthority = roleService.findAllAuthority();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Role role:findAllAuthority){
				json.put("id", role.getId());
				json.put("authorities_desc", role.getAuthorityDesc());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAuthority")
	@ResponseBody
	public String getAuthority(@RequestParam Integer id,HttpServletRequest request){
		
		List<Role> findAuthority = roleService.findAuthority(new Integer(id));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Role role:findAuthority){
				json.put("authorities_desc", role.getAuthorityDesc());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getAllUser")
	@ResponseBody
	public String getAllUser(@RequestParam Integer id,HttpServletRequest request){
	    
	    List<Role> findAllUser = roleService.findAllUser();
	    List<Role> findUser = roleService.findUser(id);
	    JSONObject json = new JSONObject();
	    JSONArray ary = new JSONArray();
	    JSONObject obj = new JSONObject();
	    try{
	      for(Role role:findAllUser){
	        json.put("id", role.getId());
	        json.put("users_name", role.getUserName());
	        json.put("symbol", 0);
	        for(Role aut:findUser){
	          if(role.getId()==aut.getUserId()){
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
	
	@RequestMapping("/getUser")
	@ResponseBody
	public String getUser(@RequestParam Integer id,HttpServletRequest request){
		
		List<Role> findUser = roleService.findUser(new Integer(id));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Role role:findUser){
				json.put("id", role.getId());
				json.put("users_name", role.getUserName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	
	@RequestMapping("/rolenamevalidate")
	@ResponseBody
	private String rolenamevalidate(@RequestParam String roleName){
		boolean data = true;
		int count = roleService.getRolenameCount(roleName);
		if(count>0){
			data = false;
		}
		return data+"";
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
	

	@RequestMapping("/getAllAuthority1")
	@ResponseBody
	public String getAllAuthority1(@RequestParam Integer id,HttpServletRequest request){
		List<Role> findAuthority = roleService.findAuthority(new Integer(id));
		List<Role> findAllAuthority = roleService.findAllAuthority();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Role role:findAllAuthority){
				json.put("id", role.getId());
				json.put("authorities_desc", role.getAuthorityDesc());
				json.put("symbol", 0);
				for(Role aut:findAuthority){
					if(role.getId()==aut.getAuthoritiesId()){
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